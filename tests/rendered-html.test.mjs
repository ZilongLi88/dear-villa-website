import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Dear Villa shell without starter metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dear Villa Estate<\/title>/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("serves every Phase 1 route directly", async () => {
  const routes = [
    "/about",
    "/about/history",
    "/about/gallery",
    "/events",
    "/events/weddings",
    "/events/corporate",
    "/events/international-programs",
    "/accommodation",
    "/experiences",
    "/experiences/tea-room",
    "/experiences/private-dining",
    "/contact",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should return 200`);
  }
});

test("keeps Membership disabled in reusable navigation configuration", async () => {
  const config = await readFile(
    new URL("../app/navigation/config.ts", import.meta.url),
    "utf8",
  );

  assert.match(config, /id:\s*"membership"[\s\S]*?enabled:\s*false/);
  assert.match(config, /filter\(\(item\) => item\.enabled\)/);
  assert.match(config, /filter\(\(child\) => child\.enabled\)/);
});

test("provides English and Simplified Chinese navigation labels", async () => {
  const [english, chinese] = await Promise.all([
    readFile(new URL("../app/locales/en.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/locales/zh-CN.ts", import.meta.url), "utf8"),
  ]);

  for (const key of [
    "home",
    "about",
    "events",
    "accommodation",
    "experiences",
    "contact",
    "membership",
  ]) {
    assert.match(english, new RegExp(`${key}:`));
    assert.match(chinese, new RegExp(`${key}:`));
  }
});
