import hero from "../../assets/images/exterior/aerial-estate-hero-01.avif";
import about from "../../assets/images/exterior/garden-pond-and-estate-01.avif";
import events from "../../assets/images/exterior/aerial-pool-view-01.avif";
import internationalPrograms from "../../assets/images/exterior/garden-harbour-view-01.avif";
import accommodation from "../../assets/images/interiors/living-room-wide-01.avif";
import experiences from "../../assets/images/exterior/swimming-pool-view-01.avif";
import teaRoom from "../../assets/images/tea-room/hanging-kettle-01.avif";
import privateDining from "../../assets/images/dining/place-settings.avif";
import contactCta from "../../assets/images/exterior/aerial-estate-view-01.avif";
import galleryAerial from "../../assets/images/exterior/aerial-estate-overhead-01.avif";
import galleryHarbour from "../../assets/images/exterior/harbour-sailboats-01.avif";
import galleryStaircase from "../../assets/images/interiors/living-room-coffee-table-01.avif";
import galleryTelescope from "../../assets/images/interiors/telescope-01.avif";
import galleryPiano from "../../assets/images/interiors/piano-and-fireplace-01.avif";
import galleryTerrace from "../../assets/images/exterior/garden-patio-table-01.avif";

export const homepageVisibility = {
  events: {
    links: false,
  },
  accommodation: {
    additionalLinks: false,
  },
  experiences: {
    cta: false,
  },
  gallery: {
    cta: false,
  },
} as const;

export const homepageImages = {
  hero: {
    src: hero.src,
    altKey: "homepage.images.hero",
    position: "center center",
  },
  about: {
    src: about.src,
    altKey: "homepage.images.about",
    position: "center center",
  },
  events: {
    src: events.src,
    altKey: "homepage.images.events",
    position: "center center",
  },
  internationalPrograms: {
    src: internationalPrograms.src,
    altKey: "homepage.images.internationalPrograms",
    position: "center center",
  },
  accommodation: {
    src: accommodation.src,
    altKey: "homepage.images.accommodation",
    position: "center center",
  },
  experiences: {
    src: experiences.src,
    altKey: "homepage.images.experiences",
    position: "center center",
  },
  teaRoom: {
    src: teaRoom.src,
    altKey: "homepage.images.teaRoom",
    position: "68% center",
  },
  privateDining: {
    src: privateDining.src,
    altKey: "homepage.images.privateDining",
    position: "70% center",
  },
  contactCta: {
    src: contactCta.src,
    altKey: "homepage.images.contactCta",
    position: "center 48%",
  },
  gallery: [
    {
      src: galleryAerial.src,
      altKey: "homepage.images.galleryAerial",
      position: "center center",
    },
    {
      src: galleryHarbour.src,
      altKey: "homepage.images.galleryHarbour",
      position: "center center",
    },
    {
      src: galleryStaircase.src,
      altKey: "homepage.images.galleryStaircase",
      position: "center center",
    },
    {
      src: galleryTelescope.src,
      altKey: "homepage.images.galleryTelescope",
      position: "center center",
    },
    {
      src: galleryPiano.src,
      altKey: "homepage.images.galleryPiano",
      position: "center center",
    },
    {
      src: galleryTerrace.src,
      altKey: "homepage.images.galleryTerrace",
      position: "center center",
    },
  ],
} as const;
