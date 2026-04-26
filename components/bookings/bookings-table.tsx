"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearAuthToken,
  getCurrentUser,
  getStoredAuthToken,
} from "@/lib/auth";
import { getBookings } from "@/lib/bookings";
import type { Booking, BookingItem } from "@/types/bookings";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function isBookingItem(value: unknown): value is BookingItem {
  return Boolean(value && typeof value === "object");
}

function formatItems(items: Booking["items"]) {
  if (!items) {
    return "No items";
  }

  if (typeof items === "string") {
    return items;
  }

  if (!Array.isArray(items)) {
    return "No items";
  }

  return items
    .map((item) => {
      if (!isBookingItem(item)) {
        return null;
      }

      const name = item.product_name ?? "Rental item";
      const subtotal =
        typeof item.subtotal === "number" ? ` (${formatPrice(item.subtotal)})` : "";

      return `${name}${subtotal}`;
    })
    .filter(Boolean)
    .join(", ");
}

export function BookingsTable() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const token = getStoredAuthToken();

    if (!token) {
      router.replace("/login?redirect=/bookings");
      return;
    }

    getCurrentUser(token)
      .then(() => getBookings(token))
      .then((payload) => {
        if (isMounted) {
          setBookings(payload.data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(
            error instanceof Error ? error.message : "Unable to load bookings.",
          );
        }

        if (
          error instanceof Error &&
          error.message.toLowerCase().includes("unauthorized")
        ) {
          clearAuthToken();
          router.replace("/login?redirect=/bookings");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-600">
        Loading bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-medium text-slate-600">
          You do not have any bookings yet.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Reference</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Dates</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Delivery</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bookings.map((booking) => (
              <tr key={booking.reference}>
                <td className="px-5 py-4 font-semibold text-slate-950">
                  {booking.reference}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                    {booking.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-700">
                  {formatDate(booking.start_date)} -{" "}
                  {formatDate(booking.end_date)}
                </td>
                <td className="px-5 py-4 text-slate-700">
                  {formatItems(booking.items)}
                </td>
                <td className="px-5 py-4 font-semibold text-slate-950">
                  {formatPrice(booking.total_price)}
                </td>
                <td className="px-5 py-4 text-slate-700">
                  {booking.delivery_address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
