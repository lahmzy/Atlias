import Link from "next/link";

export function Header() {
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
            href="/shop"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300 text-espresso-900 transition-colors hover:bg-rose-300/40"
            aria-label="Cart"
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
          </Link>
        </nav>
      </div>
    </header>
  );
}
