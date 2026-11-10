"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { CheckoutGuard } from "@/components/CheckoutGuard";
import { useCartStore } from "@/lib/store/cart";
import { checkoutAction, type CheckoutState } from "./actions";

const initialState: CheckoutState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none";

const fieldErrorClass = "mt-1.5 text-sm text-rose-600";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const [state, formAction, isPending] = useActionState(
    checkoutAction,
    initialState
  );

  useEffect(() => {
    if (state.status === "success" && state.url) {
      window.location.assign(state.url);
    }
  }, [state]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Only IDs and quantities cross the boundary; the server re-reads prices and stock.
  const cartPayload = JSON.stringify(
    items.map(({ productId, quantity }) => ({ productId, quantity }))
  );

  return (
    <CheckoutGuard>
      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="type-eyebrow">Checkout</p>
        <h1 className="type-heading mt-3 text-4xl">Complete your order</h1>

        {items.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="type-body text-base">Your cart is empty.</p>
            <Link href="/shop" className="btn-primary mt-6 inline-block px-8! py-3.5! text-sm!">
              Browse products
            </Link>
          </div>
        ) : (
          <form
            action={formAction}
            onReset={(event) => event.preventDefault()}
            className="mt-10 grid gap-10 lg:grid-cols-2"
          >
            <input type="hidden" name="items" value={cartPayload} />

            {/* Shipping form */}
            <div>
              <h2 className="type-heading text-2xl">Shipping details</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="type-body mb-2 block text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    defaultValue=""
                    className={inputClass}
                    placeholder="Your name"
                  />
                  {state.fieldErrors?.name && (
                    <p className={fieldErrorClass}>{state.fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="type-body mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue=""
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                  {state.fieldErrors?.email && (
                    <p className={fieldErrorClass}>{state.fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="type-body mb-2 block text-sm font-medium">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    defaultValue=""
                    className={inputClass}
                    placeholder="Street address"
                  />
                  {state.fieldErrors?.address && (
                    <p className={fieldErrorClass}>{state.fieldErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="type-body mb-2 block text-sm font-medium">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      defaultValue=""
                      className={inputClass}
                      placeholder="City"
                    />
                    {state.fieldErrors?.city && (
                      <p className={fieldErrorClass}>{state.fieldErrors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="type-body mb-2 block text-sm font-medium">
                      Postal code
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      autoComplete="postal-code"
                      defaultValue=""
                      className={inputClass}
                      placeholder="12345"
                    />
                    {state.fieldErrors?.postalCode && (
                      <p className={fieldErrorClass}>{state.fieldErrors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="type-body mb-2 block text-sm font-medium">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    defaultValue=""
                    className={inputClass}
                    placeholder="Country"
                  />
                  {state.fieldErrors?.country && (
                    <p className={fieldErrorClass}>{state.fieldErrors.country}</p>
                  )}
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
                      <p className="type-heading text-sm">
                        € {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <p className="type-body text-base">Total</p>
                  <p className="type-heading text-2xl">€ {total.toFixed(2)}</p>
                </div>
              </div>

              {state.status === "error" && state.message && (
                <div className="mt-4 rounded-xl border border-rose-400 bg-rose-300/20 px-4 py-3 text-sm text-espresso-900">
                  {state.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="btn-primary mt-6 w-full justify-center py-3.5! text-sm! disabled:opacity-50"
              >
                {isPending ? "Redirecting to Stripe..." : "Pay with Stripe"}
              </button>
              <p className="type-body mt-3 text-center text-xs">
                You will be redirected to Stripe to complete payment securely.
              </p>
            </div>
          </form>
        )}
      </main>
    </CheckoutGuard>
  );
}
