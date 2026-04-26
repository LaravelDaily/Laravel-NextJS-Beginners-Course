import type {
  BookingsApiResponse,
  CreateBookingPayload,
} from "@/types/bookings";

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

export async function createBooking(
  token: string,
  payload: CreateBookingPayload,
) {
  const response = await fetch(getApiUrl("/api/bookings"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const responsePayload = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responsePayload, "Unable to create booking."),
    );
  }

  return responsePayload;
}

export async function getBookings(token: string) {
  const response = await fetch(getApiUrl("/api/bookings"), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const responsePayload = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responsePayload, "Unable to load bookings."),
    );
  }

  return responsePayload as BookingsApiResponse;
}
