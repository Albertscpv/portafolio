import { useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import GlassPanel from "../components/ui/GlassPanel";
import NeuSurface from "../components/ui/NeuSurface";
import LiquidButton from "../components/ui/LiquidButton";
import { contactFormUrl, profile, socials } from "../data/site";

const BRIEF = [
  "What you are building, in one or two sentences",
  "Where it is today — an idea, a design, a half-finished repo",
  "Your timeline and anything that is already fixed",
];

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the link next to it still works */
    }
  }

  return (
    <>
      <SectionHeading
        index="05 — Contact"
        title="Open channel."
        lede={profile.statusDetail}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <GlassPanel className="flex h-full flex-col justify-between p-8 md:p-10">
            <div>
              <p className="eyebrow">Primary</p>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-star md:text-3xl">
                Send me a brief.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-dust">
                The form takes about a minute. It lands straight in my inbox and I answer every
                message — including the ones that turn out not to be a fit.
              </p>

              <ul className="mt-8 space-y-3">
                {BRIEF.map((item, index) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-dust">
                    <span className="font-mono text-[11px] leading-6 text-ion">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <LiquidButton href={contactFormUrl} external>
                Open the form
              </LiquidButton>
            </div>
          </GlassPanel>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.08}>
            <NeuSurface className="p-2">
              <p className="px-5 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                Elsewhere
              </p>
              <ul className="divide-y divide-crease">
                {socials.map((social) => (
                  <li key={social.href} className="flex items-center justify-between gap-3 px-5 py-4">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex flex-col"
                    >
                      <span className="text-sm font-medium text-star transition-colors group-hover:text-ion">
                        {social.label}
                      </span>
                      <span className="font-mono text-[11px] text-faint">{social.handle}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => copy(social.handle)}
                      aria-label={`Copy ${social.label} handle`}
                      className="rounded-lg bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dust shadow-neu-raised-sm transition-shadow active:shadow-neu-inset-sm"
                    >
                      {copied === social.handle ? "Copied" : "Copy"}
                    </button>
                  </li>
                ))}
              </ul>
            </NeuSurface>
          </Reveal>

          <Reveal delay={0.16}>
            <GlassPanel className="p-8" sheen={false}>
              <p className="eyebrow">Availability</p>
              <p className="mt-5 flex items-center gap-2.5 text-lg font-semibold tracking-tight text-star">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-ion"
                    animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ion" />
                </span>
                {profile.status}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-dust">
                Full-time roles, contract work, and freelance design projects. I usually reply
                within a day.
              </p>
            </GlassPanel>
          </Reveal>
        </div>
      </div>
    </>
  );
}
