"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  ShieldOff,
  Building2,
  Lock,
  Timer,
  HeartHandshake,
  KeyRound,
  ServerOff,
  ClipboardList,
  ShieldAlert,
  Shield,
  ShieldCheck,
  Bug,
  Eye,
  Code2,
  Server,
} from "lucide-react";
import { commercial } from "@/config/commercial";
import { useRef } from "react";

/* ─── Security features ─── */
const SECURITY_FEATURES = [
  {
    icon: ShieldOff,
    title: "SSRF protection with block-lists",
    description:
      "Audit workers enforce block-lists to prevent server-side request forgery. No arbitrary internal network access from user-supplied URLs.",
    level: "high" as const,
  },
  {
    icon: Building2,
    title: "Organisation-scoped data isolation",
    description:
      "Multi-tenant architecture ensures each organisation's data is isolated. No cross-tenant data leakage.",
    level: "high" as const,
  },
  {
    icon: Lock,
    title: "IDOR prevention",
    description:
      "Insecure direct object reference protections ensure users can only access resources they are authorised to access.",
    level: "high" as const,
  },
  {
    icon: Timer,
    title: "Rate limiting",
    description:
      "Rate limiting is applied to API endpoints and audit execution to prevent abuse and resource exhaustion.",
    level: "medium" as const,
  },
  {
    icon: HeartHandshake,
    title: "Graceful licence validation",
    description:
      "The licence validation system never deletes data, locks users out, or degrades existing functionality. Graceful degradation only.",
    level: "medium" as const,
  },
  {
    icon: KeyRound,
    title: "Bring-your-own-key AI model",
    description:
      "Use your own AI provider API keys. No AI usage is routed through WinterVell servers. Your prompts, your data, your provider.",
    level: "high" as const,
  },
  {
    icon: ServerOff,
    title: "No client data transmitted to licence servers",
    description:
      "The licence validation system only transmits a licence identifier and deployment fingerprint. No client data, audit data, or user content is ever sent.",
    level: "high" as const,
  },
  {
    icon: ClipboardList,
    title: "Audit logging",
    description:
      "Key actions are logged for accountability and traceability. Organisation-level audit trails support compliance review.",
    level: "medium" as const,
  },
] as const;

/* ─── Security principles ─── */
const SECURITY_PRINCIPLES = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Every security control is implemented in the source code. No aspirational claims — verify it yourself.",
  },
  {
    icon: Code2,
    title: "Self-hosted first",
    description:
      "Your data stays on your infrastructure. No third-party data routing, no external analytics, no telemetry.",
  },
  {
    icon: Shield,
    title: "Least privilege",
    description:
      "Organisation-scoped isolation, role-based access, and IDOR prevention minimise the blast radius of any compromise.",
  },
  {
    icon: Server,
    title: "Graceful degradation",
    description:
      "Systems degrade gracefully. Licence validation never deletes data, locks users out, or degrades existing functionality.",
  },
];

/* ─── Security level indicator ─── */
function SecurityLevelIndicator({ level }: { level: "high" | "medium" }) {
  if (level === "high") {
    return (
      <div className="flex items-center gap-1" title="High security impact">
        <ShieldCheck className="size-3.5 text-[#24584F]" aria-hidden="true" />
        <span className="text-[10px] font-medium text-[#24584F]">High</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1" title="Medium security impact">
      <Shield className="size-3.5 text-[#B7791F]" aria-hidden="true" />
      <span className="text-[10px] font-medium text-[#B7791F]">Medium</span>
    </div>
  );
}

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const principleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ─── Component ─── */
export default function SecuritySection() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="security" className="relative overflow-hidden bg-[#142634]">
      {/* Circuit-board background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(183,221,236,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(183,221,236,0.5) 1px, transparent 1px),
            linear-gradient(rgba(183,221,236,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(183,221,236,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Security built for production
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#B7DDEC]">
            Every security feature below is implemented in the source code. No
            aspirational claims — only controls you can verify.
          </p>

          {/* Security audit status badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#B7791F]/30 bg-[#B7791F]/10 px-4 py-1.5">
            <ShieldAlert className="size-4 text-[#B7791F]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#B7791F]">
              Self-assessed — no formal audit yet
            </span>
          </div>
        </motion.div>

        {/* Security features grid */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
        >
          {SECURITY_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#B7DDEC]/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#24584F]/20">
                    <Icon className="size-5 text-[#B7DDEC]" aria-hidden="true" />
                  </div>
                  <SecurityLevelIndicator level={feature.level} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white leading-snug">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#B7DDEC]/70">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Security principles */}
        <motion.div variants={headingVariants} className="mt-14 sm:mt-20">
          <h3 className="text-center text-lg font-semibold text-white sm:text-xl">
            Security principles
          </h3>
          <motion.div
            variants={containerVariants}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
          >
            {SECURITY_PRINCIPLES.map((principle) => {
              const PIcon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  variants={principleVariants}
                  className="rounded-lg border border-[#1E3A4F] bg-[#1A2E3E]/60 p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <PIcon className="size-4 text-[#B7DDEC]" aria-hidden="true" />
                    <h4 className="text-sm font-semibold text-white">
                      {principle.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#B7DDEC]/60">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Important disclaimer */}
        <motion.div
          variants={headingVariants}
          className="mt-12 sm:mt-16"
        >
          <div className="mx-auto max-w-3xl rounded-xl border border-[#B7791F]/30 bg-[#B7791F]/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert
                className="mt-0.5 size-5 shrink-0 text-[#B7791F]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-[#B7791F]">
                  Important disclaimer
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#B7DDEC]/70">
                  WinterVell implements these security controls as best-practice
                  measures for production deployments. This does not constitute
                  formal WCAG certification, a guaranteed security posture, or a
                  warranty of any kind. Security is an ongoing process — buyers
                  should conduct their own assessment and implement additional
                  controls as appropriate for their environment.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Report a vulnerability CTA */}
        <motion.div variants={headingVariants} className="mt-8 flex flex-col items-center gap-4">
          <a
            href={`mailto:${commercial.contact.securityEmail}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#B43C3C]/15 border border-[#B43C3C]/30 px-5 py-2.5 text-sm font-medium text-[#F87171] transition-all duration-200 hover:bg-[#B43C3C]/25 hover:shadow-md"
          >
            <Bug className="size-4" aria-hidden="true" />
            Report a vulnerability
          </a>
          <p className="text-xs text-[#B7DDEC]/50">
            Responsible disclosure is appreciated. We aim to respond within 48 hours.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
