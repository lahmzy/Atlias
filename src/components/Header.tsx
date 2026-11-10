"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useCartStore } from "@/lib/store/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const emptySubscribe = () => () => {};

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  // Persisted cart state only exists on the client, so render the count after hydration.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  async function handleSignOut() {
    await signOut({
      callbackURL: "/",
    });
    toast.success("Signed out successfully");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="type-heading text-xl tracking-wide">
          Atlias
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-espresso-900 transition-colors hover:text-rose-600"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-sm font-medium text-espresso-900 transition-colors hover:text-rose-600"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-rose-300 text-espresso-900 transition-colors hover:bg-rose-300/40"
            aria-label={`Cart${mounted && cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
              />
            </svg>
            {mounted && cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[0.65rem] font-semibold text-cream-50">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          {session ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm font-medium text-espresso-900 transition-colors hover:text-rose-600"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-espresso-900 transition-colors hover:text-rose-600"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
