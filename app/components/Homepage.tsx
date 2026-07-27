"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { homepageImages } from "../content/homepage";
import { visibleNavigationItems } from "../navigation/config";
import { EstateCarousel } from "./EstateCarousel";

type SectionHeaderProps = {
  eyebrowKey: string;
  titleKey: string;
  introKey?: string;
  align?: "left" | "center";
};

function SectionHeader({
  eyebrowKey,
  titleKey,
  introKey,
  align = "left",
}: SectionHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className={`section-header section-header-${align}`}>
      <p className="section-eyebrow">{t(eyebrowKey)}</p>
      <h2>{t(titleKey)}</h2>
      {introKey && <p className="section-intro">{t(introKey)}</p>}
    </header>
  );
}

type EditorialSplitProps = {
  id?: string;
  image: {
    src: string;
    altKey: string;
    position: string;
  };
  eyebrowKey: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  href: string;
  additionalLinks?: readonly {
    labelKey: string;
    href: string;
  }[];
  reverse?: boolean;
  tone?: "ivory" | "paper";
};

function EditorialSplit({
  id,
  image,
  eyebrowKey,
  titleKey,
  bodyKey,
  ctaKey,
  href,
  additionalLinks = [],
  reverse = false,
  tone = "ivory",
}: EditorialSplitProps) {
  const { t } = useTranslation();

  return (
    <section
      id={id}
      className={`editorial-split editorial-split-${tone} ${reverse ? "editorial-split-reverse" : ""}`}
    >
      <div className="editorial-image-wrap">
        <img
          src={image.src}
          alt={t(image.altKey)}
          className="editorial-image"
          style={{ objectPosition: image.position }}
          loading="lazy"
        />
      </div>
      <div className="editorial-copy">
        <p className="section-eyebrow">{t(eyebrowKey)}</p>
        <h2>{t(titleKey)}</h2>
        <p>{t(bodyKey)}</p>
        <div className="editorial-links">
          <TextLink href={href}>{t(ctaKey)}</TextLink>
          {additionalLinks.map((link) => (
            <TextLink key={link.href} href={link.href}>
              {t(link.labelKey)}
            </TextLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`text-link ${light ? "text-link-light" : ""}`}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function HomepageHero() {
  const { t } = useTranslation();
  const image = homepageImages.hero;

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <img
        src={image.src}
        alt={t(image.altKey)}
        className="home-hero-image"
        style={{ objectPosition: image.position }}
        fetchPriority="high"
      />
      <div className="home-hero-overlay" />
      <div className="home-hero-content">
        <p className="hero-eyebrow">{t("homepage.hero.eyebrow")}</p>
        <h1 id="home-hero-title">{t("homepage.hero.title")}</h1>
        <p>{t("homepage.hero.description")}</p>
        <div className="hero-actions">
          <Link href="/contact" className="button button-primary">
            {t("homepage.hero.primaryCta")}
          </Link>
          <Link href="#about-preview" className="button button-secondary-light">
            {t("homepage.hero.secondaryCta")}
          </Link>
        </div>
      </div>
      <a href="#about-preview" className="hero-scroll-cue">
        <span>{t("homepage.hero.scroll")}</span>
        <span aria-hidden="true" className="hero-scroll-line" />
      </a>
    </section>
  );
}

function EventsPreview() {
  const { t } = useTranslation();

  return (
    <section className="events-preview">
      <div className="events-preview-image">
        <img
          src={homepageImages.events.src}
          alt={t(homepageImages.events.altKey)}
          style={{ objectPosition: homepageImages.events.position }}
          loading="lazy"
        />
      </div>
      <div className="events-preview-panel">
        <SectionHeader
          eyebrowKey="homepage.events.eyebrow"
          titleKey="homepage.events.title"
          introKey="homepage.events.body"
        />
        <div className="events-preview-links">
          <TextLink href="/events/weddings">
            {t("homepage.events.weddings")}
          </TextLink>
          <TextLink href="/events/corporate">
            {t("homepage.events.corporate")}
          </TextLink>
        </div>
      </div>
    </section>
  );
}

function ExperiencesPreview() {
  const { t } = useTranslation();

  return (
    <section className="experiences-preview">
      <img
        src={homepageImages.experiences.src}
        alt={t(homepageImages.experiences.altKey)}
        className="experiences-preview-image"
        style={{ objectPosition: homepageImages.experiences.position }}
        loading="lazy"
      />
      <div className="experiences-preview-overlay" />
      <div className="experiences-preview-content">
        <p className="section-eyebrow">{t("homepage.experiences.eyebrow")}</p>
        <h2>{t("homepage.experiences.title")}</h2>
        <p>{t("homepage.experiences.body")}</p>
        <TextLink href="/experiences" light>
          {t("homepage.experiences.cta")}
        </TextLink>
      </div>
    </section>
  );
}

function HospitalityPreview() {
  const { t } = useTranslation();
  const cards = [
    {
      id: "tea-room",
      image: homepageImages.teaRoom,
      titleKey: "homepage.hospitality.teaRoom.title",
      bodyKey: "homepage.hospitality.teaRoom.body",
      ctaKey: "homepage.hospitality.teaRoom.cta",
      href: "/experiences/tea-room",
    },
    {
      id: "private-dining",
      image: homepageImages.privateDining,
      titleKey: "homepage.hospitality.privateDining.title",
      bodyKey: "homepage.hospitality.privateDining.body",
      ctaKey: "homepage.hospitality.privateDining.cta",
      href: "/experiences/private-dining",
    },
  ];

  return (
    <section className="hospitality-preview">
      <SectionHeader
        eyebrowKey="homepage.hospitality.eyebrow"
        titleKey="homepage.hospitality.title"
        introKey="homepage.hospitality.intro"
        align="center"
      />
      <div className="hospitality-grid">
        {cards.map((card) => (
          <article key={card.id} className="hospitality-card">
            <div className="hospitality-card-image">
              <img
                src={card.image.src}
                alt={t(card.image.altKey)}
                style={{ objectPosition: card.image.position }}
                loading="lazy"
              />
            </div>
            <div className="hospitality-card-copy">
              <h3>{t(card.titleKey)}</h3>
              <p>{t(card.bodyKey)}</p>
              <TextLink href={card.href}>{t(card.ctaKey)}</TextLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GalleryPreview() {
  const { t } = useTranslation();

  return (
    <section className="gallery-preview">
      <div className="gallery-preview-heading">
        <SectionHeader
          eyebrowKey="homepage.gallery.eyebrow"
          titleKey="homepage.gallery.title"
          introKey="homepage.gallery.body"
        />
        <TextLink href="/about/gallery">{t("homepage.gallery.cta")}</TextLink>
      </div>
      <EstateCarousel
        images={homepageImages.gallery}
        labelKey="homepage.gallery.carouselLabel"
      />
    </section>
  );
}

function ContactCta() {
  const { t } = useTranslation();

  return (
    <section className="contact-cta">
      <p className="section-eyebrow">{t("homepage.contact.eyebrow")}</p>
      <h2>{t("homepage.contact.title")}</h2>
      <p>{t("homepage.contact.body")}</p>
      <Link href="/contact" className="button button-ivory">
        {t("homepage.contact.cta")}
      </Link>
    </section>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const footerItems = visibleNavigationItems().filter(
    (item) => item.id !== "home",
  );

  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <span className="footer-wordmark">Dear Villa</span>
        <p>{t("homepage.footer.intro")}</p>
      </div>
      <nav className="footer-nav" aria-label={t("homepage.footer.navigation")}>
        {footerItems.map((item) => (
          <Link href={item.href} key={item.id}>
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
      <div className="footer-meta">
        <p>{t("homepage.footer.location")}</p>
        <p>{t("homepage.footer.copyright")}</p>
      </div>
    </footer>
  );
}

export function Homepage() {
  return (
    <>
      <main className="homepage" id="main-content">
        <HomepageHero />
        <EditorialSplit
          id="about-preview"
          image={homepageImages.about}
          eyebrowKey="homepage.about.eyebrow"
          titleKey="homepage.about.title"
          bodyKey="homepage.about.body"
          ctaKey="homepage.about.cta"
          href="/about"
        />
        <EventsPreview />
        <EditorialSplit
          image={homepageImages.internationalPrograms}
          eyebrowKey="homepage.international.eyebrow"
          titleKey="homepage.international.title"
          bodyKey="homepage.international.body"
          ctaKey="homepage.international.cta"
          href="/international-programs"
          reverse
          tone="paper"
        />
        <EditorialSplit
          image={homepageImages.accommodation}
          eyebrowKey="homepage.accommodation.eyebrow"
          titleKey="homepage.accommodation.title"
          bodyKey="homepage.accommodation.body"
          ctaKey="homepage.accommodation.cta"
          href="/accommodation"
          additionalLinks={[
            {
              labelKey: "homepage.accommodation.boutiqueStay",
              href: "/accommodation/boutique-stay",
            },
            {
              labelKey: "homepage.accommodation.healingRetreat",
              href: "/accommodation/healing-retreat",
            },
          ]}
        />
        <ExperiencesPreview />
        <HospitalityPreview />
        <GalleryPreview />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
