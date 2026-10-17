"use client";

import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import floor from "@/assets/operations-floor.jpg";
import { EmailCapture } from "@/components/ui/email-capture";
import { Chat } from "@/components/ui/icons";
import { Lines, Reveal } from "@/components/ui/reveal";
import { navyGrade } from "@/lib/grade";
import { whatsappHref, whatsappNumber } from "@/lib/site";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      id="contact"
      data-nav="dark"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-inverse text-on-inverse"
    >
      <m.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={floor}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          placeholder="blur"
          className="object-cover object-[72%_50%]"
        />
      </m.div>
      {/* Navy grade, shared with the hero; it also dissolves the photo into the footer */}
      <div aria-hidden className="absolute inset-0" style={{ background: navyGrade }} />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

      <div className="shell relative py-32 md:py-44">
        <p className="eyebrow text-on-inverse-muted">Next step</p>
        <Lines
          id="contact-title"
          lines={["Let’s find the first process", <strong key="b">your company hands over to AI.</strong>]}
          className="mt-6 text-h2 text-on-inverse"
        />
        <Reveal as="p" delay={0.1} className="mt-8 max-w-[36rem] text-lead text-white/80">
          Fifteen minutes. Bring the process that eats your team&rsquo;s week and we&rsquo;ll show you the agent
          working on a case like it.
        </Reveal>

        <Reveal delay={0.16} className="mt-10">
          <EmailCapture source="final-cta" tone="dark" />

          {/* Test: WhatsApp for customers who'd rather not leave an email. Live once
              NEXT_PUBLIC_WHATSAPP_NUMBER is set; in development it shows anyway so the placement can be reviewed. */}
          {(whatsappNumber || process.env.NODE_ENV === "development") && (
            <p className="mt-4 text-[0.9rem] text-on-inverse-muted">
              Or{" "}
              <a
                href={whatsappHref || undefined}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 font-medium text-on-inverse underline decoration-on-inverse/40 underline-offset-4 hover:decoration-on-inverse"
              >
                <Chat className="size-4" /> message us on WhatsApp
              </a>
              {!whatsappNumber && <span className="ml-2 text-[0.75rem]">(dev only: set NEXT_PUBLIC_WHATSAPP_NUMBER)</span>}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
