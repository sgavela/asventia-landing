"use client";

import { ArrowRight } from "@/components/ui/icons";
import { useSequence } from "@/lib/hooks";
import { Appear, Chip, PanelLabel, type SimProps } from "./sim-kit";

const TIMELINE = [500, 380, 380, 380, 380, 380, 700, 900, 1000, 2800];
export const TAILORED_DURATION = TIMELINE.reduce((a, b) => a + b, 0);

const S = { rows: 1, fit: 6, pick: 7, plan: 8, next: 9 } as const;

const PROCESSES = [
  { name: "Order intake · WhatsApp, email, phone", hours: 152, fit: "High" },
  { name: "Supplier invoices", hours: 96, fit: "High" },
  { name: "Delivery-note reconciliation", hours: 64, fit: "Medium" },
  { name: "Quotes for new customers", hours: 55, fit: "Medium" },
  { name: "Customer reactivation", hours: 40, fit: "High" },
];
const MAX = 152;

export function TailoredSim({ playing, instant, onDone }: SimProps) {
  const seq = useSequence(TIMELINE, playing && !instant, onDone);
  const step = instant ? TIMELINE.length : seq;
  const at = (n: number) => step >= n;

  return (
    <div className="flex h-full flex-col px-5 py-5 sm:px-7 sm:py-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <PanelLabel>Process audit · Distribuciones Norte</PanelLabel>
          <p className="mt-1 text-[0.95rem] font-medium">Where the team&rsquo;s hours go each month</p>
        </div>
        <p className="tabular text-[0.68rem] text-white/55">Measured with the team · 2 weeks</p>
      </div>

      <div className="mt-5 border-t border-white/10">
        <div className="label grid grid-cols-[minmax(0,1fr)_3.5rem_4.5rem] gap-3 py-2.5 text-white/55 sm:grid-cols-[minmax(0,1.3fr)_3.5rem_minmax(0,1fr)_4.5rem]">
          <span>Process</span>
          <span className="text-right">h / mo</span>
          <span className="hidden sm:block" />
          <span className="text-right">AI fit</span>
        </div>
        {PROCESSES.map((p, i) => {
          const picked = i === 0 && at(S.pick);
          return (
            <Appear key={p.name} show={at(S.rows + i)} y={6}>
              <div
                className={`grid grid-cols-[minmax(0,1fr)_3.5rem_4.5rem] items-center gap-3 border-t border-white/8 px-2 py-2.5 transition-colors duration-500 sm:grid-cols-[minmax(0,1.3fr)_3.5rem_minmax(0,1fr)_4.5rem] ${
                  picked ? "-mx-2 bg-white/10 px-4" : "-mx-2"
                }`}
              >
                <span className={`truncate text-[0.84rem] ${picked ? "text-white" : "text-white/80"}`}>{p.name}</span>
                <span className="tabular text-right text-[0.8rem] text-white/85">{p.hours}</span>
                <span className="hidden h-1.5 overflow-hidden bg-white/8 sm:block">
                  <span
                    className={`block h-full origin-left transition-transform duration-1000 ease-out-expo ${
                      picked ? "bg-white" : "bg-white/35"
                    }`}
                    style={{ transform: `scaleX(${at(S.rows + i) ? p.hours / MAX : 0})`}}
                  />
                </span>
                <span className="text-right">
                  <Appear show={at(S.fit)} y={3}>
                    <span
                      className={`label ${p.fit === "High" ? "text-white" : "text-white/55"}`}
                    >
                      {p.fit}
                    </span>
                  </Appear>
                </span>
              </div>
            </Appear>
          );
        })}
      </div>

      <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-[1.2fr_1fr]">
        <Appear show={at(S.plan)} className="bg-white/6 p-4">
          <PanelLabel>Recommended first agent</PanelLabel>
          <p className="mt-1.5 flex items-center gap-2 text-[1rem] font-medium">
            Order intake <ArrowRight className="size-4 text-white" /> pilot in 4 weeks
          </p>
          <p className="mt-1 text-[0.8rem] leading-snug text-white/55">
            Target: ≥95% of orders read correctly, about 1,800 hours a year back to the sales team.
          </p>
        </Appear>
        <Appear show={at(S.next)} className="p-4 ring-1 ring-white/10 ring-inset">
          <PanelLabel>Then</PanelLabel>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip>Month 3 · supplier invoices</Chip>
            <Chip>Month 5 · reactivation</Chip>
          </div>
        </Appear>
      </div>
    </div>
  );
}
