"use server";

import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests
const RATE_LIMIT_WINDOW = 60 * 1000; // Per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function getClientIP(): string {
  // In Server Actions, we can't access headers directly
  // For rate limiting, we'll use a simpler approach or pass IP from client
  // For now, using a basic approach - in production, consider using middleware
  return "unknown";
}

export type ContactFormState = {
  message?: string;
  isError?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  // Validate API key
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return {
      message: "Server configuration error. Please contact the administrator.",
      isError: true,
    };
  }

  // Extract form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Validate input
  const errors: ContactFormState["errors"] = {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = ["Name is required"];
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    errors.email = ["Email is required"];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ["Please enter a valid email address"];
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    errors.message = ["Message must be at least 10 characters"];
  }

  // Return early if validation fails
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Simple rate limiting (without IP, we limit per submission)
  // In production, consider using middleware or a proper rate limiting service
  const ip = getClientIP();
  if (!checkRateLimit(ip)) {
    return {
      message: "Too many requests. Please try again later.",
      isError: true,
    };
  }

  // Get recipient email from environment variable
  const recipientEmail = process.env.CONTACT_EMAIL;

  if (!recipientEmail) {
    console.error("CONTACT_EMAIL environment variable is not set");
    return {
      message: "Server configuration error. Please contact the administrator.",
      isError: true,
    };
  }

  // Send email using Resend
  try {
    // Use custom domain email if configured, otherwise fallback to Resend's test domain
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
New Contact Form Message

From: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        message: "Failed to send message. Please try again later.",
        isError: true,
      };
    }

    return {
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      isError: true,
    };
  }
}

