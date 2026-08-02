import { Snowflake } from "lucide-react";
import { commercial } from "@/config/commercial";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Audit Engine", href: "#product" },
      { label: "Report Builder", href: "#product" },
      { label: "Proposal Generator", href: "#product" },
      { label: "Pipeline", href: "#product" },
      { label: "White Label", href: "#white-label" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Architecture", href: "#docs" },
      { label: "Security", href: "#security" },
      { label: "Due Diligence", href: "#due-diligence" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Commercial",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Licence Comparison", href: "#pricing" },
      { label: "Sample Report", href: "#demo" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Commercial Licence", href: "#legal" },
      { label: "Privacy", href: "#legal" },
      { label: "Terms", href: "#legal" },
      { label: "AI Disclosure", href: "#legal" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer
      className="no-print mt-auto border-t border-[#DDE3E7] bg-[#142634]"
      role="contentinfo"
    >
      {/* Subtle top gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #B7DDEC30, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section: branding + columns */}
        <div className="grid gap-10 py-12 lg:grid-cols-6 lg:gap-8">
          {/* Branding column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#B7DDEC]/10">
                <Snowflake
                  className="size-5 text-[#B7DDEC]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                WinterVell
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#8899A6]">
              {commercial.tagline}
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#56616C]">
              {commercial.ownershipLine}
            </p>

            {/* Contact emails */}
            <div className="mt-4 space-y-1.5">
              <a
                href={`mailto:${commercial.contact.supportEmail}`}
                className="flex items-center gap-2 text-xs text-[#8899A6] transition-colors hover:text-[#B7DDEC]"
              >
                Support: {commercial.contact.supportEmail}
              </a>
              <a
                href={`mailto:${commercial.contact.salesEmail}`}
                className="flex items-center gap-2 text-xs text-[#8899A6] transition-colors hover:text-[#B7DDEC]"
              >
                Sales: {commercial.contact.salesEmail}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-widest text-[#B7DDEC]/70 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative text-sm text-[#8899A6] transition-colors duration-200 hover:text-[#B7DDEC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#142634] rounded-sm"
                    >
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#B7DDEC]/50 transition-all duration-300 group-hover:w-full"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-[#1E3A4F] py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#8899A6]">
              &copy; {new Date().getFullYear()} WinterVell. All rights reserved.
            </p>
            <div className="flex flex-col gap-1 sm:items-end">
              <p className="text-xs text-[#56616C]">
                Proprietary software &mdash; WinterVell Commercial Source License
                (WV-CSL) v1.0
              </p>
              <p className="text-[10px] text-[#56616C]/60">
                Self-hosted &middot; Source code &middot; Bring-your-own AI keys
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
