import Link from "next/link";
import { products } from "@/lib/data";
import { ProductImage } from "@/components/ProductImage";

const stats = [
  { value: "25K+", label: "Happy Customers" },
  { value: "100K+", label: "Products Delivered" },
  { value: "4.9/5", label: "Loved Community" },
  { value: "10K+", label: "Wellness Routines" },
];

const promises = [
  "Skinminimalise",
  "Sustainable, not harmful to the environment",
  "No hormone-disrupting ingredients",
  "Free from microplastics",
  "Vegan & cruelty free",
];

export default function Home() {
  const featured = products.filter((p) => p.badge);

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <p className="type-eyebrow">Clean beauty &amp; cosmetics</p>
        <h1 className="type-hero mt-6 !text-espresso-900 text-6xl sm:text-7xl lg:text-8xl">
          Hormone proof,
          <br />
          vegan
        </h1>
        <p className="type-body mx-auto mt-6 max-w-xl text-base">
          Thoughtful formulas for your everyday beauty routine. Simple, effective beauty care
          for healthy skin without the stress or overload.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop" className="btn-primary px-8! py-3.5! text-sm!">
            Shop now
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-rose-400 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-espresso-900 transition-colors hover:bg-rose-300/40"
          >
            Browse products
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="type-heading text-3xl">{s.value}</p>
              <p className="type-body mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="text-center">
          <p className="type-eyebrow">Bestsellers</p>
          <h2 className="type-heading mt-3 text-4xl">Discover our bestsellers</h2>
          <p className="type-body mx-auto mt-4 max-w-xl text-base">
            Explore customer-favorite products made to elevate your everyday beauty routine.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <article key={product.name} className="card group overflow-hidden">
              <div className="relative h-64 overflow-hidden rounded-t-[1.75rem] bg-blush-100">
                <ProductImage src={product.image} alt={product.name} />
                {product.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-cocoa-600 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream-50">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="type-eyebrow text-[0.65rem]">{product.category}</p>
                <h3 className="type-heading mt-2 text-lg leading-snug">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="type-heading text-lg">{product.price}</p>
                  <Link href="/shop" className="btn-primary px-4! py-2! text-[0.7rem]!">
                    Add to cart
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-block rounded-full bg-cocoa-600 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-cream-50 transition-colors hover:bg-cocoa-700"
          >
            View all products
          </Link>
        </div>
      </section>

      {/* Brand promises */}
      <section className="bg-cocoa-600 py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="type-eyebrow !text-rose-300">Our promises</p>
            <h2 className="type-heading mt-3 text-4xl !text-cream-50">
              Beauty without compromise
            </h2>
            <p className="type-body mt-4 max-w-md text-base !text-cream-50/80">
              Every formula is crafted with care — for your skin and the planet.
            </p>
          </div>
          <ul className="space-y-4">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-cream-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="type-body text-base !text-cream-50">{promise}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
        <p className="type-eyebrow">Get started</p>
        <h2 className="type-heading mt-3 text-4xl">Ready to elevate your routine?</h2>
        <p className="type-body mx-auto mt-4 max-w-xl text-base">
          Join thousands of happy customers who have switched to clean, conscious beauty.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop" className="btn-primary px-8! py-3.5! text-sm!">
            Shop bestsellers
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-rose-400 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-espresso-900 transition-colors hover:bg-rose-300/40"
          >
            Explore all
          </Link>
        </div>
      </section>
    </main>
  );
}
