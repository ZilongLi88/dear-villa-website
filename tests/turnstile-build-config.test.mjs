import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = await readFile(new URL("../vite.config.ts", import.meta.url), "utf8");

test("Turnstile Site Key is explicitly injected into the client bundle", () => {
  assert.match(
    config,
    /"process\.env\.NEXT_PUBLIC_TURNSTILE_SITE_KEY": JSON\.stringify\(turnstileSiteKey\)/,
  );
});

test("production rejects missing and localhost Turnstile Site Keys", () => {
  assert.match(config, /mode === "production"/);
  assert.match(config, /!configuredTurnstileSiteKey/);
  assert.match(
    config,
    /configuredTurnstileSiteKey === TURNSTILE_LOCAL_TEST_SITE_KEY/,
  );
  assert.match(
    config,
    /Production build requires NEXT_PUBLIC_TURNSTILE_SITE_KEY/,
  );
});

test("local development uses Cloudflare's localhost Turnstile Site Key", () => {
  assert.match(
    config,
    /const turnstileSiteKey = mode === "production"[\s\S]*?: TURNSTILE_LOCAL_TEST_SITE_KEY;/,
  );
});
