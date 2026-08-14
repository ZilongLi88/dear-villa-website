import { getDb } from "../../../db";
import { enquiries } from "../../../db/schema";
import { createEnquiryPostHandler, verifyTurnstile } from "./handler";

const TURNSTILE_LOCAL_TEST_SECRET = "1x0000000000000000000000000000000AA";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

export async function POST(request: Request) {
  try {
    const { env } = await import("cloudflare:workers");
    const secret = env.TURNSTILE_SECRET_KEY;
    const isLocalRequest = LOCAL_HOSTNAMES.has(new URL(request.url).hostname);
    const expectedHostnames = env.TURNSTILE_EXPECTED_HOSTNAMES
      ?.split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean);
    if (
      !secret ||
      (secret === TURNSTILE_LOCAL_TEST_SECRET && !isLocalRequest) ||
      (!isLocalRequest && !expectedHostnames?.length)
    ) {
      console.error("Turnstile configuration is unavailable");
      return Response.json(
        { success: false, code: "service_unavailable", message: "Enquiry service is unavailable" },
        { status: 503 },
      );
    }

    const handler = createEnquiryPostHandler({
      checkRateLimit: async (key) => {
        const outcome = await env.CONTACT_RATE_LIMITER.limit({ key });
        return outcome.success;
      },
      verifyTurnstile: (token) =>
        verifyTurnstile(token, {
          secret,
          expectedHostnames: isLocalRequest ? undefined : expectedHostnames,
        }),
      insertEnquiry: async (values) => {
        const db = await getDb();
        await db.insert(enquiries).values(values);
      },
    });

    return await handler(request);
  } catch {
    console.error("Enquiry submission failed");
    return Response.json(
      { success: false, message: "Unable to save enquiry" },
      { status: 500 },
    );
  }
}
