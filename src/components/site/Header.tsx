"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { commercial } from "@/config/commercial";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Demo", href: "/demo" },
  { label: "White label", href: "/white-label" },
  { label: "Pricing", href: "/pricing" },
  { label: "Due diligence", href: "/due-diligence" },
] as const;

function SnowflakeMark() {
  return (
    <div className="flex items-center gap-2">
      <Snowflake
        className="size-5 text-primary"
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className="text-base font-semibold tracking-tight text-foreground">
        WinterVell
      </span>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasCheckout =
    commercial.checkout.agencyUrl || commercial.checkout.studioUrl;

  return (
    <header
      className="no-print sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="WinterVell home">
          <SnowflakeMark />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/pricing">View pricing</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/app">Open demo</Link>
          </Button>
          {!hasCheckout && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">Join the founding release</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>
                <SnowflakeMark />
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-1 px-4 py-2"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-border px-4 py-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                  View pricing
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/app" onClick={() => setMobileOpen(false)}>
                  Open demo
                </Link>
              </Button>
              {!hasCheckout && (
                <Button variant="ghost" className="w-full" asChild>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                  >
                    Join the founding release
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
