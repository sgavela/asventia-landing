"use client";

import { m, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { EmailCapture } from "@/components/ui/email-capture";
import { navy, navyGrade } from "@/lib/grade";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { site } from "@/lib/site";
import { SceneMedia } from "./scene";

// PLACEHOLDER: invented figures, replace with real ones before launch. They are kept
// consistent with each other: 12,400 orders × 6 min ≈ 1,240 h; ≈ €315 an order ≈ €3.9M.
const KPIS = [
  { value: "12,400", label: "orders handled a month" },
  { value: "€3.9M", label: "in orders handled a month" },
  { value: "1,240 h", label: "of manual work saved a month" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.08 });
  const running = inView && !reduced;

  /* ---------- scroll: the hero pulls in from the sides as you leave it ---------- */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const inset = useTransform(scrollYProgress, [0, 1], [0, 3.2]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}%)`;
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);

  /* ---------- pointer: a few pixels of depth, mouse only ---------- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 50, damping: 18, mass: 0.7 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * -20);
    py.set(((e.clientY - r.top) / r.height - 0.5) * -12);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      data-nav="dark"
      aria-label="Introduction"
      className="relative h-svh min-h-[44rem] bg-paper"
    >
      <m.div
        style={{ clipPath }}
        className="absolute inset-0 overflow-hidden bg-inverse text-on-inverse will-change-[clip-path]"
      >
        {/* ---------------- footage ---------------- */}
        <m.div style={{ y: mediaY }} className="absolute inset-0">
          <m.div style={{ x: sx, y: sy }} className="absolute inset-0">
            <div className="intro-settle absolute inset-0 origin-[60%_45%]">
              <SceneMedia playing={running} />
            </div>
          </m.div>
        </m.div>

        {/* Navy grade, the same as the closing photo's; the top band keeps the header legible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${navy(60)}, ${navy(0)} 22%), ${navyGrade}` }}
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

        <div aria-hidden className="intro-curtain pointer-events-none absolute inset-0 bg-inverse" />

        {/* ---------------- copy ---------------- */}
        <m.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 flex h-full flex-col">
          {/* Copy and figures sit in the middle of the space below the header */}
          <div className="flex flex-1 items-center pt-18">
            <div className="shell py-8">
              <h1 className="max-w-[14em] text-hero text-on-inverse">
                <span className="line-mask">
                  <span className="intro-rise inline-block" style={{ "--d": "0.08s" } as CSSProperties}>
                    AI systems that run
                  </span>
                </span>
                <span className="line-mask">
                  <span className="intro-rise inline-block" style={{ "--d": "0.18s" } as CSSProperties}>
                    <strong>real business operations.</strong>
                  </span>
                </span>
              </h1>

              <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-2 lg:items-start lg:gap-16">
                <p
                  className="intro-fade-up max-w-[32rem] text-lead text-white/85"
                  style={{ "--d": "0.42s" } as CSSProperties}
                >
                  {site.description}
                </p>
                <EmailCapture
                  source="hero"
                  tone="dark"
                  className="intro-fade-up w-full lg:w-[32rem] lg:justify-self-end"
                  style={{ "--d": "0.52s" } as CSSProperties}
                />
              </div>

              {/* Figures, part of the same centred block */}
              <dl
                className="intro-fade mt-12 grid max-w-[54rem] grid-cols-3 gap-5 sm:gap-10 md:mt-16"
                style={{ "--d": "0.7s" } as CSSProperties}
              >
                {KPIS.map((kpi) => (
                  <div key={kpi.label} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1.5 text-[0.78rem] leading-snug text-white/65 sm:text-[0.9rem]">{kpi.label}</dt>
                    <dd className="font-display text-[clamp(1.45rem,0.9rem+2.4vw,2.75rem)] leading-none font-semibold tracking-[-0.02em] text-on-inverse">
                      {kpi.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
