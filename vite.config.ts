import vinext from "vinext";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

const TURNSTILE_LOCAL_TEST_SECRET = "1x0000000000000000000000000000000AA";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(async ({ mode }) => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: {
          name: "dear-villa-website",
          main: "./worker/index.ts",
          compatibility_date: "2026-05-15",
          compatibility_flags: ["nodejs_compat"],
          assets: {
            directory: "dist/client",
            not_found_handling: "none",
            binding: "ASSETS",
          },
          images: { binding: "IMAGES" },
          d1_databases: [
            {
              binding: "DB",
              database_name: "dear-villa-db",
              database_id: "7f687d33-a93a-4395-963c-6099a52f74ea",
              migrations_dir: "drizzle",
              remote: true,
            },
          ],
          ratelimits: [
            {
              name: "CONTACT_RATE_LIMITER",
              namespace_id: "1001",
              simple: { limit: 5, period: 60 },
            },
          ],
          vars:
            mode === "development"
              ? { TURNSTILE_SECRET_KEY: TURNSTILE_LOCAL_TEST_SECRET }
              : {
                  TURNSTILE_EXPECTED_HOSTNAME:
                    "dear-villa-website.zilongluck.workers.dev",
                },
          observability: { enabled: true },
        },
      }),
    ],
  };
});
