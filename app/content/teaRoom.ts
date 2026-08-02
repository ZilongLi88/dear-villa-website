import hero from "../../assets/images/tea-room/hanging-kettle-tea-table-01.avif";
import introduction from "../../assets/images/tea-room/room-garden-view-01.avif";
import momentOne from "../../assets/images/tea-room/tea-host-pouring-01.avif";
import momentTwo from "../../assets/images/tea-room/tea-table-setup-01.avif";
import momentThree from "../../assets/images/tea-room/tea-pouring-detail-02.avif";
import momentFour from "../../assets/images/tea-room/tea-ceremony-01.avif";
import momentFive from "../../assets/images/tea-room/tea-room-garden-view-01.avif";
import closing from "../../assets/images/tea-room/tea-table-detail-01.avif";

export const teaRoomImages = {
  hero: { src: hero.src, altKey: "teaRoom.images.hero" },
  introduction: { src: introduction.src, altKey: "teaRoom.images.introduction" },
  closing: { src: closing.src, altKey: "teaRoom.images.closing" },
};

export const teaMoments = [
  { src: momentOne.src, altKey: "teaRoom.images.moment1", quoteKey: "teaRoom.moments.moment1" },
  { src: momentTwo.src, altKey: "teaRoom.images.moment2", quoteKey: "teaRoom.moments.moment2" },
  { src: momentThree.src, altKey: "teaRoom.images.moment3", quoteKey: "teaRoom.moments.moment3" },
  { src: momentFour.src, altKey: "teaRoom.images.moment4", quoteKey: "teaRoom.moments.moment4" },
  { src: momentFive.src, altKey: "teaRoom.images.moment5", quoteKey: "teaRoom.moments.moment5" },
] as const;
