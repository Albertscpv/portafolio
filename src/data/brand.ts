export interface BrandRule {
  label: string;
  value: string;
  note: string;
}

/** The mark's actual construction, read off the SVG that renders it. */
export const construction: BrandRule[] = [
  { label: "Form", value: "2 ellipses", note: "Same centre, mirrored — one figure, not two shapes" },
  { label: "Rotation", value: "±32°", note: "Shallow enough to read as orbits, steep enough to cross twice" },
  { label: "Ratio", value: "47 : 17", note: "Radius x to radius y, on a 100 × 100 field" },
  { label: "Stroke", value: "6 / 100", note: "Thinned toward 3.4 at display sizes so the crossings stay open" },
];

export interface Misuse {
  title: string;
  why: string;
}

export const misuse: Misuse[] = [
  {
    title: "Do not stretch",
    why: "The 47:17 ratio is the mark. Scale it, never distort it.",
  },
  {
    title: "Do not colour the orbits separately",
    why: "Two colours read as two objects and the figure stops being one form.",
  },
  {
    title: "Do not add effects",
    why: "Shadows, bevels and outer glows fight the open crossings that define it.",
  },
];
