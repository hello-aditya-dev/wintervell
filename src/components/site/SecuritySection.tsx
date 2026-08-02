"use client";

import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { commercial } from "@/config/commercial";

/* ─── Security features ─── */
const SECURITY_FEATURES = [
  {
    icon: ShieldOff,
    title: "SSRF protection with block-lists",
    description:
      "Audit workers enforce block-lists to prevent server-side request forgery. No arbitrary internal network access from user-supplied URLs.",
  },
  {
    icon: Building2,
    title: "Organisation-scoped data isolation",
    description:
      "Multi-tenant architecture ensures each organisation's data is isolated. No cross-tenant data leakage.",
  },
  {
    icon: Lock,
    title: "IDOR prevention",
    description:
      "Insecure direct object reference protections ensure users can only access resources they are authorised to access.",
  },
  {
    icon: Timer,
    title: "Rate limiting",
    description:
      "Rate limiting is applied to API endpoints and audit execution to prevent abuse and resource exhaustion.",
  },
  {
    icon: HeartHandshake,
    title: "Graceful licence validation",
    description:
      "The licence validation system never deletes data, locks users out, or degrades existing functionality. Graceful degradation only.",
  },
  {
    icon: KeyRound,
    title: "Bring-your-own-key AI model",
    description:
      "Use your own AI provider API keys. No AI usage is routed through WinterVell servers. Your prompts, your data, your provider.",
  },
  {
    icon: ServerOff,
    title: "No client data transmitted to licence servers",
    description:
      "The licence validation system only transmits a licence identifier and deployment fingerprint. No client data, audit data, or user content is ever sent.",
  },
  {
    icon: ClipboardList,
    title: "Audit logging",
    description:
      "Key actions are logged for accountability and traceability. Organisation-level audit trails support compliance review.",
  },
] as const;

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

export default function SecuritySection() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="security" className="bg-[#142634]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
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
                className="group rounded-xl border border-[#1E3A4F] bg-[#1A2E3E] p-5 transition-colors hover:border-[#B7DDEC]/30"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#24584F]/20">
                  <Icon className="size-5 text-[#B7DDEC]" aria-hidden="true" />
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

        {/* Security disclosure contact */}
        <motion.div variants={headingVariants} className="mt-8 text-center">
          <p className="text-xs text-[#B7DDEC]/50">
            Found a security vulnerability?{" "}
            <a
              href={`mailto:${commercial.contact.securityEmail}`}
              className="font-medium text-[#B7DDEC] underline underline-offset-2 hover:text-white transition-colors"
            >
              Report it responsibly
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
