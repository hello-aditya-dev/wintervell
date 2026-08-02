"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileText, BookOpen, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commercial } from "@/config/commercial";

/* ─── Trust items ─── */
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: "Secure checkout",
    // Only state "secure checkout" after using a reputable configured checkout provider
    requiresProvider: true,
  },
  {
    icon: FileText,
    label: "Commercial licence included",
    requiresProvider: false,
  },
  {
    icon: BookOpen,
    label: "Deployment documentation included",
    requiresProvider: false,
  },
  {
    icon: Package,
    label: "Source delivery after verified payment",
    requiresProvider: false,
  },
] as const;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.2 }, variants: containerVariants };

  // Determine if a checkout provider is configured
  const hasCheckoutProvider = Boolean(
    commercial.checkout.agencyUrl || commercial.checkout.studioUrl
  );

  return (
    <section id="final-cta" className="bg-[#142634]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Heading */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Turn your next website review into a commercial opportunity.
          </motion.h2>

          {/* Supporting copy */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 text-lg leading-relaxed text-[#B7DDEC] sm:text-xl"
          >
            Deploy WinterVell under your own brand and connect website evidence
            directly to reports, proposals and pipeline.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="h-13 px-8 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm"
              asChild
            >
              <a href="#pricing">
                Buy the source licence
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 px-8 text-base font-semibold border-[#B7DDEC]/30 text-[#B7DDEC] hover:bg-[#1A2E3E] hover:text-white"
              asChild
            >
              <a href="#demo">
                Explore the live demo
              </a>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={containerVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {TRUST_ITEMS.map((item) => {
              // Only show "Secure checkout" if a checkout provider is configured
              if (item.requiresProvider && !hasCheckoutProvider) {
                return null;
              }

              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm text-[#B7DDEC]/70"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
