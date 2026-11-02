import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline" | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

export type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-hover active:bg-brand-red-dark focus-visible:ring-black shadow-sm",
  secondary:
    "bg-neutral-surface text-neutral-dark hover:bg-neutral-200/80 active:bg-neutral-300/80 focus-visible:ring-neutral-dark border border-border-subtle",
  outline:
    "bg-transparent text-neutral-dark border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-dark",
  white:
    "bg-white text-[#000000] hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-white shadow-sm font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs font-semibold tracking-wide",
  md: "px-6 py-2.5 text-sm font-semibold tracking-wide",
  lg: "px-8 py-3.5 text-base font-semibold tracking-wide",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
    ...props
  },
  ref
) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full transition-colors duration-200 ease-out font-medium select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`.trim();

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClasses}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      type={type}
      ref={ref as React.Ref<HTMLButtonElement>}
      className={combinedClasses}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

export default Button;

