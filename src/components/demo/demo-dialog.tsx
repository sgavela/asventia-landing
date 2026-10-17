"use client";

import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Play, Plus, Replay } from "@/components/ui/icons";
import { Mark } from "@/components/ui/logo";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cta, demoVideoUrl } from "@/lib/site";

// Only fetched when someone opens the dialog.
const SalesSim = dynamic(() => import("./sim-sales").then((mod) => mod.SalesSim), { ssr: false });

/**
 * Test: "See the agent in action". A plain text button that opens a short demo:
 * the video at NEXT_PUBLIC_DEMO_VIDEO_URL, or until there is one, the animated
 * example run of the sales agent.
 */
export function DemoDialog({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink ${className}`}
      >
        <span className="grid size-7 place-items-center ring-1 ring-ink/25 transition-colors ring-inset group-hover:ring-ink">
          <Play className="size-3 translate-x-px" />
        </span>
        {cta.seeItWork}
      </button>

      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // a click on the backdrop (the dialog element itself) closes it
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        aria-label={cta.seeItWork}
        className="m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-auto border border-line-inverse bg-inverse p-0 text-on-inverse backdrop:bg-ink/80"
      >
        <div className="flex items-center justify-between border-b border-line-inverse px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center bg-on-inverse">
              <Mark className="h-2.5 w-auto text-ink" />
            </span>
            <span className="label text-on-inverse-muted">
              Sales &amp; orders agent{demoVideoUrl ? "" : " · Example run"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="grid size-9 place-items-center text-on-inverse-muted transition-colors hover:text-on-inverse"
          >
            <Plus className="size-5 rotate-45" />
          </button>
        </div>
        {open && (demoVideoUrl ? <DemoVideo /> : <ExampleRun />)}
      </dialog>
    </>
  );
}

function DemoVideo() {
  return (
    <video src={demoVideoUrl} controls autoPlay playsInline className="block aspect-video w-full bg-ink" />
  );
}

function ExampleRun() {
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <>
      <div className="relative h-[41rem] sm:h-[35rem]">
        <SalesSim key={`${run}-${reduced}`} playing={!reduced} instant={reduced} onDone={() => setDone(true)} />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line-inverse px-5 py-3">
        <p className="text-[0.8rem] text-on-inverse-muted">
          Invented customer. The flow, the checks and the approval step are the ones the agent follows in production.
        </p>
        <button
          type="button"
          onClick={() => {
            setRun((r) => r + 1);
            setDone(false);
          }}
          aria-label="Replay the example"
          className={`grid size-9 shrink-0 place-items-center ring-1 ring-inset transition-colors ${
            done ? "text-on-inverse ring-on-inverse/60" : "text-on-inverse-muted ring-line-inverse hover:text-on-inverse"
          }`}
        >
          <Replay className="size-4" />
        </button>
      </div>
    </>
  );
}
