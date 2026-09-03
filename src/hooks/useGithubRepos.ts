import { useEffect, useState } from "react";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

type Status = "loading" | "ready" | "error";

const CACHE_KEY = "gh:repos:v1";
/** GitHub allows 60 unauthenticated calls per hour per IP. Be a good guest. */
const CACHE_TTL = 30 * 60 * 1000;

function readCache(): Repo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw) as { at: number; repos: Repo[] };
    return Date.now() - at < CACHE_TTL ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(repos: Repo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* private mode or quota — the page works fine without the cache */
  }
}

export function useGithubRepos(user: string) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRepos(cached);
      setStatus("ready");
      return;
    }

    const controller = new AbortController();

    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? "GitHub is rate limiting this IP. Try again in a few minutes."
              : `GitHub responded with ${response.status}.`,
          );
        }
        return (await response.json()) as Repo[];
      })
      .then((data) => {
        const visible = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at));
        setRepos(visible);
        setStatus("ready");
        writeCache(visible);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        // A rejected fetch (offline, blocked, CORS) only ever says "Failed to
        // fetch", which tells a visitor nothing. Translate it.
        const network = error instanceof TypeError;
        setMessage(
          network
            ? "Could not reach GitHub from this network. The projects are still on my profile."
            : error instanceof Error
              ? error.message
              : "Could not reach GitHub.",
        );
        setStatus("error");
      });

    return () => controller.abort();
  }, [user]);

  return { repos, status, message };
}
