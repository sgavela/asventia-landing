"use client";

import { useId, useState, type FormEvent } from "react";
import { leadEndpoint, mailto } from "@/lib/site";
import { ButtonArrow, buttonClass } from "./button";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

type Props = {
  /** Where on the page the lead came from, sent along with the address. */
  source: string;
  /** Optional extra context, e.g. the process picked in the contact section. */
  note?: string;
  cta?: string;
  className?: string;
};

/**
 * Work-email field joined to its submit button. Posts to NEXT_PUBLIC_LEAD_ENDPOINT
 * when it is configured; until then it hands off to the visitor's mail app.
 */
export function EmailCapture({ source, note, cta = "Book a demo", className = "" }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadEndpoint) {
      const body = `Hi Asventia team,\n\nI'd like a demo.\n\nWork email: ${email}${note ? `\n${note}` : ""}\nCompany:\n`;
      window.location.href = mailto("Demo request", body);
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, note }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const message = {
    idle: "",
    sending: "",
    sent: "Received. We'll write to you within one working day.",
    mailto: "Your mail app should open with the request ready to send.",
    error: "That didn't go through. Try again, or write to us directly.",
  }[status];

  return (
    <div className={className}>
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
            disabled={status === "sending" || status === "sent"}
            className="h-12 w-full border border-white/25 bg-white/[0.06] px-4 text-[0.95rem] text-white backdrop-blur-sm transition-colors duration-300 placeholder:text-white/45 hover:border-white/45 focus:border-white/60 focus:bg-white/[0.1] focus:outline-none disabled:opacity-60 sm:border-r-0"
          />
          {/* Focus line draws across the bottom edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out-expo group-focus-within/field:scale-x-100"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className={buttonClass("light", "shrink-0")}
        >
          <span>{status === "sending" ? "Sending" : status === "sent" ? "Booked in" : cta}</span>
          <ButtonArrow />
        </button>
      </form>
      <p aria-live="polite" className="mt-3 min-h-5 tabular text-[0.72rem] text-white/60">
        {message}
      </p>
    </div>
  );
}
