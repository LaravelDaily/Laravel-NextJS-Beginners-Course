import Link from "next/link";

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
          <Link href="/login" className="transition-colors hover:text-slate-950">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-teal-700 px-4 py-2 text-white transition-colors hover:bg-teal-800"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
