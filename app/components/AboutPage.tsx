"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { aboutImages, type AboutImage } from "../content/about";
import { Footer } from "./Homepage";

type AboutPathwayProps = {
  image: AboutImage;
  eyebrowKey: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  href: string;
};

function AboutPathway({
  image,
  eyebrowKey,
  titleKey,
  bodyKey,
  ctaKey,
  href,
}: AboutPathwayProps) {
  const { t } = useTranslation();

  return (
    <article className="about-pathway">
      <Link href={href} className="about-pathway-image" tabIndex={-1}>
        <img
          src={image.src}
          alt={t(image.altKey)}
          style={{ objectPosition: image.position }}
          loading="lazy"
        />
      </Link>
      <div className="about-pathway-copy">
        <p className="section-eyebrow">{t(eyebrowKey)}</p>
        <h3>{t(titleKey)}</h3>
        <p>{t(bodyKey)}</p>
        <Link href={href} className="text-link">
          <span>{t(ctaKey)}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="about-hero" aria-labelledby="about-title">
      <img
        src={aboutImages.hero.src}
        alt={t(aboutImages.hero.altKey)}
        style={{ objectPosition: aboutImages.hero.position }}
        fetchPriority="high"
      />
      <div className="about-hero-overlay" />
      <div className="about-hero-content">
        <p className="section-eyebrow">{t("about.hero.eyebrow")}</p>
        <h1 id="about-title">{t("about.hero.title")}</h1>
        <p>{t("about.hero.intro")}</p>
      </div>
    </section>
  );
}

function AboutIntroduction() {
  const { t } = useTranslation();

  return (
    <section className="about-introduction">
      <div className="about-introduction-heading">
        <p className="section-eyebrow">{t("about.introduction.eyebrow")}</p>
        <h2>{t("about.introduction.title")}</h2>
      </div>
      <div className="about-introduction-copy">
        <p className="about-lead">{t("about.introduction.lead")}</p>
        <p>{t("about.introduction.body")}</p>
      </div>
      <figure className="about-introduction-image">
        <img
          src={aboutImages.introduction.src}
          alt={t(aboutImages.introduction.altKey)}
          style={{ objectPosition: aboutImages.introduction.position }}
          loading="lazy"
        />
      </figure>
    </section>
  );
}

function AboutValues() {
  const { t } = useTranslation();
  const values = ["place", "hospitality", "pace"] as const;

  return (
    <section className="about-values" aria-labelledby="about-values-title">
      <div className="about-values-heading">
        <p className="section-eyebrow">{t("about.values.eyebrow")}</p>
        <h2 id="about-values-title">{t("about.values.title")}</h2>
      </div>
      <div className="about-values-list">
        {values.map((value, index) => (
          <article key={value} className="about-value">
            <span aria-hidden="true">0{index + 1}</span>
            <h3>{t(`about.values.${value}.title`)}</h3>
            <p>{t(`about.values.${value}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutSetting() {
  const { t } = useTranslation();

  return (
    <section className="about-setting">
      <img
        src={aboutImages.setting.src}
        alt={t(aboutImages.setting.altKey)}
        style={{ objectPosition: aboutImages.setting.position }}
        loading="lazy"
      />
      <div className="about-setting-overlay" />
      <blockquote>
        <p>{t("about.setting.quote")}</p>
        <cite>{t("about.setting.attribution")}</cite>
      </blockquote>
    </section>
  );
}

function AboutContactCta() {
  const { t } = useTranslation();

  return (
    <section className="contact-cta">
      <p className="section-eyebrow">{t("about.contact.eyebrow")}</p>
      <h2>{t("about.contact.title")}</h2>
      <p>{t("about.contact.body")}</p>
      <Link href="/contact" className="button button-ivory">
        {t("about.contact.cta")}
      </Link>
    </section>
  );
}

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="about-page" id="main-content">
        <AboutHero />
        <AboutIntroduction />
        <AboutValues />
        <section className="about-pathways" aria-labelledby="about-pathways-title">
          <header className="about-pathways-heading">
            <p className="section-eyebrow">{t("about.pathways.eyebrow")}</p>
            <h2 id="about-pathways-title">{t("about.pathways.title")}</h2>
            <p>{t("about.pathways.intro")}</p>
          </header>
          <div className="about-pathways-grid">
            <AboutPathway
              image={aboutImages.history}
              eyebrowKey="about.pathways.history.eyebrow"
              titleKey="about.pathways.history.title"
              bodyKey="about.pathways.history.body"
              ctaKey="about.pathways.history.cta"
              href="/about/history"
            />
            <AboutPathway
              image={aboutImages.gallery}
              eyebrowKey="about.pathways.gallery.eyebrow"
              titleKey="about.pathways.gallery.title"
              bodyKey="about.pathways.gallery.body"
              ctaKey="about.pathways.gallery.cta"
              href="/about/gallery"
            />
          </div>
        </section>
        <AboutSetting />
        <AboutContactCta />
      </main>
      <Footer />
    </>
  );
}
