// Single place for contact details, URLs and the call-to-action copy. Confirm these before launch.
export const site = {
  name: "Asventia",
  tagline: "Intelligence in motion",
  // Vercel sets NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL (no protocol) on every deploy.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  email: "hola@asventia.com",
  location: "Madrid, Spain",
  description:
    "AI agents that take orders, process supplier invoices and answer the phone inside your ERP, built and run for mid-sized companies.",
};

/** The one call to action: leave a work email and we write back to book the demo.
    Same words everywhere it appears: hero, mid-page and the final CTA. */
export const cta = {
  label: "Book your 15-minute demo",
  reassurance: "No commitment.",
  riskLine: "If an agent isn't right for your process, we'll tell you on the call.",
  seeItWork: "See the agent in action",
  whatsapp: "Message us on WhatsApp",
};

// Test: WhatsApp as an alternative to the email form. International format, digits only
// (e.g. 34600000000). While empty, the WhatsApp link stays off the published page.
export const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

// Test: short demo video for "See the agent in action" (an .mp4/.webm URL). While empty, the
// dialog plays the animated example run of the sales agent instead.
export const demoVideoUrl = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? "";

// Form endpoint (CRM, Formspree, a webhook...) that receives { email, source } as JSON.
// Left unset, the demo form falls back to opening a pre-filled email.
export const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Asventia, I'd like to see the agent working on our process.")}`
  : "";
