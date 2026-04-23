import type { ProductsApiResponse } from "@/types/products";

function getProductsUrl({
  page,
  perPage,
  category,
}: {
  page?: number;
  perPage?: number;
  category?: string;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const productsUrl = new URL("/api/products", apiUrl);

  if (page && page > 1) {
    productsUrl.searchParams.set("page", String(page));
  }

  if (perPage) {
    productsUrl.searchParams.set("per_page", String(perPage));
  }

  if (category) {
    productsUrl.searchParams.set("category", category);
  }

  return productsUrl;
}

async function fetchProducts(url: URL, errorMessage: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }

  return (await response.json()) as ProductsApiResponse;
}

export async function getProducts(page: number, category?: string) {
  return fetchProducts(
    getProductsUrl({ page, category }),
    "Failed to fetch products",
  );
}

export async function getFeaturedProducts() {
  const payload = await fetchProducts(
    getProductsUrl({ perPage: 4 }),
    "Failed to fetch featured products",
  );

  return payload.data;
}
