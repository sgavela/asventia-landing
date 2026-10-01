"use client";

import { Mark } from "@/components/ui/logo";
import { Check, Chat } from "@/components/ui/icons";
import { useSequence } from "@/lib/hooks";
import { Appear, CheckLine, Chip, PanelLabel, TypingDots, type SimProps } from "./sim-kit";

// ms to hold each step before moving to the next
const TIMELINE = [500, 1100, 900, 800, 600, 450, 450, 450, 500, 260, 260, 260, 260, 320, 700, 1000, 1000, 800, 2800];
export const SALES_DURATION = TIMELINE.reduce((a, b) => a + b, 0);

const S = {
  typing1: 1,
  msg1: 2,
  typing2: 3,
  msg2: 4,
  checks: 5, // 5..8
  lines: 9, // 9..13
  total: 14,
  typing3: 15,
  reply: 16,
  approved: 17,
  erp: 18,
} as const;

const CHECKS = [
  "“The usual” matched to the last 6 orders",
  "Customer price list · Tariff T3",
  "Promotion running · craft beer 3+1",
  "Delivery slot · Thursday, route 12",
];

const LINES = [
  { item: "Olive oil 1L · case of 12", qty: "4", price: "38.40", total: "153.60" },
  { item: "Craft beer 33cl", qty: "3+1", price: "21.90", total: "65.70", promo: true },
  { item: "Sparkling water 1.5L · 6-pack", qty: "10", price: "4.35", total: "43.50" },
  { item: "Paper napkins · box of 3,000", qty: "2", price: "18.90", total: "37.80" },
  { item: "Coffee beans · 1 kg", qty: "6", price: "16.80", total: "100.80" },
];

export function SalesSim({ playing, instant, onDone }: SimProps) {
  const seq = useSequence(TIMELINE, playing && !instant, onDone);
  const step = instant ? TIMELINE.length : seq;
  const at = (n: number) => step >= n;

  return (
    <div className="grid h-full grid-rows-[13.5rem_1fr] sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:grid-rows-1">
      {/* ---------------- conversation ---------------- */}
      <div className="flex min-h-0 flex-col border-b border-white/10 sm:border-r sm:border-b-0">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
          <span className="grid size-8 place-items-center bg-white/10 font-display text-[0.72rem] font-semibold">
            CP
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.88rem] font-medium">Bar Casa Paco</p>
            <p className="flex items-center gap-1.5 tabular text-[0.68rem] text-white/55">
              <Chat className="size-3" /> WhatsApp · +34 6•• ••• 412
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-5 py-4">
          <Appear show={at(S.msg1)} className="max-w-[88%] self-start">
            <Bubble side="in" time="08:14">
              Morning! The usual for Thursday please, but make it 4 cases of the 1L olive oil
              instead of 2.
            </Bubble>
          </Appear>
          <Appear show={at(S.msg2)} className="max-w-[88%] self-start">
            <Bubble side="in" time="08:14">
              Is the 3+1 on craft beer still running? If so add 3 cases.
            </Bubble>
          </Appear>
          <Appear show={step === S.typing1 || step === S.typing2} className="self-start">
            <span className="inline-flex bg-white/8 px-3.5 py-3 text-white/60">
              <TypingDots />
            </span>
          </Appear>
          <Appear show={step === S.typing3} className="self-end">
            <span className="inline-flex bg-white/80 px-3.5 py-3 text-ink/80">
              <TypingDots />
            </span>
          </Appear>
          <Appear show={at(S.reply)} className="max-w-[88%] self-end">
            <Bubble side="out" time="08:15">
              All set: 4 cases of olive oil and the craft beer 3+1 are in. Thursday before 11:00.
              Total €1,284.50 + VAT.
            </Bubble>
          </Appear>
        </div>
      </div>

      {/* ---------------- order draft ---------------- */}
      <div className="flex min-h-0 flex-col px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <PanelLabel>Order draft</PanelLabel>
            <p className="mt-1 text-[0.95rem] font-medium">Bar Casa Paco · C-0412</p>
          </div>
          <Appear show={at(S.checks + 1)} y={4}>
            <Chip tone="outline">Tariff T3</Chip>
          </Appear>
        </div>

        <div className="mt-4 hidden grid-cols-2 gap-x-4 gap-y-2 sm:grid">
          {CHECKS.map((c, i) => (
            <Appear key={c} show={at(S.msg2)} y={4} delay={i * 0.05}>
              <CheckLine done={at(S.checks + i)}>{c}</CheckLine>
            </Appear>
          ))}
        </div>

        <div className="mt-4 border-t border-white/10 pt-2">
          {!at(S.lines) && (
            <p className="py-6 text-center tabular text-[0.72rem] text-white/55">
              {at(S.msg2) ? "Reading the conversation…" : "Waiting for messages"}
            </p>
          )}
          {LINES.map((l, i) => (
            <Appear key={l.item} show={at(S.lines + i)} y={6}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-3 border-b border-white/6 py-[0.45rem] text-[0.82rem]">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-white/85">{l.item}</span>
                  {l.promo && <Chip tone="outline">Promo</Chip>}
                </span>
                <span className="tabular text-[0.74rem] text-white/55">
                  {l.qty} × {l.price}
                </span>
                <span className="tabular w-16 text-right text-[0.78rem] text-white/85">{l.total}</span>
              </div>
            </Appear>
          ))}
          <Appear show={at(S.total)} y={6}>
            <div className="grid grid-cols-[1fr_auto] py-[0.45rem] text-[0.8rem] text-white/55">
              <span>+ 7 more lines from the usual order</span>
              <span className="tabular w-16 text-right text-[0.78rem]">883.10</span>
            </div>
          </Appear>
        </div>

        <div className="mt-auto pt-4">
          <Appear show={at(S.total)} y={6}>
            <div className="flex items-baseline justify-between border-t border-white/15 pt-3">
              <span className="text-[0.82rem] text-white/60">Total excl. VAT</span>
              <span className="tabular font-display text-[1.35rem] font-semibold">€1,284.50</span>
            </div>
          </Appear>
          <div className="mt-3 flex min-h-8 flex-wrap items-center gap-2">
            <Appear show={at(S.reply) && !at(S.approved)} y={4}>
              <Chip>Awaiting approval</Chip>
            </Appear>
            <Appear show={at(S.approved)} y={4}>
              <span className="inline-flex items-center gap-2 text-[0.8rem] text-white/80">
                <span className="grid size-5 place-items-center bg-white/12 font-display text-[0.6rem] font-semibold">
                  M
                </span>
                Approved by Marta
              </span>
            </Appear>
            <Appear show={at(S.erp)} y={4} className="ml-auto">
              <Chip tone="strong">
                <Check className="size-3" strokeWidth={2.5} /> In ERP · #48213
              </Chip>
            </Appear>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, time, children }: { side: "in" | "out"; time: string; children: React.ReactNode }) {
  const out = side === "out";
  return (
    <div
      className={`px-3.5 py-2.5 text-[0.84rem] leading-snug ${
        out ? "bg-white text-ink" : "bg-white/8 text-white/90"
      }`}
    >
      {out && (
        <span className="mb-1 flex items-center gap-1.5 tabular text-[0.62rem] tracking-wide text-white/65 uppercase">
          <Mark className="h-2 w-auto" /> Asventia agent
        </span>
      )}
      {children}
      <span className={`mt-1 block text-right tabular text-[0.6rem] ${out ? "text-white/60" : "text-white/55"}`}>
        {time}
      </span>
    </div>
  );
}
