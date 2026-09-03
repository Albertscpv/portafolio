import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Route changes should start at the top; the router does not do this for us. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
