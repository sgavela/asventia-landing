"use client";

import { DemoDialog } from "@/components/demo/demo-dialog";
import { EmailCapture } from "@/components/ui/email-capture";
import { ArrowRight } from "@/components/ui/icons";
import { Lines, Reveal } from "@/components/ui/reveal";
import { Wave } from "@/components/ui/wave";

// Volumes and minutes are illustrative; the pilot measures the real ones.
const PAINS = [
  {
    title: "Orders arrive everywhere",
    body: "WhatsApp messages, voice notes, emails with a photo of a list. Someone retypes each one into the ERP with the price list open on the other screen.",
    maths: "1,500 orders a month × 6 min",
    total: "1,800 h a year",
  },
  {
    title: "Invoices wait in an inbox",
    body: "PDFs, scans and phone photos, each checked against the delivery notes and posted by hand. Duplicates and VAT errors slip through.",
    maths: "600 invoices a month × 8 min",
    total: "960 h a year",
  },
  {
    title: "The phone rings out",
    body: "At peak times and after hours nobody picks up. Customers call back later, or call someone else.",
    maths: "1,200 calls a month × 4 min",
    total: "960 h a year",
  },
];

const STEPS = [
  {
    verb: "Read",
    title: "It picks up the work where it lands",
    body: "Orders on WhatsApp, invoices in the inbox, calls on the phone. The agent reads each one as it arrives, at 9am or 11pm.",
  },
  {
    verb: "Check",
    title: "It applies your rules",
    body: "Customer price lists, live promotions, stock, delivery notes, VAT. Anything unusual is flagged, not guessed.",
  },
  {
    verb: "Approve",
    title: "Your team signs off, your ERP is updated",
    body: "A person approves each entry with one click. Once accuracy is proven, standard cases go straight through and people handle the exceptions.",
  },
];

export function ProblemSolution() {
  return (
    <section id="problem" data-nav="light" aria-labelledby="problem-title" className="bg-paper pt-28 md:pt-40">
      {/* ---------------- the problem ---------------- */}
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="eyebrow">The problem</p>
            <Lines
              id="problem-title"
              lines={["Orders, invoices and calls", <strong key="b">still pass through someone&rsquo;s hands.</strong>]}
              className="mt-6 text-h2 text-ink"
            />
          </div>
          <Reveal as="p" delay={0.1} className="text-lead text-ink-soft lg:col-span-4">
            Mid-sized companies run the same processes as large ones, without a data team. This is where the
            week goes.
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3">
          {PAINS.map((pain, i) => (
            <Reveal
              as="li"
              key={pain.title}
              delay={i * 0.08}
              className="flex flex-col border border-line bg-paper-raised p-6 md:p-7"
            >
              <span className="label text-ink-muted">0{i + 1}</span>
              <h3 className="mt-4 text-h3 text-ink">{pain.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{pain.body}</p>
              <div className="mt-auto pt-6">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-4 text-[0.875rem]">
                  <span className="tabular text-ink-muted">{pain.maths}</span>
                  <span className="font-display text-[1.15rem] font-semibold text-ink">{pain.total}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-4 text-[0.82rem] text-ink-muted">
          Example volumes and times, 12 months, 60 minutes an hour. In the pilot we measure yours.
        </p>
      </div>

      {/* The turn: the brand ribbon runs the width of the page between the problem and the answer */}
      <div aria-hidden className="relative mt-16 h-32 sm:h-40 md:mt-24 md:h-56">
        <Wave name="cinta-paper" />
      </div>

      {/* ---------------- the solution ---------------- */}
      <div id="how" className="shell pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="eyebrow">How the agent solves it</p>
            <Lines
              id="how-title"
              lines={["Three steps,", <strong key="b">and your team keeps the final say.</strong>]}
              className="mt-6 text-h2 text-ink"
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
            <DemoDialog />
          </Reveal>
        </div>

        {/* The human step is the navy one: it is where a person decides */}
        <ol className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, i) => {
            const human = i === STEPS.length - 1;
            return (
              <Reveal
                as="li"
                key={step.verb}
                delay={i * 0.08}
                className={`relative flex flex-col p-6 md:p-7 ${
                  human ? "bg-inverse text-on-inverse" : "border border-line bg-paper-raised text-ink"
                }`}
              >
                {i > 0 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-1/2 -left-[1.875rem] hidden size-5 -translate-y-1/2 text-ink-muted md:block"
                  />
                )}
                <span className={`label ${human ? "text-on-inverse-muted" : "text-ink-muted"}`}>
                  Step {i + 1} · {step.verb}
                </span>
                <h3 className="mt-4 text-h3">{step.title}</h3>
                <p className={`mt-3 text-[0.97rem] leading-relaxed ${human ? "text-on-inverse-muted" : "text-ink-soft"}`}>
                  {step.body}
                </p>
              </Reveal>
            );
          })}
        </ol>

        {/* Mid-page call to action */}
        <div className="mt-16 grid gap-8 border-t border-line pt-10 md:mt-20 md:pt-12 lg:grid-cols-12 lg:items-start lg:gap-8">
          <p className="max-w-[22rem] font-display text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-ink lg:col-span-6">
            See it working on a process <strong className="font-semibold">like yours.</strong>
          </p>
          <EmailCapture source="mid-page" tone="light" className="w-full lg:col-span-6 lg:w-[32rem] lg:justify-self-end" />
        </div>
      </div>
    </section>
  );
}

