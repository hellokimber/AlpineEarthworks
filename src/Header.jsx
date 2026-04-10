import { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="flex items-center justify-between gap-4 px-2 py-5 sm:px-3 md:px-5 lg:px-[30px]">
        <Link
          to="/"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          <img src={logoWordmark} alt="Alpine Earthworks" className="h-[20px] w-auto" width={384} height={20} />
        </Link>

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <nav className="flex items-center gap-6 lg:gap-8" aria-label="Primary">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-xs font-semibold uppercase tracking-wide text-stone-950 transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 sm:text-sm"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            to="/#contact"
            className="inline-flex shrink-0 items-center justify-center bg-stone-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 sm:text-sm"
          >
            Get a quote
          </Link>
        </div>

        <button
          type="button"
          className="min-w-[4.5rem] rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-wide text-stone-950 md:hidden hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
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
          className="flex flex-col gap-1 px-2 py-4 sm:px-3 md:px-5 lg:px-[30px]"
          aria-label="Mobile"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide text-stone-950 hover:bg-stone-100"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="mt-2 bg-stone-950 px-3 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white hover:bg-stone-800"
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
