"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";

const STATEMENT =
  "Banks, insurers and telcos are rebuilding how they operate around AI. Mid-sized companies run the same processes under the same pressure, without a transformation budget or a data team. That is the gap we work in.";

const POINTS = [
  {
    title: "The playbook, sized for you",
    body: "We spent years designing and shipping AI programmes for banks, insurers and energy companies at Oliver Wyman. Asventia brings that method to companies that don't have a data team of their own.",
  },
  {
    title: "Systems in production",
    body: "Every engagement ends with an agent handling real volume, measured against numbers we agree with you before we start.",
  },
  {
    title: "Your team stays in charge",
    body: "Agents draft, people approve. Automation widens only as accuracy is proven, and anyone can step into a conversation at any time.",
  },
];

export function Thesis() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.42"] });
  const words = STATEMENT.split(" ");

  return (
    <section id="why" data-nav="light" aria-labelledby="why-title" className="bg-paper pt-28 pb-12 md:pt-40 md:pb-16">
      <div className="shell">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <h2 id="why-title" className="eyebrow">
              Why now
            </h2>
          </div>
          {/* Words fill in as you read down the page */}
          <p
            ref={ref}
            className="font-display text-[clamp(1.7rem,1.05rem+2.25vw,3.3rem)] leading-[1.13] font-medium tracking-[-0.022em] text-ink md:col-span-9"
          >
            {words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12 md:gap-x-8">
          {POINTS.map((point, i) => (
            <Reveal
              key={point.title}
              delay={i * 0.08}
              className={`border-t border-line-strong pt-6 md:col-span-3 ${i === 0 ? "md:col-start-4" : ""}`}
            >
              <h3 className="font-display text-[1.08rem] font-semibold tracking-[-0.01em] text-ink">
                {point.title}
              </h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-body">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{children}</m.span>{" "}
    </>
  );
}
