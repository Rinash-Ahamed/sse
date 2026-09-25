import type { ContactFormValues } from "@/lib/schema";

const COLORS = {
  accent: "#B00018",
  accentDark: "#7D0012",
  ink: "#202427",
  muted: "#5E6468",
  paper: "#F6F4EF",
  surface: "#FFFFFF",
  line: "#E2DED6",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function display(value?: string) {
  return value?.trim() || "Not provided";
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:0 0 18px;color:${COLORS.muted};font-size:11px;line-height:16px;letter-spacing:1.4px;text-transform:uppercase;vertical-align:top;width:112px;">${label}</td>
      <td style="padding:0 0 18px;color:${COLORS.ink};font-size:15px;line-height:22px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

export function createContactEnquiryEmail(data: ContactFormValues) {
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const topic = data.products.length === 1
    ? data.products[0]
    : data.products.length > 1
      ? `${data.products.length} items`
      : "General enquiry";
  const subject = `New website enquiry | ${topic} | ${data.name}`;
  const phoneHref = data.phone.replace(/[^+\d]/g, "");
  const products = data.products.length
    ? data.products
        .map((item) => `<span style="display:inline-block;margin:0 7px 7px 0;padding:8px 11px;border:1px solid #D9C4C7;border-radius:999px;background:#FFF8F8;color:${COLORS.accentDark};font-size:12px;line-height:16px;font-weight:700;">${escapeHtml(item)}</span>`)
        .join("")
    : `<span style="color:${COLORS.muted};font-size:14px;">No equipment or service selected</span>`;
  const replyButton = data.email
    ? `<td style="padding:0 10px 10px 0;"><a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;border:1px solid ${COLORS.ink};border-radius:6px;padding:12px 18px;color:${COLORS.ink};font-size:13px;font-weight:700;text-decoration:none;">Reply by email</a></td>`
    : "";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.paper};color:${COLORS.ink};font-family:Inter,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New enquiry from ${escapeHtml(data.name)} about ${escapeHtml(topic)}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${COLORS.paper};">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;">
            <tr>
              <td style="padding:0 4px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="color:${COLORS.accent};font-size:12px;line-height:16px;font-weight:800;letter-spacing:2.2px;">SSE</div>
                      <div style="margin-top:3px;color:${COLORS.ink};font-size:17px;line-height:22px;font-weight:800;letter-spacing:.3px;">SHREE SANJAY EQUIPMENTS</div>
                    </td>
                    <td align="right" style="color:${COLORS.muted};font-size:11px;line-height:16px;letter-spacing:1px;text-transform:uppercase;vertical-align:middle;">Since 2004</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="overflow:hidden;border:1px solid ${COLORS.line};border-radius:18px;background:${COLORS.surface};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="height:7px;background:${COLORS.accent};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding:42px 44px 32px;">
                      <div style="color:${COLORS.accent};font-size:11px;line-height:16px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;">New website enquiry</div>
                      <h1 style="margin:12px 0 0;color:${COLORS.ink};font-size:34px;line-height:40px;letter-spacing:-1px;">A customer wants to talk.</h1>
                      <p style="margin:14px 0 0;color:${COLORS.muted};font-size:15px;line-height:24px;">Review the requirement below and contact the customer directly.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 44px 34px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid ${COLORS.line};padding-top:28px;">
                        ${detailRow("Name", data.name)}
                        ${detailRow("Phone", data.phone)}
                        ${detailRow("Email", display(data.email))}
                        ${detailRow("Company", display(data.company))}
                      </table>
                      <div style="margin-top:3px;color:${COLORS.muted};font-size:11px;line-height:16px;letter-spacing:1.4px;text-transform:uppercase;">Equipment or service needed</div>
                      <div style="margin-top:12px;">${products}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 44px 34px;">
                      <div style="border-left:3px solid ${COLORS.accent};background:${COLORS.paper};padding:22px 24px;">
                        <div style="color:${COLORS.muted};font-size:11px;line-height:16px;letter-spacing:1.4px;text-transform:uppercase;">Customer message</div>
                        <div style="margin-top:9px;color:${COLORS.ink};font-size:15px;line-height:24px;white-space:pre-wrap;">${escapeHtml(display(data.message))}</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 44px 34px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding:0 10px 10px 0;"><a href="tel:${escapeHtml(phoneHref)}" style="display:inline-block;border-radius:6px;background:${COLORS.accent};padding:13px 19px;color:#FFFFFF;font-size:13px;font-weight:700;text-decoration:none;">Call customer</a></td>
                          ${replyButton}
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top:1px solid ${COLORS.line};padding:20px 44px;color:${COLORS.muted};font-size:12px;line-height:19px;">
                      Received ${escapeHtml(receivedAt)} IST through shreesanjayequipments.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:22px 20px 0;color:${COLORS.muted};font-size:11px;line-height:18px;">
                Shree Sanjay Equipments &nbsp;|&nbsp; Avinashi Road, Coimbatore, Tamil Nadu 641062<br>
                Built for every job site.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "SHREE SANJAY EQUIPMENTS",
    "New website enquiry",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${display(data.email)}`,
    `Company: ${display(data.company)}`,
    "",
    "Equipment or services:",
    data.products.length ? data.products.map((item) => `- ${item}`).join("\n") : "Not provided",
    "",
    "Customer message:",
    display(data.message),
    "",
    `Received: ${receivedAt} IST`,
  ].join("\n");

  return { subject, html, text };
}
