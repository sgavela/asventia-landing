"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Mark } from "@/components/ui/logo";
import { Check, Phone } from "@/components/ui/icons";
import { useInterval, useSequence } from "@/lib/hooks";
import { Appear, Chip, PanelLabel, type SimProps } from "./sim-kit";

const TIMELINE = [1100, 1400, 2100, 900, 2300, 900, 700, 2800];
export const RECEPTION_DURATION = TIMELINE.reduce((a, b) => a + b, 0);

const S = { answered: 1, caller1: 2, lookup: 3, agent2: 4, caller2: 5, ended: 6, summary: 7 } as const;

const SPEAKER: Record<number, "agent" | "caller" | null> = {
  1: "agent",
  2: "caller",
  3: null,
  4: "agent",
  5: "caller",
};

// Deterministic bar shapes (same on server and client): a speech-like
// envelope with uneven peaks, each bar on its own tempo.
const BARS = Array.from({ length: 46 }, (_, i) => {
  const envelope = 0.55 + 0.45 * Math.sin(i * 0.31 + 0.6);
  const jitter = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return {
    hi: Math.max(0.18, envelope * (0.35 + 0.65 * jitter)),
    dur: 0.32 + ((i * 37) % 29) / 48,
    delay: ((i * 53) % 31) / 40,
  };
});

export function ReceptionSim({ playing, instant, onDone }: SimProps) {
  const seq = useSequence(TIMELINE, playing && !instant, onDone);
  const step = instant ? TIMELINE.length : seq;
  const at = (n: number) => step >= n;
  const [seconds, setSeconds] = useState(instant ? 48 : 0);
  const live = at(S.answered) && !at(S.ended);
  // The call plays at roughly 6× speed so it lands near 0:48 by hang-up.
  useInterval(() => setSeconds((s) => s + 1), 158, playing && live);
  const speaker = live ? (SPEAKER[step] ?? null) : null;
  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="grid h-full grid-rows-[10.5rem_1fr] sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:grid-rows-1">
      {/* ---------------- the call ---------------- */}
      <div className="flex min-h-0 flex-col justify-between border-b border-white/10 bg-ink-2 px-5 py-4 sm:border-r sm:border-b-0 sm:px-6 sm:py-6">
        <div className="flex items-center gap-4 sm:flex-col sm:items-start">
          <div className="relative grid size-12 shrink-0 place-items-center bg-white/10 sm:size-16">
            <Phone className="size-5 sm:size-6" />
            {!at(S.answered) && playing && (
              <span className="absolute inset-0 ring-1 ring-white/50 [animation:halo_1.3s_var(--ease-out-quint)_infinite]" />
            )}
          </div>
          <div className="min-w-0">
            <p className="label text-white/55">
              {!at(S.answered) ? "Incoming call" : at(S.ended) ? "Call ended" : "Connected · AI receptionist"}
            </p>
            <p className="mt-1 truncate text-[1.05rem] font-medium">Hostelería Ruiz</p>
            <p className="tabular text-[0.7rem] text-white/55">+34 6•• ••• 218</p>
          </div>
          <p className="tabular ml-auto text-[1rem] text-white/80 sm:ml-0 sm:text-[1.6rem]">{clock}</p>
        </div>

        <Appear show={at(S.answered)} className="hidden space-y-1.5 border-t border-white/10 pt-4 sm:block">
          <PanelLabel>Caller record</PanelLabel>
          <dl className="grid grid-cols-[6.5rem_1fr] gap-y-1 text-[0.78rem]">
            <dt className="text-white/55">Customer since</dt>
            <dd className="text-white/80">2019 · Tariff T2</dd>
            <dt className="text-white/55">Account</dt>
            <dd className="text-white/80">Marta Vidal</dd>
            <dt className="text-white/55">Open order</dt>
            <dd className="text-white/80">#48190 · out today</dd>
          </dl>
        </Appear>

        <div>
          <div className="flex h-12 items-center gap-[2px] sm:h-20" aria-hidden>
            {BARS.map((b, i) => (
              // outer span sets this bar's peak height; inner span does the moving
              <span key={i} className="flex h-full flex-1" style={{ transform: `scaleY(${b.hi})`}}>
                <span
                  className={`h-full w-full origin-center transition-colors duration-300 ${
                    speaker === "agent" ? "bg-white" : speaker === "caller" ? "bg-white/45" : "bg-white/15"
                  }`}
                  style={
                    {
                      transform: speaker ? undefined : "scaleY(0.08)",
                      animation: speaker ? `wave ${b.dur}s ${b.delay}s infinite var(--ease-in-out-quart) alternate` : "none",
                    } as CSSProperties
                  }
                />
              </span>
            ))}
          </div>
          <p className="label mt-2 hidden text-white/55 sm:block">
            {speaker === "agent"
              ? "Agent speaking"
              : speaker === "caller"
                ? "Caller speaking"
                : live
                  ? "Looking up the order…"
                  : at(S.ended)
                    ? "Call ended · summary logged"
                    : "Ringing"}
          </p>
        </div>
      </div>

      {/* ---------------- transcript + outcome ---------------- */}
      <div className="flex min-h-0 flex-col gap-2.5 overflow-hidden px-5 py-4 sm:px-6 sm:py-5">
        <PanelLabel>Live transcript</PanelLabel>
        <Line show={at(S.answered)} who="agent">
          Good morning, Distribuciones Norte. How can I help?
        </Line>
        <Line show={at(S.caller1)} who="caller">
          Hi, it&rsquo;s Carmen from Hostelería Ruiz. When does today&rsquo;s order arrive? And I need to add two
          cases of water.
        </Line>
        <Appear show={at(S.lookup)} y={4} className="flex flex-wrap gap-1.5 pl-6">
          <Chip>Order #48190 · route 12 · ETA 10:40</Chip>
          <Chip>Water 1.5L · in stock</Chip>
        </Appear>
        <Line show={at(S.agent2)} who="agent">
          Hi Carmen. Order 48190 is on route 12 and reaches you before 11:00. I&rsquo;ve added two cases of 1.5L
          water to the same delivery.
        </Line>
        <Line show={at(S.caller2)} who="caller">
          Perfect, thanks!
        </Line>

        <Appear show={at(S.summary)} className="mt-auto bg-white/6 p-3.5">
          <div className="flex items-center justify-between">
            <PanelLabel>Call summary</PanelLabel>
            <span className="tabular text-[0.7rem] text-white/55">{clock}</span>
          </div>
          <dl className="mt-2 grid grid-cols-[4.8rem_1fr] gap-y-1 text-[0.78rem]">
            <dt className="text-white/55">Intent</dt>
            <dd className="text-white/85">Delivery time · order change</dd>
            <dt className="text-white/55">Done</dt>
            <dd className="text-white/85">ETA confirmed · +2 × water 1.5L on #48190</dd>
            <dt className="text-white/55">Needs</dt>
            <dd className="text-white/85">Approval of the order change</dd>
          </dl>
          <div className="mt-3">
            <Chip tone="strong">
              <Check className="size-3" strokeWidth={2.5} /> Logged in CRM
            </Chip>
          </div>
        </Appear>
      </div>
    </div>
  );
}

function Line({ show, who, children }: { show: boolean; who: "agent" | "caller"; children: ReactNode }) {
  return (
    <Appear show={show} y={5} className="flex gap-2.5">
      <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
        {who === "agent" ? (
          <Mark className="h-2.5 w-auto text-white" />
        ) : (
          <span className="size-1.5 bg-white/50" />
        )}
      </span>
      <p className={`text-[0.84rem] leading-snug ${who === "agent" ? "text-white" : "text-white/70"}`}>{children}</p>
    </Appear>
  );
}
