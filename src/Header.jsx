import { useState } from "react";
import { Link } from "react-router-dom";
import logoRightAligned from "./assets/logo/RightAligned_SolidBlack_Tight.svg";
import logoWordmark from "./assets/logo/Single_SolidBlack_Tight.svg";

const navLinks = [
  { to: "/#services", label: "Services" },
  { to: "/#about", label: "About" },
  { to: "/#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b-[6px] border-black bg-white">
      <div className="flex items-center justify-between gap-4 py-5 pl-[var(--page-gutter-mobile)] pr-1 sm:pl-6 sm:pr-2 md:pr-4 lg:pr-7">
        <Link
          to="/"
          aria-label="Alpine Earthworks home"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          <img
            src={logoRightAligned}
            alt=""
            aria-hidden
            className="h-9 w-auto md:hidden"
            width={204}
            height={45}
          />
          <img
            src={logoWordmark}
            alt=""
            aria-hidden
            className="hidden h-[20px] w-auto md:block"
            width={384}
            height={20}
          />
        </Link>

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <nav className="flex items-center gap-6 lg:gap-8" aria-label="Primary">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
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
          className="min-w-[4.5rem] rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wide text-stone-950 transition-colors duration-150 md:hidden hover:bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
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
