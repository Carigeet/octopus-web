import React from "react";
import Link from "next/link";

export interface OctopusLogoProps {
  variant?: "full" | "mark" | "stacked";
  color?: "red" | "white" | "black";
  className?: string;
  asLink?: boolean;
}

interface MarkSvgProps {
  markColor: string;
  sizeClass?: string;
}

// Stylized octopus ribbon icon matching the ZURU Octopus design system
function MarkSvg({ markColor, sizeClass = "w-7 h-7" }: MarkSvgProps) {
  return (
    <svg
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} shrink-0`}
      aria-hidden="true"
    >
      <path
        d="M6.5 22C4.5 17 6.5 7 12 7C16.5 7 17.5 15.5 18 17.5C18.5 15.5 19.5 7 24 7C29.5 7 31.5 17 29.5 22C27.5 26 23.5 25.5 22.5 21C21.5 16.5 24.5 13 28.5 13.5M7.5 13.5C11.5 13 14.5 16.5 13.5 21C12.5 25.5 8.5 26 6.5 22Z"
        stroke={markColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OctopusLogo({
  variant = "full",
  color = "red",
  className = "",
  asLink = true,
}: OctopusLogoProps) {
  const markColor =
    color === "white"
      ? "#FFFFFF"
      : color === "black"
      ? "#111827"
      : "#E51A24";

  const textColor =
    color === "white"
      ? "text-white"
      : color === "black"
      ? "text-neutral-dark"
      : "text-brand-red";

  const sizeClass =
    variant === "stacked"
      ? "w-10 h-10"
      : variant === "mark"
      ? "w-8 h-8"
      : "w-7 h-7";

  const content = (
    <div
      className={`inline-flex items-center gap-2 select-none ${
        variant === "stacked" ? "flex-col items-start gap-1" : ""
      } ${className}`}
    >
      <MarkSvg markColor={markColor} sizeClass={sizeClass} />
      {variant !== "mark" && (
        <span
          className={`font-bold tracking-tight text-xl leading-none ${textColor}`}
        >
          Octopus
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red rounded-lg"
        aria-label="Octopus Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default OctopusLogo;
