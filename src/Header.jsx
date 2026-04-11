import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoRightAligned from "./assets/logo/RightAligned_SolidBlack_Tight.svg";
import logoWordmark from "./assets/logo/Single_SolidBlack_Tight.svg";

const navLinks = [
  { to: "/#services", label: "Services" },
  { to: "/#about", label: "About" },
  { to: "/#contact", label: "Contact" },
];

/** SVG viewBox widths/heights — used to estimate horizontal delta when swapping logos */
const WORDMARK_W_AT_20H = (334.73 / 17.41) * 20;
const COMPACT_W_AT_36H = (204.34 / 44.62) * 36;
const LOGO_WIDTH_DELTA = WORDMARK_W_AT_20H - COMPACT_W_AT_36H;
/** Switch to compact when gap (logo right → Services left) falls below this */
const GAP_SHRINK_PX = 20;
/** Switch back to wordmark only when compact layout leaves enough room (hysteresis) */
const GAP_EXPAND_MIN = LOGO_WIDTH_DELTA + GAP_SHRINK_PX;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compactDesktopLogo, setCompactDesktopLogo] = useState(false);
  const logoLinkRef = useRef(null);
  const servicesLinkRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const measure = () => {
      if (!mq.matches) {
        setCompactDesktopLogo(false);
        return;
      }
      const logoEl = logoLinkRef.current;
      const servicesEl = servicesLinkRef.current;
      if (!logoEl || !servicesEl) return;

      const gap =
        servicesEl.getBoundingClientRect().left -
        logoEl.getBoundingClientRect().right;

      setCompactDesktopLogo((prev) => {
        if (!prev && gap < GAP_SHRINK_PX) return true;
        if (prev && gap > GAP_EXPAND_MIN) return false;
        return prev;
      });
    };

    const ro = new ResizeObserver(() => measure());
    if (barRef.current) ro.observe(barRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <header className="relative z-50 border-b-[6px] border-black bg-white">
      <div
        ref={barRef}
        className="header-bar-mobile-landscape flex items-center justify-between gap-4 py-5 pl-[var(--page-gutter-mobile)] pr-[var(--page-gutter-mobile)] sm:pl-6 sm:pr-6 md:pr-4 lg:pr-7"
      >
        <Link
          ref={logoLinkRef}
          to="/"
          aria-label="Alpine Earthworks home"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          <img
            src={logoRightAligned}
            alt=""
            aria-hidden
            className={`h-9 w-auto ${compactDesktopLogo ? "block md:block" : "block md:hidden"}`}
            width={204}
            height={45}
          />
          <img
            src={logoWordmark}
            alt=""
            aria-hidden
            className={`h-[20px] w-auto ${compactDesktopLogo ? "hidden" : "hidden md:block"}`}
            width={384}
            height={20}
          />
        </Link>

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <nav className="flex items-center gap-6 lg:gap-8" aria-label="Primary">
            {navLinks.map(({ to, label }, index) => (
              <Link
                key={to}
                ref={index === 0 ? servicesLinkRef : undefined}
                to={to}
                className="text-xs font-semibold uppercase tracking-wide text-stone-950 transition-colors duration-150 hover:text-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 sm:text-sm"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            to="/#quote"
            className="inline-flex shrink-0 items-center justify-center border-[2pt] border-transparent border-solid bg-stone-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:border-black hover:bg-transparent hover:text-stone-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 sm:text-sm"
          >
            Get a quote
          </Link>
        </div>

        <button
          type="button"
          className="min-w-[4.5rem] rounded-md px-2 py-2 text-sm font-semibold uppercase tracking-wide text-stone-950 transition-colors duration-150 md:hidden hover:bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-stone-200 bg-white md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <nav
          className="flex flex-col gap-1 py-4 px-[var(--page-gutter-mobile)] sm:px-6"
          aria-label="Mobile"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide text-stone-950 transition-colors duration-150 hover:bg-stone-200 hover:text-stone-700"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/#quote"
            className="mt-2 border-[2pt] border-transparent border-solid bg-stone-950 px-3 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:border-black hover:bg-transparent hover:text-stone-950"
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
