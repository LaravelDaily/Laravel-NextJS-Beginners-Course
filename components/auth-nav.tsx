"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AUTH_TOKEN_KEY,
  clearAuthToken,
  getCurrentUser,
  getStoredAuthToken,
  logout,
} from "@/lib/auth";
import type { AuthUser } from "@/lib/auth";

export function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(() => {
    return (
      typeof window !== "undefined" &&
      Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
    );
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = getStoredAuthToken();

    if (!token) {
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

        if (isMounted) {
          setUser(null);
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
  }, []);

  async function handleLogout() {
    const token = getStoredAuthToken();
    setIsLoggingOut(true);

    try {
      if (token) {
        await logout(token);
      }
    } finally {
      clearAuthToken();
      setUser(null);
      setIsLoggingOut(false);
      router.push("/");
      router.refresh();
    }
  }

  if (isLoading) {
    return <div className="h-9 w-28" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="max-w-36 truncate font-semibold text-slate-950">
          {user.name}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-full bg-teal-700 px-4 py-2 text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    );
  }

  return (
    <>
      <Link href="/login" className="transition-colors hover:text-slate-950">
        Login
      </Link>
      <Link
        href="/register"
        className="rounded-full bg-teal-700 px-4 py-2 text-white transition-colors hover:bg-teal-800"
      >
        Register
      </Link>
    </>
  );
}
