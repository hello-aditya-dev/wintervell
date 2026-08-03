import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { MotionProvider } from "@/components/site/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wintervell.com";
const SITE_NAME = "WinterVell";

/* ─── JSON-LD Structured Data ─── */
/* The SoftwareApplication schema describes the product honestly. */
/* Features listed are only those that are currently implemented. */
/* Planned features are not listed as featureList entries. */
/* The offer uses "PreOrder" availability to reflect that purchasing */
/* is not yet open. */

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WinterVell",
  description:
    "Website audit and agency sales platform — currently in development. Interactive product demo available.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Self-hosted (Node.js)",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "799",
    availability: "https://schema.org/PreOrder",
    description: "Planned founding pricing. Purchasing is not yet open.",
  },
  featureList: [
    "Interactive product demonstration",
    "Deterministic demo data",
    "Prospect management interface",
    "Audit workflow interface",
    "Finding review workspace",
    "Report builder interface",
    "Proposal builder interface",
    "Pipeline kanban interface",
    "White-label branding settings",
    "Service catalogue",
    "Task management",
  ],
  url: SITE_URL,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

export const metadata: Metadata = {
  title: "WinterVell — Website Audit and Agency Sales Platform (In Development)",
  description:
    "WinterVell is a website audit and agency sales platform in development. Explore the interactive product demo, view sample reports, and review the planned pricing.",
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
    title: "WinterVell — Website Audit and Agency Sales Platform (In Development)",
    description:
      "WinterVell is a website audit and agency sales platform in development. Explore the interactive demo and view sample reports.",
    type: "website",
    url: SITE_URL,
    siteName: "WinterVell",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WinterVell — Website Audit and Agency Sales Platform (In Development)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WinterVell — Website Audit and Agency Sales Platform (In Development)",
    description:
      "WinterVell is a website audit and agency sales platform in development. Explore the interactive demo and view sample reports.",
    images: ["/opengraph-image"],
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Skip link — visible on focus for keyboard users */}
          <a
            href="#main-content"
            className="skip-link"
          >
            Skip to main content
          </a>
          <MotionProvider>
            {children}
          </MotionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
