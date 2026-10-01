"use client";

import { m, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import floor from "@/assets/operations-floor.jpg";
import { TextLink } from "@/components/ui/button";
import { EmailCapture } from "@/components/ui/email-capture";
import { Lines, Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const FIRST_PROCESS = ["Customer orders", "Supplier invoices", "Phone calls", "Something else"];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const [choice, setChoice] = useState(FIRST_PROCESS[0]);

  return (
    <section
      ref={ref}
      id="contact"
      data-nav="dark"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-ink text-white"
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
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(14,15,18,0.94) 0%, rgba(14,15,18,0.82) 42%, rgba(14,15,18,0.45) 75%, rgba(14,15,18,0.3) 100%), linear-gradient(to top, rgba(14,15,18,0.7), rgba(14,15,18,0) 40%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

      <div className="shell relative py-32 md:py-44">
        <Lines
          id="contact-title"
          lines={["Let’s find the first", "process your company", "hands over to AI."]}
          className="text-h2 text-white"
        />
        <Reveal as="p" delay={0.1} className="mt-8 max-w-[36rem] text-lead text-white/75">
          A 30-minute call. Bring one process that eats your team&rsquo;s week and we&rsquo;ll tell you honestly
          whether an agent can run it, how we would measure it, and what it takes to start.
        </Reveal>

        <Reveal delay={0.16} className="mt-10">
          <fieldset>
            <legend className="label text-white/50">What would you hand over first?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {FIRST_PROCESS.map((p) => (
                <label
                  key={p}
                  className={`cursor-pointer px-4 py-2 text-[0.9rem] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white ${
                    choice === p ? "bg-white text-ink" : "text-white/80 ring-1 ring-white/25 ring-inset hover:ring-white/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="first-process"
                    value={p}
                    checked={choice === p}
                    onChange={() => setChoice(p)}
                    className="sr-only"
                  />
                  {p}
                </label>
              ))}
            </div>
          </fieldset>

          <EmailCapture
            source="contact"
            note={`First process to hand over: ${choice.toLowerCase()}`}
            cta="Book a 30-minute call"
            className="mt-9"
          />
          <p className="mt-2 text-[0.9rem] text-white/55">
            Prefer to write?{" "}
            <TextLink href={`mailto:${site.email}`} className="tabular text-white/80 hover:text-white">
              {site.email}
            </TextLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
