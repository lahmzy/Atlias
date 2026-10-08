import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { AddToCart } from "@/components/AddToCart";
import { getProductBySlug, formatPrice } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="type-body mb-8 text-sm">
        <Link href="/" className="text-ink-500 hover:text-espresso-900">
          Home
        </Link>
        <span className="mx-2 text-ink-500">/</span>
        <Link href="/shop" className="text-ink-500 hover:text-espresso-900">
          Shop
        </Link>
        <span className="mx-2 text-ink-500">/</span>
        <span className="text-espresso-900">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Large product image */}
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-blush-100">
          <ProductImage src={product.imageUrl || ""} alt={product.name} />
          {product.isFeatured && (
            <span className="absolute left-4 top-4 rounded-full bg-cocoa-600 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream-50">
              Bestseller
            </span>
          )}
        </div>

        {/* Product details */}
        <div className="flex flex-col justify-center">
          <p className="type-eyebrow">{product.categoryId}</p>
          <h1 className="type-heading mt-3 text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-4">
            <p className="type-heading text-3xl">{formatPrice(product.price)}</p>
            {product.salePrice && (
              <p className="type-body text-lg line-through">
                {formatPrice(product.salePrice)}
              </p>
            )}
          </div>

          {Number(product.rating) > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={star <= Number(product.rating) ? "#c79a95" : "#e5e5e5"}
                    className="h-4 w-4"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 0 0-1.175 0l-3.367 2.446c-.783.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.958Z" />
                  </svg>
                ))}
              </div>
              <span className="type-body text-sm">
                {Number(product.rating).toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {product.description && (
            <p className="type-body mt-6 text-base leading-relaxed">
              {product.description}
            </p>
          )}

          {product.howToUse && (
            <div className="mt-6">
              <h3 className="type-heading text-lg">How to use</h3>
              <p className="type-body mt-2 text-base">{product.howToUse}</p>
            </div>
          )}

          {product.ingredients && (
            <div className="mt-6">
              <h3 className="type-heading text-lg">Ingredients</h3>
              <p className="type-body mt-2 text-base">{product.ingredients}</p>
            </div>
          )}

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <p className="type-body mt-4 text-sm">
            {product.inventory > 0 ? (
              <span className="text-rose-600">
                {product.inventory} in stock
              </span>
            ) : (
              <span className="text-ink-500">Out of stock</span>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
