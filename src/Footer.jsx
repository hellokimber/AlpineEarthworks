import { Link } from "react-router-dom";
import logoStackedWhite from "./assets/logo/Stacked_ReverseWhite_Tight.svg";
import iconReverseWhite from "./assets/logo/Icon_ReverseWhite_Tight.svg";

const SERVICING_AREA = "Okotoks, High River, Foothills County, Priddis & South Calgary";

/** Wide enough for email on one line; labels/values/servicing share the same block width. */
const contactBlockClass =
  "w-full max-w-[min(34rem,calc(100%-1.25rem))] lg:w-[min(34rem,calc(100%-0.5rem))]";

/** Match quote block `<dt>` styling (bold caps, stone-400); slightly smaller than Home */
const labelClass =
  "text-[0.61875rem] font-bold uppercase tracking-[0.12em] text-stone-400 sm:text-[0.73125rem]";
const valueClass =
  "inline-block text-sm font-medium text-white decoration-transparent underline-offset-[0.3em] transition-colors duration-150 hover:text-stone-200 hover:underline hover:decoration-2 hover:decoration-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[0.9375rem]";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="relative scroll-mt-20 overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 flex items-center justify-end overflow-hidden"
        aria-hidden
      >
        <img
          src={iconReverseWhite}
          alt=""
          className="h-[200%] w-auto max-w-none shrink-0 object-contain object-right opacity-[0.045] sm:opacity-[0.055]"
          width={94}
          height={102}
          decoding="async"
        />
      </div>

      <div className="contact-section-gutter relative z-10 pb-11 pt-[calc(2.75rem*1.2*1.2*1.3)] sm:pb-12 sm:pt-[calc(3rem*1.2*1.2*1.3)] md:pb-14 md:pt-[calc(3.5rem*1.2*1.2*1.3)] lg:pb-16 lg:pt-[calc(4rem*1.2*1.2*1.3)]">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[auto_1fr] lg:gap-x-14 lg:[align-items:last_baseline]">
          <div className="@container flex w-full flex-col gap-y-8 sm:w-[calc(7.0125rem*231/109)] sm:max-w-full lg:w-[calc(7.0125rem*3/2*231/109)] lg:min-h-0 lg:justify-self-start">
            <Link
              to="/"
              className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-block sm:w-fit"
            >
              <img
                src={logoStackedWhite}
                alt="Alpine Earthworks"
                className="h-auto w-full sm:h-[7.0125rem] sm:w-auto lg:h-[calc(7.0125rem*3/2)]"
                width={231}
                height={109}
              />
            </Link>

            <p className="flex w-full flex-row flex-nowrap items-center justify-between gap-x-1 text-[clamp(0.6875rem,3.85cqi,1.0625rem)] font-light uppercase leading-snug tracking-[0.14em] text-white sm:tracking-[0.16em]">
              <span className="whitespace-nowrap">Excavation /</span>
              <span className="whitespace-nowrap">Landscaping /</span>
              <span className="whitespace-nowrap">Grading</span>
            </p>
          </div>

          <div
            className={`flex flex-col gap-6 lg:min-h-0 lg:justify-self-end ${contactBlockClass}`}
          >
            <div className="flex min-w-0 flex-col gap-6 text-left sm:grid sm:grid-cols-[auto_auto] sm:gap-x-14 sm:gap-y-0">
              <div className="grid min-w-0 gap-y-1.5">
                <p className={labelClass}>Phone</p>
                <a href="tel:+14037100269" className={`min-w-0 ${valueClass}`}>
                  (403) 710-0269
                </a>
              </div>
              <div className="grid min-w-0 gap-y-1.5">
                <p className={labelClass}>Email</p>
                <a
                  href="mailto:jordan@alpineearthworks.ca"
                  className={`min-w-0 max-w-full break-all normal-case tracking-normal sm:break-normal sm:whitespace-nowrap ${valueClass}`}
                >
                  jordan@alpineearthworks.ca
                </a>
              </div>
            </div>
            <p className="w-full text-left text-[0.8125rem] font-normal leading-snug text-white sm:text-[0.875rem]">
              Servicing {SERVICING_AREA}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t-4 border-white sm:mt-14" />

        <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-[0.5625rem] font-light uppercase tracking-[0.2em] text-white sm:text-[0.625rem] sm:tracking-[0.22em]">
            © {year} Alpine Earthworks, all rights reserved
          </p>
          <nav
            className="flex flex-wrap items-center gap-10 sm:gap-12 lg:gap-14"
            aria-label="Legal"
          >
            <Link
              to="/privacy"
              className="text-[0.5625rem] font-light uppercase tracking-[0.2em] text-white underline decoration-transparent underline-offset-[0.35em] transition-colors duration-150 hover:text-stone-300 hover:decoration-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[0.625rem] sm:tracking-[0.22em]"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-[0.5625rem] font-light uppercase tracking-[0.2em] text-white underline decoration-transparent underline-offset-[0.35em] transition-colors duration-150 hover:text-stone-300 hover:decoration-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[0.625rem] sm:tracking-[0.22em]"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
