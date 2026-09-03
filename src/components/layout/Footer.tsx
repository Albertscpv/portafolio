import { Link } from "react-router-dom";
import { navLinks, profile, socials } from "../../data/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32 border-t border-space-700/60">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-semibold tracking-tight">{profile.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-dust">{profile.tagline}</p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ion">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ion" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ion" />
              </span>
              {profile.status}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow mb-4">Index</h2>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-dust transition-colors hover:text-star"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4">Elsewhere</h2>
            <ul className="space-y-2.5">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-baseline gap-2 text-sm text-dust transition-colors hover:text-star"
                  >
                    {social.label}
                    <span className="font-mono text-[11px] text-faint transition-colors group-hover:text-ion">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-space-700/60 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:flex-row sm:items-center">
          <span>
            © {year} {profile.name}
          </span>
          <span className="flex items-center gap-2">
            React · TypeScript · Tailwind · Motion
            <span className="h-1 w-1 animate-blink rounded-full bg-ion" />
          </span>
        </div>
      </div>
    </footer>
  );
}
