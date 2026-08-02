import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://wintervell.com";
const SITE_NAME = "WinterVell";

/* ─── JSON-LD Structured Data ─── */
/* Only the SoftwareApplication schema is included. Product and FAQ schemas */
/* were removed because they made availability claims ("InStock") that could */
/* be dishonest — licence availability depends on current stock and terms.   */

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WinterVell",
  description:
    "Website audit and agency sales platform. White-label audit engine, report builder, proposal generator, and prospect pipeline for agencies.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Self-hosted (Node.js)",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "799",
    highPrice: "4000",
    offerCount: "3",
  },
  featureList: [
    "White-label audit engine",
    "Branded report builder",
    "Proposal generator",
    "Prospect pipeline management",
    "9 audit categories",
    "11-stage sales pipeline",
    "Multi-tenant architecture",
    "Bring-your-own API keys",
    "PDF rendering with selectable text",
    "Full source code included",
  ],
  url: SITE_URL,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

export const metadata: Metadata = {
  title: "WinterVell — Website Audit and Agency Sales Platform",
  description:
    "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator, and prospect pipeline for agencies.",
  keywords: [
    "WinterVell",
    "website audit",
    "agency sales",
    "white-label audit",
    "proposal generator",
    "SEO audit",
    "source code licence",
    "agency platform",
  ],
  authors: [{ name: "WinterVell" }],
  icons: {
    icon: "/logo.svg",
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WinterVell — Website Audit and Agency Sales Platform",
    description:
      "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator, and prospect pipeline.",
    type: "website",
    url: SITE_URL,
    siteName: "WinterVell",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WinterVell — Website Audit and Agency Sales Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WinterVell — Website Audit and Agency Sales Platform",
    description:
      "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator, and prospect pipeline.",
    images: ["/opengraph-image"],
  },
  sitemap: "/sitemap.xml",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Density mode — read from localStorage before paint to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=localStorage.getItem('wv-density');if(d==='compact')document.documentElement.classList.add('density-compact')}catch(e){}})()`,
          }}
        />
        <Script
          id="schema-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
