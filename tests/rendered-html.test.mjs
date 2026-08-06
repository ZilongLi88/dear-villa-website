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

test("resolves About page localization keys to approved English copy", async () => {
  const response = await render("/about");
  const html = await response.text();

  assert.doesNotMatch(html, /aboutPage\.[a-zA-Z0-9_.]+/);
  assert.match(html, /ABOUT DEAR VILLA/);
  assert.match(html, /A Private Estate in the Heart of Whitford/);
  assert.match(html, /Welcome to Dear Villa/);
  assert.match(html, /A Place to Slow Down/);
  assert.match(html, /Designed for Every Occasion/);
  assert.match(html, /The Estate/);
  assert.match(html, /Our Vision/);
  assert.match(html, /We Look Forward to Welcoming You/);
});

test("provides matching English and Simplified Chinese About translations", async () => {
  const [{ default: i18next }, { en }, { zhCN }] = await Promise.all([
    import("i18next"),
    import("../app/locales/en.ts"),
    import("../app/locales/zh-CN.ts"),
  ]);
  const instance = i18next.createInstance();
  await instance.init({ resources: { en, "zh-CN": zhCN }, lng: "en" });

  assert.equal(instance.t("aboutPage.hero.title"), "A Private Estate in the Heart of Whitford");
  assert.equal(instance.t("aboutPage.final.secondary"), "Contact Us");
  await instance.changeLanguage("zh-CN");
  assert.equal(instance.t("aboutPage.hero.title"), "隐逸于 Whitford 的庄园生活");
  assert.equal(instance.t("aboutPage.final.secondary"), "联系我们");
});

test("renders the localized accessible Contact enquiry form", async () => {
  const response = await render("/contact");
  const html = await response.text();
  const component = await readFile(new URL("../app/components/ContactPage.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(html, /contactPage\.[a-zA-Z0-9_.]+/);
  assert.match(html, /Contact Us/);
  for (const name of ["fullName", "email", "phone", "enquiryType", "preferredDate", "guests", "message"]) {
    assert.match(html, new RegExp(`name="${name}"`));
  }
  assert.match(component, /aria-invalid/);
  assert.match(component, /status === "sending" \|\| status === "success"/);
  assert.match(component, /\^\[\^\\s@\]\+@/);
  assert.doesNotMatch(component, /if \(!message\)/);
  assert.match(component, /<textarea id="message" name="message" rows=\{6\} maxLength=\{4000\} \/>/);
  assert.match(component, /turnstileToken/);
  assert.match(component, /<TurnstileWidget/);
  assert.match(component, /setStatus\("success"\);\s*setTurnstileToken\(null\);\s*setTurnstileResetSignal/);
  assert.match(component, /catch \{\s*setStatus\("error"\);\s*setTurnstileResetSignal/);
});

test("serves every Phase 1 route directly", async () => {
  const routes = [
    "/about",
    "/about/history",
    "/about/gallery",
    "/events",
    "/events/weddings",
    "/events/corporate",
    "/international-programs",
    "/events/international-programs",
    "/accommodation",
    "/accommodation/boutique-stay",
    "/accommodation/healing-retreat",
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

test("matches the Version 0.3 information architecture", async () => {
  const config = await readFile(
    new URL("../app/navigation/config.ts", import.meta.url),
    "utf8",
  );

  const eventsBlock = config.slice(
    config.indexOf('id: "events"'),
    config.indexOf('id: "accommodation"'),
  );
  const accommodationBlock = config.slice(
    config.indexOf('id: "accommodation"'),
    config.indexOf('id: "experiences"'),
  );
  const internationalProgramsBlock = config.slice(
    config.indexOf('id: "international-programs"'),
    config.indexOf('id: "membership"'),
  );

  assert.doesNotMatch(eventsBlock, /international-programs/);
  assert.match(accommodationBlock, /\/accommodation\/boutique-stay/);
  assert.match(accommodationBlock, /\/accommodation\/healing-retreat/);
  assert.match(internationalProgramsBlock, /href:\s*"\/international-programs"/);
});

test("renders the accessible manual homepage gallery carousel", async () => {
  const response = await render("/");
  const html = await response.text();
  const carousel = await readFile(
    new URL("../app/components/EstateCarousel.tsx", import.meta.url),
    "utf8",
  );

  assert.match(html, /class="estate-carousel"/);
  assert.match(html, /aria-roledescription="carousel"/);
  assert.match(html, /View previous estate image/);
  assert.match(html, /View next estate image/);
  assert.doesNotMatch(html, /gallery-preview-grid/);
  assert.match(carousel, /index - 1 \+ images\.length\) % images\.length/);
  assert.match(carousel, /index \+ 1\) % images\.length/);
  assert.match(carousel, /event\.key === "ArrowLeft"/);
  assert.match(carousel, /event\.key === "ArrowRight"/);
  assert.match(carousel, /onTouchStart/);
  assert.match(carousel, /onTouchEnd/);
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
    "boutiqueStay",
    "healingRetreat",
    "experiences",
    "internationalPrograms",
    "contact",
    "membership",
  ]) {
    assert.match(english, new RegExp(`${key}:`));
    assert.match(chinese, new RegExp(`${key}:`));
  }
});
