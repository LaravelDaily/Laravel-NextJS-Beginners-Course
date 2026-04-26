export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  is_admin: boolean;
};

type AuthResponse = {
  data: AuthUser;
  token: string;
};

type UserResponse = {
  data: AuthUser;
};

export const AUTH_TOKEN_KEY = "babygear_auth_token";

const DEVICE_NAME = "nextjs-frontend";

function getApiUrl(path: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return new URL(path, apiUrl);
}

function getErrorMessage(payload: unknown, fallback: string) {
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

async function parseJsonResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as unknown;
}

export function getStoredAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function storeAuthToken(token: string) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function login(payload: { email: string; password: string }) {
  const response = await fetch(getApiUrl("/api/login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      device_name: DEVICE_NAME,
    }),
  });

  const responsePayload = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responsePayload, "Unable to sign in."));
  }

  return responsePayload as AuthResponse;
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const response = await fetch(getApiUrl("/api/register"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      device_name: DEVICE_NAME,
    }),
  });

  const responsePayload = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responsePayload, "Unable to create your account."),
    );
  }

  return responsePayload as AuthResponse;
}

export async function getCurrentUser(token: string) {
  const response = await fetch(getApiUrl("/api/user"), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const responsePayload = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responsePayload, "Unable to load user."));
  }

  return (responsePayload as UserResponse).data;
}

export async function logout(token: string) {
  const response = await fetch(getApiUrl("/api/logout"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const responsePayload = await parseJsonResponse(response);
    throw new Error(getErrorMessage(responsePayload, "Unable to log out."));
  }
}
