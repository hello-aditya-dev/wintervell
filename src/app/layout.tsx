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

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WinterVell",
  description:
    "AI Website Audit and Agency Sales Platform. Turn any website into a sales-ready audit with a white-label audit engine, report builder, proposal generator and prospect pipeline.",
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
    "Bring-your-own AI keys",
    "PDF rendering with selectable text",
    "Full source code included",
  ],
  url: SITE_URL,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "WinterVell Source Licence",
  description:
    "Complete source-code licence for the WinterVell AI Website Audit and Agency Sales Platform. Deploy on your own infrastructure, under your own brand.",
  brand: {
    "@type": "Brand",
    name: SITE_NAME,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Agency Source Licence",
      price: "799",
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      description: "One legal business, one production deployment, complete source code.",
    },
    {
      "@type": "Offer",
      name: "Studio Source Licence",
      price: "1499",
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      description: "Everything in Agency, plus five deployments and multiple brands.",
    },
    {
      "@type": "Offer",
      name: "Enterprise Licence",
      price: "4000",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "Extended deployment rights, custom implementation, and structured handover.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this a hosted SaaS or source-code product?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WinterVell is sold as source-code software. You receive the complete source code and deploy it on your own infrastructure. A hosted option may be available in the future.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my own brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Both the Agency and Studio licences include full client-facing white labelling. The Studio licence also allows admin-area white labelling.",
      },
    },
    {
      "@type": "Question",
      name: "Can I charge clients for audits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You may charge clients for audits, reports, proposals, and related services. The licence explicitly permits commercial use of client-facing outputs.",
      },
    },
    {
      "@type": "Question",
      name: "Can I modify the code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You may modify the source code for internal business use. The Studio licence also permits modifications for controlled client deployments.",
      },
    },
    {
      "@type": "Question",
      name: "Can I resell the source code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Redistribution, resale, sublicensing, or public publication of the source code is prohibited under all licence tiers.",
      },
    },
    {
      "@type": "Question",
      name: "How many deployments are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Agency licence includes one production deployment. The Studio licence includes up to five production deployments. Enterprise arrangements are custom.",
      },
    },
    {
      "@type": "Question",
      name: "Are AI costs included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. WinterVell uses a bring-your-own-key model. You provide your own AI provider API keys, and you pay your AI provider directly for usage.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI providers are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WinterVell supports OpenAI-compatible providers, Anthropic, and includes a mock provider for demonstration. The provider abstraction is designed to be extensible.",
      },
    },
    {
      "@type": "Question",
      name: "Is the audit fully automated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WinterVell performs automated website analysis, but findings are indicative, not definitive. Users can edit, reject, or mark findings as false positives. AI explains evidence but does not invent it.",
      },
    },
    {
      "@type": "Question",
      name: "Can findings be edited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every finding can be reviewed, edited, marked as a false positive, or excluded from the client report. The manual review workflow is a core part of the product.",
      },
    },
    {
      "@type": "Question",
      name: "Does WinterVell guarantee rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. WinterVell does not guarantee SEO ranking improvements, AI-visibility improvements, or any specific commercial outcome. Automated findings are indicative, not definitive.",
      },
    },
    {
      "@type": "Question",
      name: "Is it a WCAG compliance checker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. WinterVell provides accessibility indicators, but it does not certify WCAG compliance. Accessibility findings are a prompt for human review, not a final verdict.",
      },
    },
    {
      "@type": "Question",
      name: "Is installation included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Installation is self-service with comprehensive deployment documentation. The Agency licence includes thirty days of installation support. The Studio licence includes priority installation support.",
      },
    },
    {
      "@type": "Question",
      name: "What support is included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Agency licence includes thirty days of installation support via email. The Studio licence includes priority installation support and one year of updates. Enterprise arrangements include custom support terms.",
      },
    },
    {
      "@type": "Question",
      name: "Are future updates included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Agency licence includes access to the purchased version. Future major versions are not automatically included. The Studio licence includes one year of updates from the date of purchase.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After verified payment, you receive source-code delivery instructions, deployment documentation, a buyer handover checklist, and access to the support channel. The full process is documented in the deployment guide.",
      },
    },
    {
      "@type": "Question",
      name: "Can I inspect the product first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can explore the live demo, view a sample report, review the documentation preview, and examine the architecture and security overview before purchasing.",
      },
    },
    {
      "@type": "Question",
      name: "Can WinterVell be deployed outside Vercel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WinterVell is a standard Next.js application and can be deployed on any platform that supports Node.js, including Docker-based hosting, VPS, and other cloud providers.",
      },
    },
    {
      "@type": "Question",
      name: "What database is required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PostgreSQL is required for production. SQLite is supported for local development only. Production deployments must not use SQLite.",
      },
    },
    {
      "@type": "Question",
      name: "How is customer data handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WinterVell is self-hosted. Customer data remains on your infrastructure. The licence validation system never transmits client or audit data — only a licence identifier and deployment fingerprint.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: `${SITE_URL}/#pricing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "FAQ",
      item: `${SITE_URL}/#faq`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${SITE_URL}/#contact`,
    },
  ],
};

export const metadata: Metadata = {
  title: "WinterVell — AI Website Audit and Agency Sales Platform",
  description:
    "Turn any website into a sales-ready audit. WinterVell gives agencies a white-label audit engine, report builder, proposal generator and prospect pipeline they can deploy under their own brand.",
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
    title: "WinterVell — AI Website Audit and Agency Sales Platform",
    description:
      "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator and prospect pipeline.",
    type: "website",
    url: SITE_URL,
    siteName: "WinterVell",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WinterVell — AI Website Audit and Agency Sales Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WinterVell — AI Website Audit and Agency Sales Platform",
    description:
      "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator and prospect pipeline.",
    images: ["/og-image.png"],
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
        <Script
          id="schema-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <Script
          id="schema-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
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
