import hero from "../../assets/images/Exterior/6f97e9a8-0f2c-4961-96f3-1d0a93475b32.png.avif";
import introduction from "../../assets/images/Exterior/2e6cbb89-1e62-4b14-b450-0ab43dcaccd4.jpeg";
import history from "../../assets/images/Exterior/88238166-b4b3-4f66-b3f7-6262e5080555.jpeg.avif";
import gallery from "../../assets/images/Exterior/b4ce14d4-6001-4f1d-9853-f3cd1a8a8ea9.png.avif";
import setting from "../../assets/images/Exterior/e6863bb7-bb8d-4acb-a8bc-b0a8cab90c99.jpeg.avif";

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

