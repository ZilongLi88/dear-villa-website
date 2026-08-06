import assert from "node:assert/strict";
import test from "node:test";
import { createEnquiryPostHandler } from "../app/api/enquiries/handler.ts";

const validPayload = (overrides = {}) => ({
  fullName: "Browser Test",
  email: "browser@example.com",
  phone: "",
  enquiryType: "accommodation",
  preferredDate: "",
  guests: "2",
  message: "",
  turnstileToken: "test-token",
  ...overrides,
});

function request(payload, ip = "203.0.113.10") {
  return new Request("https://example.com/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ip },
    body: JSON.stringify(payload),
  });
}

function dependencies(overrides = {}) {
  return {
    checkRateLimit: async () => true,
    verifyTurnstile: async () => true,
    insertEnquiry: async () => {},
    ...overrides,
  };
}

test("accepts a valid verified enquiry and normalizes optional values", async () => {
  let inserted;
  const handler = createEnquiryPostHandler(dependencies({
    insertEnquiry: async (values) => { inserted = values; },
  }));
  const response = await handler(request(validPayload()));
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { success: true, message: "Enquiry received" });
  assert.deepEqual(inserted, {
    fullName: "Browser Test",
    email: "browser@example.com",
    phone: null,
    enquiryType: "accommodation",
    preferredDate: null,
    guests: 2,
    message: null,
  });
});

test("rejects an invalid email", async () => {
  const response = await createEnquiryPostHandler(dependencies())(request(validPayload({ email: "invalid" })));
  assert.equal(response.status, 400);
});

test("rejects an unknown enquiry type", async () => {
  const response = await createEnquiryPostHandler(dependencies())(request(validPayload({ enquiryType: "other" })));
  assert.equal(response.status, 400);
});

test("rejects excessive guest counts", async () => {
  const response = await createEnquiryPostHandler(dependencies())(request(validPayload({ guests: "101" })));
  assert.equal(response.status, 400);
});

test("rejects missing and invalid Turnstile tokens", async () => {
  const handler = createEnquiryPostHandler(dependencies());
  assert.equal((await handler(request(validPayload({ turnstileToken: "" })))).status, 400);
  const invalidHandler = createEnquiryPostHandler(dependencies({ verifyTurnstile: async () => false }));
  assert.equal((await invalidHandler(request(validPayload()))).status, 403);
});

test("returns 429 and Retry-After when the limiter rejects a request", async () => {
  const handler = createEnquiryPostHandler(dependencies({ checkRateLimit: async () => false }));
  const response = await handler(request(validPayload()));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
});

test("limits repeated requests per IP while keeping different IP counters independent", async () => {
  const counts = new Map();
  const handler = createEnquiryPostHandler(dependencies({
    checkRateLimit: async (key) => {
      const count = (counts.get(key) ?? 0) + 1;
      counts.set(key, count);
      return count <= 5;
    },
  }));

  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.equal((await handler(request(validPayload(), "203.0.113.20"))).status, 201);
  }
  assert.equal((await handler(request(validPayload(), "203.0.113.20"))).status, 429);
  assert.equal((await handler(request(validPayload(), "203.0.113.21"))).status, 201);
  assert.equal(counts.get("contact-enquiry:203.0.113.20"), 6);
  assert.equal(counts.get("contact-enquiry:203.0.113.21"), 1);
});

test("rejects oversized payloads before parsing", async () => {
  const response = await createEnquiryPostHandler(dependencies())(
    request(validPayload({ message: "x".repeat(17 * 1024) })),
  );
  assert.equal(response.status, 413);
});
