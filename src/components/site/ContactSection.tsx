"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { commercial } from "@/config/commercial";

/* ─── Subject options ─── */
const SUBJECT_OPTIONS = [
  "Product question",
  "Licence clarification",
  "Installation assistance",
  "Enterprise arrangement",
  "Security disclosure",
] as const;

/* ─── Zod schema ─── */
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z.enum(SUBJECT_OPTIONS, {
    required_error: "Please select a subject.",
  }),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(5000, "Message must be 5000 characters or fewer."),
  // Honeypot field — hidden from users, visible to bots
  website: z.string().max(0),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/* ─── Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─── Contact purposes ─── */
const CONTACT_PURPOSES = [
  { label: "Product questions", email: commercial.contact.supportEmail },
  { label: "Licence clarification", email: commercial.contact.legalEmail },
  { label: "Installation assistance", email: commercial.contact.supportEmail },
  { label: "Enterprise arrangements", email: commercial.contact.salesEmail },
  { label: "Security disclosures", email: commercial.contact.securityEmail },
] as const;

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: undefined,
      message: "",
      website: "",
    },
  });

  const sectionMotionProps = prefersReducedMotion
    ? { initial: false as const, animate: "visible" as const, variants: containerVariants }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.1 }, variants: containerVariants };

  async function onSubmit(values: ContactFormValues) {
    // Honeypot check — if filled, silently reject (bot detected)
    if (values.website) {
      // Pretend success to avoid revealing the honeypot
      setSubmitStatus("success");
      return;
    }

    setSubmitStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitStatus("success");
      form.reset();
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-[#F4F6F7]">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
        {...sectionMotionProps}
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#111820] sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#56616C]">
            Email-based contact — no meeting required. Reach out for product
            questions, licence clarification, installation help, enterprise
            arrangements, or security disclosures.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Contact info sidebar */}
            <motion.div
              variants={formVariants}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="text-sm font-semibold text-[#111820]">
                  Contact by purpose
                </h3>
                <p className="mt-1 text-xs text-[#56616C]">
                  All enquiries are handled via email. No scheduling required.
                </p>
              </div>

              <div className="space-y-4">
                {CONTACT_PURPOSES.map((purpose) => (
                  <div
                    key={purpose.label}
                    className="flex items-start gap-3 rounded-lg border border-[#DDE3E7] bg-white p-4 shadow-sm"
                  >
                    <Mail
                      className="mt-0.5 size-4 shrink-0 text-[#2563EB]"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#111820]">
                        {purpose.label}
                      </p>
                      <a
                        href={`mailto:${purpose.email}`}
                        className="text-xs text-[#2563EB] hover:text-[#1d4ed8] underline underline-offset-2"
                      >
                        {purpose.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-2 rounded-lg border border-[#DDE3E7] bg-[#24584F]/5 p-4">
                <Shield
                  className="mt-0.5 size-4 shrink-0 text-[#24584F]"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-[#56616C]">
                  Your message is submitted server-side. Form data is not
                  exposed to third-party scripts. Honeypot protection is active
                  to deter automated submissions.
                </p>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              variants={formVariants}
              className="lg:col-span-3"
            >
              <div className="rounded-xl border border-[#DDE3E7] bg-white p-6 shadow-sm">
                {/* Success state */}
                {submitStatus === "success" ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <CheckCircle2
                      className="size-12 text-[#24584F]"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 text-lg font-semibold text-[#111820]">
                      Message sent
                    </h3>
                    <p className="mt-2 text-sm text-[#56616C]">
                      Thank you for reaching out. We&apos;ll respond via email as
                      soon as possible.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 border-[#DDE3E7] text-[#111820] hover:bg-[#F4F6F7]"
                      onClick={() => setSubmitStatus("idle")}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                      noValidate
                    >
                      {/* Honeypot field — hidden from users, visible to bots */}
                      <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                        <label htmlFor="contact-website">Website</label>
                        <input
                          id="contact-website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          {...form.register("website")}
                        />
                      </div>

                      {/* Error banner */}
                      {submitStatus === "error" && (
                        <div className="flex items-center gap-2 rounded-lg border border-[#B43C3C]/20 bg-[#B43C3C]/5 p-3">
                          <AlertCircle
                            className="size-4 shrink-0 text-[#B43C3C]"
                            aria-hidden="true"
                          />
                          <p className="text-sm text-[#B43C3C]">
                            Something went wrong. Please try again or email us
                            directly at{" "}
                            <a
                              href={`mailto:${commercial.contact.supportEmail}`}
                              className="underline underline-offset-2"
                            >
                              {commercial.contact.supportEmail}
                            </a>
                            .
                          </p>
                        </div>
                      )}

                      {/* Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#111820]">
                              Name <span className="text-[#B43C3C]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="border-[#DDE3E7] bg-white text-[#111820] placeholder:text-[#56616C]/50 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-[#B43C3C]" />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#111820]">
                              Email <span className="text-[#B43C3C]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className="border-[#DDE3E7] bg-white text-[#111820] placeholder:text-[#56616C]/50 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-[#B43C3C]" />
                          </FormItem>
                        )}
                      />

                      {/* Subject */}
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#111820]">
                              Subject <span className="text-[#B43C3C]">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full border-[#DDE3E7] bg-white text-[#111820] focus:ring-[#2563EB]/20">
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SUBJECT_OPTIONS.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-[#B43C3C]" />
                          </FormItem>
                        )}
                      />

                      {/* Message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#111820]">
                              Message <span className="text-[#B43C3C]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your question or request"
                                rows={5}
                                className="border-[#DDE3E7] bg-white text-[#111820] placeholder:text-[#56616C]/50 focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20 resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-[#B43C3C]" />
                          </FormItem>
                        )}
                      />

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={submitStatus === "submitting"}
                        className="w-full h-11 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm disabled:opacity-60"
                      >
                        {submitStatus === "submitting" ? (
                          <>
                            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="size-4" aria-hidden="true" />
                            Send message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
