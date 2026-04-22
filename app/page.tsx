import { Navbar } from "@/components/navbar";
import Link from "next/link";

type Product = {
  name: string;
  category: string;
  price: string;
  description: string;
};

const featuredProducts: Product[] = [
  {
    name: "Travel Stroller",
    category: "Strollers",
    price: "$12/day",
    description: "Lightweight, foldable, and ready for city walks.",
  },
  {
    name: "Infant Car Seat",
    category: "Car Seats",
    price: "$10/day",
    description: "Clean, safety-checked seating for airport pickups.",
  },
  {
    name: "Portable Crib",
    category: "Sleep",
    price: "$14/day",
    description: "A compact sleep setup for hotels and family visits.",
  },
  {
    name: "Baby Carrier",
    category: "On the Go",
    price: "$8/day",
    description: "Comfortable hands-free support for long travel days.",
  },
];

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

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex aspect-[4/3] items-end rounded-xl bg-slate-100 p-4">
        <div className="h-16 w-full rounded-lg bg-gradient-to-r from-teal-700 via-rose-300 to-amber-300" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
        {product.category}
      </p>
      <div className="mt-2 flex items-start justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-950">{product.name}</h3>
        <p className="shrink-0 text-sm font-semibold text-slate-700">
          {product.price}
        </p>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {product.description}
      </p>
    </article>
  );
}

function FeaturedProducts() {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
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
        <FeaturedProducts />
      </main>
    </div>
  );
}
