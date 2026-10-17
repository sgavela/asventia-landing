"use client";

import { useInView } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import laNave from "@/assets/clients/la-nave.png";
import orconsa from "@/assets/clients/orconsa.png";
import { Pause, Play } from "@/components/ui/icons";
import { Lines, Reveal } from "@/components/ui/reveal";
import { Wave } from "@/components/ui/wave";
import { usePrefersReducedMotion } from "@/lib/hooks";

// How long each client's story stays up before the next one.
const INTERVAL_MS = 7000;

type Story = {
  client: string;
  logo: StaticImageData;
  figure: string;
  measure: string;
  quote: string;
  name: string;
  role: string;
};

// DRAFT: figures and quotes invented for now. These are real companies: replace them with
// each client's measured results and approved words before launch.
const STORIES: Story[] = [
  {
    client: "Orconsa",
    logo: orconsa,
    figure: "94%",
    measure: "of WhatsApp and email orders written into the ERP without anyone retyping them, first eight weeks",
    quote:
      "Our sales team used to spend the morning copying WhatsApp messages into the ERP. Now the orders are waiting for approval when we arrive, with each customer's prices and promotions already applied.",
    name: "Natalia Orconsa",
    role: "Chief Operations Officer, Orconsa",
  },
  {
    client: "Fabricados La Nave",
    logo: laNave,
    figure: "11 h",
    measure: "of admin work back every week, from supplier invoices and order entry, first three months",
    quote:
      "We're a small team, and the paperwork landed on whoever had a free hour. Supplier invoices now arrive checked against the delivery notes, and we only look at the ones the agent flags.",
    name: "Alberto Gil",
    role: "CEO, Fabricados La Nave",
  },
];

export function SocialProof() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const inView = useInView(carouselRef, { amount: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false); // the visitor pressed pause
  const [held, setHeld] = useState(false); // pointer or keyboard focus inside

  const rotating = !reduced && !stopped;
  const running = rotating && inView && !held;
  const go = (i: number) => setActive((i + STORIES.length) % STORIES.length);

  // Arrow keys move between the client tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + STORIES.length) % STORIES.length;
    go(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="clients" data-nav="light" aria-labelledby="clients-title" className="bg-paper pt-16 pb-28 md:pt-24 md:pb-40">
      <div className="shell">
        <p className="eyebrow">Clients</p>
        <Lines
          id="clients-title"
          lines={["What our clients", <strong key="b">say about us.</strong>]}
          className="mt-6 text-h2 text-ink"
        />

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <div
            ref={carouselRef}
            role="region"
            aria-roledescription="carousel"
            aria-labelledby="clients-title"
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
            }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const start = touchX.current;
              touchX.current = null;
              if (start === null) return;
              const dx = e.changedTouches[0].clientX - start;
              if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
            }}
            className="relative overflow-hidden bg-inverse text-on-inverse"
          >
            {/* Contour echoes of the brand "a": a band under the copy on phones, the right-hand side from md up */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-44 md:inset-y-0 md:left-auto md:h-auto md:w-5/12">
              <Wave name="eco-inverse" position="70% 50%" />
            </div>

            <div className="relative p-7 pb-56 sm:p-10 sm:pb-56 md:p-14 lg:p-16">
              <div className="md:w-7/12">
                {/* All stories share one grid cell, so the panel keeps the height of the longest */}
                <div className="grid" aria-live={running ? "off" : "polite"}>
                  {STORIES.map((story, i) => {
                    const current = i === active;
                    return (
                      <figure
                        key={story.client}
                        id={`story-${i}`}
                        role="tabpanel"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} of ${STORIES.length}: ${story.client}`}
                        inert={!current}
                        className={`[grid-area:1/1] transition-[opacity,translate] duration-500 ease-out ${
                          current ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                        }`}
                      >
                        <p className="font-display text-metric font-semibold">{story.figure}</p>
                        <p className="mt-4 max-w-[28rem] text-[0.95rem] leading-relaxed text-on-inverse-muted">
                          {story.measure}
                        </p>
                        <blockquote className="mt-10 border-t border-line-inverse pt-8 font-display text-[clamp(1.3rem,1.1rem+0.8vw,1.75rem)] leading-snug tracking-[-0.01em]">
                          &ldquo;{story.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 text-[0.95rem] text-on-inverse-muted">
                          <span className="font-semibold text-on-inverse">{story.name}</span> · {story.role}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>

                {/* Client logos are the tabs; the active one's bar fills while its story is up */}
                <div className="mt-12 flex items-center gap-3">
                  {!reduced && (
                    <button
                      type="button"
                      onClick={() => setStopped((s) => !s)}
                      aria-label={stopped ? "Play the client stories" : "Pause the client stories"}
                      className="grid size-10 shrink-0 place-items-center text-on-inverse-muted ring-1 ring-white/25 transition-colors ring-inset hover:text-on-inverse hover:ring-white/50"
                    >
                      {stopped ? <Play className="size-4" /> : <Pause className="size-4" />}
                    </button>
                  )}
                  <div role="tablist" aria-label="Clients" onKeyDown={onTabKey} className="grid flex-1 grid-cols-2 gap-3 sm:flex sm:flex-none">
                    {STORIES.map((story, i) => {
                      const current = i === active;
                      return (
                        <button
                          key={story.client}
                          ref={(el) => {
                            tabRefs.current[i] = el;
                          }}
                          type="button"
                          role="tab"
                          aria-selected={current}
                          aria-controls={`story-${i}`}
                          tabIndex={current ? 0 : -1}
                          onClick={() => go(i)}
                          className="group relative min-w-0 pb-2.5"
                        >
                          <span className="grid h-16 w-full place-items-center bg-paper-raised px-3 sm:w-44 sm:px-4">
                            <Image
                              src={story.logo}
                              alt={story.client}
                              sizes="160px"
                              className={`h-11 w-auto max-w-full object-contain grayscale transition-opacity duration-300 ${
                                current ? "opacity-100" : "opacity-45 group-hover:opacity-80"
                              }`}
                            />
                          </span>
                          <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
                            <span
                              key={`${i}-${active}`}
                              className="block h-full origin-left bg-on-inverse"
                              style={
                                current && rotating
                                  ? {
                                      animation: `progress ${INTERVAL_MS}ms linear both`,
                                      animationPlayState: running ? "running" : "paused",
                                    }
                                  : { transform: current ? "scaleX(1)" : "scaleX(0)" }
                              }
                              onAnimationEnd={current && rotating ? () => go(active + 1) : undefined}
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
