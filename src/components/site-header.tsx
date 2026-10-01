"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { bookingHref, site } from "@/lib/site";
import { ArrowRight } from "./ui/icons";
import { Wordmark } from "./ui/logo";

const LINKS = [
  { href: "#agents", label: "Agents" },
  { href: "#the-math", label: "The math" },
  { href: "#rollout", label: "Rollout" },
  { href: "#team", label: "Team" },
];

type Theme = "dark" | "light";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const [sectionTheme, setSectionTheme] = useState<Theme>("dark");
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const menuButton = useRef<HTMLButtonElement>(null);

  // Follow whichever section sits under the bar.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSectionTheme((entry.target as HTMLElement).dataset.nav as Theme);
        }
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    document.querySelectorAll("[data-nav]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const theme: Theme = open ? "dark" : sectionTheme;
  const dark = theme === "dark";

  return (
    <>
      <header
        className="intro-fade fixed inset-x-0 top-0 z-50"
        style={{ "--d": "0.55s" } as CSSProperties}
      >
        <div
          aria-hidden
          className={`absolute inset-0 border-b backdrop-blur-md transition-[opacity,background-color,border-color] duration-500 ${
            dark ? "border-white/8 bg-ink/70" : "border-ink/8 bg-paper/85"
          } ${scrolled && !open ? "opacity-100" : "opacity-0"}`}
        />
        <div className="shell relative flex h-18 items-center justify-between gap-6">
          <a
            href="#main"
            aria-label="Asventia, back to top"
            className={`transition-colors duration-500 ${dark ? "text-white" : "text-ink"}`}
          >
            <Wordmark className="h-[1.3rem] w-auto" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-[0.9rem] transition-colors duration-300 ${
                      dark ? "text-white/72 hover:text-white" : "text-ink/65 hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={bookingHref}
              className={`hidden items-center gap-2 px-4.5 py-2.5 text-[0.88rem] font-medium transition-colors duration-500 sm:inline-flex ${
                dark ? "bg-white text-ink hover:bg-paper" : "bg-ink text-white hover:bg-ink-3"
              }`}
            >
              Book a call <ArrowRight className="size-3.5" />
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid size-11 place-items-center ring-1 ring-inset transition-colors duration-500 lg:hidden ${
                dark ? "text-white ring-white/25" : "text-ink ring-ink/20"
              }`}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-4.5">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo ${
                    open ? "top-1.5 rotate-45" : "top-0.5"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo ${
                    open ? "top-1.5 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ink text-white transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        inert={!open}
      >
        <div className="shell flex h-full flex-col justify-between pt-28 pb-10">
          <ul className="space-y-1">
            {LINKS.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-1.5 font-display text-[2.4rem] leading-tight font-medium tracking-tight transition-transform duration-700 ease-out-expo"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: open ? `${0.12 + i * 0.05}s` : "0s",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-5">
            <a
              href={bookingHref}
              className="inline-flex items-center gap-2 bg-white px-6 py-3.5 font-medium text-ink"
            >
              Book a 30-minute call <ArrowRight className="size-4" />
            </a>
            <p className="tabular text-sm text-white/55">
              {site.email} · {site.location}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
