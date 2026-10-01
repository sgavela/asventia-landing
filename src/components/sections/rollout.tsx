"use client";

import { m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "@/components/ui/icons";
import { Lines, Reveal } from "@/components/ui/reveal";

const PHASES = [
  {
    when: "Weeks 1–4",
    title: "A subset, with approval",
    body: "Asventia answers and structures orders for a group of customers. A person approves every order before it reaches the ERP.",
    note: "Where we start",
  },
  {
    when: "Weeks 5–8",
    title: "The same subset, on its own",
    body: "In that group, standard orders go straight to the ERP under rules we agree together.",
  },
  {
    when: "Weeks 8–12",
    title: "Progressive rollout",
    body: "More customers and more cases come in. Exceptions stay under human control.",
  },
  {
    when: "From week 12",
    title: "Full operation",
    body: "Everything runs. People step in only for exceptions and special cases.",
    note: "The goal",
  },
];

const BUILT = [
  "ERP integration layer",
  "Catalogue logic",
  "Customer-specific price lists",
  "Live promotions",
  "WhatsApp, phone and email engine",
  "Human approval flow",
  "Conversation history and intervention",
];

const NEEDED = [
  "A dedicated phone number",
  "Your WhatsApp Business account",
  "Access to an operational mailbox",
  "A first group of customers",
  "Catalogue, price lists and promotions",
];

export function Rollout() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.85", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(PHASES.length, Math.floor(v * PHASES.length + 0.35));
    setReached((r) => (r === next ? r : next));
  });

  return (
    <section id="rollout" data-nav="light" aria-labelledby="rollout-title" className="bg-stone py-28 md:py-40">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Lines
              id="rollout-title"
              lines={["Start small.", "Validate accuracy.", "Scale with control.", "Run everything."]}
              className="text-h2 text-ink"
            />
          </div>
          <Reveal as="p" delay={0.1} className="self-end text-lead text-body lg:col-span-4">
            Most of the platform already exists, so a pilot can start within weeks. We begin with a small group of
            customers under full human approval and widen the scope as the numbers hold.
          </Reveal>
        </div>

        {/* ---------------- timeline ---------------- */}
        <div ref={trackRef} className="relative mt-16 md:mt-24">
          <div aria-hidden className="absolute top-[0.44rem] left-0 hidden h-px w-full bg-line-strong md:block" />
          <m.div
            aria-hidden
            style={{ scaleX: fill }}
            className="absolute top-[0.44rem] left-0 hidden h-px w-full origin-left bg-ink md:block"
          />
          <div aria-hidden className="absolute top-0 bottom-0 left-[0.44rem] w-px bg-line-strong md:hidden" />
          <m.div
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute top-0 bottom-0 left-[0.44rem] w-px origin-top bg-ink md:hidden"
          />

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {PHASES.map((p, i) => {
              const on = reached > i;
              return (
                <li key={p.title} className="relative pl-9 md:pl-0">
                  <span
                    aria-hidden
                    className={`absolute top-0 left-0 grid size-[0.9rem] place-items-center transition-colors duration-500 ${
                      on ? "bg-ink" : "bg-stone ring-1 ring-line-strong ring-inset"
                    }`}
                  >
                    <span className={`size-1.5 ${on ? "bg-white" : "bg-transparent"}`} />
                  </span>
                  <div className="md:pt-10">
                    <p className={`label transition-colors duration-500 ${on ? "text-ink" : "text-muted"}`}>
                      Phase {i + 1} · {p.when}
                    </p>
                    <h3 className="mt-3 font-display text-[1.25rem] leading-snug font-semibold tracking-[-0.012em] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 max-w-[22rem] text-[0.95rem] leading-relaxed text-body">{p.body}</p>
                    {p.note && <p className="label mt-4 text-ink">{p.note}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ---------------- what exists, what we need ---------------- */}
        <div className="mt-20 md:mt-28">
          <Reveal className="grid gap-10 bg-card p-7 ring-1 ring-line ring-inset sm:grid-cols-2 md:p-10 lg:gap-16">
            <div>
              <p className="font-display text-[0.95rem] font-semibold text-ink">Already built</p>
              <ul className="mt-4 space-y-2.5">
                {BUILT.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-body">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center bg-ink text-white">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-[0.95rem] font-semibold text-ink">What we need from you</p>
              <ul className="mt-4 space-y-2.5">
                {NEEDED.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-body">
                    <span className="mt-0.5 size-4 shrink-0 ring-1 ring-line-strong ring-inset" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
