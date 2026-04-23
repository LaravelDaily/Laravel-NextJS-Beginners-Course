import Link from "next/link";

const categories = [
  { label: "Strollers", slug: "strollers" },
  { label: "Car Seats", slug: "car_seats" },
  { label: "Cribs", slug: "cribs" },
  { label: "High Chairs", slug: "high_chairs" },
];

function getCategoryHref(slug: string) {
  return `/products?category=${slug}`;
}

export function CategoryFilters({
  selectedCategory,
}: {
  selectedCategory?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.slug;

        return (
          <Link
            key={category.slug}
            href={getCategoryHref(category.slug)}
            className={
              isSelected
                ? "inline-flex h-10 items-center rounded-full bg-teal-700 px-4 text-sm font-semibold text-white"
                : "inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:text-teal-800"
            }
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}
