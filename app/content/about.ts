import hero from "../../assets/images/exterior/garden-pond-and-estate-01.avif";
import introduction from "../../assets/images/exterior/aerial-pool-view-01.avif";
import history from "../../assets/images/interiors/entrance-seating-01.avif";
import gallery from "../../assets/images/exterior/aerial-estate-overhead-01.avif";
import setting from "../../assets/images/exterior/harbour-sailboats-01.avif";

export type AboutImage = {
  src: string;
  altKey: string;
  position: string;
};

export const aboutImages = {
  hero: {
    src: hero.src,
    altKey: "about.images.hero",
    position: "center 52%",
  },
  introduction: {
    src: introduction.src,
    altKey: "about.images.introduction",
    position: "center 45%",
  },
  history: {
    src: history.src,
    altKey: "about.images.history",
    position: "center 42%",
  },
  gallery: {
    src: gallery.src,
    altKey: "about.images.gallery",
    position: "center center",
  },
  setting: {
    src: setting.src,
    altKey: "about.images.setting",
    position: "center 44%",
  },
} satisfies Record<string, AboutImage>;
