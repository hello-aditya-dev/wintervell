"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { commercial } from "@/config/commercial";

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const accordionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function FAQSection() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  return (
    <section id="faq" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Direct answers to common questions about WinterVell. No evasive language.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div variants={accordionVariants} className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="rounded-xl border border-[#DDE3E7] bg-white shadow-sm">
            <Accordion type="single" collapsible className="px-6">
              {commercial.faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-[#DDE3E7]"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-[#111820] hover:text-[#2563EB] hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#56616C]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Contact note */}
        <motion.div variants={headingVariants} className="mt-10 text-center">
          <p className="text-xs text-[#56616C]">
            Have a question not answered here?{" "}
            <a
              href={`mailto:${commercial.contact.salesEmail}`}
              className="font-medium text-[#2563EB] underline underline-offset-2 hover:text-[#2563EB]/80"
            >
              Contact sales
            </a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
