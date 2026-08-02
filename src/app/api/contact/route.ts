import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* ─── Subject options (must match the client-side enum) ─── */
const SUBJECT_OPTIONS = [
  "Product question",
  "Licence clarification",
  "Installation assistance",
  "Enterprise arrangement",
  "Security disclosure",
] as const;

/* ─── Zod schema (server-side validation) ─── */
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
    message: "Please select a subject.",
  }),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the payload
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // In production, this would send an email via a transactional email service
    // (e.g., Resend, SendGrid, Postmark) or store the message in a database.
    // For now, we log the submission and return success.
    console.log("[Contact Form Submission]", {
      name,
      email,
      subject,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message received. We will respond via email." },
      { status: 200 }
    );
  } catch (error) {
    // Safe error handling — do not expose internal details
    console.error("[Contact Form Error]", error);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
