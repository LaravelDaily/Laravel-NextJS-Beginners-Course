import { apiFetch } from "@/lib/api";
import type {
  BookingsApiResponse,
  CreateBookingPayload,
} from "@/types/bookings";

export async function createBooking(
  token: string,
  payload: CreateBookingPayload,
) {
  return apiFetch<unknown>(
    "/api/bookings",
    {
      method: "POST",
      token,
      json: payload,
    },
    "Unable to create booking.",
  );
}

export async function getBookings(token: string) {
  return apiFetch<BookingsApiResponse>(
    "/api/bookings",
    {
      token,
      cache: "no-store",
    },
    "Unable to load bookings.",
  );
}
