"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  privateDiningImages,
  privateDiningMoments,
  privateDiningVisibility,
} from "../content/privateDining";
import { Footer } from "./Homepage";

function DiningMoments() {
  const { t } = useTranslation();

  return (
    <section className="dining-moments" aria-labelledby="dining-moments-title">
      <h2 id="dining-moments-title">{t("privateDining.moments.title")}</h2>
      <div className="dining-moments-story">
        {privateDiningMoments.map((moment, index) => (
          <article className="dining-moment" key={moment.src}>
            <figure><img src={moment.src} alt={t(moment.altKey)} loading="lazy" /></figure>
            <blockquote><span aria-hidden="true">0{index + 1}</span><p>{t(moment.quoteKey)}</p></blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}

function PreparedSection() {
  const { t } = useTranslation();

  return (
    <section className="dining-prepared" aria-labelledby="dining-prepared-title">
      <div>
        <h2 id="dining-prepared-title">{t("privateDining.prepared.title")}</h2>
        <p>{t("privateDining.prepared.body")}</p>
        <Link href="/contact" className="button button-primary">{t("privateDining.prepared.cta")}</Link>
      </div>
    </section>
  );
}

export function PrivateDiningPage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="private-dining-page" id="main-content">
        <section className="dining-hero" aria-labelledby="private-dining-title">
          <img src={privateDiningImages.hero.src} alt={t(privateDiningImages.hero.altKey)} fetchPriority="high" />
          <div className="dining-hero-overlay" />
          <div className="dining-hero-content">
            <h1 id="private-dining-title">{t("privateDining.hero.title")}</h1>
            <p>{t("privateDining.hero.body")}</p>
            <Link href="/contact" className="button button-ivory">{t("privateDining.hero.cta")}</Link>
          </div>
        </section>

        <section className="dining-introduction">
          <figure><img src={privateDiningImages.introduction.src} alt={t(privateDiningImages.introduction.altKey)} loading="lazy" /></figure>
          <div>
            <h2>{t("privateDining.introduction.title")}</h2>
            <p>{t("privateDining.introduction.body1")}</p>
            <p>{t("privateDining.introduction.body2")}</p>
          </div>
        </section>

        {privateDiningVisibility.moments && <DiningMoments />}
        {privateDiningVisibility.prepared && <PreparedSection />}

        <section className="dining-cta">
          <img src={privateDiningImages.closing.src} alt={t(privateDiningImages.closing.altKey)} loading="lazy" />
          <div className="dining-cta-overlay" />
          <div className="dining-cta-content">
            <h2>{t("privateDining.cta.title")}</h2>
            <p>{t("privateDining.cta.body")}</p>
            <Link href="/contact" className="button button-ivory">{t("privateDining.cta.button")}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
