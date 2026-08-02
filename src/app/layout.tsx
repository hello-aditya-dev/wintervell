import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    title: "WinterVell — AI Website Audit and Agency Sales Platform",
    description:
      "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator and prospect pipeline.",
    type: "website",
    siteName: "WinterVell",
  },
  twitter: {
    card: "summary_large_image",
    title: "WinterVell — AI Website Audit and Agency Sales Platform",
    description:
      "Turn any website into a sales-ready audit. White-label audit engine, report builder, proposal generator and prospect pipeline.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
