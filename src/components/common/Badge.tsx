import React from "react";

export type BadgeVariant = "default" | "brand" | "subtle";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-dark text-white border-transparent",
  brand: "bg-brand-red text-white border-transparent",
  subtle: "bg-white text-neutral-dark border-border-subtle shadow-xs",
};

export function Badge({
  variant = "default",
  children = "Best Seller",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border leading-tight select-none ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;

