"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { aboutImages, type AboutImage } from "../content/about";
import { Footer } from "./Homepage";

type OccasionCardProps = {
  image: AboutImage;
  contentKey: "accommodation" | "events" | "tea" | "privateDining";
  href: string;
  portrait?: boolean;
};

function OccasionCard({ image, contentKey, href, portrait }: OccasionCardProps) {
  const { t } = useTranslation();
  return (
    <article className={`occasion-card ${portrait ? "occasion-card-portrait" : ""}`}>
      <Link href={href} className="occasion-card-link" aria-label={t(`aboutPage.occasions.${contentKey}.link`)}>
        <figure><img src={image.src} alt={t(image.altKey)} loading="lazy" /></figure>
        <div className="occasion-card-copy">
          <h3>{t(`aboutPage.occasions.${contentKey}.title`)}</h3>
          <p>{t(`aboutPage.occasions.${contentKey}.body`)}</p>
          <span className="text-link"><span>{t(`aboutPage.occasions.${contentKey}.link`)}</span><span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}

function EditorialSection({ image, titleKey, bodyKeys, reverse, id }: { image: AboutImage; titleKey: string; bodyKeys: string[]; reverse?: boolean; id?: string }) {
  const { t } = useTranslation();
  return (
    <section className={`about-editorial ${reverse ? "about-editorial-reverse" : ""}`} id={id}>
      <div className="about-editorial-copy"><h2>{t(titleKey)}</h2>{bodyKeys.map((key) => <p key={key}>{t(key)}</p>)}</div>
      <figure><img src={image.src} alt={t(image.altKey)} loading="lazy" /></figure>
    </section>
  );
}

export function AboutPage() {
  const { t } = useTranslation();
  const facts = ["residence", "grounds", "location", "distance"] as const;
  return <>
    <main className="about-page about-page-complete" id="main-content">
      <section className="about-hero" aria-labelledby="about-title">
        <picture className="hero-picture">
          <source media="(max-width: 620px)" srcSet={aboutImages.hero.mobileSrc} />
          <img src={aboutImages.hero.src} alt={t(aboutImages.hero.altKey)} style={{ objectPosition: aboutImages.hero.position }} fetchPriority="high" />
        </picture>
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <p className="section-eyebrow">{t("aboutPage.hero.eyebrow")}</p>
          <h1 id="about-title">{t("aboutPage.hero.title")}</h1>
          <p>{t("aboutPage.hero.body")}</p>
          <a href="#welcome" className="button button-ivory">{t("aboutPage.hero.cta")}</a>
        </div>
      </section>

      <EditorialSection id="welcome" image={aboutImages.welcome} titleKey="aboutPage.welcome.title" bodyKeys={["aboutPage.welcome.body1", "aboutPage.welcome.body2"]} />
      <EditorialSection image={aboutImages.slowDown} titleKey="aboutPage.slowDown.title" bodyKeys={["aboutPage.slowDown.body1", "aboutPage.slowDown.body2", "aboutPage.slowDown.body3"]} reverse />

      <section className="about-occasions" aria-labelledby="occasions-title">
        <header><h2 id="occasions-title">{t("aboutPage.occasions.title")}</h2><p>{t("aboutPage.occasions.intro")}</p></header>
        <div className="occasion-grid">
          <OccasionCard image={aboutImages.accommodation} contentKey="accommodation" href="/accommodation" />
          <OccasionCard image={aboutImages.events} contentKey="events" href="/contact" />
          <OccasionCard image={aboutImages.tea} contentKey="tea" href="/experiences/tea-room" portrait />
          <OccasionCard image={aboutImages.privateDining} contentKey="privateDining" href="/experiences/private-dining" />
        </div>
      </section>

      <section className="about-estate" aria-labelledby="estate-title">
        <figure><img src={aboutImages.estate.src} alt={t(aboutImages.estate.altKey)} loading="lazy" /></figure>
        <div className="about-estate-heading"><h2 id="estate-title">{t("aboutPage.estate.title")}</h2><p>{t("aboutPage.estate.intro")}</p></div>
        <dl>{facts.map((fact) => <div key={fact}><dt>{t(`aboutPage.estate.facts.${fact}`)}</dt></div>)}</dl>
      </section>

      <EditorialSection image={aboutImages.vision} titleKey="aboutPage.vision.title" bodyKeys={["aboutPage.vision.body1", "aboutPage.vision.body2", "aboutPage.vision.body3"]} reverse />

      <section className="about-final-cta">
        <img src={aboutImages.closing.src} alt={t(aboutImages.closing.altKey)} style={{ objectPosition: aboutImages.closing.position }} loading="lazy" />
        <div className="about-final-overlay" />
        <div><h2>{t("aboutPage.final.title")}</h2><p>{t("aboutPage.final.body")}</p><div className="about-final-actions"><Link href="/accommodation" className="button button-ivory">{t("aboutPage.final.primary")}</Link><Link href="/contact" className="button button-secondary-light">{t("aboutPage.final.secondary")}</Link></div></div>
      </section>
    </main>
    <Footer />
  </>;
}
