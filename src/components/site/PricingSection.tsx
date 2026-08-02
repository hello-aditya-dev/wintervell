"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
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
  Zap,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { commercial } from "@/config/commercial";

/* ─── Constants ─── */
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

/* ─── Animated Price Counter ─── */
function AnimatedPrice({ value, isHovered }: { value: number; isHovered: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      motionVal.set(value);
      return;
    }

    const controls = animate(motionVal, isHovered ? value : 0, {
      duration: isHovered ? 0.6 : 0.4,
      ease: isHovered ? "easeOut" : "easeIn",
    });
    return () => controls.stop();
  }, [isHovered, value, prefersReducedMotion, motionVal]);

  // Subscribe to motion value changes and update DOM directly
  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (spanRef.current) {
        spanRef.current.textContent = `$${v.toLocaleString()}`;
      }
    });
    return unsubscribe;
  }, [rounded]);

  // For reduced motion, just render the value directly
  if (prefersReducedMotion) {
    return <span>${value.toLocaleString()}</span>;
  }

  return <span ref={spanRef}>$0</span>;
}

/* ─── Animated Check Icon ─── */
function AnimatedCheckIcon({ delay = 0 }: { delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#24584F]/10"
      initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
      whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 400, damping: 15, delay }}
    >
      <Check className="size-3 text-[#24584F]" aria-hidden="true" />
    </motion.span>
  );
}

function ClarificationIcon() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#B7791F]/10">
      <X className="size-3 text-[#B7791F]" aria-hidden="true" />
    </span>
  );
}

/* ─── Shimmer Badge ─── */
function ShimmerBadge({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-full">
      <Badge className="border-none bg-gradient-to-r from-[#2563EB] to-[#24584F] px-3 py-1 text-white shadow-md">
        <Sparkles className="mr-1.5 size-3" aria-hidden="true" />
        {children}
      </Badge>
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

/* ─── Urgency Indicator ─── */
function UrgencyIndicator({ remaining }: { remaining: number }) {
  const prefersReducedMotion = useReducedMotion();

  if (remaining <= 0) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <motion.div
        className="flex items-center gap-1.5 rounded-full bg-[#B43C3C]/10 px-3 py-1.5"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.03, 1], opacity: [1, 0.85, 1] }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="size-3.5 text-[#B43C3C]" aria-hidden="true" />
        <span className="text-xs font-semibold text-[#B43C3C]">
          Only {remaining} left at founding price
        </span>
      </motion.div>
      {/* Countdown-like animated dots */}
      {!prefersReducedMotion && (
        <div className="flex gap-0.5">
          {Array.from({ length: Math.min(remaining, 5) }).map((_, i) => (
            <motion.div
              key={i}
              className="size-1.5 rounded-full bg-[#B43C3C]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
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

/* ─── Pricing Card Wrapper with gradient border ─── */
function PricingCardWrapper({
  children,
  variant,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  children: React.ReactNode;
  variant: "agency" | "studio" | "enterprise";
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  const gradientStyles: Record<string, string> = {
    agency: "from-[#24584F]/40 via-[#DDE3E7]/60 to-[#24584F]/20",
    studio: "from-[#2563EB] via-[#B7DDEC] to-[#24584F]",
    enterprise: "from-[#56616C]/40 via-[#DDE3E7]/60 to-[#56616C]/20",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="relative"
    >
      {/* Gradient border ring */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b ${gradientStyles[variant]} transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"}`}
        aria-hidden="true"
      />

      {/* Subtle glow for studio tier */}
      {variant === "studio" && (
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.04) 40%, transparent 70%)",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.5, 1, 0.5] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}

      {children}
    </motion.div>
  );
}

export default function PricingSection() {
  const prefersReducedMotion = useReducedMotion();

  const { pricing, checkout, founding } = commercial;

  const agencyCheckoutAvailable = checkout.agencyUrl !== "";
  const studioCheckoutAvailable = checkout.studioUrl !== "";
  const enterpriseContactAvailable = checkout.enterpriseContactUrl !== "";

  const [agencyHovered, setAgencyHovered] = useState(false);
  const [studioHovered, setStudioHovered] = useState(false);
  const [enterpriseHovered, setEnterpriseHovered] = useState(false);

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

              {/* Urgency indicator */}
              <UrgencyIndicator remaining={founding.remainingCount} />
            </div>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Agency */}
          <PricingCardWrapper
            variant="agency"
            isHovered={agencyHovered}
            onHoverStart={() => setAgencyHovered(true)}
            onHoverEnd={() => setAgencyHovered(false)}
          >
            <Card className="relative flex h-full flex-col border-0 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <Shield className="size-5 text-[#24584F]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">
                    {pricing.agency.name}
                  </h3>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-[#111820]">
                    <AnimatedPrice value={pricing.agency.foundingPrice} isHovered={agencyHovered} />
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
                  {pricing.agency.includes.map((item, i) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#111820]">
                      <AnimatedCheckIcon delay={i * 0.04} />
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
          </PricingCardWrapper>

          {/* Studio — highlighted tier with gradient border */}
          <PricingCardWrapper
            variant="studio"
            isHovered={studioHovered}
            onHoverStart={() => setStudioHovered(true)}
            onHoverEnd={() => setStudioHovered(false)}
          >
            <Card className="relative flex h-full flex-col border-0 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              {/* Shimmer badge */}
              {pricing.studio.badge && (
                <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
                  <ShimmerBadge>{pricing.studio.badge}</ShimmerBadge>
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
                    <AnimatedPrice value={pricing.studio.foundingPrice} isHovered={studioHovered} />
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
                  {pricing.studio.includes.map((item, i) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#111820]">
                      <AnimatedCheckIcon delay={i * 0.04} />
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
          </PricingCardWrapper>

          {/* Enterprise */}
          <PricingCardWrapper
            variant="enterprise"
            isHovered={enterpriseHovered}
            onHoverStart={() => setEnterpriseHovered(true)}
            onHoverEnd={() => setEnterpriseHovered(false)}
          >
            <Card className="relative flex h-full flex-col border-0 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-[#56616C]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-[#111820]">
                    {pricing.enterprise.name}
                  </h3>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-[#111820]">
                    <AnimatedPrice value={pricing.enterprise.fromPrice} isHovered={enterpriseHovered} />
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
                  {pricing.enterprise.includes.map((item, i) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#111820]">
                      <AnimatedCheckIcon delay={i * 0.04} />
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
          </PricingCardWrapper>
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
