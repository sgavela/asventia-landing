export type AgentId = "sales" | "invoices" | "reception" | "tailored";

export type Agent = {
  id: AgentId;
  index: string;
  name: string;
  short: string;
  body: string;
  touches: string[];
};

export const AGENTS: Agent[] = [
  {
    id: "sales",
    index: "01",
    name: "Sales & orders agent",
    short: "Orders from WhatsApp, phone and email, written into your ERP.",
    body: "Customers order the way they always have: a voice note, a WhatsApp message, an email with a photo of a list. The agent reads it, applies that customer's price list and the promotions running today, and writes the order into your ERP. When a regular customer goes quiet, it gets in touch before the account goes cold.",
    touches: ["WhatsApp", "Phone", "Email", "ERP"],
  },
  {
    id: "invoices",
    index: "02",
    name: "Invoice agent",
    short: "Supplier invoices read, matched and posted to accounting.",
    body: "Supplier invoices arrive as PDFs, scans or phone photos. The agent extracts every line, checks it against the purchase order and delivery notes, catches duplicates and VAT errors, and posts the entry to your ERP and accounting with the right accounts.",
    touches: ["Email inbox", "OCR", "ERP", "Accounting"],
  },
  {
    id: "reception",
    index: "03",
    name: "AI receptionist",
    short: "Every call answered, resolved or routed, and logged.",
    body: "Answers every call in a natural voice, at 9am or 11pm. It handles the routine on its own (order status, delivery times, bookings, changes to an order) and transfers everything else to the right person with a written summary, so nobody asks the customer to repeat themselves.",
    touches: ["Phone", "Voice", "Calendar", "CRM"],
  },
  {
    id: "tailored",
    index: "04",
    name: "Tailored agents",
    short: "Your own process, mapped and automated end to end.",
    body: "Most companies have one process that eats a team's week and fits no product. We map it with the people who do it, measure what it costs, and build the agent for it on the same production platform, with the same approval controls.",
    touches: ["Process audit", "Build", "Pilot", "Scale"],
  },
];
