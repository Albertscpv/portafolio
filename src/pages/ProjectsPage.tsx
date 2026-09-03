import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../components/ui/SectionHeading";
import GlassPanel from "../components/ui/GlassPanel";
import Skeleton from "../components/ui/Skeleton";
import Reveal from "../components/ui/Reveal";
import LiquidButton from "../components/ui/LiquidButton";
import { useGithubRepos, type Repo } from "../hooks/useGithubRepos";
import { profile, socials } from "../data/site";

/** Language → dot color. Anything unmapped falls back to a neutral grey. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#6EE7F9",
  JavaScript: "#FBBF24",
  Java: "#F472B6",
  HTML: "#FB7185",
  CSS: "#A78BFA",
  Astro: "#F0ABFC",
  Svelte: "#FB923C",
  Python: "#4ADE80",
};

function dotColor(language: string | null) {
  return (language && LANGUAGE_COLORS[language]) || "#5A6488";
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const updated = new Date(repo.pushed_at).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.35) }}
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer noopener"
        className="block h-full rounded-2xl"
      >
        <GlassPanel className="h-full p-6 transition-transform duration-500 hover:-translate-y-1">
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold tracking-tight text-star">{repo.name}</h3>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ion"
              >
                ↗
              </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-dust">
              {repo.description ?? (
                <span className="italic text-faint">No description yet.</span>
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-faint">
              {repo.language ? (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: dotColor(repo.language) }}
                  />
                  {repo.language}
                </span>
              ) : null}
              {repo.stargazers_count > 0 ? <span>★ {repo.stargazers_count}</span> : null}
              <span className="ml-auto">{updated}</span>
            </div>
          </div>
        </GlassPanel>
      </a>
    </motion.li>
  );
}

export default function ProjectsPage() {
  const { repos, status, message } = useGithubRepos(profile.handle);
  const [filter, setFilter] = useState<string>("All");

  const languages = useMemo(() => {
    const found = new Set<string>();
    repos.forEach((repo) => repo.language && found.add(repo.language));
    return ["All", ...[...found].sort()];
  }, [repos]);

  const visible = useMemo(
    () => (filter === "All" ? repos : repos.filter((repo) => repo.language === filter)),
    [repos, filter],
  );

  const githubUrl = socials.find((social) => social.label === "GitHub")?.href ?? "#";

  return (
    <>
      <SectionHeading
        index="01 — Projects"
        title="Everything I have shipped in public."
        lede="Pulled live from GitHub and sorted by most recent push, so this page is never out of date. Forks and archived repositories are filtered out."
      />

      {status === "ready" && languages.length > 2 ? (
        <Reveal className="mb-10">
          <div
            role="group"
            aria-label="Filter projects by language"
            className="flex flex-wrap gap-2"
          >
            {languages.map((language) => {
              const active = filter === language;
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => setFilter(language)}
                  aria-pressed={active}
                  className={`relative rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    active ? "text-space-950" : "text-dust hover:text-star"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-ion"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full border border-space-600" />
                  )}
                  <span className="relative z-10">{language}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      ) : null}

      {status === "loading" ? (
        <ul className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="glass rounded-2xl p-6">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="mt-4 h-3.5 w-full" />
              <Skeleton className="mt-2 h-3.5 w-4/5" />
              <Skeleton className="mt-8 h-3 w-1/3" />
            </li>
          ))}
        </ul>
      ) : null}

      {status === "error" ? (
        <GlassPanel className="p-10 text-center" sheen={false}>
          <p className="eyebrow mb-4">Signal lost</p>
          <p className="mx-auto max-w-md text-dust">{message}</p>
          <div className="mt-8 flex justify-center">
            <LiquidButton href={githubUrl} external variant="ghost">
              Open GitHub directly
            </LiquidButton>
          </div>
        </GlassPanel>
      ) : null}

      {status === "ready" && repos.length === 0 ? (
        <GlassPanel className="p-10 text-center" sheen={false}>
          <p className="text-dust">No public repositories to show yet.</p>
        </GlassPanel>
      ) : null}

      {status === "ready" && repos.length > 0 ? (
        <>
          <motion.ul layout className="grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((repo, index) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </AnimatePresence>
          </motion.ul>

          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {visible.length} {visible.length === 1 ? "repository" : "repositories"}
            {filter !== "All" ? ` · ${filter}` : ""}
          </p>
        </>
      ) : null}
    </>
  );
}
