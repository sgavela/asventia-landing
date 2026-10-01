"use client";

import {
  m,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { TextLink } from "@/components/ui/button";
import { EmailCapture } from "@/components/ui/email-capture";
import { ArrowDown } from "@/components/ui/icons";
import { AGENTS, type AgentId } from "@/lib/agents";
import { usePrefersReducedMotion, useScramble } from "@/lib/hooks";
import { SceneMedia } from "./scene";

// How long each agent stays lit in the index at the bottom of the hero.
const CYCLE_MS = 4600;

export function Hero({ onSelectAgent }: { onSelectAgent: (id: AgentId) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.08 });
  const running = inView && !reduced;
  const [active, setActive] = useState(0);

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

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % AGENTS.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      data-nav="dark"
      aria-label="Introduction"
      className="relative h-svh min-h-[40rem] bg-paper"
    >
      <m.div
        style={{ clipPath }}
        className="absolute inset-0 overflow-hidden bg-ink text-white will-change-[clip-path]"
      >
        {/* ---------------- footage ---------------- */}
        <m.div style={{ y: mediaY }} className="absolute inset-0">
          <m.div style={{ x: sx, y: sy }} className="absolute inset-0">
            <div className="intro-settle absolute inset-0 origin-[60%_45%]">
              <SceneMedia playing={running} />
            </div>
          </m.div>
        </m.div>

        {/* Grade: keeps type legible without flattening the footage */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top, rgba(12,13,16,0.95) 0%, rgba(12,13,16,0.78) 30%, rgba(12,13,16,0.25) 60%, rgba(12,13,16,0) 76%)",
              "linear-gradient(to right, rgba(12,13,16,0.66) 0%, rgba(12,13,16,0.22) 45%, rgba(12,13,16,0) 65%)",
              "linear-gradient(to bottom, rgba(12,13,16,0.55) 0%, rgba(12,13,16,0) 20%)",
            ].join(","),
          }}
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" />

        {/* Column rules that line up with the agent index, plus a scanner pass */}
        <div aria-hidden className="intro-fade pointer-events-none absolute inset-0 hidden lg:block" style={{ "--d": "0.9s" } as CSSProperties}>
          <div className="shell grid h-full grid-cols-4">
            {AGENTS.map((a) => (
              <span key={a.id} className="border-l border-white/[0.07] last:border-r" />
            ))}
          </div>
        </div>
        {running && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-signal/70 to-transparent [animation:sweep_7s_var(--ease-in-out-quart)_2s_infinite_both]"
          />
        )}
        <div aria-hidden className="intro-curtain pointer-events-none absolute inset-0 bg-ink" />

        {/* ---------------- copy ---------------- */}
        <m.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex h-full flex-col justify-end"
        >
          <div className="shell pb-10 md:pb-14">
            <h1 className="max-w-[14em] font-display text-hero font-semibold text-white">
              <span className="line-mask">
                <span className="intro-rise inline-block" style={{ "--d": "0.08s" } as CSSProperties}>
                  AI systems that run
                </span>
              </span>
              <span className="line-mask">
                <span className="intro-rise inline-block" style={{ "--d": "0.18s" } as CSSProperties}>
                  real business operations<span className="text-signal">.</span>
                </span>
              </span>
            </h1>

            <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-2 lg:items-end lg:gap-16">
              <p
                className="intro-fade-up max-w-[34rem] text-lead text-white/78"
                style={{ "--d": "0.42s" } as CSSProperties}
              >
                Asventia designs and runs AI agents for mid-sized companies. They take orders on WhatsApp,
                process supplier invoices and answer the phone, inside your ERP, with your team keeping the
                final say.
              </p>
              <div className="intro-fade-up lg:justify-self-end" style={{ "--d": "0.52s" } as CSSProperties}>
                <EmailCapture source="hero" className="w-full lg:w-[32rem]" />
                <TextLink href="#agents" className="text-[0.92rem] text-white/80 hover:text-white">
                  Or see the agents at work <ArrowDown className="size-4" />
                </TextLink>
              </div>
            </div>
          </div>

          {/* Agent index: one lights up at a time, the rule above it counting down */}
          <div className="intro-fade relative hidden border-t border-white/12 lg:block" style={{ "--d": "0.7s" } as CSSProperties}>
            <ul className="shell grid grid-cols-4">
              {AGENTS.map((agent, i) => (
                <IndexItem
                  key={agent.id}
                  index={agent.index}
                  name={agent.name}
                  short={agent.short}
                  active={i === active}
                  running={running}
                  onSelect={() => onSelectAgent(agent.id)}
                />
              ))}
            </ul>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}

function IndexItem({
  index,
  name,
  short,
  active,
  running,
  onSelect,
}: {
  index: string;
  name: string;
  short: string;
  active: boolean;
  running: boolean;
  onSelect: () => void;
}) {
  const text = useScramble(short, active && running);
  return (
    <li className="relative">
      {active && (
        <span
          aria-hidden
          className="absolute inset-x-0 -top-px h-px origin-left bg-signal"
          style={{
            animation: `marquee-progress ${CYCLE_MS}ms linear both`,
            animationPlayState: running ? "running" : "paused",
          }}
        />
      )}
      <a href="#agents" onClick={onSelect} className="group block py-5 pr-6 xl:pr-10 [@media(max-height:820px)]:py-4">
        <span
          className={`mono-label transition-colors duration-500 ${active ? "text-signal" : "text-white/50"}`}
        >
          {index}
        </span>
        <span className="mt-1.5 block font-display text-[0.98rem] font-medium text-white">
          {name}
        </span>
        <span
          className={`mt-1 block text-[0.83rem] leading-snug transition-colors duration-500 group-hover:text-white/85 [@media(max-height:820px)]:hidden ${
            active ? "text-white/80" : "text-white/50"
          }`}
        >
          {text}
        </span>
      </a>
    </li>
  );
}
