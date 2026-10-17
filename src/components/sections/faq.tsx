"use client";

import { Plus } from "@/components/ui/icons";
import { Lines, Reveal } from "@/components/ui/reveal";
import { Wave } from "@/components/ui/wave";

// The three doubts that hold a mid-sized company back. Check the security answer against
// what you actually sign (GDPR, data processing agreement) before launch.
const QUESTIONS = [
  {
    q: "How much does it cost?",
    a: "A one-off setup fee and a fixed monthly fee, both sized to your volume and the systems we connect. You get a closed quote after the demo, before any work starts, and the pilot is measured against numbers we agree with you up front.",
  },
  {
    q: "Is our data safe?",
    a: "The agent only reaches the systems and data you give it access to, and you can revoke that access at any time. Every message, check and entry is logged, and a person approves what reaches your ERP until you decide otherwise. We work under GDPR and sign a data processing agreement with you.",
  },
  {
    q: "How long does setup take?",
    a: "Weeks, not months: most of the platform already exists. In the first four weeks the agent works with a group of your customers and a person approves every entry. By around week twelve it runs the whole process and your team handles the exceptions.",
  },
];

export function Faq() {
  return (
    <section id="faq" data-nav="light" aria-labelledby="faq-title" className="bg-paper-sunken py-28 md:py-40">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:flex lg:flex-col">
          <p className="eyebrow">Questions</p>
          <Lines
            id="faq-title"
            lines={["Price, data and time:", <strong key="b">what owners ask first.</strong>]}
            className="mt-6 text-h2 text-ink"
          />
          <Reveal as="p" delay={0.1} className="mt-6 max-w-[26rem] text-lead text-ink-soft">
            Anything else, ask us on the call.
          </Reveal>
          {/* Signal lines fill the rest of the column, beside the answers */}
          <div aria-hidden className="relative mt-12 hidden min-h-56 flex-1 lg:block">
            <Wave name="ondas-paper" position="0% 50%" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {QUESTIONS.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              open={i === 0}
              className="group border-t border-line-strong/40 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-ink [&::-webkit-details-marker]:hidden">
                <h3 className="text-h3">{item.q}</h3>
                <Plus className="size-5 shrink-0 transition-transform duration-200 ease-out group-open:rotate-45" />
              </summary>
              <p className="max-w-[36rem] pb-7 text-[1.02rem] leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
