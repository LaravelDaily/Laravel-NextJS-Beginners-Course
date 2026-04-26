import { apiFetch } from "@/lib/api";

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
  return apiFetch<AuthResponse>(
    "/api/login",
    {
      method: "POST",
      json: {
        ...payload,
        device_name: DEVICE_NAME,
      },
    },
    "Unable to sign in.",
  );
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  return apiFetch<AuthResponse>(
    "/api/register",
    {
      method: "POST",
      json: {
        ...payload,
        device_name: DEVICE_NAME,
      },
    },
    "Unable to create your account.",
  );
}

export async function getCurrentUser(token: string) {
  const response = await apiFetch<UserResponse>(
    "/api/user",
    {
      token,
      cache: "no-store",
    },
    "Unable to load user.",
  );

  return response.data;
}

export async function logout(token: string) {
  await apiFetch<unknown>(
    "/api/logout",
    {
      method: "POST",
      token,
    },
    "Unable to log out.",
  );
}
