"use client";

import { ReactLenis } from "lenis/react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { Hero } from "@/components/hero/hero";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { SocialProof } from "@/components/sections/social-proof";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    // Anchor jumps stop below the fixed header (h-18 = 72px).
    <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -72 }, respectReducedMotion: true }}>
      {/* m.* components with the small animation bundle; drag/layout features aren't used */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only z-[60] bg-inverse px-4 py-2 text-on-inverse focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            <Hero />
            <ProblemSolution />
            <SocialProof />
            <Faq />
            <FinalCta />
          </main>
          <SiteFooter />
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}
