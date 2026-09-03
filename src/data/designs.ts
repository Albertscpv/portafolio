export interface DesignPiece {
  src: string;
  title: string;
  note: string;
  /** Grid emphasis: `wide` spans two columns, `tall` spans two rows. */
  span?: "wide" | "tall";
}

export const designs: DesignPiece[] = [
  { src: "/images/EstralPoster.png", title: "Estral", note: "Poster · esports roster", span: "tall" },
  { src: "/images/Design1.png", title: "Sueños en Metas", note: "Web design · agency landing", span: "wide" },
  { src: "/images/506Post.png", title: "Almuerzos 506", note: "Menu design · restaurant" },
  { src: "/images/SmoothKangaroo.png", title: "Smooth Kangaroo", note: "Web design · brand site" },
  { src: "/images/C1.jpg", title: "Client piece 01", note: "Social media · client work" },
  { src: "/images/C2.jpg", title: "Client piece 02", note: "Social media · client work" },
  { src: "/images/C5.jpg", title: "Client piece 03", note: "Social media · client work", span: "wide" },
  { src: "/images/C6.jpg", title: "Client piece 04", note: "Social media · client work" },
  { src: "/images/C7.jpg", title: "Client piece 05", note: "Social media · client work" },
  { src: "/images/C9.jpg", title: "Client piece 06", note: "Social media · client work" },
];
