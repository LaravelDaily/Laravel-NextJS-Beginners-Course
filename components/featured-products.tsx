import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/products";

function FeaturedProductsHeader() {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
          Featured rentals
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Popular baby gear
        </h2>
      </div>
      <p className="max-w-md text-sm leading-6 text-slate-600">
        Essentials families book most often for weekends, holidays, and
        visiting relatives.
      </p>
    </div>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <FeaturedProductsHeader />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-80 rounded-2xl border border-slate-200 bg-slate-50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <FeaturedProductsHeader />
        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            No featured rentals are available right now.
          </p>
        )}
      </div>
    </section>
  );
}
