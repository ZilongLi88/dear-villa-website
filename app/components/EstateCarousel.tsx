"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useTranslation } from "react-i18next";

export type EstateCarouselImage = {
  src: string;
  altKey: string;
  position: string;
};

type EstateCarouselProps = {
  images: readonly EstateCarouselImage[];
  labelKey: string;
};

const relativePosition = (index: number, current: number, length: number) => {
  const forward = (index - current + length) % length;
  const backward = forward - length;
  return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
};

export function EstateCarousel({ images, labelKey }: EstateCarouselProps) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const showPrevious = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX === null) {
      return;
    }

    const distance = clientX - touchStartX;
    if (Math.abs(distance) >= 48) {
      if (distance > 0) {
        showPrevious();
      } else {
        showNext();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="estate-carousel"
      role="region"
      aria-roledescription={t("homepage.gallery.carouselRole")}
      aria-label={t(labelKey)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
      onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) =>
        handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)
      }
      onTouchCancel={() => setTouchStartX(null)}
    >
      <div className="estate-carousel-viewport">
        {images.map((image, index) => {
          const position = relativePosition(index, currentIndex, images.length);
          const visiblePosition =
            position === 0 ? "current" : position === -1 ? "previous" : position === 1 ? "next" : "hidden";

          return (
            <figure
              key={image.altKey}
              className={`estate-carousel-slide estate-carousel-slide-${visiblePosition}`}
              aria-hidden={position !== 0}
            >
              <img
                src={image.src}
                alt={position === 0 ? t(image.altKey) : ""}
                style={{ objectPosition: image.position }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          );
        })}
      </div>
      <div className="estate-carousel-controls">
        <button
          type="button"
          className="estate-carousel-button"
          aria-label={t("homepage.gallery.previous")}
          onClick={showPrevious}
        >
          <span aria-hidden="true">←</span>
        </button>
        <p className="estate-carousel-status" aria-live="polite" aria-atomic="true">
          <span>{String(currentIndex + 1).padStart(2, "0")}</span>
          <span aria-hidden="true"> / </span>
          <span>{String(images.length).padStart(2, "0")}</span>
          <span className="sr-only">
            {t("homepage.gallery.position", {
              current: currentIndex + 1,
              total: images.length,
            })}
          </span>
        </p>
        <button
          type="button"
          className="estate-carousel-button"
          aria-label={t("homepage.gallery.next")}
          onClick={showNext}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

