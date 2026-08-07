import hero from "../../assets/images/dining/place-settings.avif";
import introduction from "../../assets/images/dining/poolside-dining-table.avif";
import momentOne from "../../assets/images/dining/kitchen-cooktop-01.avif";
import momentTwo from "../../assets/images/dining/glassware-cabinet-01.avif";
import momentThree from "../../assets/images/dining/kitchen-island-stools-01.avif";
import closing from "../../assets/images/dining/kitchen-wide-view-01.avif";

export const privateDiningVisibility = {
  moments: false,
  prepared: false,
} as const;

export const privateDiningImages = {
  hero: { src: hero.src, altKey: "privateDining.images.hero" },
  introduction: { src: introduction.src, altKey: "privateDining.images.introduction" },
  closing: { src: closing.src, altKey: "privateDining.images.closing" },
};

export const privateDiningMoments = [
  { src: momentOne.src, altKey: "privateDining.images.moment1", quoteKey: "privateDining.moments.moment1" },
  { src: momentTwo.src, altKey: "privateDining.images.moment2", quoteKey: "privateDining.moments.moment2" },
  { src: momentThree.src, altKey: "privateDining.images.moment3", quoteKey: "privateDining.moments.moment3" },
] as const;
