import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type {
  products,
  categories,
  productVariants,
  reviews,
  wishlistItems,
  discounts,
  shippingAddresses,
  orders,
  orderItems,
  cartItems,
} from "@/db/schema/ecommerce";
import type { users } from "@/db/schema/auth";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export type ProductVariant = InferSelectModel<typeof productVariants>;
export type NewProductVariant = InferInsertModel<typeof productVariants>;

export type Review = InferSelectModel<typeof reviews>;
export type NewReview = InferInsertModel<typeof reviews>;

export type WishlistItem = InferSelectModel<typeof wishlistItems>;
export type NewWishlistItem = InferInsertModel<typeof wishlistItems>;

export type Discount = InferSelectModel<typeof discounts>;
export type NewDiscount = InferInsertModel<typeof discounts>;

export type ShippingAddress = InferSelectModel<typeof shippingAddresses>;
export type NewShippingAddress = InferInsertModel<typeof shippingAddresses>;

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export type OrderItem = InferSelectModel<typeof orderItems>;
export type NewOrderItem = InferInsertModel<typeof orderItems>;

export type CartItem = InferSelectModel<typeof cartItems>;
export type NewCartItem = InferInsertModel<typeof cartItems>;

export interface CartItemWithProduct extends CartItem {
  product: Product;
  variant?: ProductVariant | null;
}

export interface OrderWithItems extends Order {
  items: (OrderItem & { product?: Product | null; variant?: ProductVariant | null })[];
}
