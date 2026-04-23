export type Product = {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  daily_rate: number;
  category: string;
  is_active: boolean;
  units_count: number;
};

export type ProductPaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

export type ProductsApiResponse = {
  data: Product[];
  meta?: {
    current_page: number;
    from: number | null;
    links: ProductPaginationLink[];
    to: number | null;
    total: number;
  };
};
