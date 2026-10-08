"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { DbProduct, DbCategory } from "@/lib/products";

export function ShopCatalog({
  products,
  categories,
}: {
  products: DbProduct[];
  categories: DbCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.categoryId === activeCategory);

  return (
    <>
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
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
