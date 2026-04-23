import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/products";

function formatCategory(category: string) {
  return category
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDailyRate(rate: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rate);
}

function getSummary(description: string) {
  return description.split("\n").find(Boolean) ?? description;
}

export function ProductCard({ product }: { product: Product }) {
  const availability =
    product.is_active && product.units_count > 0
      ? `${product.units_count} available`
      : "Unavailable";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
    >
      <article className="product-card__surface flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="product-card__image relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="product-card__meta flex items-center justify-between gap-3">
          <p className="product-card__category text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            {formatCategory(product.category)}
          </p>
          <p className="product-card__availability shrink-0 text-xs font-semibold text-slate-500">
            {availability}
          </p>
        </div>
        <div className="product-card__header mt-2 flex items-start justify-between gap-4">
          <h3 className="product-card__title text-xl font-bold text-slate-950">
            {product.name}
          </h3>
          <p className="product-card__price shrink-0 text-sm font-semibold text-slate-700">
            {formatDailyRate(product.daily_rate)}/day
          </p>
        </div>
        <p className="product-card__summary mt-3 flex-1 text-sm leading-6 text-slate-600">
          {getSummary(product.description)}
        </p>
      </article>
    </Link>
  );
}
