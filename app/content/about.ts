import hero from "../../assets/images/exterior/aerial-pool-view-01.avif";
import heroMobile from "../../assets/images/exterior/aerial-estate-pool-mobile-01.avif";
import welcome from "../../assets/images/interiors/living-room-seating-01.avif";
import slowDown from "../../assets/images/tea-room/tea-table-setup-01.avif";
import accommodation from "../../assets/images/accommodation/bedroom-garden-view-03.avif";
import events from "../../assets/images/dining/kitchen-wide-view-01.avif";
import tea from "../../assets/images/tea-room/hanging-kettle-01.avif";
import privateDining from "../../assets/images/dining/place-settings.avif";
import estate from "../../assets/images/exterior/swimming-pool-view-02.avif";
import vision from "../../assets/images/interiors/record-player-01.avif";
import closing from "../../assets/images/exterior/harbour-sailboats-01.avif";

export type AboutImage = { src: string; mobileSrc?: string; altKey: string; position?: string };

export const aboutImages = {
  hero: { src: hero.src, mobileSrc: heroMobile.src, altKey: "aboutPage.images.hero", position: "center 44%" },
  welcome: { src: welcome.src, altKey: "aboutPage.images.welcome" },
  slowDown: { src: slowDown.src, altKey: "aboutPage.images.slowDown" },
  accommodation: { src: accommodation.src, altKey: "aboutPage.images.accommodation" },
  events: { src: events.src, altKey: "aboutPage.images.events" },
  tea: { src: tea.src, altKey: "aboutPage.images.tea" },
  privateDining: { src: privateDining.src, altKey: "aboutPage.images.privateDining" },
  estate: { src: estate.src, altKey: "aboutPage.images.estate" },
  vision: { src: vision.src, altKey: "aboutPage.images.vision" },
  closing: { src: closing.src, altKey: "aboutPage.images.closing", position: "center 52%" },
} satisfies Record<string, AboutImage>;
