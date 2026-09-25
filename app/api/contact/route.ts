import { NextResponse } from "next/server";
import type { ErrorResponse } from "resend";
import { contactSchema } from "@/lib/schema";
import { createContactEnquiryEmail } from "@/lib/email/contactEnquiry";

function resendFailure(error: ErrorResponse) {
  const configurationErrors = new Set([
    "invalid_api_key",
    "restricted_api_key",
    "invalid_access",
    "invalid_from_address",
    "validation_error",
  ]);
  const quotaErrors = new Set([
    "monthly_quota_exceeded",
    "daily_quota_exceeded",
    "rate_limit_exceeded",
  ]);

  console.error("Resend rejected enquiry email", {
    code: error.name,
    statusCode: error.statusCode,
    message: error.message,
  });

  if (configurationErrors.has(error.name)) {
    return NextResponse.json(
      {
        ok: false,
        code: `EMAIL_${error.name.toUpperCase()}`,
        error: "Email delivery is not configured correctly. Please call or WhatsApp us.",
      },
      { status: 503 },
    );
  }

  if (quotaErrors.has(error.name)) {
    return NextResponse.json(
      {
        ok: false,
        code: `EMAIL_${error.name.toUpperCase()}`,
        error: "Email delivery is temporarily busy. Please try again shortly or contact us on WhatsApp.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { ok: false, code: "EMAIL_PROVIDER_ERROR", error: "We couldn't send your enquiry. Please WhatsApp or call us directly." },
    { status: 502 },
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot triggered. Silently accept without sending, to not tip off bots.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const { subject, html, text } = createContactEnquiryEmail(data);

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "sanjayequipments@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey) {
    console.error("RESEND_API_KEY not set. Enquiry form is unavailable.");
    return NextResponse.json(
      { ok: false, error: "The enquiry form is unavailable right now. Please call or WhatsApp us." },
      { status: 503 },
    );
  }

  const senderAddress = fromEmail?.match(/<([^<>]+)>$/)?.[1] ?? fromEmail;
  if (!fromEmail || !senderAddress || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(senderAddress)) {
    console.error("CONTACT_FROM_EMAIL must contain a full sender email address.");
    return NextResponse.json(
      { ok: false, error: "The enquiry form is not configured correctly yet. Please call or WhatsApp us." },
      { status: 503 },
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
      text,
      replyTo: data.email || undefined,
    });
    if (error) return resendFailure(error);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unable to reach Resend", err);
    return NextResponse.json(
      { ok: false, code: "EMAIL_NETWORK_ERROR", error: "Email delivery is temporarily unavailable. Please try again or contact us on WhatsApp." },
      { status: 502 },
    );
  }
}
