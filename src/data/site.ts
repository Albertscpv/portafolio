/**
 * Single source of truth for everything the portfolio says about its owner.
 * Pages read from here so copy edits never require touching a component.
 */

export const profile = {
  name: "Christopher Monge Marín",
  short: "Chris",
  handle: "albertscpv",
  role: "Full Stack Developer",
  secondRole: "Accountant",
  /** One line. It is the first thing a recruiter reads — keep it concrete. */
  tagline: "I build interfaces that behave like instruments: precise, fast, and alive.",
  bio: "Full stack developer with an accounting background. That mix is the point — I read a business the way I read a codebase, so the software I ship solves the actual problem instead of a guess at it. I work with AI as a daily instrument, not a novelty, and I share what I learn as I go.",
  status: "Open to work",
  statusDetail: "Looking for a team where I can grow fast and ship real product.",
} as const;

export const socials = [
  { label: "GitHub", handle: "@albertscpv", href: "https://github.com/albertscpv" },
  { label: "TikTok", handle: "@albert_dvlp", href: "https://www.tiktok.com/@albert_dvlp" },
] as const;

/** The Typeform the owner already uses to receive messages. */
export const contactFormUrl = "https://assjopryt8b.typeform.com/to/NCjLtPLe";

export const navLinks = [
  { title: "Index", short: "00", path: "/" },
  { title: "Projects", short: "01", path: "/projects" },
  { title: "Work", short: "02", path: "/work" },
  { title: "Designs", short: "03", path: "/designs" },
  { title: "Brand", short: "04", path: "/brand" },
  { title: "Lab", short: "05", path: "/lab" },
  { title: "Contact", short: "06", path: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
