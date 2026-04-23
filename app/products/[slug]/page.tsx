import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getProduct } from "@/lib/products";

type ProductPageParams = Promise<{
  slug: string;
}>;

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

function getDescriptionParagraphs(description: string) {
  return description.split("\n").filter(Boolean);
}

export default async function ProductPage({
  params,
}: {
  params: ProductPageParams;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const availability =
    product.is_active && product.units_count > 0
      ? `${product.units_count} available`
      : "Unavailable";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <Link
              href="/products"
              className="text-sm font-semibold text-teal-800 transition-colors hover:text-slate-950"
            >
              Back to products
            </Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
                  {formatCategory(product.category)}
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                  Clean, travel-ready rental gear for family trips, visits, and
                  short stays.
                </p>
              </div>
              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Rental rate
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-950">
                  {formatDailyRate(product.daily_rate)}
                  <span className="text-base font-semibold text-slate-600">
                    /day
                  </span>
                </p>
                <div className="mt-6 grid gap-4 text-sm">
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="font-medium text-slate-600">
                      Availability
                    </span>
                    <span className="font-semibold text-slate-950">
                      {availability}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="font-medium text-slate-600">Category</span>
                    <span className="font-semibold text-slate-950">
                      {formatCategory(product.category)}
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            </div>
            <div className="lg:pt-2">
              <h2 className="text-2xl font-bold text-slate-950">
                Product details
              </h2>
              <div className="mt-5 space-y-5 text-base leading-7 text-slate-700">
                {getDescriptionParagraphs(product.description).map(
                  (paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
