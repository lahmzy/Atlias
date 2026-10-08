"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { ProductImage } from "@/components/ProductImage";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="text-center">
          <p className="type-eyebrow">Your cart</p>
          <h1 className="type-heading mt-3 text-4xl">Your cart is empty</h1>
          <p className="type-body mt-3 text-base">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href="/shop" className="btn-primary mt-8 inline-block px-8! py-3.5! text-sm!">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="type-eyebrow">Your cart</p>
      <h1 className="type-heading mt-3 text-4xl">Cart</h1>

      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="card flex items-center gap-6 overflow-hidden p-4"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-blush-100">
              <ProductImage src={item.image} alt={item.name} />
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h3 className="type-heading text-lg">{item.name}</h3>
                <p className="type-body mt-1 text-sm">{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-300 text-espresso-900 transition-colors hover:bg-rose-300/40"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    disabled={item.quantity >= item.maxStock}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-300 text-espresso-900 transition-colors hover:bg-rose-300/40 disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <p className="type-heading w-20 text-right text-lg">
                  € {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-rose-300/40 hover:text-espresso-900"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 flex flex-col items-end gap-4">
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between">
            <p className="type-body text-base">Subtotal</p>
            <p className="type-heading text-xl">€ {totalPrice().toFixed(2)}</p>
          </div>
          <p className="type-body mt-2 text-sm">Shipping calculated at checkout</p>
        </div>
        <Link
          href="/checkout"
          className="btn-primary px-8! py-3.5! text-sm!"
        >
          Proceed to checkout
        </Link>
      </div>
    </main>
  );
}
