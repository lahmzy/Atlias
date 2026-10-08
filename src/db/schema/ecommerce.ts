import { pgTable, text, timestamp, integer, numeric, boolean, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  parentId: text("parent_id"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  brand: text("brand"),
  sku: text("sku"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
  inventory: integer("inventory").default(0).notNull(),
  imageUrl: text("image_url"),
  imageUrls: jsonb("image_urls").$type<string[]>().default([]).notNull(),
  categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" }),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0").notNull(),
  reviewCount: integer("review_count").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  weight: numeric("weight", { precision: 8, scale: 2 }),
  ingredients: text("ingredients"),
  howToUse: text("how_to_use"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  shade: text("shade"),
  sku: text("sku"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  inventory: integer("inventory").default(0).notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  title: text("title"),
  body: text("body"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wishlistItems = pgTable("wishlist_items", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const discounts = pgTable("discounts", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  type: text("type", { enum: ["percentage", "fixed"] }).notNull(),
  value: numeric("value", { precision: 10, scale: 2 }).notNull(),
  startsAt: timestamp("starts_at"),
  endsAt: timestamp("ends_at"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shippingAddresses = pgTable("shipping_addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  label: text("label"),
  line1: text("line1").notNull(),
  line2: text("line2"),
  city: text("city").notNull(),
  state: text("state"),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  status: text("status", { enum: ["pending", "paid", "shipped", "completed", "cancelled"] })
    .default("pending")
    .notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  discountAmount: numeric("discount_amount", { precision: 10, scale: 2 }).default("0").notNull(),
  shippingCost: numeric("shipping_cost", { precision: 10, scale: 2 }).default("0").notNull(),
  shippingAddress: jsonb("shipping_address"),
  trackingNumber: text("tracking_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").references(() => products.id, { onDelete: "set null" }),
  variantId: text("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  variantId: text("variant_id").references(() => productVariants.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
