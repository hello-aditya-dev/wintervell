"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, Snowflake, X } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";

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

/* ── Animated nav link with underline ─────────────────────────────── */
function NavLink({
  href,
  label,
  isActive,
  prefersReducedMotion,
}: {
  href: string;
  label: string;
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  return (
    <a
      href={href}
      className="group relative rounded-md px-3 py-1.5 text-sm font-medium text-[#56616C] transition-colors hover:text-[#111820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
    >
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#2563EB] origin-left"
        initial={false}
        animate={
          prefersReducedMotion
            ? { scaleX: isActive ? 1 : 0 }
            : { scaleX: isActive ? 1 : 0 }
        }
        whileHover={prefersReducedMotion ? {} : { scaleX: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ scaleX: isActive ? 1 : 0 }}
        aria-hidden="true"
      />
      {/* Active dot indicator */}
      {isActive && (
        <motion.span
          className="absolute -top-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#2563EB]"
          layoutId={prefersReducedMotion ? undefined : "activeNavDot"}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

export default function Header() {
  const prefersReducedMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  /* ── Track scroll for shadow ──────────────────────────────────── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  /* ── IntersectionObserver for active section ─────────────────── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Lock body scroll when mobile menu open ──────────────────── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── Close mobile menu on Escape ─────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className="no-print sticky top-0 z-50 w-full transition-shadow duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        boxShadow: scrolled
          ? "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)"
          : "0 1px 0 rgba(221,227,231,0.6)",
        borderBottom: "1px solid rgba(221, 227, 231, 0.6)",
      }}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="WinterVell home">
          <SnowflakeLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            return (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeSection === sectionId}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          })}
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-5 text-[#111820]" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="size-5 text-[#111820]" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* ── Mobile Slide-in Menu ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[300px] flex-col bg-white shadow-xl lg:hidden"
              initial={prefersReducedMotion ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? { x: 0, opacity: 0 } : { x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-[#DDE3E7] px-6 py-4">
                <SnowflakeLogo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobile}
                  aria-label="Close navigation menu"
                  className="size-8"
                >
                  <X className="size-4 text-[#56616C]" />
                </Button>
              </div>

              {/* Nav links with staggered animation */}
              <nav
                className="flex flex-col gap-1 px-4 py-4 overflow-y-auto scrollbar-wv"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((link, i) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                        isActive
                          ? "bg-[#EFF8FC] text-[#2563EB]"
                          : "text-[#56616C] hover:bg-[#F4F6F7] hover:text-[#111820]"
                      }`}
                    >
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom actions */}
              <div className="mt-auto flex flex-col gap-3 border-t border-[#DDE3E7] px-6 py-4">
                <a
                  href="#sign-in"
                  onClick={closeMobile}
                  className="rounded-md px-3 py-2.5 text-center text-sm font-medium text-[#56616C] transition-colors hover:text-[#111820]"
                >
                  Sign in
                </a>
                <Button
                  variant="outline"
                  className="w-full border-[#DDE3E7] text-[#142634] hover:bg-[#F4F6F7]"
                  asChild
                >
                  <a href="#demo" onClick={closeMobile}>
                    Explore demo
                  </a>
                </Button>
                <Button
                  className="w-full bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                  asChild
                >
                  <a href="#pricing" onClick={closeMobile}>
                    Buy licence
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
