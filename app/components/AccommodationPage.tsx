"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { accommodationGallery, accommodationImages } from "../content/accommodation";
import { Footer } from "./Homepage";

const amenityKeys = ["wifi", "parking", "kitchen", "coffee", "dishwasher", "terrace", "garden", "breakfast"] as const;
const amenityIcons = ["⌁", "P", "◇", "☕", "◫", "☼", "❧", "◌"];

function PhotoStory() {
  const { t } = useTranslation();
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setActive(null), []);
  const move = useCallback((direction: number) => {
    setActive((current) => current === null ? null : (current + direction + accommodationGallery.length) % accommodationGallery.length);
  }, []);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, move]);

  return (
    <section className="accommodation-gallery" aria-labelledby="guest-rooms-title">
      <header className="accommodation-gallery-heading">
        <h2 id="guest-rooms-title">{t("accommodation.rooms.title")}</h2>
        <p>{t("accommodation.rooms.intro")}</p>
      </header>
      <div className="photo-story">
        {accommodationGallery.map((image, index) => (
          <button className={`photo-story-item ${image.feature ? "is-feature" : ""}`} type="button" key={image.src} onClick={() => setActive(index)} aria-label={t("accommodation.gallery.open", { number: index + 1 })}>
            <img src={image.src} alt={t(image.altKey)} loading="lazy" />
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={t("accommodation.gallery.label")} onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <button ref={closeRef} className="lightbox-close" type="button" onClick={close} aria-label={t("accommodation.gallery.close")}>×</button>
          <button className="lightbox-previous" type="button" onClick={() => move(-1)} aria-label={t("accommodation.gallery.previous")}>←</button>
          <figure>
            <img src={accommodationGallery[active].src} alt={t(accommodationGallery[active].altKey)} />
            <figcaption>{String(active + 1).padStart(2, "0")} / {String(accommodationGallery.length).padStart(2, "0")}</figcaption>
          </figure>
          <button className="lightbox-next" type="button" onClick={() => move(1)} aria-label={t("accommodation.gallery.next")}>→</button>
        </div>
      )}
    </section>
  );
}

export function AccommodationPage() {
  const { t } = useTranslation();
  return <>
    <main className="accommodation-page" id="main-content">
      <section className="accommodation-hero" aria-labelledby="accommodation-title">
        <img src={accommodationImages.hero.src} alt={t(accommodationImages.hero.altKey)} fetchPriority="high" />
        <div className="accommodation-hero-overlay" />
        <div className="accommodation-hero-content">
          <h1 id="accommodation-title">{t("accommodation.hero.title")}</h1>
          <p>{t("accommodation.hero.body")}</p>
          <Link href="/contact" className="button button-ivory">{t("accommodation.hero.cta")}</Link>
        </div>
      </section>

      <section className="stay-split stay-split-comfort">
        <figure><img src={accommodationImages.comfort.src} alt={t(accommodationImages.comfort.altKey)} loading="lazy" /></figure>
        <div className="stay-split-copy">
          <h2>{t("accommodation.comfort.title")}</h2>
          <p>{t("accommodation.comfort.body1")}</p>
          <p>{t("accommodation.comfort.body2")}</p>
        </div>
      </section>

      <PhotoStory />

      <section className="amenities" aria-labelledby="amenities-title">
        <header><h2 id="amenities-title">{t("accommodation.amenities.title")}</h2><p>{t("accommodation.amenities.body")}</p></header>
        <ul>{amenityKeys.map((key, index) => <li key={key}><span aria-hidden="true">{amenityIcons[index]}</span>{t(`accommodation.amenities.items.${key}`)}</li>)}</ul>
      </section>

      <section className="stay-split stay-split-estate">
        <div className="stay-split-copy">
          <h2>{t("accommodation.stay.title")}</h2>
          <p>{t("accommodation.stay.body1")}</p>
          <p>{t("accommodation.stay.body2")}</p>
        </div>
        <figure><img src={accommodationImages.stay.src} alt={t(accommodationImages.stay.altKey)} loading="lazy" /></figure>
      </section>

      <section className="accommodation-cta">
        <img src={accommodationImages.cta.src} alt={t(accommodationImages.cta.altKey)} loading="lazy" />
        <div className="accommodation-cta-overlay" />
        <div className="accommodation-cta-content">
          <h2>{t("accommodation.cta.title")}</h2>
          <p>{t("accommodation.cta.body1")}</p><p>{t("accommodation.cta.body2")}</p>
          <div><Link href="/contact" className="button button-ivory">{t("accommodation.cta.book")}</Link><Link href="/contact" className="button button-secondary-light">{t("accommodation.cta.contact")}</Link></div>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
