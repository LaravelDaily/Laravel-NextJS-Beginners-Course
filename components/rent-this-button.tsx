"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { getStoredAuthToken } from "@/lib/auth";

export function RentThisButton({ slug }: { slug: string }) {
  const router = useRouter();
  const bookingPath = `/bookings/new?product=${slug}`;
  const loginPath = `/login?redirect=${encodeURIComponent(bookingPath)}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    router.push(getStoredAuthToken() ? bookingPath : loginPath);
  }

  return (
    <Link
      href={loginPath}
      onClick={handleClick}
      className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
    >
      Rent This
    </Link>
  );
}
