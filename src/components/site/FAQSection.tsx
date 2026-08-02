"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
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

const TOTAL_QUESTIONS = commercial.faq.length;

export default function FAQSection() {
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredFaq = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return commercial.faq;
    return commercial.faq.filter(
      (item) =>
        item.q.toLowerCase().includes(trimmed) ||
        item.a.toLowerCase().includes(trimmed)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const noResults = hasQuery && filteredFaq.length === 0;

  // Keyboard shortcut: "/" focuses the search input (when not already typing in a field)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function clearSearch() {
    setQuery("");
    inputRef.current?.focus();
  }

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

        {/* Search input */}
        <motion.div variants={accordionVariants} className="mx-auto mt-8 max-w-3xl sm:mt-12">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#56616C]"
              aria-hidden="true"
            />
            <Input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search frequently asked questions"
              className="h-12 rounded-xl border-[#DDE3E7] bg-white pl-11 pr-12 text-sm text-[#111820] placeholder:text-[#56616C] focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20"
            />
            {hasQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-[#56616C] transition-colors hover:bg-[#F4F6F7] hover:text-[#111820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-1 focus-visible:ring-offset-white"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Result count + keyboard hint */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <p
              className="text-xs text-[#56616C]"
              role="status"
              aria-live="polite"
            >
              {noResults
                ? `No results found for "${query.trim()}"`
                : hasQuery
                  ? `Showing ${filteredFaq.length} of ${TOTAL_QUESTIONS} questions`
                  : `Showing all ${TOTAL_QUESTIONS} questions`}
            </p>
            <p className="hidden text-xs text-[#56616C]/70 sm:block">
              Press{" "}
              <kbd className="rounded border border-[#DDE3E7] bg-white px-1.5 py-0.5 font-mono text-[10px] text-[#3F4A55]">
                /
              </kbd>{" "}
              to search
            </p>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div variants={accordionVariants} className="mx-auto mt-8 max-w-3xl sm:mt-10">
          {noResults ? (
            <div className="rounded-xl border border-[#DDE3E7] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#F4F6F7]">
                <Search className="size-5 text-[#56616C]" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold text-[#111820]">
                No results found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-2 text-sm text-[#56616C]">
                Try a different search term, or clear the search to view all questions.
              </p>
              <button
                type="button"
                onClick={clearSearch}
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
              >
                <X className="size-4" aria-hidden="true" />
                Clear search
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-[#DDE3E7] bg-white shadow-sm">
              <Accordion type="single" collapsible className="px-6">
                {filteredFaq.map((item, index) => (
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
          )}
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
