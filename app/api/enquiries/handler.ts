const MAX_BODY_BYTES = 16 * 1024;
const TURNSTILE_ACTION = "contact_enquiry";

export const ENQUIRY_TYPES = [
  "accommodation",
  "weddings",
  "corporateEvents",
  "internationalPrograms",
  "general",
] as const;

type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export type ValidEnquiry = {
  fullName: string;
  email: string;
  phone: string | null;
  enquiryType: EnquiryType;
  preferredDate: string | null;
  guests: number | null;
  message: string | null;
};

type HandlerDependencies = {
  checkRateLimit(key: string): Promise<boolean>;
  verifyTurnstile(token: string): Promise<boolean>;
  insertEnquiry(enquiry: ValidEnquiry): Promise<void>;
};

type ValidationResult =
  | { ok: true; enquiry: ValidEnquiry; turnstileToken: string }
  | { ok: false; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ALLOWED_KEYS = new Set([
  "fullName",
  "email",
  "phone",
  "enquiryType",
  "preferredDate",
  "guests",
  "message",
  "turnstileToken",
]);

function jsonError(status: number, code: string, message: string, headers?: HeadersInit) {
  return Response.json({ success: false, code, message }, { status, headers });
}

async function readLimitedBody(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return null;
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

function requiredString(value: unknown, maximum: number) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized && normalized.length <= maximum ? normalized : null;
}

function optionalString(value: unknown, maximum: number) {
  if (value === undefined || value === null || value === "") return { valid: true, value: null };
  if (typeof value !== "string") return { valid: false, value: null };
  const normalized = value.trim();
  if (!normalized) return { valid: true, value: null };
  return normalized.length <= maximum
    ? { valid: true, value: normalized }
    : { valid: false, value: null };
}

function validDate(value: string) {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function parseGuests(value: unknown) {
  if (value === undefined || value === null || value === "") return { valid: true, value: null };
  if (typeof value !== "string" && typeof value !== "number") return { valid: false, value: null };
  const source = String(value).trim();
  if (!/^\d+$/.test(source)) return { valid: false, value: null };
  const guests = Number(source);
  return Number.isSafeInteger(guests) && guests >= 1 && guests <= 100
    ? { valid: true, value: guests }
    : { valid: false, value: null };
}

export function validateEnquiryPayload(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, message: "Invalid enquiry payload" };
  }

  const record = payload as Record<string, unknown>;
  if (Object.keys(record).some((key) => !ALLOWED_KEYS.has(key))) {
    return { ok: false, message: "Invalid enquiry payload" };
  }

  const fullName = requiredString(record.fullName, 100);
  const email = requiredString(record.email, 254);
  const enquiryType = requiredString(record.enquiryType, 40);
  const turnstileToken = requiredString(record.turnstileToken, 2048);
  const phone = optionalString(record.phone, 40);
  const preferredDate = optionalString(record.preferredDate, 10);
  const message = optionalString(record.message, 4000);
  const guests = parseGuests(record.guests);

  if (!fullName || !email || !enquiryType) {
    return { ok: false, message: "Missing or invalid required fields" };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Invalid email address" };
  }
  if (!ENQUIRY_TYPES.includes(enquiryType as EnquiryType)) {
    return { ok: false, message: "Invalid enquiry type" };
  }
  if (!turnstileToken) {
    return { ok: false, message: "Turnstile verification is required" };
  }
  if (!phone.valid || !preferredDate.valid || !message.valid || !guests.valid) {
    return { ok: false, message: "Invalid enquiry fields" };
  }
  if (preferredDate.value && !validDate(preferredDate.value)) {
    return { ok: false, message: "Invalid preferred date" };
  }

  return {
    ok: true,
    turnstileToken,
    enquiry: {
      fullName,
      email,
      phone: phone.value,
      enquiryType: enquiryType as EnquiryType,
      preferredDate: preferredDate.value,
      guests: guests.value,
      message: message.value,
    },
  };
}

export function createEnquiryPostHandler(dependencies: HandlerDependencies) {
  return async function handleEnquiryPost(request: Request) {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return jsonError(415, "unsupported_media_type", "Content-Type must be application/json");
    }

    const clientIp = request.headers.get("cf-connecting-ip")?.trim() || "local-development";
    const rateLimitKey = `contact-enquiry:${clientIp}`;
    if (!(await dependencies.checkRateLimit(rateLimitKey))) {
      return jsonError(429, "rate_limited", "Too many enquiries. Please try again later.", {
        "Retry-After": "60",
      });
    }

    const rawBody = await readLimitedBody(request);
    if (rawBody === null) {
      return jsonError(413, "payload_too_large", "Enquiry payload is too large");
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonError(400, "invalid_json", "Invalid JSON payload");
    }

    const validation = validateEnquiryPayload(payload);
    if (!validation.ok) {
      return jsonError(400, "validation_error", validation.message);
    }

    if (!(await dependencies.verifyTurnstile(validation.turnstileToken))) {
      return jsonError(403, "turnstile_failed", "Security verification failed");
    }

    await dependencies.insertEnquiry(validation.enquiry);
    return Response.json(
      { success: true, message: "Enquiry received" },
      { status: 201 },
    );
  };
}

export async function verifyTurnstile(
  token: string,
  options: { secret: string; expectedHostname?: string; fetchImpl?: typeof fetch },
) {
  const response = await (options.fetchImpl ?? fetch)(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: options.secret, response: token }),
      signal: AbortSignal.timeout(5000),
    },
  );

  if (!response.ok) return false;
  const result = (await response.json()) as {
    success?: boolean;
    action?: string;
    hostname?: string;
  };

  return Boolean(
    result.success &&
      result.action === TURNSTILE_ACTION &&
      (!options.expectedHostname || result.hostname === options.expectedHostname),
  );
}
