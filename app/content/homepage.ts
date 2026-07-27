import hero from "../../assets/images/Exterior/home-hero.jpeg.avif";
import about from "../../assets/images/Exterior/6f97e9a8-0f2c-4961-96f3-1d0a93475b32.png.avif";
import events from "../../assets/images/Exterior/2e6cbb89-1e62-4b14-b450-0ab43dcaccd4.jpeg";
import internationalPrograms from "../../assets/images/Exterior/fd2c20fe-4b43-43ba-a6dd-80bef5a1a909.jpeg.avif";
import accommodation from "../../assets/images/Living room/02143fcf-55c0-4fb9-96e6-7fe9e24fdcd1.jpeg";
import experiences from "../../assets/images/Exterior/45dc761b-0c17-490c-a297-2fc6404ea04a.jpeg.avif";
import teaRoom from "../../assets/images/Living room/0f6370ce-8318-4fdb-92b2-65efc7cf5192.jpeg";
import privateDining from "../../assets/images/Living room/7221dff4-71ac-41ab-9d9f-6f536496c71f.jpeg";
import galleryAerial from "../../assets/images/Exterior/b4ce14d4-6001-4f1d-9853-f3cd1a8a8ea9.png.avif";
import galleryHarbour from "../../assets/images/Exterior/e6863bb7-bb8d-4acb-a8bc-b0a8cab90c99.jpeg.avif";
import galleryStaircase from "../../assets/images/Exterior/88238166-b4b3-4f66-b3f7-6262e5080555.jpeg.avif";
import galleryTelescope from "../../assets/images/Living room/1dbd437f-4ae2-4e9b-b1da-5f552a354ca4.jpeg";
import galleryPiano from "../../assets/images/Living room/d4ffeccb-8957-4dd0-bd02-8dd9a04c774f.jpeg";
import galleryTerrace from "../../assets/images/Exterior/41689d77-c3b3-48de-abec-d9521c9760d8.jpeg.avif";

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
