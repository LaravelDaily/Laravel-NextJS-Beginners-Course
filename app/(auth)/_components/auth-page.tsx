"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SyntheticEvent } from "react";
import { login, register, storeAuthToken } from "@/lib/auth";

type AuthPageProps = {
  mode: "login" | "register";
};

const fieldClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-700";

function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        className={`${fieldClassName} mt-2`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getRedirectPath() {
    if (typeof window === "undefined") {
      return "/";
    }

    const redirect = new URLSearchParams(window.location.search).get(
      "redirect",
    );

    return redirect?.startsWith("/") ? redirect : "/";
  }


  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const payload = await login({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      storeAuthToken(payload.token);
      router.push(getRedirectPath());
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
      />
      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 font-medium text-slate-600">
          <input
            name="remember"
            type="checkbox"
            className="size-4 rounded border-slate-300 accent-teal-700"
          />
          Remember me
        </label>
        <a href="#" className="font-semibold text-teal-800 hover:text-teal-900">
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const payload = await register({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        password_confirmation: String(
          formData.get("password_confirmation") ?? "",
        ),
      });

      storeAuthToken(payload.token);
      router.push("/");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <TextField
        label="Full name"
        name="name"
        autoComplete="name"
        placeholder="Alex Morgan"
      />
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create password"
        />
        <TextField
          label="Confirm password"
          name="password_confirmation"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat password"
        />
      </div>
      <label className="flex items-start gap-3 text-sm font-medium leading-6 text-slate-600">
        <input
          name="terms"
          type="checkbox"
          className="mt-1 size-4 rounded border-slate-300 accent-teal-700"
        />
        I agree to receive booking updates and account notifications from
        BABYGEAR.
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login";

  return (
    <section className="px-6 py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-800">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
            {isLogin
              ? "Sign in to manage your baby gear rentals."
              : "Set up your BABYGEAR rental account."}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            {isLogin
              ? "Access saved details, upcoming reservations, and faster checkout when API authentication is connected."
              : "Save delivery details now so future stroller, crib, and car seat reservations are faster."}
          </p>
          <div className="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-3">
            <span className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              Clean gear
            </span>
            <span className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              Flexible dates
            </span>
            <span className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              Easy pickup
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                {isLogin ? "Login" : "Register"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {isLogin
                  ? "Use your account email and password."
                  : "Enter your details to prepare an account."}
              </p>
            </div>
            <Link
              href={isLogin ? "/register" : "/login"}
              className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-700 hover:text-teal-800"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </section>
  );
}
