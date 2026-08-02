"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
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
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  PieChart,
  ExternalLink,
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
  description: string;
}

const STAGES: PipelineStage[] = [
  { id: "new", label: "New prospect", icon: UserPlus, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active", description: "New lead entered into the pipeline" },
  { id: "audit-planned", label: "Audit planned", icon: Calendar, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active", description: "Audit scheduled and scoped" },
  { id: "audit-running", label: "Audit running", icon: Loader2, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active", description: "Automated crawl and analysis in progress" },
  { id: "audit-review", label: "Audit review", icon: Search, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active", description: "Human review and edit of findings" },
  { id: "report-sent", label: "Report sent", icon: FileBarChart, color: "#2563EB", colorLight: "#EFF8FC", count: 1, type: "active", description: "Branded report delivered to client" },
  { id: "report-viewed", label: "Report viewed", icon: Eye, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active", description: "Client opened and engaged with report" },
  { id: "follow-up", label: "Follow-up due", icon: Clock, color: "#B7791F", colorLight: "#FFFBEB", count: 0, type: "active", description: "Timed follow-up reminder triggered" },
  { id: "proposal-sent", label: "Proposal sent", icon: FileText, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active", description: "Service proposal submitted" },
  { id: "negotiation", label: "Negotiation", icon: MessageSquare, color: "#2563EB", colorLight: "#EFF8FC", count: 0, type: "active", description: "Active discussion on scope and pricing" },
  { id: "won", label: "Won", icon: Trophy, color: "#24584F", colorLight: "#ECFDF5", count: 0, type: "won", description: "Deal closed successfully" },
  { id: "lost", label: "Lost", icon: XCircle, color: "#B43C3C", colorLight: "#FEF2F2", count: 0, type: "lost", description: "Opportunity lost or declined" },
];

/* ─── Prospect cards per stage ─── */
interface ProspectCard {
  id: string;
  name: string;
  domain: string;
  auditScore: number;
  stage: string;
  services: string[];
  companyType: string;
  date: string;
  estimatedValue: string;
  contactPerson: string;
}

const PROSPECTS: ProspectCard[] = [
  {
    id: "1",
    name: "Meridian Health Group",
    domain: "meridianhealth.example",
    auditScore: 47,
    stage: "report-sent",
    services: ["Security Hardening", "Performance Optimization"],
    companyType: "Healthcare",
    date: "2025-02-18",
    estimatedValue: "$19,700",
    contactPerson: "Dr. Sarah Chen",
  },
  {
    id: "2",
    name: "Cedarline Property",
    domain: "cedarlineproperty.example",
    auditScore: 62,
    stage: "audit-running",
    services: ["SEO Foundations"],
    companyType: "Real Estate",
    date: "2025-02-25",
    estimatedValue: "$8,400",
    contactPerson: "Mark Oliveira",
  },
  {
    id: "3",
    name: "HarborDesk Software",
    domain: "harbordesk.example",
    auditScore: 38,
    stage: "new",
    services: ["Full Audit Package"],
    companyType: "SaaS",
    date: "2025-03-01",
    estimatedValue: "$24,500",
    contactPerson: "Anika Patel",
  },
];

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─── Prospects for a given stage ─── */
function getProspectsForStage(stageId: string) {
  return PROSPECTS.filter((p) => p.stage === stageId);
}

/* ─── Stage type color helper ─── */
function getStageTypeColor(stage: PipelineStage) {
  if (stage.type === "won") return "#24584F";
  if (stage.type === "lost") return "#B43C3C";
  if (stage.count === 0) return "#9CA3AF";
  return "#2563EB";
}

/* ─── Kanban column groups ─── */
const KANBAN_GROUPS = [
  { title: "Prospecting", stageIds: ["new", "audit-planned"] },
  { title: "Audit", stageIds: ["audit-running", "audit-review"] },
  { title: "Reporting", stageIds: ["report-sent", "report-viewed"] },
  { title: "Follow-up", stageIds: ["follow-up", "proposal-sent"] },
  { title: "Closing", stageIds: ["negotiation", "won", "lost"] },
];

/* ─── Pipeline health data ─── */
const PIPELINE_HEALTH = {
  totalProspects: 3,
  activeStages: 6,
  totalValue: "$52,600",
  avgScore: 49,
  distribution: [
    { label: "Prospecting", count: 2, color: "#2563EB" },
    { label: "Audit", count: 1, color: "#B7DDEC" },
    { label: "Reporting", count: 1, color: "#24584F" },
    { label: "Follow-up", count: 0, color: "#B7791F" },
    { label: "Closing", count: 0, color: "#3F4A55" },
  ],
};

/* ─── Animated dashed line keyframe style ─── */
const flowingDashStyle = `
@keyframes flowDash {
  to {
    stroke-dashoffset: -20;
  }
}
.flow-line {
  animation: flowDash 1s linear infinite;
}
`;

/* ─── Prospect detail card ─── */
function ProspectDetailCard({ prospect }: { prospect: ProspectCard }) {
  const [expanded, setExpanded] = useState(false);
  const stage = STAGES.find((s) => s.id === prospect.stage);
  const StageIcon = stage?.icon ?? UserPlus;
  const scoreColor = prospect.auditScore >= 60 ? "#24584F" : prospect.auditScore >= 40 ? "#B7791F" : "#B43C3C";

  return (
    <motion.div
      layout
      className="group/prospect cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <Card className="border-[#DDE3E7] shadow-sm h-full transition-all hover:shadow-md hover:border-[#B7DDEC]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2.5">
            <div
              className="flex size-9 items-center justify-center rounded-lg shrink-0"
              style={{ backgroundColor: stage?.colorLight ?? "#EFF8FC" }}
            >
              <StageIcon
                className="size-4"
                style={{ color: stage?.color ?? "#2563EB" }}
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#111820] truncate">
                {prospect.name}
              </p>
              <div className="flex items-center gap-1">
                <Globe className="size-2.5 text-[#56616C]" aria-hidden="true" />
                <p className="text-[10px] text-[#56616C] truncate">
                  {prospect.domain}
                </p>
              </div>
            </div>
          </div>

          {/* Stage + Score badges */}
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <Badge
              className="border-0 text-[9px] font-bold text-white"
              style={{ backgroundColor: stage?.color ?? "#2563EB" }}
            >
              {stage?.label ?? "Unknown"}
            </Badge>
            {prospect.auditScore > 0 && (
              <Badge
                variant="outline"
                className="text-[9px] gap-1"
                style={{ borderColor: scoreColor, color: scoreColor }}
              >
                <BarChart3 className="size-2.5" aria-hidden="true" />
                Score: {prospect.auditScore}
              </Badge>
            )}
          </div>

          {/* Company type + date */}
          <div className="flex items-center gap-3 text-[10px] text-[#56616C]">
            <span className="flex items-center gap-1">
              <Building2 className="size-2.5" aria-hidden="true" />
              {prospect.companyType}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="size-2.5" aria-hidden="true" />
              {prospect.date}
            </span>
          </div>

          {/* Expand indicator */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">
              Services
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-3 text-[#56616C]" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Services list */}
          <div className="space-y-1 mt-1.5">
            {prospect.services.map((s) => (
              <div
                key={s}
                className="flex items-center gap-2 rounded-md border border-[#DDE3E7] p-2"
              >
                <Zap className="size-3 text-[#2563EB]" aria-hidden="true" />
                <span className="text-[11px] font-medium text-[#111820]">{s}</span>
              </div>
            ))}
          </div>

          {/* Expanded details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-[#DDE3E7] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#56616C]">Est. value</span>
                    <span className="font-bold text-[#111820]">{prospect.estimatedValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#56616C]">Contact</span>
                    <span className="font-medium text-[#111820]">{prospect.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#56616C]">Audit score</span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-[#DDE3E7]/60 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${prospect.auditScore}%`, backgroundColor: scoreColor }}
                        />
                      </div>
                      <span className="font-bold text-[10px]" style={{ color: scoreColor }}>
                        {prospect.auditScore}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function SalesPipeline() {
  const prefersReducedMotion = useReducedMotion();
  const pipelineRef = useRef(null);
  const pipelineInView = useInView(pipelineRef, { once: true, amount: 0.2 });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="pipeline" className="bg-gradient-to-b from-[#F4F6F7] to-white">
      {/* Inject flowing dash keyframe */}
      <style>{flowingDashStyle}</style>

      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            A pipeline built for the audit-to-close workflow
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#3F4A55]">
            Every prospect, audit, report, and proposal stays connected — from first contact to
            final decision.
          </p>
        </motion.div>

        {/* Pipeline health indicator */}
        <motion.div variants={headingVariants} className="mt-8 sm:mt-10">
          <Card className="border-[#DDE3E7] shadow-sm max-w-3xl mx-auto">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-4 text-[#24584F]" aria-hidden="true" />
                <h4 className="text-sm font-bold text-[#111820]">Pipeline health</h4>
                <Badge variant="outline" className="border-[#24584F]/30 bg-[#24584F]/5 text-[#24584F] text-[9px] ml-auto">
                  {PIPELINE_HEALTH.totalProspects} prospects
                </Badge>
              </div>

              {/* Distribution bar */}
              <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-[#DDE3E7]/60">
                {PIPELINE_HEALTH.distribution.map((d) => {
                  const total = PIPELINE_HEALTH.totalProspects || 1;
                  const pct = (d.count / total) * 100;
                  return (
                    <motion.div
                      key={d.label}
                      className="h-full"
                      style={{ backgroundColor: d.color }}
                      initial={{ width: prefersReducedMotion ? `${pct}%` : 0 }}
                      animate={pipelineInView || prefersReducedMotion ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                {PIPELINE_HEALTH.distribution.map((d) => (
                  <div key={d.label} className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-[#56616C]">{d.label} ({d.count})</span>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-3 pt-3 border-t border-[#DDE3E7] grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">Total value</p>
                  <p className="text-sm font-bold text-[#111820]">{PIPELINE_HEALTH.totalValue}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">Avg. score</p>
                  <p className="text-sm font-bold text-[#111820]">{PIPELINE_HEALTH.avgScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#56616C]">Active stages</p>
                  <p className="text-sm font-bold text-[#111820]">{PIPELINE_HEALTH.activeStages}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Horizontal pipeline flow visualization */}
        <motion.div variants={headingVariants} className="mt-10 sm:mt-12" ref={pipelineRef}>
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-start min-w-max sm:min-w-0 sm:justify-center">
              {STAGES.map((stage, i) => {
                const StageIcon = stage.icon;
                const prospects = getProspectsForStage(stage.id);
                const isLast = i === STAGES.length - 1;
                const isActive = stage.count > 0;
                const stageColor = getStageTypeColor(stage);

                return (
                  <div key={stage.id} className="flex items-start">
                    {/* Stage card */}
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={pipelineInView || prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                      className="flex flex-col items-center w-24 sm:w-28"
                    >
                      {/* Stage circle with glow for active */}
                      <div className="relative">
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: stageColor, opacity: 0.15 }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.05, 0.15] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <div
                          className="relative flex size-11 items-center justify-center rounded-full border-2 shadow-sm transition-all"
                          style={{
                            borderColor: stageColor,
                            backgroundColor: stage.colorLight,
                            opacity: isActive ? 1 : 0.5,
                          }}
                        >
                          <StageIcon className="size-4" style={{ color: stageColor }} aria-hidden="true" />
                        </div>
                      </div>

                      {/* Count badge */}
                      <div className="mt-1.5">
                        <Badge
                          className="border-0 text-[9px] font-bold text-white"
                          style={{ backgroundColor: stageColor, opacity: isActive ? 1 : 0.5 }}
                        >
                          {stage.count}
                        </Badge>
                      </div>

                      {/* Stage label */}
                      <p
                        className="mt-1 text-[10px] font-semibold text-center leading-tight"
                        style={{ color: stageColor }}
                      >
                        {stage.label}
                      </p>

                      {/* Mini prospect cards */}
                      {prospects.length > 0 && (
                        <div className="mt-2 w-full space-y-1.5">
                          {prospects.map((p) => (
                            <div
                              key={p.id}
                              className="rounded-md border bg-white p-1.5 shadow-sm"
                              style={{ borderColor: `${stageColor}30` }}
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
                    </motion.div>

                    {/* Animated connecting line */}
                    {!isLast && (
                      <div className="flex items-center pt-4 px-0.5 sm:px-1">
                        <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0">
                          <line
                            x1="0" y1="6" x2="20" y2="6"
                            stroke={isActive ? stageColor : "#DDE3E7"}
                            strokeWidth="2"
                            strokeDasharray="4 3"
                            className={isActive && !prefersReducedMotion ? "flow-line" : ""}
                            style={{ strokeDashoffset: 0 }}
                          />
                          <polygon
                            points="16,2 20,6 16,10"
                            fill={isActive ? stageColor : "#DDE3E7"}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Kanban-style board */}
        <motion.div variants={headingVariants} className="mt-10 sm:mt-14">
          <h3 className="text-center text-sm font-semibold text-[#111820] mb-5">
            Pipeline board view
          </h3>
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-4 min-w-max sm:min-w-0">
              {KANBAN_GROUPS.map((group, gi) => {
                const groupStages = group.stageIds.map((sid) => STAGES.find((s) => s.id === sid)!).filter(Boolean);
                const groupProspects = group.stageIds.flatMap((sid) => getProspectsForStage(sid));
                const totalCount = groupStages.reduce((sum, s) => sum + s.count, 0);

                return (
                  <motion.div
                    key={group.title}
                    variants={columnVariants}
                    className="flex flex-col w-56 sm:w-64 shrink-0"
                  >
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full" style={{ backgroundColor: groupStages[0]?.color ?? "#2563EB" }} />
                        <h4 className="text-xs font-bold text-[#111820]">{group.title}</h4>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-[#DDE3E7] text-[9px] text-[#56616C] h-5"
                      >
                        {totalCount}
                      </Badge>
                    </div>

                    {/* Stage sub-headers + prospect cards */}
                    <div className="space-y-3 flex-1">
                      {groupStages.map((stage) => {
                        const stageProspects = getProspectsForStage(stage.id);
                        const StageIcon = stage.icon;
                        const stageColor = getStageTypeColor(stage);

                        return (
                          <div key={stage.id} className="rounded-lg border border-[#DDE3E7] bg-white p-3 shadow-sm">
                            {/* Stage header */}
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className="flex size-6 items-center justify-center rounded-md"
                                style={{ backgroundColor: stage.colorLight }}
                              >
                                <StageIcon className="size-3" style={{ color: stageColor }} aria-hidden="true" />
                              </div>
                              <span className="text-[10px] font-bold text-[#111820]">{stage.label}</span>
                              <span className="ml-auto text-[9px] text-[#56616C]">{stage.count}</span>
                            </div>

                            {/* Prospect cards in this stage */}
                            {stageProspects.length > 0 ? (
                              <div className="space-y-2">
                                {stageProspects.map((p) => (
                                  <div
                                    key={p.id}
                                    className="rounded-md border border-[#DDE3E7] bg-[#F4F6F7] p-2.5 hover:border-[#B7DDEC] hover:shadow-sm transition-all cursor-pointer"
                                  >
                                    <p className="text-[10px] font-bold text-[#111820] truncate">{p.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="flex items-center gap-0.5 text-[8px] text-[#56616C]">
                                        <Building2 className="size-2" aria-hidden="true" />
                                        {p.companyType}
                                      </span>
                                      <span className="text-[8px] text-[#56616C]">•</span>
                                      <span className="text-[8px] font-bold" style={{ color: p.auditScore >= 60 ? "#24584F" : p.auditScore >= 40 ? "#B7791F" : "#B43C3C" }}>
                                        {p.auditScore}/100
                                      </span>
                                    </div>
                                    <div className="mt-1.5 h-1 w-full rounded-full bg-[#DDE3E7]/60 overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{
                                          width: `${p.auditScore}%`,
                                          backgroundColor: p.auditScore >= 60 ? "#24584F" : p.auditScore >= 40 ? "#B7791F" : "#B43C3C",
                                        }}
                                      />
                                    </div>
                                    <div className="mt-1.5 flex items-center gap-1">
                                      <CalendarDays className="size-2 text-[#56616C]" aria-hidden="true" />
                                      <span className="text-[8px] text-[#56616C]">{p.date}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-3">
                                <p className="text-[9px] text-[#56616C] italic">No prospects</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

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
                  <p className="mt-1.5 text-xs leading-relaxed text-[#3F4A55]">
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
            {PROSPECTS.map((p) => (
              <motion.div key={p.id} variants={cardVariants}>
                <ProspectDetailCard prospect={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View full pipeline CTA + Demonstration label */}
        <motion.div variants={headingVariants} className="mt-8 flex flex-col items-center gap-3">
          <a
            href="#pipeline"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1d4ed8] hover:shadow-md active:scale-[0.98]"
          >
            View full pipeline
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <Badge
            variant="outline"
            className="border-[#B7791F]/30 bg-[#B7791F]/5 text-[#B7791F] text-[10px]"
          >
            Demonstration data — fictional
          </Badge>
        </motion.div>
      </motion.div>
    </section>
  );
}
