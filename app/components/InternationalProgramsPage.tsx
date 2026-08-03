"use client";

/* eslint-disable @next/next/no-img-element */

import { useTranslation } from "react-i18next";
import { internationalProgramsImage } from "../content/internationalPrograms";
import { Footer } from "./Homepage";

export function InternationalProgramsPage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="international-programs-page" id="main-content">
        <img
          src={internationalProgramsImage.src}
          alt={t(internationalProgramsImage.altKey)}
          fetchPriority="high"
        />
        <div className="international-programs-overlay" />
        <section className="international-programs-content" aria-labelledby="international-programs-title">
          <p className="section-eyebrow">{t("internationalProgramsPage.subtitle")}</p>
          <h1 id="international-programs-title">{t("internationalProgramsPage.title")}</h1>
          <div className="international-programs-copy">
            <p>{t("internationalProgramsPage.body1")}</p>
            <p>{t("internationalProgramsPage.body2")}</p>
            <p>{t("internationalProgramsPage.body3")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
