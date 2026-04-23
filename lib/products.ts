import type {
  Product,
  ProductApiResponse,
  ProductsApiResponse,
} from "@/types/products";

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

function getProductUrl(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return new URL(`/api/products/${encodeURIComponent(slug)}`, apiUrl);
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

async function fetchProduct(url: URL, errorMessage: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }

  const payload = (await response.json()) as Product | ProductApiResponse;

  return "data" in payload ? payload.data : payload;
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

export async function getProduct(slug: string) {
  return fetchProduct(
    getProductUrl(slug),
    `Failed to fetch product ${slug}`,
  );
}
