import { useState } from "react";

/**
 * The snippet shown next to each demo is the *same* CSS the demo runs on, so
 * the page cannot drift out of sync with its own documentation.
 */
export default function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the code is still selectable */
    }
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-space-700/80 bg-space-950/70">
      <figcaption className="flex items-center justify-between border-b border-space-700/80 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust transition-colors hover:text-ion"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-dust">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
