import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BABYGEAR | Baby Gear Rentals",
  description: "Rent clean, trusted baby gear for family trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white">{children}</body>
    </html>
  );
}
