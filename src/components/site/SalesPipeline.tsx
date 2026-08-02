"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  UserPlus,
  Calendar,
  Loader2,
  Search,
  FileBarChart,
  Eye,
  Clock,
  FileText,
  MessageSquare,
  Trophy,
  XCircle,
  ArrowRight,
  Link2,
  BarChart3,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Pipeline stages ─── */
interface PipelineStage {
  id: string;
  label: string;
  icon: typeof UserPlus;
  color: string;
  colorLight: string;
  count: number;
  type: "active" | "won" | "lost";
}

const STAGES: PipelineStage[] = [
  { id: "new", label: "New prospect", icon: UserPlus, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active" },
  { id: "audit-planned", label: "Audit planned", icon: Calendar, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active" },
  { id: "audit-running", label: "Audit running", icon: Loader2, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active" },
  { id: "audit-review", label: "Audit review", icon: Search, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active" },
  { id: "report-sent", label: "Report sent", icon: FileBarChart, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active" },
  { id: "report-viewed", label: "Report viewed", icon: Eye, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active" },
  { id: "follow-up", label: "Follow-up due", icon: Clock, color: "#B7791F", colorLight: "#FFFBEB", count: 0, type: "active" },
  { id: "proposal-sent", label: "Proposal sent", icon: FileText, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active" },
  { id: "negotiation", label: "Negotiation", icon: MessageSquare, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active" },
  { id: "won", label: "Won", icon: Trophy, color: "#24584F", colorLight: "#ECFDF5", count: 0, type: "won" },
  { id: "lost", label: "Lost", icon: XCircle, color: "#B43C3C", colorLight: "#FEF2F2", count: 0, type: "lost" },
];

/* ─── Prospect cards per stage ─── */
interface ProspectCard {
  id: string;
  name: string;
  domain: string;
  auditScore: number;
  stage: string;
  services: string[];
}

const PROSPECTS: ProspectCard[] = [
  {
    id: "1",
    name: "Meridian Health Group",
    domain: "meridianhealth.example",
    auditScore: 47,
    stage: "report-sent",
    services: ["Security Hardening", "Performance Optimization"],
  },
  {
    id: "2",
    name: "Cedarline Property",
    domain: "cedarlineproperty.example",
    auditScore: 62,
    stage: "audit-running",
    services: ["SEO Foundations"],
  },
  {
    id: "3",
    name: "HarborDesk Software",
    domain: "harbordesk.example",
    auditScore: 38,
    stage: "new",
    services: ["Full Audit Package"],
  },
];

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Prospects for a given stage ─── */
function getProspectsForStage(stageId: string) {
  return PROSPECTS.filter((p) => p.stage === stageId);
}

/* ─── Stage color class helper ─── */
function getStageBorderColor(stage: PipelineStage) {
  if (stage.type === "won") return "border-[#24584F]/30";
  if (stage.type === "lost") return "border-[#B43C3C]/30";
  return "border-[#2563EB]/30";
}

export default function SalesPipeline() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="pipeline" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            A pipeline built for the audit-to-close workflow
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Every prospect, audit, report, and proposal stays connected — from first contact to
            final decision.
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <motion.div variants={headingVariants} className="mt-12 sm:mt-16">
          {/* Horizontal scrollable pipeline */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-start gap-2 min-w-max sm:min-w-0 sm:justify-center sm:flex-wrap sm:gap-2 lg:flex-nowrap">
              {STAGES.map((stage, i) => {
                const StageIcon = stage.icon;
                const prospects = getProspectsForStage(stage.id);
                const isLast = i === STAGES.length - 1;
                const isWonLost = stage.type === "won" || stage.type === "lost";

                return (
                  <div key={stage.id} className="flex items-start">
                    {/* Stage card */}
                    <div className="flex flex-col items-center w-24 sm:w-28">
                      {/* Stage circle */}
                      <div
                        className="flex size-11 items-center justify-center rounded-full border-2 shadow-sm transition-all"
                        style={{
                          borderColor: stage.color,
                          backgroundColor: stage.colorLight,
                        }}
                      >
                        <StageIcon className="size-4" style={{ color: stage.color }} aria-hidden="true" />
                      </div>

                      {/* Count badge */}
                      <div className="mt-1.5">
                        <Badge
                          className="border-0 text-[9px] font-bold text-white"
                          style={{ backgroundColor: stage.color }}
                        >
                          {stage.count}
                        </Badge>
                      </div>

                      {/* Stage label */}
                      <p
                        className="mt-1 text-[10px] font-semibold text-center leading-tight"
                        style={{ color: stage.color }}
                      >
                        {stage.label}
                      </p>

                      {/* Prospect mini-cards */}
                      {prospects.length > 0 && (
                        <div className="mt-2 w-full space-y-1.5">
                          {prospects.map((p) => (
                            <div
                              key={p.id}
                              className={`rounded-md border bg-white p-1.5 shadow-sm ${getStageBorderColor(stage)}`}
                            >
                              <p className="text-[9px] font-bold text-[#111820] truncate">
                                {p.name}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Globe className="size-2.5 text-[#56616C]" aria-hidden="true" />
                                <p className="text-[8px] text-[#56616C] truncate">
                                  {p.domain}
                                </p>
                              </div>
                              {p.auditScore > 0 && (
                                <div className="mt-1 flex items-center gap-1">
                                  <BarChart3 className="size-2.5 text-[#56616C]" aria-hidden="true" />
                                  <span className="text-[8px] font-bold text-[#56616C]">
                                    Score: {p.auditScore}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow connector */}
                    {!isLast && (
                      <div className="flex items-center pt-3.5 px-0.5 sm:px-1">
                        <ArrowRight className="size-3.5 text-[#DDE3E7]" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected audit & opportunity callout */}
          <motion.div variants={cardVariants} className="mx-auto mt-10 max-w-3xl">
            <Card className="border-[#B7DDEC] bg-white shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EFF8FC]">
                    <Link2 className="size-4 text-[#2563EB]" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111820]">
                      Audit and opportunity stay connected
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#56616C]">
                      When a prospect moves through the pipeline, the audit data, report, and
                      proposal travel with them. No disconnected spreadsheets. No lost context
                      between the technical analysis and the commercial conversation.
                    </p>

                    {/* Example flow */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="border-[#2563EB]/30 bg-[#EFF8FC] text-[#2563EB] text-[9px] gap-1">
                        <Shield className="size-2.5" aria-hidden="true" />
                        Audit: 47/100
                      </Badge>
                      <ArrowRight className="size-3 text-[#DDE3E7]" aria-hidden="true" />
                      <Badge variant="outline" className="border-[#2563EB]/30 bg-[#EFF8FC] text-[#2563EB] text-[9px] gap-1">
                        <FileBarChart className="size-2.5" aria-hidden="true" />
                        Report sent
                      </Badge>
                      <ArrowRight className="size-3 text-[#DDE3E7]" aria-hidden="true" />
                      <Badge variant="outline" className="border-[#24584F]/30 bg-[#ECFDF5] text-[#24584F] text-[9px] gap-1">
                        <FileText className="size-2.5" aria-hidden="true" />
                        Proposal: $19,700
                      </Badge>
                      <ArrowRight className="size-3 text-[#DDE3E7]" aria-hidden="true" />
                      <Badge variant="outline" className="border-[#24584F]/30 bg-[#ECFDF5] text-[#24584F] text-[9px] gap-1">
                        <Trophy className="size-2.5" aria-hidden="true" />
                        Won
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed prospect cards */}
          <motion.div variants={containerVariants} className="mx-auto mt-10 max-w-4xl">
            <h3 className="text-center text-sm font-semibold text-[#111820] mb-4">
              Active prospects in the pipeline
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PROSPECTS.map((p) => {
                const stage = STAGES.find((s) => s.id === p.stage);
                const StageIcon = stage?.icon ?? UserPlus;
                return (
                  <motion.div key={p.id} variants={cardVariants}>
                    <Card className="border-[#DDE3E7] shadow-sm h-full">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="flex size-9 items-center justify-center rounded-lg"
                            style={{
                              backgroundColor: stage?.colorLight ?? "#EFF8FC",
                            }}
                          >
                            <StageIcon
                              className="size-4"
                              style={{ color: stage?.color ?? "#2563EB" }}
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-[#111820] truncate">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-[#56616C] truncate">
                              {p.domain}
                            </p>
                          </div>
                        </div>

                        {/* Stage badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            className="border-0 text-[9px] font-bold text-white"
                            style={{ backgroundColor: stage?.color ?? "#2563EB" }}
                          >
                            {stage?.label ?? "Unknown"}
                          </Badge>
                          {p.auditScore > 0 && (
                            <Badge
                              variant="outline"
                              className="border-[#DDE3E7] text-[9px] text-[#56616C] gap-1"
                            >
                              <BarChart3 className="size-2.5" aria-hidden="true" />
                              Score: {p.auditScore}
                            </Badge>
                          )}
                        </div>

                        {/* Services */}
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#56616C]">
                            Services
                          </p>
                          {p.services.map((s) => (
                            <div
                              key={s}
                              className="flex items-center gap-2 rounded-md border border-[#DDE3E7] p-2"
                            >
                              <Zap className="size-3 text-[#2563EB]" aria-hidden="true" />
                              <span className="text-[11px] font-medium text-[#111820]">{s}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Demonstration label */}
          <div className="mt-6 flex items-center justify-center">
            <Badge
              variant="outline"
              className="border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px]"
            >
              Demonstration data — fictional
            </Badge>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
