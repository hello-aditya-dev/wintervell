"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { CheckCircle2, Loader2 } from "lucide-react";

const SUBJECT_OPTIONS = [
  "Product question",
  "Licence clarification",
  "Installation assistance",
  "Enterprise arrangement",
  "Security disclosure",
] as const;

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Honeypot
  const [honeypot, setHoneypot] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    // Honeypot check
    if (honeypot) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!data.name?.trim()) newErrors.name = "Name is required.";
    if (!data.email?.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Please enter a valid email address.";
    if (!data.subject) newErrors.subject = "Please select a subject.";
    if (!data.message?.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        const result = await res.json();
        if (result.details?.fieldErrors) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(
            result.details.fieldErrors
          )) {
            fieldErrors[field] = (messages as string[])[0];
          }
          setErrors(fieldErrors);
          setFormState("idle");
        } else {
          setFormState("error");
        }
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-h1 sm:text-display text-foreground">
              Contact
            </h1>
            <p className="mt-4 text-body text-muted-foreground leading-relaxed">
              Ask a product question, request a licence clarification, or
              discuss an enterprise arrangement.
            </p>
            <p className="mt-2 text-small text-[var(--text-tertiary)]">
              No external email will be sent. Your message will be logged but
              not delivered. For urgent inquiries, contact us directly at the
              email address listed in the footer.
            </p>

            {formState === "success" ? (
              <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-[var(--success)]" />
                  <div>
                    <h2 className="text-h4 text-foreground">
                      Message received
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your message was received. No external email was sent.
                      This is a frontend demonstration. Please contact us
                      directly at the email address in the footer.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                noValidate
              >
                {/* Honeypot */}
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

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="mt-1.5"
                    disabled={formState === "submitting"}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1.5"
                    disabled={formState === "submitting"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select name="subject" disabled={formState === "submitting"}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECT_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    className="mt-1.5"
                    disabled={formState === "submitting"}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                {formState === "error" && (
                  <p className="text-sm text-destructive">
                    An unexpected error occurred. Please try again later.
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={formState === "submitting"}
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Logging…
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
