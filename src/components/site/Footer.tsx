import { Snowflake } from "lucide-react";

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
      { label: "Security", href: "#docs" },
      { label: "Due Diligence", href: "#due-diligence" },
      { label: "FAQ", href: "#docs" },
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
      className="mt-auto border-t border-[#DDE3E7] bg-[#142634]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section: branding + columns */}
        <div className="grid gap-10 py-12 lg:grid-cols-6 lg:gap-8">
          {/* Branding column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Snowflake
                className="size-6 text-[#B7DDEC]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                WinterVell
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#8899A6]">
              Turn any website into a sales-ready audit.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#8899A6] transition-colors hover:text-[#B7DDEC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#142634] rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-[#2A3A4A] py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#8899A6]">
              &copy; 2026 WinterVell. All rights reserved.
            </p>
            <p className="text-xs text-[#56616C]">
              Proprietary software &mdash; WinterVell Commercial Source License
              (WV-CSL) v1.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
