import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  themeColor: "#15161a",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} antialiased`}
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
