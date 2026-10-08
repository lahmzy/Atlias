"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories, type DbProduct, type DbCategory } from "@/lib/products";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

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

      {/* Category filter pills */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory("All")}
          className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
            activeCategory === "All"
              ? "border-cocoa-600 bg-cocoa-600 text-cream-50"
              : "border-rose-300 text-espresso-900 hover:bg-rose-300/40"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
              activeCategory === cat.id
                ? "border-cocoa-600 bg-cocoa-600 text-cream-50"
                : "border-rose-300 text-espresso-900 hover:bg-rose-300/40"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {loading ? (
        <div className="mt-12 text-center">
          <p className="type-body text-base">Loading products...</p>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
