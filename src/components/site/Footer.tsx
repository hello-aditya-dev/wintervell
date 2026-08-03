import Link from "next/link";
import { Snowflake } from "lucide-react";

const NAV_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Demo", href: "/demo" },
      { label: "White label", href: "/white-label" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Due diligence", href: "/due-diligence" },
      { label: "Licence", href: "/license" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Commercial licence", href: "/license" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer
      className="no-print mt-auto border-t border-border bg-[#142634]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 lg:grid-cols-5 lg:gap-8">
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
              Turn any website into a sales-ready audit.
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#56616C]">
              Own the code. Use your domain. Keep the client revenue.
            </p>
          </div>

          {/* Link columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-widest text-[#B7DDEC]/70 uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8899A6] transition-colors duration-200 hover:text-[#B7DDEC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9BD5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#142634] rounded-sm"
                    >
                      {link.label}
                    </Link>
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
