"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import type { DbProduct } from "@/lib/products";

export function AddToCart({ product }: { product: DbProduct }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.productId === product.id);
  const maxStock = product.inventory;
  const cartQuantity = inCart?.quantity ?? 0;
  const remainingStock = maxStock - cartQuantity;
  const outOfStock = maxStock <= 0;

  function handleAdd() {
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
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleViewCart() {
    router.push("/cart");
  }

  if (outOfStock) {
    return (
      <div className="flex items-center gap-4">
        <span className="btn-primary cursor-not-allowed px-8! py-3.5! text-sm! opacity-50">
          Out of stock
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {added ? (
        <button
          type="button"
          onClick={handleViewCart}
          className="btn-primary px-8! py-3.5! text-sm!"
        >
          View cart
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          className="btn-primary px-8! py-3.5! text-sm!"
        >
          Add to cart
        </button>
      )}
      {cartQuantity > 0 && (
        <span className="type-body text-sm">
          {cartQuantity} in cart
        </span>
      )}
    </div>
  );
}
