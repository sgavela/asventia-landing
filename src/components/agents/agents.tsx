"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Replay } from "@/components/ui/icons";
import { Mark } from "@/components/ui/logo";
import { Lines, Reveal } from "@/components/ui/reveal";
import { AGENTS, type AgentId } from "@/lib/agents";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { INVOICE_DURATION, InvoiceSim } from "./sim-invoice";
import { RECEPTION_DURATION, ReceptionSim } from "./sim-reception";
import { SALES_DURATION, SalesSim } from "./sim-sales";
import { TAILORED_DURATION, TailoredSim } from "./sim-tailored";

const SIMS = {
  sales: { Sim: SalesSim, duration: SALES_DURATION },
  invoices: { Sim: InvoiceSim, duration: INVOICE_DURATION },
  reception: { Sim: ReceptionSim, duration: RECEPTION_DURATION },
  tailored: { Sim: TailoredSim, duration: TAILORED_DURATION },
} as const;

export type AgentRequest = { id: AgentId; nonce: number } | null;

export function Agents({ request }: { request: AgentRequest }) {
  const [active, setActive] = useState<AgentId>("sales");
  const [run, setRun] = useState(0);
  const [auto, setAuto] = useState(true);
  const [finished, setFinished] = useState(false);
  const [handledNonce, setHandledNonce] = useState<number | null>(null);
  // The panel moves between the list (mobile) and its own column (desktop), so
  // watch the stable grid around it, counting it "in view" across the middle band.
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "-28% 0px -28% 0px" });
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");

  const show = (id: AgentId, byUser: boolean) => {
    setActive(id);
    setRun((r) => r + 1);
    setFinished(false);
    if (byUser) setAuto(false);
  };

  // A click on the hero's agent index lands here already pointing at that agent.
  if (request && request.nonce !== handledNonce) {
    setHandledNonce(request.nonce);
    show(request.id, true);
  }

  // Walk through the agents on our own until someone picks one.
  useEffect(() => {
    if (!finished || !auto || !inView) return;
    const t = window.setTimeout(() => {
      const i = AGENTS.findIndex((a) => a.id === active);
      const next = AGENTS[(i + 1) % AGENTS.length].id;
      setActive(next);
      setRun((r) => r + 1);
      setFinished(false);
    }, 1800);
    return () => window.clearTimeout(t);
  }, [finished, auto, inView, active]);

  const playing = inView && !reduced;
  const { Sim, duration } = SIMS[active];
  const agent = AGENTS.find((a) => a.id === active)!;

  const panel = (
    <div
      role="figure"
      aria-label={`Example run: ${agent.name}`}
      className="overflow-hidden bg-ink text-white shadow-[0_40px_80px_-50px_rgba(21,22,26,0.6)]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center bg-accent">
            <Mark className="h-2.5 w-auto text-ink" />
          </span>
          <span className="label text-white/70">{agent.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="label hidden text-white/55 sm:inline">Example run</span>
          <button
            type="button"
            onClick={() => {
              setRun((r) => r + 1);
              setFinished(false);
            }}
            aria-label="Replay this example"
            className="grid size-8 place-items-center text-white/70 ring-1 ring-white/15 transition-colors ring-inset hover:text-white hover:ring-white/40"
          >
            <Replay className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="relative h-[41rem] sm:h-[35rem]">
        <Sim key={`${active}-${run}-${reduced}`} playing={playing} instant={reduced} onDone={() => setFinished(true)} />
      </div>
    </div>
  );

  return (
    <section id="agents" data-nav="light" aria-labelledby="agents-title" className="bg-paper pt-16 pb-28 md:pt-24 md:pb-40">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Lines
              as="h2"
              id="agents-title"
              lines={["Ready-made agents,", "fitted to the way you work."]}
              className="text-h2 text-ink"
            />
          </div>
          <Reveal as="p" delay={0.1} className="text-lead text-body lg:col-span-4 lg:col-start-9">
            Each agent owns one operational process from start to finish. We connect it to your channels and your
            ERP, load your rules and prices, and run it alongside your team.
          </Reveal>
        </div>

        <div ref={stageRef} className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <ul className="border-b border-line lg:col-span-5">
            {AGENTS.map((a) => {
              const selected = a.id === active;
              return (
                <li key={a.id} className="relative border-t border-line">
                  {selected && (
                    <span
                      key={run}
                      aria-hidden
                      className="absolute inset-x-0 -top-px h-px origin-left bg-accent-deep"
                      style={{
                        animation: `marquee-progress ${duration}ms linear both`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                    />
                  )}
                  <button
                    type="button"
                    aria-expanded={selected}
                    aria-controls={`agent-body-${a.id}`}
                    onClick={() => show(a.id, true)}
                    className="group grid w-full grid-cols-[3rem_1fr] py-6 text-left"
                  >
                    <span
                      className={`pt-1.5 tabular text-[0.78rem] transition-colors duration-300 ${
                        selected ? "text-accent-deep" : "text-muted"
                      }`}
                    >
                      {a.index}
                    </span>
                    <span>
                      <span
                        className={`block font-display text-[clamp(1.2rem,1rem+0.55vw,1.5rem)] font-medium tracking-[-0.015em] transition-colors duration-300 ${
                          selected ? "text-ink" : "text-ink/65 group-hover:text-ink"
                        }`}
                      >
                        {a.name}
                      </span>
                      <span className="mt-1 block text-[0.95rem] text-muted">{a.short}</span>
                    </span>
                  </button>
                  <div
                    id={`agent-body-${a.id}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out-quint ${
                      selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden" inert={!selected}>
                      <div className="pb-7 lg:pl-12">
                        <p className="max-w-[34rem] text-[0.97rem] leading-relaxed text-body">{a.body}</p>
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Works with">
                          {a.touches.map((t) => (
                            <li key={t} className="label bg-stone px-2 py-1 text-muted">
                              {t}
                            </li>
                          ))}
                        </ul>
                        {!wide && selected && <div className="mt-7">{panel}</div>}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {wide && (
            <div className="lg:col-span-7">
              {panel}
              <p className="mt-4 text-[0.82rem] text-muted">
                Example runs use invented customers. The flow, the checks and the approval step are the ones the
                agents follow in production.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
