"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileText, BookOpen, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { commercial } from "@/config/commercial";

/* ─── Trust items ─── */
const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: "Secure checkout",
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
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
    <section id="final-cta" className="relative overflow-hidden bg-[#142634]">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Radial gradient glow */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, #2563EB, transparent 70%)",
          }}
        />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #B7DDEC 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute -left-40 top-1/3 size-80 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div
          className="absolute -right-40 bottom-1/3 size-96 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #B7DDEC, transparent 70%)" }}
        />
      </div>

      {/* Animated glow behind CTA */}
      {!prefersReducedMotion && (
        <motion.div
          variants={glowVariants}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div
            className="size-[600px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, #2563EB, transparent 60%)",
              animation: "pulse-glow 4s ease-in-out infinite",
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        <div className="mx-auto max-w-3xl text-center">
          {/* Founding badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B7791F]/30 bg-[#B7791F]/10 px-4 py-1.5"
          >
            <Sparkles className="size-3.5 text-[#B7791F]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#B7791F]">
              Founding pricing — limited availability
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Turn your next website review into a{" "}
            <span className="relative">
              <span className="relative z-10 text-[#B7DDEC]">commercial opportunity</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#2563EB]/20"
                aria-hidden="true"
              />
            </span>
            .
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
              className="group relative h-13 overflow-hidden px-8 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#2563EB]/30"
              asChild
            >
              <a href="#pricing">
                <span className="relative z-10 flex items-center gap-2">
                  Buy the source licence
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-13 px-8 text-base font-semibold border-[#B7DDEC]/30 text-[#B7DDEC] hover:bg-[#1A2E3E] hover:text-white transition-all duration-300 hover:border-[#B7DDEC]/50"
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
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {TRUST_ITEMS.map((item) => {
              if (item.requiresProvider && !hasCheckoutProvider) {
                return null;
              }

              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm text-[#B7DDEC]/70 transition-colors duration-200 hover:text-[#B7DDEC]"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pricing from line */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-sm text-[#8899A6]"
          >
            Agency Source Licence from{" "}
            <span className="font-semibold text-[#B7DDEC]">
              ${commercial.pricing.agency.foundingPrice}
            </span>
            {" "}· Studio from{" "}
            <span className="font-semibold text-[#B7DDEC]">
              ${commercial.pricing.studio.foundingPrice}
            </span>
            {" "}· Enterprise from{" "}
            <span className="font-semibold text-[#B7DDEC]">
              ${commercial.pricing.enterprise.fromPrice}
            </span>
          </motion.p>
        </div>
      </motion.div>

      {/* CSS for pulse glow animation */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.06; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}
