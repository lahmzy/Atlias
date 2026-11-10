"use server";

import { headers } from "next/headers";
import Stripe from "stripe";
import { nanoid } from "nanoid";
import { z } from "zod";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema/ecommerce";
import { auth } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const shippingSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  address: z.string().trim().min(4, "Enter your street address"),
  city: z.string().trim().min(2, "Enter your city"),
  postalCode: z.string().trim().min(3, "Enter your postal code"),
  country: z.string().trim().min(2, "Enter your country"),
});

const cartSchema = z
  .array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
    })
  )
  .min(1, "Your cart is empty");

type ShippingField = keyof z.infer<typeof shippingSchema>;

export type CheckoutState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<ShippingField, string>>;
  url?: string;
};

export async function checkoutAction(
  _prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const shipping = shippingSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    city: String(formData.get("city") ?? ""),
    postalCode: String(formData.get("postalCode") ?? ""),
    country: String(formData.get("country") ?? ""),
  });

  if (!shipping.success) {
    const fieldErrors: CheckoutState["fieldErrors"] = {};

    for (const [field, messages] of Object.entries(
      shipping.error.flatten().fieldErrors
    )) {
      if (messages?.[0]) {
        fieldErrors[field as ShippingField] = messages[0];
      }
    }

    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  let cart: z.infer<typeof cartSchema>;

  try {
    cart = cartSchema.parse(JSON.parse(String(formData.get("items") ?? "[]")));
  } catch {
    return {
      status: "error",
      message: "Your cart is invalid. Please refresh the page and try again.",
    };
  }

  try {
    // Guests may check out; only attach a user when there is a session.
    const session = await auth.api.getSession({ headers: await headers() });

    const productIds = [...new Set(cart.map((item) => item.productId))];
    const dbProducts = await db.query.products.findMany({
      where: (products, { inArray }) => inArray(products.id, productIds),
    });

    // Rebuild the order from the database so prices and stock cannot be forged.
    const lineItems: {
      productId: string;
      name: string;
      price: number;
      image: string | null;
      quantity: number;
    }[] = [];

    for (const item of cart) {
      const product = dbProducts.find((p) => p.id === item.productId);

      if (!product || !product.isActive) {
        return {
          status: "error",
          message:
            "One of the items in your cart is no longer available. Please review your cart.",
        };
      }

      if (product.inventory < item.quantity) {
        return {
          status: "error",
          message: `Not enough stock for "${product.name}". Available: ${product.inventory}.`,
        };
      }

      lineItems.push({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.imageUrl,
        quantity: item.quantity,
      });
    }

    const totalAmount = lineItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // The order is created before payment, with status "pending".
    const orderId = nanoid();
    const orderNumber = `ATL-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(orders).values({
      id: orderId,
      orderNumber,
      userId: session?.user.id ?? null,
      status: "pending",
      totalAmount: totalAmount.toFixed(2),
      shippingAddress: shipping.data,
    });

    await db.insert(orderItems).values(
      lineItems.map((item) => ({
        id: nanoid(),
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toFixed(2),
      }))
    );

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      customer_email: shipping.data.email,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      metadata: {
        orderId,
        orderNumber,
      },
    });

    if (!checkoutSession.url) {
      return {
        status: "error",
        message: "Could not start the payment. Please try again.",
      };
    }

    return { status: "success", url: checkoutSession.url };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
