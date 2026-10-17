"use client";

import { Reveal } from "@/components/ui/reveal";
import { Wave } from "@/components/ui/wave";
import { cta, site, whatsappHref, whatsappNumber } from "@/lib/site";
import { Wordmark } from "./ui/logo";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#clients", label: "Clients" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-inverse text-on-inverse">
      {/* The brand ribbon rises out of the photo above and closes the page beside the tagline */}
      <div aria-hidden className="relative h-32 sm:h-40 md:h-56">
        <Wave name="cinta-inverse" />
      </div>
      <div className="shell pb-8">
        <div className="grid gap-12 border-t border-line-inverse pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-on-inverse-muted">{site.tagline}</p>
            <p className="mt-4 max-w-[24rem] text-[0.98rem] leading-relaxed text-on-inverse-muted">
              AI agents that run operational processes for mid-sized companies. Designed, built and operated from
              Madrid.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="label text-on-inverse-muted">Site</p>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.95rem] text-white/80 transition-colors hover:text-on-inverse">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="label text-on-inverse-muted">Contact</p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              <li>
                <a href={`mailto:${site.email}`} className="text-white/80 transition-colors hover:text-on-inverse">
                  {site.email}
                </a>
              </li>
              {whatsappNumber && (
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener"
                    className="text-white/80 transition-colors hover:text-on-inverse"
                  >
                    {cta.whatsapp}
                  </a>
                </li>
              )}
              <li className="text-on-inverse-muted">{site.location}</li>
            </ul>
          </div>
        </div>

        <Reveal variant="lines" className="mt-20 md:mt-28" amount={0.4}>
          <span className="line-mask">
            <span>
              <Wordmark className="h-auto w-full text-on-inverse" />
            </span>
          </span>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line-inverse pt-6 text-[0.8rem] text-on-inverse-muted">
          <p>© 2026 Asventia</p>
          <a href="#main" className="transition-colors hover:text-on-inverse">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
