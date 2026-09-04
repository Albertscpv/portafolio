import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";

import SpaceBackdrop from "./components/background/SpaceBackdrop";
import CursorAura from "./components/background/CursorAura";
import GooFilter from "./components/ui/GooFilter";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/layout/ScrollProgress";
import ScrollToTop from "./components/layout/ScrollToTop";
import PageTransition from "./components/layout/PageTransition";
import Intro from "./components/layout/Intro";

import { usePointerVars } from "./hooks/usePointer";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import WorkPage from "./pages/WorkPage";
import DesignsPage from "./pages/DesignsPage";
import BrandPage from "./pages/BrandPage";
import LabPage from "./pages/LabPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

const ROUTES = [
  { path: "/", element: <HomePage /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/work", element: <WorkPage /> },
  { path: "/designs", element: <DesignsPage /> },
  { path: "/brand", element: <BrandPage /> },
  { path: "/lab", element: <LabPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "*", element: <NotFoundPage /> },
];

const INTRO_KEY = "intro:seen";

/** Once per browser session, and never when motion is unwelcome. */
function shouldPlayIntro(reduced: boolean) {
  if (reduced) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return false;
  }
}

function Shell() {
  const location = useLocation();
  const reduced = useReducedMotion() ?? false;
  const [introPlaying, setIntroPlaying] = useState(() => shouldPlayIntro(reduced));

  const endIntro = useCallback(() => {
    setIntroPlaying(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private mode — the intro simply plays again next time */
    }
  }, []);

  usePointerVars(!reduced);
  useSmoothScroll(!reduced);

  return (
    <>
      <SpaceBackdrop reduced={reduced} />
      <CursorAura />
      <GooFilter />
      <ScrollProgress />
      <ScrollToTop />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:rounded-full focus:bg-ion focus:px-5 focus:py-2 focus:font-mono focus:text-[12px] focus:text-space-950"
      >
        Skip to content
      </a>

      <NavBar />

      <main id="main" className="relative z-10 min-h-screen">
        {/* mode="wait" keeps the two pages from overlapping mid-transition. */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PageTransition>{route.element}</PageTransition>}
              />
            ))}
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {introPlaying ? <Intro key="intro" onDone={endIntro} /> : null}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    // reducedMotion="user" defers to the OS: transforms are dropped, opacity stays.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </MotionConfig>
  );
}
