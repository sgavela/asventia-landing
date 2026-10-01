"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "light" | "dark";

const styles: Record<Variant, string> = {
  light: "border-white bg-white text-ink before:bg-ink hover:text-white focus-visible:text-white",
  dark: "border-ink bg-ink text-white before:bg-white hover:text-ink focus-visible:text-ink",
};

/**
 * Square button. On hover the inverse colour wipes in from the left (the
 * border keeps the edge visible) and the arrow slides through; shared by
 * links and the email form's submit.
 */
export function buttonClass(variant: Variant = "light", className = "") {
  return `group relative isolate inline-flex h-12 items-center justify-center gap-3 overflow-hidden border px-6 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-x-100 focus-visible:before:scale-x-100 disabled:cursor-wait ${styles[variant]} ${className}`;
}

export function ButtonArrow({ icon }: { icon?: ReactNode }) {
  return (
    <span className="relative grid size-4 place-items-center overflow-hidden" aria-hidden>
      <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-5">
        {icon ?? <ArrowRight className="size-4" />}
      </span>
      <span className="absolute -translate-x-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
        {icon ?? <ArrowRight className="size-4" />}
      </span>
    </span>
  );
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

export function ButtonLink({ variant = "light", icon, className = "", children, ...rest }: Props) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      <ButtonArrow icon={icon} />
    </a>
  );
}

/** Text link with an underline that draws in from the left. */
export function TextLink({
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`relative inline-flex items-center gap-2 font-medium after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100 ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
