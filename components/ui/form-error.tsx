import type { ReactNode } from "react";

export function FormError({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}
