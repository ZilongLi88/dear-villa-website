"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { contactHero } from "../content/contact";
import { Footer } from "./Homepage";

type FieldName = "fullName" | "email" | "enquiryType";
type FormStatus = "idle" | "sending" | "success" | "error";

const enquiryOptions = ["accommodation", "weddings", "corporateEvents", "internationalPrograms", "general"] as const;

export function ContactPage() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

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

    setStatus("sending");
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
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
        <img src={contactHero.src} alt={t(contactHero.altKey)} fetchPriority="high" />
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
          <div className="form-field"><label htmlFor="fullName">{t("contactPage.fields.fullName")} <span>*</span></label><input id="fullName" name="fullName" autoComplete="name" {...field("fullName")} />{errors.fullName && <p id="fullName-error" className="field-error">{errors.fullName}</p>}</div>
          <div className="form-field"><label htmlFor="email">{t("contactPage.fields.email")} <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" {...field("email")} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
          <div className="form-field"><label htmlFor="phone">{t("contactPage.fields.phone")}</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
          <div className="form-field"><label htmlFor="enquiryType">{t("contactPage.fields.enquiryType")} <span>*</span></label><select id="enquiryType" name="enquiryType" defaultValue="" {...field("enquiryType")}><option value="" disabled>{t("contactPage.fields.selectPrompt")}</option>{enquiryOptions.map((option) => <option value={option} key={option}>{t(`contactPage.options.${option}`)}</option>)}</select>{errors.enquiryType && <p id="enquiryType-error" className="field-error">{errors.enquiryType}</p>}</div>
          <div className="form-field"><label htmlFor="preferredDate">{t("contactPage.fields.preferredDate")}</label><input id="preferredDate" name="preferredDate" type="date" /></div>
          <div className="form-field"><label htmlFor="guests">{t("contactPage.fields.guests")}</label><input id="guests" name="guests" type="number" min="1" inputMode="numeric" /></div>
          <div className="form-field form-field-wide"><label htmlFor="message">{t("contactPage.fields.message")}</label><textarea id="message" name="message" rows={6} /></div>
          <div className="form-submit form-field-wide">
            <button type="submit" className="button button-primary" disabled={status === "sending" || status === "success"}>{t(`contactPage.submit.${status === "sending" ? "sending" : status === "success" ? "success" : "idle"}`)}</button>
            <div className="form-status" aria-live="polite">{status === "success" && t("contactPage.status.success")}{status === "error" && t("contactPage.status.error")}</div>
          </div>
        </form>
      </section>
    </main>
    <Footer />
  </>;
}
