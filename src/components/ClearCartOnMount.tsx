"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";

/**
 * Clears the persisted cart once payment succeeded, instead of clearing it
 * before the redirect (which emptied the cart when a payment was cancelled).
 */
export function ClearCartOnMount() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
