"use client";

import Image, { type StaticImageData } from "next/image";
import esdras from "@/assets/team/esdras-sanchez.jpg";
import sergio from "@/assets/team/sergio-gil-gavela.jpg";
import { Lines, Reveal } from "@/components/ui/reveal";

const FOUNDERS: {
  name: string;
  role: string;
  photo: StaticImageData;
  before: string[];
  focus: string;
}[] = [
  {
    name: "Esdras Sánchez",
    role: "Co-founder & CEO",
    photo: esdras,
    before: ["Associate at Oliver Wyman"],
    focus: "Commercial transformation, analytics and operations.",
  },
  {
    name: "Sergio Gil Gavela",
    role: "Co-founder & CTO",
    photo: sergio,
    before: ["Lead AI Engineer at Oliver Wyman", "Lecturer at UAM, CEU and Afi"],
    focus: "AI products, production systems and integrations.",
  },
];

const EXPERIENCE = [
  "Santander",
  "BBVA",
  "Unicaja",
  "Abanca",
  "CaixaBank",
  "Deutsche Bank",
  "Standard Chartered",
  "Mapfre",
  "Santalucía",
  "Mutua Madrileña",
  "Repsol",
  "Telefónica",
  "Tendam",
  "TUI",
  "HM Government",
];

export function Team() {
  return (
    <section id="team" data-nav="light" aria-labelledby="team-title" className="bg-paper py-28 md:py-40">
      <div className="shell">
        <Lines
          id="team-title"
          lines={["We know the business process,", "and we know how to take", "AI to production."]}
          className="max-w-[16em] text-h2 text-ink"
        />

        <div className="mt-16 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <Reveal
              key={f.name}
              delay={i * 0.08}
              className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-5 border-t border-line-strong pt-6 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-7"
            >
              <div className="self-start overflow-hidden bg-stone">
                <Image
                  src={f.photo}
                  alt={`Portrait of ${f.name}`}
                  sizes="(min-width: 640px) 168px, 120px"
                  placeholder="blur"
                  className="aspect-[4/5] h-auto w-full object-cover contrast-[1.04] grayscale"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[1.35rem] leading-tight font-semibold tracking-[-0.015em] text-ink sm:text-[1.55rem]">
                  {f.name}
                </h3>
                <p className="mt-1 text-[0.95rem] font-medium text-body">{f.role}</p>
                <ul className="mt-5 space-y-1 text-[0.95rem] text-ink">
                  {f.before.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{f.focus}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 md:mt-32">
          <div className="flex flex-col gap-2 border-b border-line-strong pb-5 md:flex-row md:items-baseline md:justify-between">
            <h3 className="max-w-[36rem] font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-ink md:text-[1.3rem]">
              Where our team designed and delivered AI strategy and implementation before Asventia
            </h3>
            <p className="mono-label text-muted">Prior professional experience</p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {EXPERIENCE.map((name) => (
              <li
                key={name}
                className="border-b border-line py-5 pr-4 font-display text-[1.02rem] font-medium tracking-[-0.01em] text-ink/65 transition-colors duration-300 hover:text-ink md:text-[1.2rem]"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
