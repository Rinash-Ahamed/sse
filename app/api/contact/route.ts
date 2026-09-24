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

  // Honeypot triggered. Silently accept without sending, to not tip off bots.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const enquiryTopic = data.products.length === 1
    ? data.products[0]
    : data.products.length > 1
      ? `${data.products.length} items`
      : "General";
  const subject = `Website Enquiry: ${enquiryTopic}`;
  const text = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "-"}`,
    `Company: ${data.company || "-"}`,
    `Equipment or services:\n${data.products.length ? data.products.map((item) => `- ${item}`).join("\n") : "-"}`,
    `Message: ${data.message || "-"}`,
    "",
    `Date/Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
  ].join("\n");

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
      text,
      replyTo: data.email || undefined,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send enquiry email", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry. Please WhatsApp or call us directly." },
      { status: 500 },
    );
  }
}
