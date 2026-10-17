"use client";

import { useId, useState, type CSSProperties, type FormEvent } from "react";
import { cta, leadEndpoint, mailto } from "@/lib/site";
import { ArrowRight } from "./icons";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/**
 * The one call to action: a work-email field joined to "Book your 15-minute demo".
 * The visitor leaves an address and we write back to book the call. Posts to
 * NEXT_PUBLIC_LEAD_ENDPOINT when it is configured; until then it hands off to the
 * visitor's mail app. Same block in the hero, mid-page and the final section.
 */
export function EmailCapture({
  source,
  tone,
  className = "",
  style,
}: {
  /** Where on the page the lead came from, sent along with the address. */
  source: string;
  /** The ground it sits on. */
  tone: "dark" | "light";
  className?: string;
  style?: CSSProperties;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const dark = tone === "dark";
  const locked = status === "sending" || status === "sent";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadEndpoint) {
      const body = `Hi Asventia team,\n\nI'd like to book the 15-minute demo.\n\nWork email: ${email}\nCompany:\n`;
      window.location.href = mailto("15-minute demo", body);
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const message = {
    idle: "",
    sending: "",
    sent: "Received. We'll write within one working day to book your demo.",
    mailto: "Your mail app should open with the request ready to send.",
    error: "That didn't go through. Try again, or write to us directly.",
  }[status];

  return (
    <div className={className} style={style}>
      <form onSubmit={onSubmit} className="flex w-full max-w-[32rem] flex-col sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Work email
        </label>
        <div className="group/field relative min-w-0 flex-1">
          <input
            id={id}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={locked}
            className={`h-13 w-full border px-4 text-[0.95rem] transition-colors duration-300 focus:outline-none disabled:opacity-60 sm:border-r-0 ${
              dark
                ? "border-white/25 bg-white/[0.06] text-on-inverse placeholder:text-white/50 hover:border-white/45 focus:border-white/60 focus:bg-white/[0.1]"
                : "border-line-strong bg-paper-raised text-ink placeholder:text-ink-muted hover:border-ink-soft focus:border-ink"
            }`}
          />
          {/* Focus line draws across the bottom edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-cta transition-transform duration-500 ease-out-expo group-focus-within/field:scale-x-100"
          />
        </div>
        {/* White wipes in from the left on hover while the arrow slides through */}
        <button
          type="submit"
          disabled={locked}
          className="group relative isolate inline-flex h-13 shrink-0 items-center justify-center gap-3 overflow-hidden border border-cta bg-cta px-6 text-[0.95rem] font-semibold whitespace-nowrap text-on-cta transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-on-cta before:transition-transform before:duration-500 before:ease-out-expo hover:text-cta hover:before:scale-x-100 focus-visible:text-cta focus-visible:before:scale-x-100 disabled:cursor-wait"
        >
          <span>{status === "sending" ? "Sending" : status === "sent" ? "Received" : cta.label}</span>
          <span className="relative grid size-4 place-items-center overflow-hidden" aria-hidden>
            <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-5 group-focus-visible:translate-x-5">
              <ArrowRight className="size-4" />
            </span>
            <span className="absolute -translate-x-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-focus-visible:translate-x-0">
              <ArrowRight className="size-4" />
            </span>
          </span>
        </button>
      </form>
      <p className={`mt-3 max-w-[32rem] text-[0.9rem] leading-snug ${dark ? "text-on-inverse-muted" : "text-ink-muted"}`}>
        <span className={`font-semibold ${dark ? "text-on-inverse" : "text-ink"}`}>{cta.reassurance}</span>{" "}
        {cta.riskLine}
      </p>
      <p
        aria-live="polite"
        className={`mt-1 min-h-5 text-[0.8rem] ${dark ? "text-on-inverse" : "text-ink"}`}
      >
        {message}
      </p>
    </div>
  );
}
