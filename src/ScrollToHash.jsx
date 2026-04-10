import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const run = () => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      requestAnimationFrame(() => requestAnimationFrame(run));
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
