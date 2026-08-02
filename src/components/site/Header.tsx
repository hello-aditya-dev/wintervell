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
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "White label", href: "#white-label" },
  { label: "Live demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Documentation", href: "#docs" },
  { label: "Due diligence", href: "#due-diligence" },
] as const;

function SnowflakeLogo() {
  return (
    <div className="flex items-center gap-2">
      <Snowflake
        className="size-6 text-[#2563EB]"
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className="text-lg font-semibold tracking-tight text-[#111820]">
        WinterVell
      </span>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 h-16 w-full border-b border-[#DDE3E7] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      role="banner"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="WinterVell home">
          <SnowflakeLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#56616C] transition-colors hover:bg-[#F4F6F7] hover:text-[#111820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#sign-in"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-[#56616C] transition-colors hover:text-[#111820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            Sign in
          </a>
          <Button
            variant="outline"
            size="sm"
            className="border-[#DDE3E7] text-[#142634] hover:bg-[#F4F6F7] hover:text-[#111820]"
            asChild
          >
            <a href="#demo">Explore demo</a>
          </Button>
          <Button
            size="sm"
            className="bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
            asChild
          >
            <a href="#pricing">Buy licence</a>
          </Button>
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
              <Menu className="size-5 text-[#111820]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white p-0">
            <SheetHeader className="border-b border-[#DDE3E7] px-6 py-4">
              <SheetTitle>
                <SnowflakeLogo />
              </SheetTitle>
            </SheetHeader>
            <nav
              className="flex flex-col gap-1 px-4 py-4"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-[#56616C] transition-colors hover:bg-[#F4F6F7] hover:text-[#111820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-[#DDE3E7] px-6 py-4">
              <a
                href="#sign-in"
                className="rounded-md px-3 py-2.5 text-center text-sm font-medium text-[#56616C] transition-colors hover:text-[#111820]"
              >
                Sign in
              </a>
              <Button
                variant="outline"
                className="w-full border-[#DDE3E7] text-[#142634] hover:bg-[#F4F6F7]"
                asChild
              >
                <a href="#demo">Explore demo</a>
              </Button>
              <Button
                className="w-full bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                asChild
              >
                <a href="#pricing">Buy licence</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
