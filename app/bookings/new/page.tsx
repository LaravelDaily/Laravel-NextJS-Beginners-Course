import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { BookingForm } from "@/components/bookings/booking-form";
import { getProduct } from "@/lib/products";

type NewBookingSearchParams = Promise<{
  product?: string | string[];
}>;

export const metadata: Metadata = {
  title: "New booking | BABYGEAR",
};

function getParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewBookingPage({
  searchParams,
}: {
  searchParams: NewBookingSearchParams;
}) {
  const params = await searchParams;
  const productSlug = getParamValue(params.product);
  const product = productSlug ? await getProduct(productSlug) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
              New booking
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Reserve your rental dates.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Confirm the delivery details and submit your booking request.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-3xl">
            {product && productSlug ? (
              <BookingForm
                productSlug={productSlug}
                productName={product.name}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-medium text-slate-600">
                  Select a product before creating a booking.
                </p>
                <Link
                  href="/products"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  Browse products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
