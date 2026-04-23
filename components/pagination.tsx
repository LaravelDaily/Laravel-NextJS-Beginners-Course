import Link from "next/link";
import type { ProductPaginationLink } from "@/types/products";

function getPageHref(page: number, category?: string) {
  const searchParams = new URLSearchParams();

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  if (category) {
    searchParams.set("category", category);
  }

  const queryString = searchParams.toString();

  return queryString ? `/products?${queryString}` : "/products";
}

function getPaginationLabel(label: string) {
  if (label.includes("&laquo;")) {
    return "Previous";
  }

  if (label.includes("&raquo;")) {
    return "Next";
  }

  return label;
}

export function Pagination({
  links,
  category,
}: {
  links: ProductPaginationLink[];
  category?: string;
}) {
  return (
    <nav
      aria-label="Products pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {links.map((link, index) => {
        const label = getPaginationLabel(link.label);

        if (link.page === null) {
          return (
            <span
              key={`${label}-${index}`}
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-400"
            >
              {label}
            </span>
          );
        }

        return (
          <Link
            key={`${label}-${link.page}`}
            href={getPageHref(link.page, category)}
            aria-current={link.active ? "page" : undefined}
            className={
              link.active
                ? "inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white"
                : "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:text-teal-800"
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
