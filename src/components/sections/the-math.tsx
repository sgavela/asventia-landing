"use client";

import { m, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useState, type CSSProperties } from "react";
import { Lines, Reveal } from "@/components/ui/reveal";

const UNITS = {
  orders: { label: "Orders", one: "order", many: "orders", volume: 1500, minutes: 6, max: 6000 },
  invoices: { label: "Supplier invoices", one: "invoice", many: "invoices", volume: 600, minutes: 8, max: 3000 },
  calls: { label: "Phone calls", one: "call", many: "calls", volume: 1200, minutes: 4, max: 5000 },
} as const;
type Unit = keyof typeof UNITS;

// 8-hour working days; 1,760 h is a typical full-time year in Spain.
const HOURS_PER_DAY = 8;
const HOURS_PER_FTE = 1760;

const fmt = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const fmt1 = new Intl.NumberFormat("en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function TheMath() {
  const [unit, setUnit] = useState<Unit>("orders");
  const [volume, setVolume] = useState<number>(UNITS.orders.volume);
  const [minutes, setMinutes] = useState<number>(UNITS.orders.minutes);
  const u = UNITS[unit];

  const perYear = volume * 12;
  const hours = (perYear * minutes) / 60;
  const days = hours / HOURS_PER_DAY;
  const people = hours / HOURS_PER_FTE;

  const pickUnit = (next: Unit) => {
    setUnit(next);
    setVolume(UNITS[next].volume);
    setMinutes(UNITS[next].minutes);
  };

  return (
    <section id="the-math" data-nav="light" aria-labelledby="math-title" className="bg-paper py-28 md:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Lines
            id="math-title"
            lines={["Six minutes an order", "adds up to a", "full-time job."]}
            className="font-display text-[clamp(2rem,1.1rem+2.4vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-ink"
          />
          <Reveal as="p" delay={0.1} className="mt-8 max-w-[30rem] text-lead text-body">
            Reading the message, finding the customer&rsquo;s price list, applying the promotion, typing it into
            the ERP. Each step is small. Put in your own volume and see what the minutes become.
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6 max-w-[30rem] text-[0.9rem] leading-relaxed text-muted">
            This is a starting hypothesis, not a promise. In the pilot we measure the real figure with your data.
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" delay={0.08}>
          <div className="relative overflow-hidden bg-ink p-6 text-white md:p-9">
            <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="mono-label text-white/55">The count</p>
                <fieldset className="flex flex-wrap gap-1.5">
                  <legend className="sr-only">What to count</legend>
                  {(Object.keys(UNITS) as Unit[]).map((k) => (
                    <label
                      key={k}
                      className={`cursor-pointer px-3 py-1.5 text-[0.8rem] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
                        unit === k ? "bg-white text-ink" : "text-white/65 ring-1 ring-white/15 ring-inset hover:text-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="math-unit"
                        value={k}
                        checked={unit === k}
                        onChange={() => pickUnit(k)}
                        className="sr-only"
                      />
                      {UNITS[k].label}
                    </label>
                  ))}
                </fieldset>
              </div>

              <div className="mt-8 grid gap-7">
                <Slider
                  label={`${u.label} per month`}
                  value={volume}
                  min={50}
                  max={u.max}
                  step={50}
                  display={fmt.format(volume)}
                  onChange={setVolume}
                />
                <Slider
                  label={`Minutes of manual work per ${u.one}`}
                  value={minutes}
                  min={1}
                  max={20}
                  step={0.5}
                  display={`${minutes % 1 ? minutes.toFixed(1) : minutes} min`}
                  onChange={setMinutes}
                />
              </div>

              <dl className="mt-9 grid grid-cols-2 border-t border-white/10">
                <div className="col-span-2 flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5">
                  <dt className="text-[0.9rem] text-white/60">{u.label} a year</dt>
                  <dd className="tabular font-display text-[1.15rem] font-semibold">
                    <Counter value={perYear} format={(v) => fmt.format(v)} />
                  </dd>
                </div>
                <div className="col-span-2 flex items-baseline justify-between gap-4 border-b border-white/10 py-3.5">
                  <dt className="text-[0.9rem] text-white/60">Manual work a year</dt>
                  <dd className="tabular font-display text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none font-semibold tracking-[-0.02em]">
                    <Counter value={hours} format={(v) => fmt.format(v)} />
                    <span className="ml-2 text-[0.45em] font-medium text-white/60">hours</span>
                  </dd>
                </div>
                <div className="py-3.5 pr-4">
                  <dt className="text-[0.82rem] text-white/60">Working days</dt>
                  <dd className="tabular mt-1 font-display text-[1.4rem] font-semibold">
                    <Counter value={days} format={(v) => fmt.format(v)} />
                  </dd>
                </div>
                <div className="py-3.5">
                  <dt className="text-[0.82rem] text-white/60">Full-time people</dt>
                  <dd className="tabular mt-1 font-display text-[1.4rem] font-semibold text-signal">
                    <Counter value={people} format={(v) => fmt1.format(v)} />
                  </dd>
                </div>
              </dl>
              <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-white/55">
                {fmt.format(perYear)} {u.many} × {minutes} min ÷ 60 · 8 h days · {fmt.format(HOURS_PER_FTE)} h per
                full-time year
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const fill = `${((value - min) / (max - min)) * 100}%`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.92rem] text-white/75">
          {label}
        </label>
        <span className="tabular font-mono text-[0.95rem] text-white">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-2"
        style={{ "--fill": fill } as CSSProperties}
      />
    </div>
  );
}

/** Tweens between values so changes read as motion, not a flicker. */
function Counter({ value, format }: { value: number; format: (v: number) => string }) {
  const spring = useSpring(value, { stiffness: 140, damping: 24 });
  const text = useTransform(spring, (v) => format(v));
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <m.span>{text}</m.span>;
}
