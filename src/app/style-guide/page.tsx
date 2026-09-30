const swatches: [name: string, hex: string, className: string][] = [
  ["cream-50", "#fffaf7", "bg-cream-50"],
  ["cream-100", "#fdf3ef", "bg-cream-100"],
  ["cream-200", "#f9e7e1", "bg-cream-200"],
  ["blush-100", "#fbece7", "bg-blush-100"],
  ["blush-200", "#f7ded8", "bg-blush-200"],
  ["blush-300", "#f0ccc5", "bg-blush-300"],
  ["blush-400", "#e6b3ab", "bg-blush-400"],
  ["rose-300", "#e9c4c1", "bg-rose-300"],
  ["rose-400", "#d9a9a4", "bg-rose-400"],
  ["rose-500", "#c79a95", "bg-rose-500"],
  ["rose-600", "#b1837f", "bg-rose-600"],
  ["rose-700", "#97706d", "bg-rose-700"],
  ["cocoa-500", "#8a655c", "bg-cocoa-500"],
  ["cocoa-600", "#6b4a41", "bg-cocoa-600"],
  ["cocoa-700", "#563a33", "bg-cocoa-700"],
  ["espresso-900", "#3a2724", "bg-espresso-900"],
  ["ink-700", "#6b5450", "bg-ink-700"],
  ["ink-500", "#8a716b", "bg-ink-500"],
];

const roles: [label: string, hex: string, className: string][] = [
  ["background", "#fbece7", "bg-background"],
  ["surface", "#fffaf7", "bg-surface"],
  ["foreground", "#3a2724", "bg-foreground"],
  ["muted", "#8a716b", "bg-muted"],
  ["primary", "#c79a95", "bg-primary"],
  ["primary-hover", "#b1837f", "bg-primary-hover"],
  ["accent", "#e9c4c1", "bg-accent"],
  ["border", "#f0dcd6", "bg-border"],
];

export default function StyleGuide() {
  return (
    <main className="mx-auto w-full max-w-5xl px-8 py-20">
      <p className="type-eyebrow">Atlias design system</p>
      <h1 className="type-heading mt-3 text-5xl">Colour, type &amp; components</h1>
      <p className="type-body mt-4 max-w-2xl text-base">
        Tokens live in <code className="text-espresso-900">src/app/globals.css</code> inside{" "}
        <code className="text-espresso-900">@theme</code>, so every value below is a real Tailwind
        utility (e.g. <code className="text-espresso-900">bg-blush-200</code>).
      </p>

      <section className="mt-16">
        <h2 className="type-heading text-2xl">Palette</h2>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-9">
          {swatches.map(([name, hex, className]) => (
            <div key={name}>
              <div className={`${className} h-16 rounded-2xl border border-border`} />
              <p className="mt-2 text-xs font-medium text-espresso-900">{name}</p>
              <p className="text-xs text-ink-500">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="type-heading text-2xl">Semantic roles</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {roles.map(([label, hex, className]) => (
            <div key={label}>
              <div className={`${className} h-16 rounded-2xl border border-border`} />
              <p className="mt-2 text-xs font-medium text-espresso-900">{label}</p>
              <p className="text-xs text-ink-500">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="type-heading text-2xl">Typography</h2>
        <div className="mt-6 space-y-8">
          <div>
            <p className="type-eyebrow">Eyebrow — Jost 500, 12px, 0.22em</p>
            <p className="type-hero mt-2 bg-cocoa-600 rounded-2xl px-6 py-8 text-6xl">
              Hormone
              <br />
              proof, vegan
            </p>
          </div>
          <div>
            <p className="type-eyebrow">Display — Playfair Display 400</p>
            <h3 className="type-heading mt-2 text-4xl">Discover our bestsellers</h3>
            <p className="type-heading mt-1 text-2xl">Section heading · 24px</p>
          </div>
          <div>
            <p className="type-eyebrow">Body — Jost 400</p>
            <p className="type-body mt-2 max-w-xl text-base">
              Explore customer-favorite products made to elevate your everyday beauty routine.
              Simple, effective beauty care for healthy skin without the stress or overload.
            </p>
            <p className="type-body mt-2 text-sm">
              Small / caption — 14px, used for product details and meta text.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="type-heading text-2xl">Buttons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" className="btn-primary">
            Add to cart
          </button>
          <button
            type="button"
            className="rounded-full border border-rose-400 px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-espresso-900 transition-colors hover:bg-rose-300/40"
          >
            Secondary
          </button>
          <button
            type="button"
            className="rounded-full bg-cocoa-600 px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-cream-50 transition-colors hover:bg-cocoa-700"
          >
            Shop now
          </button>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="type-heading text-2xl">Product card</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            ["Velvet Cream Cleanser 150 ml", "€ 30,95"],
            ["CC Smart Tinted Silkskin 30ML", "€ 29,95"],
            ["Smart Silklips", "€ 12,95"],
          ].map(([title, price]) => (
            <article key={title} className="card p-6">
              <div className="flex h-40 items-center justify-center rounded-xl bg-blush-100" />
              <h3 className="type-heading mt-4 text-lg leading-snug">{title}</h3>
              <div className="mt-4 flex items-center justify-between">
                <p className="type-heading text-lg">{price}</p>
                <span className="btn-primary px-4! py-2! text-[0.7rem]!">Add to cart</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
