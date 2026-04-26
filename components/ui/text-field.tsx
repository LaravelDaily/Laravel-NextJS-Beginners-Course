import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const fieldClassName =
  "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-teal-700";

export function TextField({
  label,
  className,
  required = true,
  ...inputProps
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        {...inputProps}
        required={required}
        className={`${fieldClassName}${className ? ` ${className}` : ""}`}
      />
    </label>
  );
}
