import hero from "../../assets/images/accommodation/brown-bedroom-01.avif";
import comfort from "../../assets/images/accommodation/brown-bed-detail-01.avif";
import galleryOne from "../../assets/images/accommodation/bedroom-garden-view-02.avif";
import galleryTwo from "../../assets/images/accommodation/burgundy-bedroom-01.avif";
import galleryThree from "../../assets/images/accommodation/dark-tile-double-vanity-01.avif";
import galleryFour from "../../assets/images/accommodation/bedroom-garden-view-01.avif";
import galleryFive from "../../assets/images/accommodation/twin-bedroom-01.avif";
import gallerySix from "../../assets/images/accommodation/dark-tile-bathroom-01.avif";
import stay from "../../assets/images/exterior/aerial-estate-overhead-01.avif";
import cta from "../../assets/images/exterior/swimming-pool-view-01.avif";

export const accommodationImages = {
  hero: { src: hero.src, altKey: "accommodation.images.hero" },
  comfort: { src: comfort.src, altKey: "accommodation.images.comfort" },
  stay: { src: stay.src, altKey: "accommodation.images.stay" },
  cta: { src: cta.src, altKey: "accommodation.images.cta" },
};

export const accommodationGallery = [
  { src: galleryOne.src, altKey: "accommodation.images.gallery1", feature: true },
  { src: galleryTwo.src, altKey: "accommodation.images.gallery2", feature: false },
  { src: galleryThree.src, altKey: "accommodation.images.gallery3", feature: false },
  { src: galleryFour.src, altKey: "accommodation.images.gallery4", feature: true },
  { src: galleryFive.src, altKey: "accommodation.images.gallery5", feature: false },
  { src: gallerySix.src, altKey: "accommodation.images.gallery6", feature: false },
] as const;
