export interface StyleSpec {
  id: "neumorphism" | "glassmorphism" | "liquid";
  index: string;
  name: string;
  /** One sentence that says what the style is actually simulating. */
  thesis: string;
  body: string;
  rules: string[];
  pitfall: string;
  css: string;
}

/**
 * The three surface languages this portfolio is built from. Each demo on the
 * Lab page renders the *same* snippet listed here, so the code is never a lie.
 */
export const styleSpecs: StyleSpec[] = [
  {
    id: "neumorphism",
    index: "01",
    name: "Neumorphism",
    thesis: "The interface is a single sheet of material, extruded or pressed.",
    body: "Soft UI has no borders and no fills — only light. An element exists because a highlight sits on one side of it and a shadow on the other, and both come from one fixed light source. The moment the element and its parent stop sharing a base color, the illusion collapses into a grey box.",
    rules: [
      "Element and container must share the exact same background color",
      "One light source for the whole page — here it is top-left, always",
      "Raised = outer shadows. Pressed = the identical shadows, inset",
      "Radii stay generous; sharp corners cannot hold a soft gradient",
    ],
    pitfall:
      "Contrast. Pure neumorphism fails WCAG on its own, so every interactive control here also carries a real border or accent color on focus and hover.",
    css: `.neu {
  background: #141a2c;
  box-shadow:
     8px  8px 20px rgba(2, 4, 10, 0.75),
    -8px -8px 20px rgba(63, 74, 112, 0.16);
}

.neu:active {
  box-shadow:
    inset  6px  6px 14px rgba(2, 4, 10, 0.80),
    inset -6px -6px 14px rgba(63, 74, 112, 0.14);
}`,
  },
  {
    id: "glassmorphism",
    index: "02",
    name: "Glassmorphism",
    thesis: "A translucent pane floating above content that keeps moving behind it.",
    body: "Glass needs three ingredients simultaneously: a blurred backdrop, a translucent tint, and a lit top edge where the light catches the bevel. Drop the backdrop and it is plastic. Drop the edge and it is fog. It only reads as glass when there is something worth seeing through it — which is why the starfield behind this page never stops drifting.",
    rules: [
      "backdrop-filter: blur() plus saturate() — saturation is what sells depth",
      "A 1px light border, brightest at the top edge",
      "Layer it over motion or color; glass over flat black is invisible",
      "Keep blur under ~30px or text behind it turns to mud",
    ],
    pitfall:
      "Cost. backdrop-filter repaints on every scroll frame. Use it on a handful of surfaces, never on list items.",
    css: `.glass {
  background: linear-gradient(140deg,
    rgba(148, 163, 205, 0.14) 0%,
    rgba(148, 163, 205, 0.05) 45%,
    rgba(148, 163, 205, 0.02) 100%);
  backdrop-filter: blur(18px) saturate(150%);
  border: 1px solid rgba(180, 196, 240, 0.14);
  box-shadow:
    0 8px 32px rgba(2, 4, 12, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.09);
}`,
  },
  {
    id: "liquid",
    index: "03",
    name: "Liquid",
    thesis: "Surfaces with surface tension — they lag, stretch, and settle.",
    body: "Liquid is the only one of the three that lives in time rather than in a static shadow. Two techniques carry it: an SVG filter that blurs shapes then crushes the alpha curve, which makes nearby blobs merge like mercury; and springs instead of durations, so a highlight arrives late and overshoots slightly before settling. Move the pointer across the panel below to feel the lag.",
    rules: [
      "feGaussianBlur + feColorMatrix on the alpha channel = metaball merge",
      "Springs, not easing curves — mass and damping, never a fixed 300ms",
      "Highlights trail the pointer; instant tracking feels like glass, not fluid",
      "Radii near 50% so the silhouette can deform without looking broken",
    ],
    pitfall:
      "Motion sickness. Every spring here is disabled under prefers-reduced-motion, and the layout stays identical without it.",
    css: `<filter id="goo">
  <feGaussianBlur stdDeviation="12" result="blur" />
  <feColorMatrix in="blur" mode="matrix"
    values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 22 -9" />
</filter>

/* springs, not durations */
transition: { type: "spring", stiffness: 120, damping: 16 }`,
  },
];
