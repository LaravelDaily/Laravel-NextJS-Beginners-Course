"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import {
  clearAuthToken,
  getCurrentUser,
  getStoredAuthToken,
} from "@/lib/auth";
import { createBooking } from "@/lib/bookings";
import type { AuthUser } from "@/lib/auth";

type BookingFormProps = {
  productSlug: string;
  productName: string;
};

const fieldClassName =
  "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-700";

function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  required = true,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        className={fieldClassName}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
    </label>
  );
}

function getLoginRedirect(productSlug: string) {
  return `/login?redirect=${encodeURIComponent(
    `/bookings/new?product=${productSlug}`,
  )}`;
}

function toIsoDate(value: FormDataEntryValue | null) {
  const date = new Date(String(value ?? ""));

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString();
}

export function BookingForm({ productSlug, productName }: BookingFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const token = getStoredAuthToken();

    if (!token) {
      router.replace(getLoginRedirect(productSlug));
      return;
    }

    getCurrentUser(token)
      .then((user) => {
        if (isMounted) {
          setUser(user);
        }
      })
      .catch(() => {
        clearAuthToken();
        router.replace(getLoginRedirect(productSlug));
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productSlug, router]);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const token = getStoredAuthToken();

    if (!token) {
      router.replace(getLoginRedirect(productSlug));
      return;
    }

    const formData = new FormData(event.currentTarget);

    try {
      await createBooking(token, {
        start_date: toIsoDate(formData.get("start_date")),
        end_date: toIsoDate(formData.get("end_date")),
        product_slugs: [productSlug],
        customer_name: String(formData.get("customer_name") ?? ""),
        customer_email: String(formData.get("customer_email") ?? ""),
        customer_phone: String(formData.get("customer_phone") ?? ""),
        delivery_address: String(formData.get("delivery_address") ?? ""),
      });

      router.push("/bookings");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to create booking.",
      );
      setIsSubmitting(false);
    }
  }

  if (isLoadingUser) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-600">
        Loading your account...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="border-b border-slate-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-800">
          Selected product
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          {productName}
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          {productSlug}
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          label="Start date"
          name="start_date"
          type="datetime-local"
          placeholder="Start date"
        />
        <TextField
          label="End date"
          name="end_date"
          type="datetime-local"
          placeholder="End date"
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          label="Customer name"
          name="customer_name"
          autoComplete="name"
          placeholder="Alex Morgan"
          defaultValue={user?.name}
        />
        <TextField
          label="Customer email"
          name="customer_email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={user?.email}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          label="Customer phone"
          name="customer_phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 555 0100"
          defaultValue={user?.phone ?? undefined}
        />
        <TextField
          label="Delivery address"
          name="delivery_address"
          autoComplete="street-address"
          placeholder="123 Main Street"
          defaultValue={user?.address ?? undefined}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "Submitting..." : "Submit booking"}
      </button>

      {error ? (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}
