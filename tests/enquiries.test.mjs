import assert from "node:assert/strict";
import test from "node:test";
import { createEnquiryPostHandler, verifyTurnstile } from "../app/api/enquiries/handler.ts";
import { sendCustomerConfirmation, sendEnquiryNotification } from "../app/api/enquiries/notification.ts";

const validPayload = (overrides = {}) => ({
  fullName: "Browser Test",
  email: "browser@example.com",
  phone: "",
  enquiryType: "accommodation",
  preferredDate: "",
  guests: "2",
  message: "",
  language: "en",
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
    notifyEnquiry: async () => {},
    confirmCustomer: async () => {},
    reportNotificationFailure: () => {},
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

test("rejects an unknown confirmation language", async () => {
  const response = await createEnquiryPostHandler(dependencies())(
    request(validPayload({ language: "fr" })),
  );
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

test("accepts Turnstile verification from every approved production hostname", async () => {
  const expectedHostnames = [
    "www.dearvilla.com",
    "dearvilla.com",
    "dear-villa-website.zilongluck.workers.dev",
  ];

  for (const hostname of expectedHostnames) {
    const verified = await verifyTurnstile("test-token", {
      secret: "test-secret",
      expectedHostnames,
      fetchImpl: async () => Response.json({
        success: true,
        action: "contact_enquiry",
        hostname,
      }),
    });
    assert.equal(verified, true, `${hostname} should be accepted`);
  }
});

test("rejects Turnstile verification from a hostname outside the production allowlist", async () => {
  const verified = await verifyTurnstile("test-token", {
    secret: "test-secret",
    expectedHostnames: ["www.dearvilla.com", "dearvilla.com"],
    fetchImpl: async () => Response.json({
      success: true,
      action: "contact_enquiry",
      hostname: "untrusted.example.com",
    }),
  });

  assert.equal(verified, false);
});

test("inserts a valid enquiry before sending both email notifications", async () => {
  const operations = [];
  const handler = createEnquiryPostHandler(dependencies({
    insertEnquiry: async () => { operations.push("insert"); },
    notifyEnquiry: async () => { operations.push("admin"); },
    confirmCustomer: async () => { operations.push("customer"); },
  }));

  const response = await handler(request(validPayload()));
  assert.equal(response.status, 201);
  assert.deepEqual(operations, ["insert", "admin", "customer"]);
});

test("returns success when Resend fails after a successful D1 insert", async () => {
  let inserted = false;
  let reported = false;
  const handler = createEnquiryPostHandler(dependencies({
    insertEnquiry: async () => { inserted = true; },
    notifyEnquiry: async () => { throw new Error("Resend request failed"); },
    reportNotificationFailure: () => { reported = true; },
  }));

  const response = await handler(request(validPayload()));
  assert.equal(inserted, true);
  assert.equal(reported, true);
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { success: true, message: "Enquiry received" });
});

test("attempts the admin notification when customer confirmation fails", async () => {
  const operations = [];
  const failures = [];
  const handler = createEnquiryPostHandler(dependencies({
    insertEnquiry: async () => { operations.push("insert"); },
    notifyEnquiry: async () => { operations.push("admin"); },
    confirmCustomer: async () => { operations.push("customer"); throw new Error("failed"); },
    reportNotificationFailure: (email) => { failures.push(email); },
  }));

  const response = await handler(request(validPayload()));
  assert.equal(response.status, 201);
  assert.deepEqual(operations, ["insert", "admin", "customer"]);
  assert.deepEqual(failures, ["customer"]);
});

test("rejects missing Resend runtime configuration without making a request", async () => {
  let fetchCalled = false;
  const enquiry = {
    fullName: "Browser Test",
    email: "browser@example.com",
    phone: null,
    enquiryType: "accommodation",
    preferredDate: null,
    guests: 2,
    message: null,
  };

  await assert.rejects(
    sendEnquiryNotification(enquiry, "2026-08-15T00:00:00.000Z", {
      recipient: "owner@example.com",
      fetchImpl: async () => { fetchCalled = true; return Response.json({}); },
    }),
    /configuration is unavailable/,
  );
  await assert.rejects(
    sendEnquiryNotification(enquiry, "2026-08-15T00:00:00.000Z", {
      apiKey: "secret-value",
      fetchImpl: async () => { fetchCalled = true; return Response.json({}); },
    }),
    /configuration is unavailable/,
  );
  assert.equal(fetchCalled, false);
});

test("sends the correct escaped Resend payload with customer Reply-To", async () => {
  let requestUrl;
  let requestOptions;
  const enquiry = {
    fullName: "<Zilong & Co>",
    email: "guest@example.com",
    phone: "+64 21 123 456",
    enquiryType: "corporateEvents",
    preferredDate: "2026-09-01",
    guests: 8,
    message: '<script>alert("unsafe")</script>',
  };
  await sendEnquiryNotification(enquiry, "2026-08-15T01:02:03.000Z", {
    apiKey: "resend-test-secret",
    recipient: "dearvillaestate@gmail.com",
    fetchImpl: async (url, options) => {
      requestUrl = url;
      requestOptions = options;
      return Response.json({ id: "email-id" });
    },
  });

  const payload = JSON.parse(requestOptions.body);
  assert.equal(requestUrl, "https://api.resend.com/emails");
  assert.equal(payload.from, "Dear Villa <enquiries@dearvilla.com>");
  assert.equal(payload.to, "dearvillaestate@gmail.com");
  assert.equal(payload.reply_to, "guest@example.com");
  assert.equal(payload.subject, "New enquiry from Dear Villa — Corporate Events");
  assert.match(payload.html, /Full name/);
  assert.match(payload.html, /Preferred date/);
  assert.match(payload.html, /Submission time/);
  assert.match(payload.html, /&lt;Zilong &amp; Co&gt;/);
  assert.match(payload.html, /&lt;script&gt;alert\(&quot;unsafe&quot;\)&lt;\/script&gt;/);
  assert.doesNotMatch(payload.html, /<script>/);
  assert.equal(requestOptions.headers.Authorization, "Bearer resend-test-secret");
});

test("Resend failures do not leak the API key through thrown errors", async () => {
  const apiKey = "resend-sensitive-secret";
  const enquiry = {
    fullName: "Browser Test",
    email: "browser@example.com",
    phone: null,
    enquiryType: "general",
    preferredDate: null,
    guests: null,
    message: null,
  };

  await assert.rejects(
    sendEnquiryNotification(enquiry, "2026-08-15T00:00:00.000Z", {
      apiKey,
      recipient: "owner@example.com",
      fetchImpl: async () => new Response("provider details", { status: 500 }),
    }),
    (error) => !String(error).includes(apiKey) && !String(error).includes("provider details"),
  );
});

test("sends the English customer confirmation to the validated customer", async () => {
  let requestOptions;
  const enquiry = {
    fullName: "Alex Morgan",
    email: "alex@example.com",
    phone: null,
    enquiryType: "general",
    preferredDate: null,
    guests: null,
    message: null,
  };
  await sendCustomerConfirmation(enquiry, "en", {
    apiKey: "resend-test-secret",
    fetchImpl: async (_url, options) => {
      requestOptions = options;
      return Response.json({ id: "confirmation-id" });
    },
  });

  const payload = JSON.parse(requestOptions.body);
  assert.equal(payload.from, "Dear Villa <enquiries@dearvilla.com>");
  assert.equal(payload.to, "alex@example.com");
  assert.equal(payload.subject, "Thank you for contacting Dear Villa");
  assert.match(payload.html, /Hi Alex,/);
  assert.match(payload.html, /We have received your enquiry/);
});

test("sends an escaped Simplified Chinese customer confirmation", async () => {
  let requestOptions;
  const enquiry = {
    fullName: "王<小明>",
    email: "xiaoming@example.com",
    phone: null,
    enquiryType: "general",
    preferredDate: null,
    guests: null,
    message: null,
  };
  await sendCustomerConfirmation(enquiry, "zh-CN", {
    apiKey: "resend-test-secret",
    fetchImpl: async (_url, options) => {
      requestOptions = options;
      return Response.json({ id: "confirmation-id" });
    },
  });

  const payload = JSON.parse(requestOptions.body);
  assert.equal(payload.to, "xiaoming@example.com");
  assert.equal(payload.subject, "感谢您联系 Dear Villa");
  assert.match(payload.html, /您好，王&lt;小明&gt;：/);
  assert.match(payload.html, /我们已经收到您的咨询，工作人员将尽快与您联系。/);
  assert.doesNotMatch(payload.html, /王<小明>/);
});
