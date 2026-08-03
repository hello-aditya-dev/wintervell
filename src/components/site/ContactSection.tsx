"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { commercial } from "@/config/commercial";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot) return; // bot detected

    setFormState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      company: data.get("company") as string,
      message: data.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 className="text-h2 text-foreground" variants={itemVariants}>
            Get in touch
          </motion.h2>
          <motion.p className="mt-3 text-body text-muted-foreground" variants={itemVariants}>
            Ask a product question, request a demo walkthrough, or discuss enterprise arrangements.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 mx-auto grid max-w-4xl gap-8 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Contact info */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--primary-subtle)]">
                  <Mail className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Sales enquiries</p>
                  <p className="text-xs text-muted-foreground">{commercial.contact.salesEmail}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--success-subtle)]">
                  <MessageSquare className="size-4 text-[var(--success)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Product support</p>
                  <p className="text-xs text-muted-foreground">{commercial.contact.supportEmail}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
              <p className="text-sm font-medium text-foreground">Typical response time</p>
              <p className="mt-1 text-xs text-muted-foreground">We aim to respond within one business day.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center shadow-xs">
                <CheckCircle2 className="size-12 text-[var(--success)]" />
                <h3 className="mt-4 text-h4 text-foreground">Message received</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your message was received. No external email was sent. This is a frontend demonstration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-xs">
                {/* Honeypot — hidden from users */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company <span className="text-muted-foreground">(optional)</span></Label>
                  <Input id="company" name="company" placeholder="Your company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required rows={4} placeholder="Tell us about your needs..." />
                </div>
                {formState === "error" && (
                  <p className="text-sm text-[var(--destructive)]">Something went wrong. Please try again.</p>
                )}
                <Button type="submit" className="w-full" disabled={formState === "submitting"}>
                  {formState === "submitting" ? "Logging…" : "Send message"}
                  <Send className="ml-2 size-4" />
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
