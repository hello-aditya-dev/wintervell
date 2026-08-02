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
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { commercial } from "@/config/commercial";

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

export default function PricingSection() {
  const prefersReducedMotion = useReducedMotion();

  const { pricing, checkout, founding } = commercial;

  const agencyCheckoutAvailable = checkout.agencyUrl !== "";
  const studioCheckoutAvailable = checkout.studioUrl !== "";
  const enterpriseContactAvailable = checkout.enterpriseContactUrl !== "";

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

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
            <Badge
              variant="outline"
              className="mt-3 border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F]"
            >
              <Star className="mr-1 size-3" aria-hidden="true" />
              {founding.remainingCount} founding licences remaining
            </Badge>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Agency */}
          <motion.div variants={cardVariants}>
            <Card className="flex h-full flex-col border-[#DDE3E7] bg-white shadow-sm">
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
                  <span className="ml-2 text-sm text-[#56616C] line-through">
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
                    className="w-full bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
                    size="lg"
                  >
                    <a href={checkout.agencyUrl}>
                      {pricing.agency.cta} — ${pricing.agency.foundingPrice}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-[#111820]/10 text-[#56616C] hover:bg-[#111820]/10"
                    size="lg"
                  >
                    Purchasing opens soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>

          {/* Studio */}
          <motion.div variants={cardVariants}>
            <Card className="relative flex h-full flex-col border-[#24584F] bg-white shadow-md">
              {/* Badge */}
              {pricing.studio.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="border-[#24584F]/20 bg-[#24584F] text-white">
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
                  <span className="ml-2 text-sm text-[#56616C] line-through">
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
                    className="w-full bg-[#24584F] text-white hover:bg-[#24584F]/90"
                    size="lg"
                  >
                    <a href={checkout.studioUrl}>
                      {pricing.studio.cta} — ${pricing.studio.foundingPrice}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-[#111820]/10 text-[#56616C] hover:bg-[#111820]/10"
                    size="lg"
                  >
                    Purchasing opens soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>

          {/* Enterprise */}
          <motion.div variants={cardVariants}>
            <Card className="flex h-full flex-col border-[#DDE3E7] bg-white shadow-sm">
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
                    className="w-full border-[#111820] text-[#111820] hover:bg-[#111820] hover:text-white"
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
                    className="w-full border-[#111820] text-[#111820] hover:bg-[#111820] hover:text-white"
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
