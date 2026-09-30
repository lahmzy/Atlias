"use client";

import { useState } from "react";
import { products, categories } from "@/lib/data";
import { ProductImage } from "@/components/ProductImage";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
              activeCategory === cat
                ? "border-cocoa-600 bg-cocoa-600 text-cream-50"
                : "border-rose-300 text-espresso-900 hover:bg-rose-300/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <article key={product.name} className="card group overflow-hidden">
            <div className="relative h-64 overflow-hidden rounded-t-[1.75rem] bg-blush-100">
              <ProductImage src={product.image} alt={product.name} />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-cocoa-600 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream-50">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-6">
              <p className="type-eyebrow text-[0.65rem]">{product.category}</p>
              <h3 className="type-heading mt-2 text-lg leading-snug">{product.name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <p className="type-heading text-lg">{product.price}</p>
                <button type="button" className="btn-primary px-4! py-2! text-[0.7rem]!">
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
