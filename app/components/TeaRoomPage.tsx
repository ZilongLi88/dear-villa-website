"use client";

/* eslint-disable @next/next/no-img-element */

import { useTranslation } from "react-i18next";
import { teaMoments, teaRoomImages } from "../content/teaRoom";
import { Footer } from "./Homepage";

export function TeaRoomPage() {
  const { t } = useTranslation();

  return (
    <>
      <main className="tea-room-page" id="main-content">
        <section className="tea-hero" aria-labelledby="tea-room-title">
          <picture className="hero-picture">
            <source media="(max-width: 620px)" srcSet={teaRoomImages.hero.mobileSrc} />
            <img src={teaRoomImages.hero.src} alt={t(teaRoomImages.hero.altKey)} fetchPriority="high" />
          </picture>
          <div className="tea-hero-overlay" />
          <div className="tea-hero-content">
            <h1 id="tea-room-title">{t("teaRoom.hero.title")}</h1>
          </div>
        </section>

        <section className="tea-introduction">
          <figure>
            <img src={teaRoomImages.introduction.src} alt={t(teaRoomImages.introduction.altKey)} loading="lazy" />
          </figure>
          <div>
            <h2>{t("teaRoom.introduction.title")}</h2>
            <p>{t("teaRoom.introduction.body")}</p>
          </div>
        </section>

        <section className="tea-moments" aria-label={t("teaRoom.moments.label")}>
          {teaMoments.map((moment, index) => (
            <article className="tea-moment" key={moment.src}>
              <figure>
                <img src={moment.src} alt={t(moment.altKey)} loading="lazy" />
              </figure>
              <blockquote>
                <span aria-hidden="true">0{index + 1}</span>
                <p>{t(moment.quoteKey)}</p>
              </blockquote>
            </article>
          ))}
        </section>

        <section className="tea-closing">
          <figure>
            <img src={teaRoomImages.closing.src} alt={t(teaRoomImages.closing.altKey)} loading="lazy" />
          </figure>
          <div className="tea-closing-copy">
            <h2>{t("teaRoom.closing.title")}</h2>
            <p>{t("teaRoom.closing.body1")}</p>
            <p>{t("teaRoom.closing.body2")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
