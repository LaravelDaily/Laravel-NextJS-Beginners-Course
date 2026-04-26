import { apiFetch, apiRequest, getApiUrl, getErrorMessage } from "@/lib/api";
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
  const productsUrl = getApiUrl("/api/products");

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
  return getApiUrl(`/api/products/${encodeURIComponent(slug)}`);
}

async function fetchProducts(url: URL, errorMessage: string) {
  return apiFetch<ProductsApiResponse>(url, { cache: "no-store" }, errorMessage);
}

async function fetchProduct(url: URL, errorMessage: string) {
  const { response, payload } = await apiRequest(url, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, errorMessage));
  }

  const productPayload = payload as Product | ProductApiResponse;

  return "data" in productPayload ? productPayload.data : productPayload;
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
