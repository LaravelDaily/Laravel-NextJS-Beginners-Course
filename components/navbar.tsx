import Link from "next/link";
import { AuthNav } from "@/components/auth-nav";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-[0.14em] text-slate-950"
        >
          BABYGEAR
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link
            href="/products"
            className="transition-colors hover:text-slate-950"
          >
            Products
          </Link>
          <AuthNav />
        </div>
      </nav>
    </header>
  );
}
