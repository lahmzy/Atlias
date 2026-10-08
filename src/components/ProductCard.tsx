"use client";

import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import type { DbProduct } from "@/lib/products";

export function ProductCard({ product }: { product: DbProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);

  const inCart = items.find((i) => i.productId === product.id);
  const maxStock = product.inventory;
  const outOfStock = maxStock <= 0;
  const cartQuantity = inCart?.quantity ?? 0;
  const remainingStock = maxStock - cartQuantity;

  function handleAddToCart() {
    if (remainingStock <= 0) {
      toast.error("No more stock available");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.imageUrl || "",
      maxStock,
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <article className="card group overflow-hidden">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block h-64 overflow-hidden rounded-t-[1.75rem] bg-blush-100"
      >
        <ProductImage src={product.imageUrl || ""} alt={product.name} />
        {product.isFeatured && (
          <span className="absolute left-4 top-4 rounded-full bg-cocoa-600 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream-50">
            Bestseller
          </span>
        )}
        {outOfStock && (
          <span className="absolute right-4 top-4 rounded-full bg-ink-500 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream-50">
            Out of stock
          </span>
        )}
      </Link>
      <div className="p-6">
        <p className="type-eyebrow text-[0.65rem]">{product.categoryId}</p>
        <h3 className="type-heading mt-2 text-lg leading-snug">
          <Link
            href={`/shop/${product.slug}`}
            className="transition-colors hover:text-rose-600"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="type-heading text-lg">{formatPrice(product.price)}</p>
          {outOfStock ? (
            <span className="btn-primary cursor-not-allowed px-4! py-2! text-[0.7rem]! opacity-50">
              Out of stock
            </span>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-primary px-4! py-2! text-[0.7rem]!"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
