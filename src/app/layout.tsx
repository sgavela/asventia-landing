import type { Metadata, Viewport } from "next";
import { figtree, outfit } from "@brand/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Asventia · AI systems that run real business operations",
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Asventia · AI systems that run real business operations",
    description: site.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asventia · AI systems that run real business operations",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1b2e",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${figtree.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as JS-capable before first paint so reveal styles
            only hide content when something will reveal it again. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
