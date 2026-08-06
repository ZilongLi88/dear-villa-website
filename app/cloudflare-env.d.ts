interface __BaseEnv_Env {
  CONTACT_RATE_LIMITER: RateLimit;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_EXPECTED_HOSTNAME?: string;
}

declare namespace Cloudflare {
  interface Env {
    CONTACT_RATE_LIMITER: RateLimit;
    TURNSTILE_SECRET_KEY?: string;
    TURNSTILE_EXPECTED_HOSTNAME?: string;
  }
}
