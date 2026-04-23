import { Suspense } from "react";
import { CategoryFilters } from "@/components/category-filters";
import { Navbar } from "@/components/navbar";
import { Pagination } from "@/components/pagination";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products";

type SearchParams = Promise<{
  page?: string | string[];
  category?: string | string[];
}>;

function getParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getPageParam(value: string | string[] | undefined) {
  const page = Number.parseInt(getParamValue(value) ?? "1", 10);

  return Number.isFinite(page) && page > 0 ? page : 1;
}

function ProductsGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-96 rounded-2xl border border-slate-200 bg-white"
        />
      ))}
    </div>
  );
}

async function ProductsGrid({
  page,
  category,
}: {
  page: number;
  category?: string;
}) {
  const payload = await getProducts(page);
  const products = payload.data;
  const meta = payload.meta;

  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No products are available right now.
      </p>
    );
  }

  return (
    <>
      {meta ? (
        <p className="mb-5 text-sm font-medium text-slate-600">
          Showing {meta.from ?? 0}-{meta.to ?? 0} of {meta.total} products
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {meta && meta.links.length > 1 ? (
        <Pagination links={meta.links} category={category} />
      ) : null}
    </>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = getPageParam(params.page);
  const category = getParamValue(params.category);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
              Product catalog
            </p>
            <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                  Browse baby gear rentals
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Choose clean, travel-ready essentials for short stays,
                  family visits, and weekends away.
                </p>
              </div>
              <CategoryFilters selectedCategory={category} />
            </div>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <Suspense
              key={`${page}-${category ?? "all"}`}
              fallback={<ProductsGridSkeleton />}
            >
              <ProductsGrid page={page} category={category} />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
