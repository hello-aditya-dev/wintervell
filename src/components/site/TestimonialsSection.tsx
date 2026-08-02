"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Fictional testimonials data ─── */
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "WinterVell transformed how we approach prospecting. We sent 12 branded audit reports in the first week and landed three new retainers — the evidence speaks for itself.",
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Northstar Digital",
    rating: 5,
    fictional: true,
  },
  {
    id: 2,
    quote:
      "The white-label reports look like we built the tool ourselves. Clients trust the findings because they see our brand, not someone else's. That trust converts to signed proposals.",
    name: "Marcus Webb",
    role: "Creative Director",
    company: "Cedarline Agency",
    rating: 5,
    fictional: true,
  },
  {
    id: 3,
    quote:
      "We used to spend hours manually auditing sites before quoting. Now we run a 9-category audit in minutes, send a polished report, and the prospect is already convinced before the first call.",
    name: "Priya Anand",
    role: "Founder & Lead Consultant",
    company: "HarborDesk Consulting",
    rating: 4,
    fictional: true,
  },
] as const;

const CAROUSEL_INTERVAL = 6000; // ms

/* ─── Motion variants ─── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Star rating component ─── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-[#B7791F] text-[#B7791F]"
              : "fill-transparent text-[#56616C]/40"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  /* ─── Auto-rotate ─── */
  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const testimonial = TESTIMONIALS[current];

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.1 },
        variants: containerVariants,
      };

  return (
    <section
      id="testimonials"
      className="bg-[#142634]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by agencies that sell website work
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#B7DDEC]">
            Real results from agencies using WinterVell to find work, prove value, and win clients.
          </p>
          <Badge
            variant="outline"
            className="mt-3 border-[#B7DDEC]/30 bg-[#B7DDEC]/10 text-[#B7DDEC] text-[10px] font-medium"
          >
            Demonstration data — fictional
          </Badge>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={headingVariants} className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={prefersReducedMotion ? undefined : slideVariants}
                initial={prefersReducedMotion ? false : "enter"}
                animate="center"
                exit={prefersReducedMotion ? undefined : "exit"}
                className="flex flex-col items-center text-center"
              >
                {/* Quote mark */}
                <Quote
                  className="size-10 text-[#B7DDEC]/60 mb-4"
                  aria-hidden="true"
                />

                {/* Quote text */}
                <blockquote className="text-lg leading-relaxed text-white sm:text-xl sm:leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Star rating */}
                <div className="mt-5">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Attribution */}
                <div className="mt-4">
                  <p className="text-base font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#B7DDEC]">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div
            className="mt-8 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonial ${i + 1} from ${t.name}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7DDEC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#142634] ${
                  i === current
                    ? "h-2.5 w-8 bg-[#B7DDEC]"
                    : "h-2.5 w-2.5 bg-[#B7DDEC]/30 hover:bg-[#B7DDEC]/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
