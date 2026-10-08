import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-8 w-8 text-cream-50"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="type-eyebrow mt-6">Order confirmed</p>
        <h1 className="type-heading mt-3 text-4xl">Thank you for your order!</h1>
        <p className="type-body mx-auto mt-4 max-w-md text-base">
          Your payment was successful. We&apos;ll send you a confirmation email with your
          order details shortly.
        </p>
        <Link href="/shop" className="btn-primary mt-8 inline-block px-8! py-3.5! text-sm!">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
