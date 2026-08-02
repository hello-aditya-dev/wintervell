"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  Shield,
  Star,
  Building2,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { commercial } from "@/config/commercial";

/* ─── Constants ─── */
// Total founding licences — configurable. `founding.remainingCount` tracks how many are left.
const TOTAL_FOUNDING_LICENCES = 10;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─── Helpers ─── */
function CheckIcon() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#24584F]/10">
      <Check className="size-3 text-[#24584F]" aria-hidden="true" />
    </span>
  );
}

function ClarificationIcon() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#B7791F]/10">
      <X className="size-3 text-[#B7791F]" aria-hidden="true" />
    </span>
  );
}

/* ─── "Purchasing opens soon" disabled button ─── */
function PurchasingOpensSoonButton() {
  return (
    <Button
      disabled
      aria-disabled="true"
      className="w-full cursor-not-allowed border border-dashed border-[#DDE3E7] bg-[#F4F6F7]/60 text-[#56616C] hover:bg-[#F4F6F7]/60"
      size="lg"
    >
      <Clock className="mr-2 size-4 animate-pulse text-[#B7791F]" aria-hidden="true" />
      Purchasing opens soon
    </Button>
  );
}

export default function PricingSection() {
  const prefersReducedMotion = useReducedMotion();

  const { pricing, checkout, founding } = commercial;

  const agencyCheckoutAvailable = checkout.agencyUrl !== "";
  const studioCheckoutAvailable = checkout.studioUrl !== "";
  const enterpriseContactAvailable = checkout.enterpriseContactUrl !== "";

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const remainingPct = Math.max(
    0,
    Math.min(100, (founding.remainingCount / TOTAL_FOUNDING_LICENCES) * 100),
  );

  return (
    <section id="pricing" className="bg-[#FFFFFF]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Transparent, direct pricing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            {founding.label}
          </p>

          {founding.isLimited && founding.remainingCount > 0 && (
            <div className="mt-6 flex flex-col items-center gap-4">
              {/* Pulsing founding-availability badge */}
              <motion.div
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <Badge className="border-none bg-gradient-to-r from-[#B7791F] to-[#B7791F]/80 px-3 py-1 text-white shadow-md">
                  <Star className="mr-1.5 size-3" aria-hidden="true" />
                  {founding.remainingCount} founding licences remaining
                </Badge>
              </motion.div>

              {/* Founding licences remaining progress bar */}
              <div className="w-full max-w-xs">
                <div className="mb-1.5 flex items-center justify-between text-xs text-[#56616C]">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-1.5 rounded-full bg-[#B7791F] animate-pulse"
                      aria-hidden="true"
                    />
                    Founding availability
                  </span>
                  <span className="font-semibold text-[#111820]">
                    {founding.remainingCount}/{TOTAL_FOUNDING_LICENCES} remaining
                  </span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-[#DDE3E7]"
                  role="progressbar"
                  aria-label="Founding licences remaining"
                  aria-valuenow={founding.remainingCount}
                  aria-valuemin={0}
                  aria-valuemax={TOTAL_FOUNDING_LICENCES}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#24584F] to-[#2563EB]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${remainingPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Agency */}
          <motion.div variants={cardVariants}>
            <Card className="flex h-full flex-col border-[#DDE3E7] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <Shield className="size-5 text-[#24584F]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">
                    {pricing.agency.name}
                  </h3>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-[#111820]">
                    ${pricing.agency.foundingPrice}
                  </span>
                  <span className="ml-2 text-sm font-medium text-[#56616C] line-through decoration-[#B43C3C] decoration-2 underline-offset-2">
                    ${pricing.agency.anchorPrice}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#56616C]">
                  {pricing.agency.description}
                </p>
              </CardHeader>

              <CardContent className="flex-1 pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#24584F]">
                  Includes
                </p>
                <ul className="space-y-2.5" role="list">
                  {pricing.agency.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#111820]">
                      <CheckIcon />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {pricing.agency.clarifications.length > 0 && (
                  <>
                    <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-[#B7791F]">
                      Clarifications
                    </p>
                    <ul className="space-y-2.5" role="list">
                      {pricing.agency.clarifications.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#56616C]">
                          <ClarificationIcon />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>

              <CardFooter className="pt-0">
                {agencyCheckoutAvailable ? (
                  <Button
                    asChild
                    className="w-full bg-[#2563EB] text-white transition-all duration-200 hover:bg-[#2563EB]/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    size="lg"
                  >
                    <a href={checkout.agencyUrl}>
                      {pricing.agency.cta} — ${pricing.agency.foundingPrice}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <PurchasingOpensSoonButton />
                )}
              </CardFooter>
            </Card>
          </motion.div>

          {/* Studio — highlighted tier with gradient border */}
          <motion.div variants={cardVariants} className="relative">
            {/* Gradient border ring (Action blue → Pine) */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-[#2563EB] to-[#24584F] shadow-[0_0_0_1px_rgba(37,99,235,0.08)]"
              aria-hidden="true"
            />
            <Card className="relative flex h-full flex-col border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {/* Prominent gradient badge (existing copy, more visual weight) */}
              {pricing.studio.badge && (
                <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
                  <Badge className="border-none bg-gradient-to-r from-[#2563EB] to-[#24584F] px-3 py-1 text-white shadow-md">
                    <Sparkles className="mr-1.5 size-3" aria-hidden="true" />
                    {pricing.studio.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-0 pt-6">
                <div className="flex items-center gap-2">
                  <Building2 className="size-5 text-[#24584F]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">
                    {pricing.studio.name}
                  </h3>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-[#111820]">
                    ${pricing.studio.foundingPrice}
                  </span>
                  <span className="ml-2 text-sm font-medium text-[#56616C] line-through decoration-[#B43C3C] decoration-2 underline-offset-2">
                    ${pricing.studio.anchorPrice}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#56616C]">
                  {pricing.studio.description}
                </p>
              </CardHeader>

              <CardContent className="flex-1 pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#24584F]">
                  Includes
                </p>
                <ul className="space-y-2.5" role="list">
                  {pricing.studio.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#111820]">
                      <CheckIcon />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                {studioCheckoutAvailable ? (
                  <Button
                    asChild
                    className="w-full bg-[#24584F] text-white transition-all duration-200 hover:bg-[#24584F]/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    size="lg"
                  >
                    <a href={checkout.studioUrl}>
                      {pricing.studio.cta} — ${pricing.studio.foundingPrice}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <PurchasingOpensSoonButton />
                )}
              </CardFooter>
            </Card>
          </motion.div>

          {/* Enterprise */}
          <motion.div variants={cardVariants}>
            <Card className="flex h-full flex-col border-[#DDE3E7] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-[#56616C]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">
                    {pricing.enterprise.name}
                  </h3>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-[#111820]">
                    From ${pricing.enterprise.fromPrice.toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#56616C]">
                  {pricing.enterprise.description}
                </p>
              </CardHeader>

              <CardContent className="flex-1 pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#56616C]">
                  Includes
                </p>
                <ul className="space-y-2.5" role="list">
                  {pricing.enterprise.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#111820]">
                      <CheckIcon />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                {enterpriseContactAvailable ? (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#111820] text-[#111820] transition-all duration-200 hover:bg-[#111820] hover:text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    size="lg"
                  >
                    <a href={checkout.enterpriseContactUrl}>
                      {pricing.enterprise.cta}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#111820] text-[#111820] transition-all duration-200 hover:bg-[#111820] hover:text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    size="lg"
                  >
                    <a href={`mailto:${commercial.contact.salesEmail}`}>
                      {pricing.enterprise.cta}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div variants={headingVariants} className="mt-10 text-center">
          <p className="text-xs text-[#56616C]">
            All prices are in USD. Founding pricing is limited to the first {founding.remainingCount} source-code
            customers and may change without notice. See the{" "}
            <a href="#license" className="font-medium text-[#2563EB] underline underline-offset-2 hover:text-[#2563EB]/80">
              full commercial licence
            </a>{" "}
            for complete terms.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
