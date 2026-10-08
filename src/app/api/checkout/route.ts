import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema/ecommerce";
import { nanoid } from "nanoid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { items, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate stock
    for (const item of items) {
      const product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, item.productId),
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product "${item.name}" not found` },
          { status: 400 }
        );
      }

      if (product.inventory < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for "${item.name}". Available: ${product.inventory}` },
          { status: 400 }
        );
      }
    }

    // Calculate total
    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Create order in DB
    const orderId = nanoid();
    const orderNumber = `ATL-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(orders).values({
      id: orderId,
      orderNumber,
      status: "pending",
      totalAmount: totalAmount.toFixed(2),
      shippingAddress: JSON.stringify(shippingAddress),
    });

    // Create order items
    await db.insert(orderItems).values(
      items.map((item: { productId: string; quantity: number; price: number }) => ({
        id: nanoid(),
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toFixed(2),
      }))
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      // @ts-expect-error Stripe SDK v23 type mismatch
      payment_method_types: ["card"],
      line_items: items.map((item: { name: string; price: number; quantity: number; image: string }) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: {
        orderId,
        orderNumber,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
