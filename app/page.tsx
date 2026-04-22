import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import {
  FeaturedProducts,
  FeaturedProductsSkeleton,
} from "@/components/featured-products";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-[#f7f3ec]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
            Baby rentals made simple
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Rent clean, trusted baby gear for every family trip.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Browse strollers, cribs, car seats, and travel essentials without
            packing your whole nursery.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Browse products
          </Link>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-teal-100 via-white to-rose-100 p-6">
            <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/80 bg-white/70 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Trip kit
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-950">
                  Stroller + crib + car seat
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-teal-700/85" />
                <div className="h-20 rounded-2xl bg-rose-300" />
                <div className="h-20 rounded-2xl bg-amber-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </main>
    </div>
  );
}
