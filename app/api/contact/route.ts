import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";

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

  // Honeypot triggered — silently accept without sending, to not tip off bots.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const subject = `Website Enquiry — ${data.product || "General"}`;
  const text = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    `Company: ${data.company || "-"}`,
    `Product: ${data.product || "-"}`,
    `Message: ${data.message}`,
    "",
    `Date/Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "sanjayequipments@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Website Enquiry <onboarding@resend.dev>";

  if (!apiKey) {
    // No email provider configured yet — log so the enquiry isn't silently lost during setup.
    console.warn("RESEND_API_KEY not set. Enquiry received but not emailed:\n", text);
    return NextResponse.json({ ok: true, warning: "Email not configured yet." });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
      replyTo: data.email || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send enquiry email", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry. Please WhatsApp or call us directly." },
      { status: 500 },
    );
  }
}
