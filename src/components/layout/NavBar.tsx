import { useEffect, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, profile } from "../../data/site";
import Logo from "./Logo";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  // Reveal on scroll up, tuck away on scroll down — the content is the point.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);
    setHidden(latest > previous && latest > 220 && !open);
  });

  useEffect(() => setOpen(false), [pathname]);

  // A locked body keeps the overlay from scrolling the page behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 transition-colors duration-500 md:px-8 ${
            scrolled ? "backdrop-blur-md" : ""
          }`}
        >
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — home`}
          >
            <Logo />
            <span className="hidden leading-tight sm:block">
              <span className="block font-semibold tracking-tight text-star">{profile.short}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-faint transition-colors group-hover:text-ion">
                {profile.role}
              </span>
            </span>
          </Link>

          {/* Desktop dock */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="glass flex items-center gap-1 rounded-full px-2 py-1.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <RouterNavLink to={link.path} end={link.path === "/"} className="block">
                    {({ isActive }) => (
                      <span className="relative block rounded-full px-4 py-1.5 text-[13px]">
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-space-600/80 ring-1 ring-inset ring-space-400/70"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        ) : null}
                        <span
                          className={`relative z-10 transition-colors ${
                            isActive ? "text-star" : "text-dust hover:text-star"
                          }`}
                        >
                          {link.title}
                        </span>
                      </span>
                    )}
                  </RouterNavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass grid h-11 w-11 place-items-center rounded-full md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 block h-px w-5 bg-star"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 block h-px w-5 bg-star"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-space-950/85 px-8 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 + index * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <RouterNavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-space-700/70 py-4 text-3xl font-semibold tracking-tight transition-colors ${
                        isActive ? "text-ion" : "text-star"
                      }`
                    }
                  >
                    <span className="font-mono text-[11px] tracking-[0.24em] text-faint">
                      {link.short}
                    </span>
                    {link.title}
                  </RouterNavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
