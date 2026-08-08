"use client";

import { FormEvent, useCallback, useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { contactHero } from "../content/contact";
import { Footer } from "./Homepage";
import { TurnstileWidget } from "./TurnstileWidget";

type FieldName = "fullName" | "email" | "enquiryType";
type FormStatus = "idle" | "sending" | "success" | "error";
type StatusMessage = "error" | "rateLimited" | "verification";

const enquiryOptions = ["accommodation", "weddings", "corporateEvents", "internationalPrograms", "general"] as const;
const LOCAL_TURNSTILE_SITE_KEY = "1x00000000000000000000AA";
const configuredTurnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  ?? LOCAL_TURNSTILE_SITE_KEY;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
const subscribeToHostname = () => () => {};

export function ContactPage() {
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<StatusMessage>("error");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const isLocalHostname = useSyncExternalStore(
    subscribeToHostname,
    () => LOCAL_HOSTNAMES.has(window.location.hostname),
    () => false,
  );
  const turnstileSiteKey = configuredTurnstileSiteKey === LOCAL_TURNSTILE_SITE_KEY
    ? (isLocalHostname ? LOCAL_TURNSTILE_SITE_KEY : "")
    : configuredTurnstileSiteKey;
  const onTurnstileTokenChange = useCallback((token: string | null) => setTurnstileToken(token), []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const enquiryType = String(data.get("enquiryType") ?? "");
    if (!fullName) nextErrors.fullName = t("contactPage.validation.required");
    if (!email) nextErrors.email = t("contactPage.validation.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("contactPage.validation.email");
    if (!enquiryType) nextErrors.enquiryType = t("contactPage.validation.required");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (!turnstileToken) {
      setStatusMessage("verification");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setStatusMessage("error");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone: String(data.get("phone") ?? "").trim(),
          enquiryType,
          preferredDate: String(data.get("preferredDate") ?? ""),
          guests: String(data.get("guests") ?? ""),
          message: String(data.get("message") ?? "").trim(),
          turnstileToken,
        }),
      });

      const result = await response.json().catch(() => ({})) as { code?: string };
      if (!response.ok) {
        setStatusMessage(result.code === "rate_limited" ? "rateLimited" : result.code === "turnstile_failed" ? "verification" : "error");
        throw new Error("Failed to submit enquiry");
      }

      setStatus("success");
      setTurnstileToken(null);
      setTurnstileResetSignal((current) => current + 1);
      form.reset();
    } catch {
      setStatus("error");
      setTurnstileResetSignal((current) => current + 1);
    }
  };

  const field = (name: FieldName) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((current) => ({ ...current, [name]: undefined })),
  });

  return <>
    <main className="contact-page" id="main-content">
      <section className="contact-hero" aria-labelledby="contact-title">
        <picture className="hero-picture">
          <source media="(max-width: 620px)" srcSet={contactHero.mobileSrc} />
          <img src={contactHero.src} alt={t(contactHero.altKey)} fetchPriority="high" />
        </picture>
        <div className="contact-hero-overlay" />
        <h1 id="contact-title">{t("contactPage.title")}</h1>
      </section>
      <section className="contact-main">
        <div className="contact-introduction">
          <h2>{t("contactPage.introduction.title")}</h2>
          <p>{t("contactPage.introduction.body1")}</p>
          <p>{t("contactPage.introduction.body2")}</p>
          <div className="contact-details">
            <h3>{t("contactPage.details.title")}</h3>
            <p className="contact-label">{t("contactPage.details.address")}</p>
            <address>245 Broomfields Road<br />Whitford, 2571</address>
          </div>
        </div>
        <form className="enquiry-form" onSubmit={submit} noValidate>
          <div className="form-field"><label htmlFor="fullName">{t("contactPage.fields.fullName")} <span>*</span></label><input id="fullName" name="fullName" autoComplete="name" maxLength={100} {...field("fullName")} />{errors.fullName && <p id="fullName-error" className="field-error">{errors.fullName}</p>}</div>
          <div className="form-field"><label htmlFor="email">{t("contactPage.fields.email")} <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} {...field("email")} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
          <div className="form-field"><label htmlFor="phone">{t("contactPage.fields.phone")}</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
          <div className="form-field"><label htmlFor="enquiryType">{t("contactPage.fields.enquiryType")} <span>*</span></label><select id="enquiryType" name="enquiryType" defaultValue="" {...field("enquiryType")}><option value="" disabled>{t("contactPage.fields.selectPrompt")}</option>{enquiryOptions.map((option) => <option value={option} key={option}>{t(`contactPage.options.${option}`)}</option>)}</select>{errors.enquiryType && <p id="enquiryType-error" className="field-error">{errors.enquiryType}</p>}</div>
          <div className="form-field"><label htmlFor="preferredDate">{t("contactPage.fields.preferredDate")}</label><input id="preferredDate" name="preferredDate" type="date" /></div>
          <div className="form-field"><label htmlFor="guests">{t("contactPage.fields.guests")}</label><input id="guests" name="guests" type="number" min="1" max="100" inputMode="numeric" /></div>
          <div className="form-field form-field-wide"><label htmlFor="message">{t("contactPage.fields.message")}</label><textarea id="message" name="message" rows={6} maxLength={4000} /></div>
          <div className="form-field form-field-wide turnstile-field">
            <p className="turnstile-label">{t("contactPage.turnstile.label")}</p>
            {turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} language={i18n.language === "zh-CN" ? "zh-cn" : "en"} resetSignal={turnstileResetSignal} onTokenChange={onTurnstileTokenChange} /> : <p className="field-error">{t("contactPage.turnstile.unavailable")}</p>}
          </div>
          <div className="form-submit form-field-wide">
            <button type="submit" className="button button-primary" disabled={status === "sending" || status === "success" || !turnstileToken}>{t(`contactPage.submit.${status === "sending" ? "sending" : status === "success" ? "success" : "idle"}`)}</button>
            <div className="form-status" aria-live="polite">{status === "success" && t("contactPage.status.success")}{status === "error" && t(`contactPage.status.${statusMessage}`)}</div>
          </div>
        </form>
      </section>
    </main>
    <Footer />
  </>;
}
