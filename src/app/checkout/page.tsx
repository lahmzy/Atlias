"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { ProductImage } from "@/components/ProductImage";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCheckout() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shippingAddress: form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      clearCart();
      router.push(data.url);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="text-center">
          <p className="type-eyebrow">Checkout</p>
          <h1 className="type-heading mt-3 text-4xl">Nothing to check out</h1>
          <p className="type-body mt-3 text-base">Add some products to your cart first.</p>
          <Link href="/shop" className="btn-primary mt-8 inline-block px-8! py-3.5! text-sm!">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="type-eyebrow">Checkout</p>
      <h1 className="type-heading mt-3 text-4xl">Complete your order</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Shipping form */}
        <div>
          <h2 className="type-heading text-2xl">Shipping details</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="type-body mb-2 block text-sm font-medium">Full name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="type-body mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="type-body mb-2 block text-sm font-medium">Address</label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="type-body mb-2 block text-sm font-medium">City</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="type-body mb-2 block text-sm font-medium">Postal code</label>
                <input
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
                  placeholder="12345"
                />
              </div>
            </div>
            <div>
              <label className="type-body mb-2 block text-sm font-medium">Country</label>
              <input
                type="text"
                required
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
                placeholder="Country"
              />
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <h2 className="type-heading text-2xl">Order summary</h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-blush-100">
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="type-heading text-sm">{item.name}</p>
                    <p className="type-body text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="type-heading text-sm">€ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <p className="type-body text-base">Total</p>
              <p className="type-heading text-2xl">€ {totalPrice().toFixed(2)}</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-400 bg-rose-300/20 px-4 py-3 text-sm text-espresso-900">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="btn-primary mt-6 w-full justify-center py-3.5! text-sm! disabled:opacity-50"
          >
            {loading ? "Redirecting to Stripe..." : "Pay with Stripe"}
          </button>
          <p className="type-body mt-3 text-center text-xs">
            You will be redirected to Stripe to complete payment securely.
          </p>
        </div>
      </div>
    </main>
  );
}
