"use client";

import { useState } from "react";
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
  bg: string;
  text: string;
  surface: string;
  border: string;
  tagline: string;
  icon: typeof BarChart3;
}

const AGENCIES: AgencyTheme[] = [
  {
    name: "Northstar Digital",
    primary: "#2563EB",
    primaryLight: "#EFF8FC",
    bg: "#FFFFFF",
    text: "#111820",
    surface: "#F4F6F7",
    border: "#DDE3E7",
    tagline: "Digital strategy that guides you forward",
    icon: Star,
  },
  {
    name: "Cedarline Creative",
    primary: "#24584F",
    primaryLight: "#ECFDF5",
    bg: "#FFFFFF",
    text: "#111820",
    surface: "#F4F6F7",
    border: "#DDE3E7",
    tagline: "Rooted in craft, growing with purpose",
    icon: BarChart3,
  },
  {
    name: "HarborDesk Studio",
    primary: "#B7791F",
    primaryLight: "#FFFBEB",
    bg: "#1A1A2E",
    text: "#F0EDE6",
    surface: "#252540",
    border: "#3A3A5C",
    tagline: "Where bold ideas find safe harbour",
    icon: Shield,
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
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

/* ─── Report preview data ─── */
const REPORT_SECTIONS = [
  { label: "Technical Health", score: 78 },
  { label: "SEO Foundations", score: 45 },
  { label: "Performance", score: 62 },
];

export default function WhiteLabelSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedAgency, setSelectedAgency] = useState(0);
  const agency = AGENCIES[selectedAgency];

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  const AgencyIcon = agency.icon;

  return (
    <section id="white-label" className="bg-[#F4F6F7]">
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
                <button
                  key={a.name}
                  onClick={() => setSelectedAgency(i)}
                  className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                    isSelected
                      ? "border-[#2563EB] bg-white shadow-md scale-[1.02]"
                      : "border-[#DDE3E7] bg-white hover:border-[#B7DDEC] hover:shadow-sm"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Select ${a.name} demonstration agency`}
                >
                  <div
                    className="size-4 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: a.primary }}
                    aria-hidden="true"
                  />
                  <span className="text-[#111820]">{a.name}</span>
                  {isSelected && (
                    <CheckCircle2 className="size-4 text-[#2563EB]" aria-hidden="true" />
                  )}
                </button>
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

          {/* Report card preview */}
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
                  className="overflow-hidden shadow-lg border-0"
                  style={{ backgroundColor: agency.bg }}
                >
                  <CardContent className="p-0">
                    <div className="p-4 sm:p-6">
                      <div
                        className="rounded-lg border shadow-sm overflow-hidden"
                        style={{ backgroundColor: agency.bg, borderColor: agency.border }}
                      >
                        {/* Report header */}
                        <div
                          className="border-b px-6 py-5"
                          style={{ borderColor: agency.border }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex size-10 items-center justify-center rounded-lg"
                                style={{ backgroundColor: agency.primary }}
                              >
                                <AgencyIcon
                                  className="size-5 text-white"
                                  aria-hidden="true"
                                />
                              </div>
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
                            <strong>47/100</strong> overall, with critical security vulnerabilities
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
                            {REPORT_SECTIONS.map((sec) => (
                              <div key={sec.label}>
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
                                  className="mt-1 h-1.5 w-full rounded-full"
                                  style={{ backgroundColor: agency.surface }}
                                >
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${sec.score}%`,
                                      backgroundColor: agency.primary,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="px-6 py-5">
                          <div
                            className="rounded-lg border p-4 text-center"
                            style={{
                              borderColor: agency.primary,
                              backgroundColor: agency.primaryLight,
                            }}
                          >
                            <p
                              className="text-sm font-semibold"
                              style={{ color: agency.text }}
                            >
                              Ready to improve your website?
                            </p>
                            <p
                              className="mt-1 text-xs"
                              style={{ color: agency.text, opacity: 0.7 }}
                            >
                              Contact {agency.name} to discuss the recommended improvements.
                            </p>
                            <button
                              className="mt-3 inline-flex items-center gap-2 rounded-md px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors"
                              style={{ backgroundColor: agency.primary }}
                            >
                              Schedule a consultation
                              <ArrowRight className="size-3.5" aria-hidden="true" />
                            </button>
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
