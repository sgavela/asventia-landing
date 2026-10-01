"use client";

import { ReactLenis } from "lenis/react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { useState } from "react";
import { Agents, type AgentRequest } from "@/components/agents/agents";
import { Hero } from "@/components/hero/hero";
import { Contact } from "@/components/sections/contact";
import { Rollout } from "@/components/sections/rollout";
import { Team } from "@/components/sections/team";
import { TheMath } from "@/components/sections/the-math";
import { Thesis } from "@/components/sections/thesis";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  // Lets the hero's agent index open the matching example further down.
  const [agentRequest, setAgentRequest] = useState<AgentRequest>(null);

  return (
    <ReactLenis root options={{ lerp: 0.11, anchors: true, respectReducedMotion: true }}>
      {/* m.* components with the small animation bundle; drag/layout features aren't used */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only z-[60] bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            <Hero onSelectAgent={(id) => setAgentRequest({ id, nonce: Date.now() })} />
            <Thesis />
            <Agents request={agentRequest} />
            <TheMath />
            <Rollout />
            <Team />
            <Contact />
          </main>
          <SiteFooter />
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}
