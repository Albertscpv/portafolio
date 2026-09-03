import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  lede?: string;
}

/** The recurring page header: catalog number, rule, title, one-line abstract. */
export default function SectionHeading({ index, title, lede }: SectionHeadingProps) {
  return (
    <Reveal as="header" className="mb-12 md:mb-16">
      <div className="mb-5 flex items-center gap-4">
        <span className="eyebrow">{index}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-space-500 to-transparent" />
      </div>
      <h1 className="text-title font-semibold text-gradient">{title}</h1>
      {lede ? <p className="mt-5 max-w-2xl text-lead text-dust">{lede}</p> : null}
    </Reveal>
  );
}
