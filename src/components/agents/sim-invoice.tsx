"use client";

import type { ReactNode } from "react";
import { Check } from "@/components/ui/icons";
import { useSequence } from "@/lib/hooks";
import { Appear, CheckLine, Chip, PanelLabel, type SimProps } from "./sim-kit";

const TIMELINE = [700, 1500, 550, 500, 550, 500, 450, 450, 450, 800, 2800];
export const INVOICE_DURATION = TIMELINE.reduce((a, b) => a + b, 0);

const S = { scan: 1, supplier: 2, meta: 3, lines: 4, totals: 5, checks: 6, journal: 9, posted: 10 } as const;

const FIELDS = [
  { k: "Supplier", v: "Transportes Gil S.L.", at: S.supplier },
  { k: "Invoice", v: "FV-2026-0913 · 12 Sep 2026", at: S.meta },
  { k: "Lines", v: "7 · six shipments + fuel", at: S.lines },
  { k: "Base", v: "€2,826.45", at: S.totals },
  { k: "VAT 21%", v: "€593.55", at: S.totals },
  { k: "Total", v: "€3,420.00", at: S.totals },
];

const CHECKS = ["Supplier matched · P-0087", "6 of 6 delivery notes matched", "Not a duplicate · VAT rate correct"];

// Delivery note (albarán) and day of each shipment on the invoice
const SHIPMENTS = [
  ["7781", "02"],
  ["7794", "04"],
  ["7802", "05"],
  ["7815", "08"],
  ["7829", "10"],
  ["7836", "11"],
];

const JOURNAL = [
  { acct: "624", name: "Transport", dr: "2,826.45", cr: "" },
  { acct: "472", name: "Input VAT", dr: "593.55", cr: "" },
  { acct: "410", name: "Creditors · Transportes Gil", dr: "", cr: "3,420.00" },
];

export function InvoiceSim({ playing, instant, onDone }: SimProps) {
  const seq = useSequence(TIMELINE, playing && !instant, onDone);
  const step = instant ? TIMELINE.length : seq;
  const at = (n: number) => step >= n;
  const focus = (n: number) => step === n;

  return (
    <div className="grid h-full grid-rows-[13rem_1fr] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:grid-rows-1">
      {/* ---------------- the document as it arrived ---------------- */}
      <div className="relative flex min-h-0 items-start justify-center overflow-hidden border-b border-white/10 bg-ink-2 px-5 pt-5 sm:items-center sm:border-r sm:border-b-0 sm:py-6">
        <p className="mono-label absolute top-3 left-5 hidden text-white/55 sm:block">Inbox · facturas@</p>
        <div className="relative w-full max-w-[22rem] origin-top scale-[0.92] bg-[#fbfaf6] p-4 font-sans text-[0.6rem] leading-[1.5] text-[#2b2d33] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] sm:scale-100 sm:p-5 sm:text-[0.66rem]">
          <div className="flex justify-between gap-3">
            <Zone active={focus(S.supplier)} seen={at(S.supplier)}>
              <p className="text-[0.7rem] font-bold tracking-wide text-[#15161a]">TRANSPORTES GIL S.L.</p>
              <p>CIF B-46•••873</p>
              <p>C/ del Puerto 14, 46024 Valencia</p>
            </Zone>
            <Zone active={focus(S.meta)} seen={at(S.meta)} className="text-right">
              <p className="text-[0.7rem] font-bold tracking-[0.12em] text-[#15161a]">FACTURA</p>
              <p>Nº FV-2026-0913</p>
              <p>Fecha 12/09/2026</p>
            </Zone>
          </div>
          <p className="mt-3 border-t border-[#e4e0d8] pt-2">
            Cliente: <span className="font-semibold">Distribuciones Norte S.L.</span>
          </p>
          <Zone active={focus(S.lines)} seen={at(S.lines)} className="mt-2">
            <div className="flex justify-between border-b border-[#e4e0d8] pb-1 font-semibold">
              <span>Concepto</span>
              <span>Importe</span>
            </div>
            <div className="pt-1">
              {SHIPMENTS.map(([note, day]) => (
                <div key={note} className="flex justify-between">
                  <span>
                    Porte Valencia–Madrid · alb. {note} · {day}/09
                  </span>
                  <span className="tabular">400,00</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Recargo combustible</span>
                <span className="tabular">426,45</span>
              </div>
            </div>
          </Zone>
          <Zone active={focus(S.totals)} seen={at(S.totals)} className="mt-2 ml-auto w-[62%]">
            <div className="flex justify-between">
              <span>Base imponible</span>
              <span className="tabular">2.826,45</span>
            </div>
            <div className="flex justify-between">
              <span>IVA 21%</span>
              <span className="tabular">593,55</span>
            </div>
            <div className="mt-0.5 flex justify-between border-t border-[#e4e0d8] pt-0.5 text-[0.66rem] font-bold text-[#15161a]">
              <span>TOTAL</span>
              <span className="tabular">3.420,00 €</span>
            </div>
          </Zone>
          <p className="mt-3 text-[0.55rem] text-[#6a6f78]">Vencimiento 30 días · IBAN ES12 •••• 4417</p>

          {/* scan beam */}
          {step === S.scan && (
            <div className="pointer-events-none absolute inset-0 [animation:scan_1.5s_var(--ease-in-out-quart)_both]">
              <div className="h-px w-full bg-signal shadow-[0_0_18px_4px_rgba(255,90,31,0.45)]" />
            </div>
          )}
        </div>
      </div>

      {/* ---------------- what the agent understood ---------------- */}
      <div className="flex min-h-0 flex-col gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <div>
          <PanelLabel>Extracted</PanelLabel>
          <dl className="mt-2 grid grid-cols-[5.5rem_1fr] gap-y-1 text-[0.8rem]">
            {FIELDS.map((f) => (
              <Row key={f.k} label={f.k} show={at(f.at)}>
                {f.v}
              </Row>
            ))}
          </dl>
        </div>

        <div className="border-t border-white/10 pt-3.5">
          <PanelLabel>Checks</PanelLabel>
          <div className="mt-2 space-y-1.5">
            {CHECKS.map((c, i) => (
              <CheckLine key={c} done={at(S.checks + i)}>
                {c}
              </CheckLine>
            ))}
          </div>
        </div>

        <Appear show={at(S.journal)} className="border-t border-white/10 pt-3.5">
          <PanelLabel>Journal entry</PanelLabel>
          <div className="mt-2 space-y-1 font-mono text-[0.72rem]">
            {JOURNAL.map((j) => (
              <div key={j.acct} className="grid grid-cols-[2.2rem_minmax(0,1fr)_4.2rem_4.2rem] gap-2">
                <span className="text-signal">{j.acct}</span>
                <span className="truncate text-white/70">{j.name}</span>
                <span className="tabular text-right text-white/85">{j.dr}</span>
                <span className="tabular text-right text-white/85">{j.cr}</span>
              </div>
            ))}
          </div>
        </Appear>

        <div className="mt-auto min-h-7">
          <Appear show={at(S.posted)} y={4}>
            <Chip tone="sage">
              <Check className="size-3" strokeWidth={2.5} /> Posted · ERP and accounting
            </Chip>
          </Appear>
        </div>
      </div>
    </div>
  );
}

function Zone({
  active,
  seen,
  className = "",
  children,
}: {
  active: boolean;
  seen: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative -m-1 p-1 transition-[box-shadow,background-color] duration-500 ${
        active
          ? "bg-signal/10 shadow-[inset_0_0_0_1.5px_var(--color-signal)]"
          : seen
            ? "shadow-[inset_0_0_0_1px_rgba(174,56,24,0.3)]"
            : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Row({ label, show, children }: { label: string; show: boolean; children: ReactNode }) {
  return (
    <>
      <dt className="text-white/55">{label}</dt>
      <dd className="min-h-5 text-white/90">
        <Appear show={show} y={3}>
          {children}
        </Appear>
      </dd>
    </>
  );
}
