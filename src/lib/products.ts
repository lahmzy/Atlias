import { db } from "@/db";
import { products, categories } from "@/db/schema/ecommerce";
import { eq } from "drizzle-orm";

export type DbProduct = typeof products.$inferSelect;
export type DbCategory = typeof categories.$inferSelect;

export async function getProducts(): Promise<DbProduct[]> {
  return db.select().from(products).where(eq(products.isActive, true));
}

export async function getFeaturedProducts(): Promise<DbProduct[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .limit(6);
}

export async function getCategories(): Promise<DbCategory[]> {
  return db.select().from(categories).orderBy(categories.sortOrder);
}

export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return `€ ${num.toFixed(2).replace(".", ",")}`;
}
