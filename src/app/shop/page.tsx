import { getProducts, getCategories } from "@/lib/products";
import { ShopCatalog } from "@/components/ShopCatalog";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="text-center">
        <p className="type-eyebrow">Shop</p>
        <h1 className="type-heading mt-3 text-5xl">Discover our products</h1>
        <p className="type-body mx-auto mt-4 max-w-xl text-base">
          Thoughtful formulas for your everyday beauty routine. Cruelty-free, vegan, and made
          with care.
        </p>
      </div>

      <ShopCatalog products={products} categories={categories} />
    </main>
  );
}
