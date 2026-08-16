import type { EnquiryLanguage, ValidEnquiry } from "./handler";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_FROM = "Dear Villa <enquiries@dearvilla.com>";

const ENQUIRY_TYPE_LABELS: Record<ValidEnquiry["enquiryType"], string> = {
  accommodation: "Accommodation",
  weddings: "Weddings",
  corporateEvents: "Corporate Events",
  internationalPrograms: "International Programs",
  general: "General Enquiry",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayValue(value: string | number | null) {
  return value === null ? "Not provided" : String(value);
}

export function buildEnquiryNotification(enquiry: ValidEnquiry, submittedAt: string) {
  const enquiryType = ENQUIRY_TYPE_LABELS[enquiry.enquiryType];
  const fields = [
    ["Full name", enquiry.fullName],
    ["Email", enquiry.email],
    ["Phone", displayValue(enquiry.phone)],
    ["Enquiry type", enquiryType],
    ["Preferred date", displayValue(enquiry.preferredDate)],
    ["Guests", displayValue(enquiry.guests)],
    ["Message", displayValue(enquiry.message)],
    ["Submission time", submittedAt],
  ];

  const rows = fields.map(([label, value]) => `
    <tr>
      <th style="padding:8px 16px 8px 0;text-align:left;vertical-align:top">${escapeHtml(String(label))}</th>
      <td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(String(value))}</td>
    </tr>`).join("");

  return {
    from: RESEND_FROM,
    subject: `New enquiry from Dear Villa — ${enquiryType}`,
    reply_to: enquiry.email,
    html: `<h1>New Dear Villa enquiry</h1><table><tbody>${rows}</tbody></table>`,
  };
}

export function buildCustomerConfirmation(enquiry: ValidEnquiry, language: EnquiryLanguage) {
  const escapedName = escapeHtml(enquiry.fullName);
  if (language === "zh-CN") {
    return {
      from: RESEND_FROM,
      to: enquiry.email,
      subject: "感谢您联系 Dear Villa",
      html: `<p>您好，${escapedName}：</p><p>感谢您联系 Dear Villa。</p><p>我们已经收到您的咨询，工作人员将尽快与您联系。</p><p>Dear Villa<br><a href="https://www.dearvilla.com">www.dearvilla.com</a></p>`,
      text: `您好，${enquiry.fullName}：\n\n感谢您联系 Dear Villa。\n\n我们已经收到您的咨询，工作人员将尽快与您联系。\n\nDear Villa\nwww.dearvilla.com`,
    };
  }

  const firstName = escapeHtml(enquiry.fullName.split(/\s+/)[0] || enquiry.fullName);
  return {
    from: RESEND_FROM,
    to: enquiry.email,
    subject: "Thank you for contacting Dear Villa",
    html: `<p>Hi ${firstName},</p><p>Thank you for contacting Dear Villa.</p><p>We have received your enquiry and our team will get back to you shortly.</p><p>Kind regards,<br>Dear Villa<br><a href="https://www.dearvilla.com">www.dearvilla.com</a></p>`,
    text: `Hi ${enquiry.fullName.split(/\s+/)[0] || enquiry.fullName},\n\nThank you for contacting Dear Villa.\n\nWe have received your enquiry and our team will get back to you shortly.\n\nKind regards,\nDear Villa\nwww.dearvilla.com`,
  };
}

async function sendResendEmail(
  payload: Record<string, unknown>,
  options: { apiKey?: string; fetchImpl?: typeof fetch },
) {
  if (!options.apiKey) {
    throw new Error("Email notification configuration is unavailable");
  }

  const response = await (options.fetchImpl ?? fetch)(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error("Email notification delivery failed");
  }
}

export async function sendEnquiryNotification(
  enquiry: ValidEnquiry,
  submittedAt: string,
  options: {
    apiKey?: string;
    recipient?: string;
    fetchImpl?: typeof fetch;
  },
) {
  if (!options.recipient) {
    throw new Error("Email notification configuration is unavailable");
  }

  const payload = {
    ...buildEnquiryNotification(enquiry, submittedAt),
    to: options.recipient,
  };
  await sendResendEmail(payload, options);
}

export async function sendCustomerConfirmation(
  enquiry: ValidEnquiry,
  language: EnquiryLanguage,
  options: { apiKey?: string; fetchImpl?: typeof fetch },
) {
  await sendResendEmail(buildCustomerConfirmation(enquiry, language), options);
}
