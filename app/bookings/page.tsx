import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { BookingsTable } from "@/components/bookings/bookings-table";

export const metadata: Metadata = {
  title: "My bookings | BABYGEAR",
};

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
              My bookings
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Track your rental requests.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Review booking status, dates, delivery address, and totals.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <BookingsTable />
          </div>
        </section>
      </main>
    </div>
  );
}
