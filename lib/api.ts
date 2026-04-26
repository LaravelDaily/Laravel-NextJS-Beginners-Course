type ApiFetchOptions = RequestInit & {
  token?: string;
  json?: unknown;
};

export function getApiUrl(path: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return new URL(path, apiUrl);
}

export function getErrorMessage(payload: unknown, fallback: string) {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    return payload.message;
  }

  return fallback;
}

export async function parseJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as unknown;
}

export async function apiRequest(
  path: string | URL,
  options: ApiFetchOptions = {},
) {
  const { headers, json, token, ...fetchOptions } = options;
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (json !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(
    typeof path === "string" ? getApiUrl(path) : path,
    {
      ...fetchOptions,
      headers: requestHeaders,
      body: json === undefined ? fetchOptions.body : JSON.stringify(json),
    },
  );

  const payload = await parseJsonResponse(response);

  return { response, payload };
}

export async function apiFetch<T>(
  path: string | URL,
  options: ApiFetchOptions = {},
  fallbackErrorMessage = "API request failed.",
) {
  const { response, payload } = await apiRequest(path, options);

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, fallbackErrorMessage));
  }

  return payload as T;
}
