"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Globe,
  Mail,
  Image,
  Phone,
  FileText,
  FileBarChart,
  PenTool,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Search,
  Star,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── White-label features ─── */
const WL_FEATURES = [
  { icon: Image, label: "Custom logo" },
  { icon: Palette, label: "Custom colours" },
  { icon: Globe, label: "Custom domain" },
  { icon: Mail, label: "Custom sender" },
  { icon: Phone, label: "Agency contact information" },
  { icon: FileText, label: "Service catalogue" },
  { icon: FileBarChart, label: "Report templates" },
  { icon: PenTool, label: "Proposal branding" },
  { icon: EyeOff, label: "Client-facing removal of WinterVell branding" },
] as const;

/* ─── Demonstration agencies ─── */
interface AgencyTheme {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  bg: string;
  text: string;
  surface: string;
  border: string;
  tagline: string;
  icon: typeof BarChart3;
  pattern: string; // SVG pattern identifier for background
  accentGradient: string;
}

const AGENCIES: AgencyTheme[] = [
  {
    name: "Northstar Digital",
    primary: "#2563EB",
    primaryLight: "#EFF8FC",
    primaryDark: "#1D4ED8",
    bg: "#FFFFFF",
    text: "#111820",
    surface: "#F4F6F7",
    border: "#DDE3E7",
    tagline: "Digital strategy that guides you forward",
    icon: Star,
    pattern: "dots",
    accentGradient: "linear-gradient(135deg, #2563EB, #60A5FA)",
  },
  {
    name: "Cedarline Creative",
    primary: "#24584F",
    primaryLight: "#ECFDF5",
    primaryDark: "#1A3F38",
    bg: "#FFFFFF",
    text: "#111820",
    surface: "#F4F6F7",
    border: "#DDE3E7",
    tagline: "Rooted in craft, growing with purpose",
    icon: BarChart3,
    pattern: "leaves",
    accentGradient: "linear-gradient(135deg, #24584F, #34D399)",
  },
  {
    name: "HarborDesk Studio",
    primary: "#B7791F",
    primaryLight: "#FFFBEB",
    primaryDark: "#92400E",
    bg: "#1A1A2E",
    text: "#F0EDE6",
    surface: "#252540",
    border: "#3A3A5C",
    tagline: "Where bold ideas find safe harbour",
    icon: Shield,
    pattern: "waves",
    accentGradient: "linear-gradient(135deg, #B7791F, #F59E0B)",
  },
];

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const previewVariants = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, y: -8, transition: { duration: 0.25, ease: "easeIn" } },
};

/* ─── Report preview data ─── */
const REPORT_SECTIONS = [
  { label: "Technical Health", score: 78 },
  { label: "SEO Foundations", score: 45 },
  { label: "Performance", score: 62 },
];

/* ─── Background pattern SVGs ─── */
function BackgroundPattern({ pattern, color }: { pattern: string; color: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (pattern === "dots") {
    return (
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-pattern)" />
      </motion.svg>
    );
  }

  if (pattern === "leaves") {
    return (
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <pattern id="leaves-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M15 5 Q20 15 15 25 Q10 15 15 5Z" fill={color} opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leaves-pattern)" />
      </motion.svg>
    );
  }

  // waves pattern
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.04 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <pattern id="waves-pattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q10 5 20 10 Q30 15 40 10" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#waves-pattern)" />
    </motion.svg>
  );
}

/* ─── Color swatch component ─── */
function ColorSwatches({ agency }: { agency: AgencyTheme }) {
  const prefersReducedMotion = useReducedMotion();
  const swatches = [
    { label: "Primary", color: agency.primary },
    { label: "Light", color: agency.primaryLight },
    { label: "Dark", color: agency.primaryDark },
    { label: "Surface", color: agency.surface },
    { label: "Text", color: agency.text },
  ];

  return (
    <div className="flex items-center gap-2 mt-4">
      {swatches.map((swatch, i) => (
        <motion.div
          key={swatch.label}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="group relative"
        >
          <motion.div
            className="size-7 rounded-md border border-white/20 shadow-sm cursor-pointer"
            style={{ backgroundColor: swatch.color }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.2, y: -2 }}
            transition={{ duration: 0.15 }}
          >
            {/* Tooltip on hover */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#142634] text-white text-[8px] px-1.5 py-0.5 rounded pointer-events-none">
              {swatch.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Animated feature list items ─── */
function AnimatedFeatureList({ agency, selectedAgency }: { agency: AgencyTheme; selectedAgency: number }) {
  const prefersReducedMotion = useReducedMotion();
  const features = [
    { icon: "✦", text: `Branded as ${agency.name}` },
    { icon: "✦", text: `${agency.primary} colour scheme applied` },
    { icon: "✦", text: "Custom domain & sender" },
    { icon: "✦", text: "WinterVell branding removed" },
  ];

  return (
    <div className="mt-4 space-y-2">
      {features.map((feat, i) => (
        <motion.div
          key={`${selectedAgency}-${i}`}
          initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
          className="flex items-center gap-2"
        >
          <span className="text-[10px]" style={{ color: agency.primary }} aria-hidden="true">
            {feat.icon}
          </span>
          <span className="text-[10px] text-[#56616C]">{feat.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function WhiteLabelSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedAgency, setSelectedAgency] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const agency = AGENCIES[selectedAgency];

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const AgencyIcon = agency.icon;

  const handleAgencyChange = (index: number) => {
    if (index === selectedAgency) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedAgency(index);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section id="white-label" className="bg-[#F4F6F7] relative overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Your agency should receive the credit.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Every report, proposal, and touchpoint carries your brand — not ours.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-3"
        >
          {WL_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.label}
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }
                }
                className="flex items-center gap-3 rounded-xl border border-[#DDE3E7] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EFF8FC]">
                  <Icon className="size-4 text-[#2563EB]" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-[#111820]">{feat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive brand-switching preview */}
        <motion.div variants={headingVariants} className="mt-14 sm:mt-20">
          <h3 className="text-center text-lg font-semibold text-[#111820]">
            See how your brand looks in the report
          </h3>
          <p className="mt-1 text-center text-sm text-[#56616C]">
            Select a demonstration agency to preview the white-label experience.
          </p>

          {/* Agency selector buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {AGENCIES.map((a, i) => {
              const isSelected = i === selectedAgency;
              return (
                <motion.button
                  key={a.name}
                  onClick={() => handleAgencyChange(i)}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  className={`relative inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                    isSelected
                      ? "border-transparent bg-white shadow-lg scale-[1.02]"
                      : "border-[#DDE3E7] bg-white hover:border-[#B7DDEC] hover:shadow-sm"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Select ${a.name} demonstration agency`}
                >
                  {/* Active glow effect */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${a.primary}15, ${a.primary}08)`,
                      }}
                      layoutId="agencyGlow"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Active border with gradient */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2"
                      style={{
                        borderColor: a.primary,
                      }}
                      layoutId="agencyBorder"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <div className="relative flex items-center gap-2">
                    <motion.div
                      className="size-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: a.primary }}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.15 }}
                      aria-hidden="true"
                    />
                    <span className="text-[#111820]">{a.name}</span>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle2 className="size-4" style={{ color: a.primary }} aria-hidden="true" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-center">
            <Badge
              variant="outline"
              className="border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px]"
            >
              Demonstration brands — fictional
            </Badge>
          </div>

          {/* Report card preview with crossfade */}
          <div className="mx-auto mt-8 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={agency.name}
                variants={previewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Card
                  className="overflow-hidden shadow-lg border-0 relative"
                  style={{ backgroundColor: agency.bg }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <BackgroundPattern pattern={agency.pattern} color={agency.primary} />
                  </div>

                  <CardContent className="p-0 relative z-10">
                    <div className="p-4 sm:p-6">
                      <div
                        className="rounded-lg border shadow-sm overflow-hidden relative"
                        style={{ backgroundColor: agency.bg, borderColor: agency.border }}
                      >
                        {/* Gradient accent bar at top */}
                        <div
                          className="h-1"
                          style={{
                            background: agency.accentGradient,
                          }}
                          aria-hidden="true"
                        />

                        {/* Report header */}
                        <div
                          className="border-b px-6 py-5"
                          style={{ borderColor: agency.border }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="flex size-10 items-center justify-center rounded-lg"
                                style={{ backgroundColor: agency.primary }}
                                whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <AgencyIcon
                                  className="size-5 text-white"
                                  aria-hidden="true"
                                />
                              </motion.div>
                              <div>
                                <p
                                  className="text-sm font-bold"
                                  style={{ color: agency.text }}
                                >
                                  {agency.name}
                                </p>
                                <p
                                  className="text-xs"
                                  style={{ color: agency.primary }}
                                >
                                  {agency.tagline}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className="text-sm font-semibold"
                                style={{ color: agency.text }}
                              >
                                Website Audit Report
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: agency.text, opacity: 0.6 }}
                              >
                                meridianhealth.example
                              </p>
                            </div>
                          </div>

                          {/* Color swatches */}
                          <ColorSwatches agency={agency} />
                        </div>

                        {/* Executive summary */}
                        <div
                          className="border-b px-6 py-5"
                          style={{ borderColor: agency.border }}
                        >
                          <h3
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: agency.text, opacity: 0.5 }}
                          >
                            Executive Summary
                          </h3>
                          <p
                            className="mt-2 text-sm leading-relaxed"
                            style={{ color: agency.text }}
                          >
                            This website presents significant opportunities for improvement
                            across security, performance, and search visibility. The site scores{" "}
                            <strong style={{ color: agency.primary }}>47/100</strong> overall, with critical security vulnerabilities
                            and below-average mobile performance.
                          </p>
                        </div>

                        {/* Score overview */}
                        <div
                          className="border-b px-6 py-5"
                          style={{ borderColor: agency.border }}
                        >
                          <h3
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: agency.text, opacity: 0.5 }}
                          >
                            Score Overview
                          </h3>
                          <div className="mt-4 space-y-3">
                            {REPORT_SECTIONS.map((sec, i) => (
                              <motion.div
                                key={`${selectedAgency}-${sec.label}`}
                                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className="text-xs"
                                    style={{ color: agency.text }}
                                  >
                                    {sec.label}
                                  </span>
                                  <span
                                    className="text-xs font-bold"
                                    style={{ color: agency.primary }}
                                  >
                                    {sec.score}
                                  </span>
                                </div>
                                <div
                                  className="mt-1 h-2 w-full rounded-full overflow-hidden"
                                  style={{ backgroundColor: agency.surface }}
                                >
                                  <motion.div
                                    className="h-full rounded-full relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${sec.score}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                                    style={{
                                      background: agency.accentGradient,
                                    }}
                                  >
                                    {/* Shine on bar */}
                                    <motion.div
                                      className="absolute inset-0"
                                      style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                                        backgroundSize: "200% 100%",
                                      }}
                                      animate={prefersReducedMotion ? undefined : {
                                        backgroundPosition: ["-200% 0%", "200% 0%"],
                                      }}
                                      transition={{ duration: 1.5, delay: 0.8 + i * 0.1 }}
                                    />
                                  </motion.div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Animated feature list */}
                        <div
                          className="border-b px-6 py-5"
                          style={{ borderColor: agency.border }}
                        >
                          <h3
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: agency.text, opacity: 0.5 }}
                          >
                            White-Label Features
                          </h3>
                          <AnimatedFeatureList agency={agency} selectedAgency={selectedAgency} />
                        </div>

                        {/* CTA */}
                        <div className="px-6 py-5">
                          <div
                            className="rounded-lg border p-4 text-center relative overflow-hidden"
                            style={{
                              borderColor: agency.primary,
                              backgroundColor: agency.primaryLight,
                            }}
                          >
                            {/* Decorative gradient */}
                            <div
                              className="absolute inset-0 opacity-[0.05] pointer-events-none"
                              style={{
                                background: agency.accentGradient,
                              }}
                              aria-hidden="true"
                            />
                            <p
                              className="text-sm font-semibold relative z-10"
                              style={{ color: agency.text }}
                            >
                              Ready to improve your website?
                            </p>
                            <p
                              className="mt-1 text-xs relative z-10"
                              style={{ color: agency.text, opacity: 0.7 }}
                            >
                              Contact {agency.name} to discuss the recommended improvements.
                            </p>
                            <motion.button
                              className="mt-3 inline-flex items-center gap-2 rounded-md px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors relative z-10 overflow-hidden"
                              style={{ backgroundColor: agency.primary }}
                              whileHover={prefersReducedMotion ? undefined : { scale: 1.03, brightness: 1.1 }}
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            >
                              {/* Hover glow */}
                              <motion.div
                                className="absolute inset-0"
                                style={{
                                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                                }}
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                              Schedule a consultation
                              <ArrowRight className="size-3.5" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
