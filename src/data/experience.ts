export interface Experience {
  id: string;
  org: string;
  role: string;
  period: string;
  /** Shown as a small status pill; `true` renders a live indicator. */
  current?: boolean;
  summary: string;
  highlights: string[];
  takeaway: string;
  stack: string[];
}

export const experience: Experience[] = [
  {
    id: "amazon",
    org: "Amazon International",
    role: "FinOps — Payments & Automation",
    period: "Ongoing",
    current: true,
    summary:
      "Accounts payable inside a global finance operation — and, increasingly, the software that runs it. I started processing payments in Oracle Financial Applications and now build the automation, tooling and dashboards the daily process depends on.",
    highlights: [
      "Internal automation built with Kiro and Claude Code, replacing steps the team ran by hand",
      "Web apps and live dashboards that surface operational data instead of it being compiled manually",
      "Data pipelines in Python, orchestrated through the AWS CLI and kiro-cli",
      "Scoping, planning and delivering these projects end to end alongside teams in other countries",
      "Working inside strict financial controls, so every automation has to stay auditable",
    ],
    takeaway:
      "Most of the friction I saw in a company that size was software, not people — so I stopped describing it and started building the tools that removed it. That is also where AI-assisted development stopped being a curiosity for me and became how I actually ship.",
    stack: ["Python", "AWS CLI", "kiro-cli", "Kiro", "Claude Code", "Oracle Financials"],
  },
  {
    id: "freelance",
    org: "Freelance Designer & Developer",
    role: "Independent",
    period: "Ongoing",
    current: true,
    summary:
      "Entrepreneurs near me needed a digital identity and had nobody to build it. I started with social posts and ended up owning their whole presence — design, copy, and the small internal tools they run on.",
    highlights: [
      "Social media post design and brand identity for local businesses",
      "Inventory tooling for small companies that were tracking stock on paper",
      "Direct client work: scoping, revisions, delivery, and support",
    ],
    takeaway:
      "Working alone with real clients taught me the part school does not: how to ask the right question before writing a line of code.",
    stack: ["Figma", "Illustrator", "React", "TypeScript", "TailwindCSS"],
  },
  {
    id: "alura",
    org: "Alura Latam · Oracle Next Education",
    role: "Full Stack Student",
    period: "Ongoing",
    current: true,
    summary:
      "A structured program where I practice backend seriously and keep frontend as the craft I actually enjoy. The goal is not a certificate — it is being able to carry a feature end to end.",
    highlights: [
      "Java with Spring Boot: REST APIs, CRUD, MVC, SOLID and OOP principles",
      "Frontend with React, Astro, Svelte, TypeScript, TailwindCSS",
      "Building projects in public and reviewing my own code against real standards",
    ],
    takeaway:
      "Learning backend properly changed how I write frontend. I now design the interface around the data contract instead of the other way round.",
    stack: ["Java", "Spring Boot", "React", "Astro", "Svelte", "TypeScript"],
  },
];
