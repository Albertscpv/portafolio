export interface SkillGroup {
  id: string;
  label: string;
  /** Tailwind color token used for the group's accent. */
  accent: "ion" | "nebula" | "pulsar" | "solar";
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    accent: "ion",
    items: ["React", "TypeScript", "Astro", "Svelte", "TailwindCSS", "Motion", "HTML / CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "nebula",
    items: ["Java", "Spring Boot", "Python", "REST APIs", "AWS CLI", "SOLID", "MVC", "SQL"],
  },
  {
    id: "design",
    label: "Design",
    accent: "pulsar",
    items: ["Figma", "Design systems", "Typography", "Brand identity", "Motion design"],
  },
  {
    id: "domain",
    label: "Domain",
    accent: "solar",
    items: ["Accounting", "FinOps", "Oracle Financials", "Process automation"],
  },
];

export interface AiPractice {
  index: string;
  title: string;
  body: string;
}

/**
 * The AI section is deliberately about *method*, not tool names. Anyone can
 * list a model; the interesting part is where a model belongs in the loop.
 */
export const aiPractices: AiPractice[] = [
  {
    index: "01",
    title: "Specification before generation",
    body: "I write the contract first — inputs, outputs, edge cases — and only then let a model draft the implementation. A vague prompt returns vague code; the spec is the real work.",
  },
  {
    index: "02",
    title: "The model reviews, I decide",
    body: "Generated code goes through the same review I would give a teammate: read every line, question every assumption, delete what I cannot explain. Nothing ships that I could not have written myself.",
  },
  {
    index: "03",
    title: "Speed on the boring half",
    body: "Scaffolding, types, migrations, test fixtures, repetitive refactors. AI collapses the mechanical work so the hours go to architecture and interface craft instead.",
  },
  {
    index: "04",
    title: "Learning loop, not a crutch",
    body: "When a model suggests a pattern I do not know, that is the day's lesson. I read the source, rebuild it by hand, then teach it back on social media — which is how I know I actually understood it.",
  },
];
