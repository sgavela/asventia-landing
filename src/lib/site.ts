// Single place for contact details and URLs. Confirm these before launch.
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
    "Asventia designs and runs AI agents for mid-sized companies: orders from WhatsApp, phone and email written into your ERP, supplier invoices posted to accounting, and every call answered.",
};

// Form endpoint (CRM, Formspree, a webhook...) that receives { email, source, note } as JSON.
// Left unset, the email forms fall back to opening a pre-filled mail.
export const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "";

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export const bookingHref = mailto(
  "30-minute call with Asventia",
  "Hi Asventia team,\n\nWe'd like to talk about automating:\n\nCompany:\nTeam size:\n",
);
