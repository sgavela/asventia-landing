"use client";

import { Reveal } from "@/components/ui/reveal";
import { bookingHref, site } from "@/lib/site";
import { ArrowUpRight } from "./ui/icons";
import { Wordmark } from "./ui/logo";

const LINKS = [
  { href: "#agents", label: "Agents" },
  { href: "#the-math", label: "The math" },
  { href: "#rollout", label: "Rollout" },
  { href: "#team", label: "Team" },
];

export function SiteFooter() {
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-ink text-white">
      <div className="shell pt-20 pb-8 md:pt-28">
        <div className="grid gap-12 border-t border-white/10 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-white/55">{site.tagline}</p>
            <p className="mt-4 max-w-[24rem] text-[0.98rem] leading-relaxed text-white/65">
              AI agents that run operational processes for mid-sized companies. Designed, built and operated from
              Madrid.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="label text-white/55">Site</p>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.95rem] text-white/75 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="label text-white/55">Contact</p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              <li>
                <a href={`mailto:${site.email}`} className="text-white/75 transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="text-white/50">{site.location}</li>
              <li className="pt-2">
                <a href={bookingHref} className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-white">
                  Book a 30-minute call <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Reveal variant="lines" className="mt-20 md:mt-28" amount={0.4}>
          <span className="line-mask">
            <span>
              <Wordmark className="h-auto w-full text-white" />
            </span>
          </span>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[0.8rem] text-white/55">
          <p>© 2026 Asventia</p>
          <a href="#main" className="transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
