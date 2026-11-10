"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function CheckoutGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      setShowModal(true);
    }
  }, [session, isPending]);

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <p className="type-body text-base">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <div className="flex flex-1 items-center justify-center px-6 py-20">
          <p className="type-body text-base">Please sign in to continue.</p>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-900/50 backdrop-blur-sm">
            <div className="card mx-4 w-full max-w-md p-8">
              <p className="type-eyebrow">Checkout</p>
              <h2 className="type-heading mt-3 text-3xl">Sign in to continue</h2>
              <p className="type-body mt-3 text-base">
                Sign in to your account or create one to complete your purchase.
              </p>
              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => router.push("/auth/signin?callbackUrl=/checkout")}
                  className="btn-primary w-full justify-center py-3.5! text-sm!"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/auth/signup?callbackUrl=/checkout")}
                  className="w-full rounded-full border border-rose-400 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-espresso-900 transition-colors hover:bg-rose-300/40"
                >
                  Create account
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="type-body w-full pt-2 text-center text-sm text-ink-500 hover:text-espresso-900"
                >
                  Continue as guest
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
