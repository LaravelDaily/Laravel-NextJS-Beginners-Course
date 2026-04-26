export type Booking = {
  reference: string;
  status: string;
  start_date: string;
  end_date: string;
  total_price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  notes: string | null;
  created_at: string;
  items: BookingItem[] | string | null;
};

export type BookingItem = {
  product_unit_id?: number;
  product_name?: string;
  daily_rate?: number;
  subtotal?: number;
};

export type BookingPaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type BookingsApiResponse = {
  data: Booking[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: BookingPaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};

export type CreateBookingPayload = {
  start_date: string;
  end_date: string;
  product_slugs: string[];
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  notes?: string;
};
