import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pickaxe, Road, Shovel, Tractor, Trees } from "lucide-react";
import { QuoteForm } from "./QuoteForm.jsx";
import iconSolidBlack from "./assets/logo/Icon_SolidBlack_Tight.svg";
import heroImage from "./assets/imgs/AlpineEarthworks_Hero.webp";
import aboutImage from "./assets/imgs/AlpineEarthworks_About.webp";
import worksImage1 from "./assets/imgs/AlpineEarthworks_Works1.webp";
import worksImage2 from "./assets/imgs/AlpineEarthworks_Works2.webp";
import worksImage3 from "./assets/imgs/AlpineEarthworks_Works3.webp";
import worksImage4 from "./assets/imgs/AlpineEarthworks_Works4.webp";
import longArrowRight from "./assets/long arrow right.svg";

const selectedWorks = [
  {
    src: worksImage2,
    alt: "Graded dirt work under a wide blue sky",
    width: 1600,
    height: 2000,
  },
  {
    src: worksImage3,
    alt: "Yellow skid steer clearing a path through a wooded property",
    width: 1600,
    height: 2000,
  },
  {
    src: worksImage4,
    alt: "Landscaped backyard with lawn and shed seen from a deck",
    width: 2000,
    height: 1038,
  },
  {
    src: worksImage1,
    alt: "Modern home with stamped driveway and landscaped approach",
    width: 2000,
    height: 1429,
  },
];

function SelectedWorksCarousel({ items }) {
  const scrollRef = useRef(null);
  const dragRef = useRef({ active: false, pointerId: 0, startX: 0, startScrollLeft: 0 });
  const [showPrev, setShowPrev] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const syncShowPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowPrev(el.scrollLeft > 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncShowPrev();
    el.addEventListener("scroll", syncShowPrev, { passive: true });
    const ro = new ResizeObserver(syncShowPrev);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncShowPrev);
      ro.disconnect();
    };
  }, [syncShowPrev]);

  const scrollBehavior = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth";

  const getSlides = () => {
    const el = scrollRef.current;
    return el ? [...el.querySelectorAll("li")] : [];
  };

  const getCurrentSlideIndex = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    const x = el.scrollLeft;
    const slides = getSlides();
    let idx = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].offsetLeft <= x + 12) idx = i;
    }
    return idx;
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const slides = getSlides();
    if (slides.length === 0) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    const i = getCurrentSlideIndex();
    const last = slides.length - 1;
    const x = el.scrollLeft;
    /* Last slide, or dragged flush to the end of the scroll range */
    const atLastSlide = i === last || x >= maxScroll - 2;

    if (atLastSlide) {
      el.scrollTo({ left: 0, behavior: "instant" });
    } else {
      el.scrollTo({ left: slides[i + 1].offsetLeft, behavior: scrollBehavior() });
    }
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const slides = getSlides();
    if (slides.length === 0) return;
    const i = getCurrentSlideIndex();
    const firstAlignedLeft = slides[0].offsetLeft;
    const homeLeft = 0;
    const x = el.scrollLeft;
    const tol = 6;

    if (i <= 0) {
      if (firstAlignedLeft <= tol) {
        if (x > tol) {
          el.scrollTo({ left: homeLeft, behavior: scrollBehavior() });
        }
        return;
      }
      if (x <= homeLeft + tol) {
        return;
      }
      if (Math.abs(x - firstAlignedLeft) <= tol) {
        el.scrollTo({ left: homeLeft, behavior: "instant" });
        return;
      }
      el.scrollTo({ left: firstAlignedLeft, behavior: scrollBehavior() });
      return;
    }

    const prevIndex = i - 1;
    const targetLeft = prevIndex === 0 ? firstAlignedLeft : slides[prevIndex].offsetLeft;
    el.scrollTo({ left: targetLeft, behavior: scrollBehavior() });
  };

  const onWorksPointerDown = useCallback((e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
    setGrabbing(true);
  }, []);

  const onWorksPointerMove = useCallback((e) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = d.startScrollLeft - (e.clientX - d.startX);
  }, []);

  const onWorksPointerUp = useCallback((e) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    dragRef.current.active = false;
    const el = scrollRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
    setGrabbing(false);
  }, []);

  const arrowImgClass =
    "h-[0.75rem] w-auto sm:h-[0.875rem] pointer-events-none select-none";
  const arrowBtnClass =
    "inline-flex shrink-0 transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 motion-reduce:transition-none motion-reduce:hover:scale-100";

  return (
    <>
      <div className="max-w-full overflow-x-hidden">
        <ul
          ref={scrollRef}
          className={`works-scroll mt-6 flex w-full cursor-grab select-none gap-2 overflow-x-auto pb-1 pl-[calc((100%-min(100%,80rem))/2+var(--page-gutter-mobile))] [-webkit-overflow-scrolling:touch] sm:mt-8 sm:gap-3 sm:pl-[calc((100%-min(100%,80rem))/2+0.75rem)] md:pl-[calc((100%-min(100%,80rem))/2+1.25rem)] lg:pl-[calc((100%-min(100%,80rem))/2+30px)] ${grabbing ? "cursor-grabbing" : ""}`}
          onPointerDown={onWorksPointerDown}
          onPointerMove={onWorksPointerMove}
          onPointerUp={onWorksPointerUp}
          onPointerCancel={onWorksPointerUp}
        >
          {items.map(({ src, alt, width: imgW, height: imgH }) => (
            <li
              key={alt}
              className="flex h-[calc(min(78vw,17.5rem)*4/3*1.3*0.5)] shrink-0 items-center sm:h-[calc(min(78vw,17.5rem)*4/3*1.3)]"
            >
              <img
                src={src}
                alt={alt}
                width={imgW}
                height={imgH}
                className="h-full w-auto max-w-none object-contain object-center"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between px-[var(--page-gutter-mobile)] sm:mt-8 sm:px-3 md:px-5 lg:px-[30px]">
        <button
          type="button"
          className={`${arrowBtnClass} ${showPrev ? "" : "invisible pointer-events-none"}`}
          aria-label="Show previous project"
          onClick={scrollPrev}
        >
          <img
            src={longArrowRight}
            alt=""
            width={253}
            height={30}
            className={`${arrowImgClass} -scale-x-100`}
            decoding="async"
          />
        </button>
        <button
          type="button"
          className={arrowBtnClass}
          aria-label="Show next project"
          onClick={scrollNext}
        >
          <img src={longArrowRight} alt="" width={253} height={30} className={arrowImgClass} decoding="async" />
        </button>
      </div>
    </>
  );
}

const servicesItems = [
  {
    title: "Excavation",
    description:
      "Professional site preparation, grading, and earthmoving services tailored for local homeowners, builders, and small business owners.",
    Icon: Pickaxe,
  },
  {
    title: "Driveway approaches",
    description:
      "From culverts to final grade, we install driveway approaches that stand up to the weather and improve your access.",
    Icon: Road,
  },
  {
    title: "Farm & ranch improvements",
    description:
      "We provide livestock waterer setup, corral cleaning, and drainage repairs to keep your operation in gear.",
    Icon: Tractor,
  },
  {
    title: "Landscaping",
    description:
      "Professional sod installation and custom landscaping to enhance your property's beauty and value.",
    Icon: Trees,
  },
  {
    title: "Clean fill removal",
    description:
      "Skip the Dirt Dump. We will remove, haul and dispose of your clean fill for you.",
    Icon: Shovel,
  },
];

export default function Home() {
  return (
    <main className="min-w-0 flex-1">
      <section aria-labelledby="hero-heading">
        <div className="grid min-h-0 grid-cols-1 md:grid-cols-2 md:min-h-[70vh]">
          <div className="relative order-1 min-h-[45vh] md:order-2 md:min-h-full md:border-l-[6px] md:border-white">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={heroImage}
                alt="Skid steer grading a slope among pine trees"
                className="absolute inset-0 h-full w-full object-cover grayscale"
                width={1600}
                height={1200}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="hero-exp-badge absolute z-10 inline-flex aspect-square w-fit max-w-[min(100%,calc(100%-2rem))] flex-col items-center justify-center gap-[3px] p-[15px] sm:gap-1 bottom-[var(--page-gutter-mobile)] right-[var(--page-gutter-mobile)] sm:bottom-3 sm:right-3 md:bottom-5 md:right-5 lg:bottom-[30px] lg:right-[30px]">
              <p className="font-[family-name:var(--font-display)] text-4xl font-black leading-none text-black sm:text-5xl">
                35+
              </p>
              <p className="w-full text-left text-[0.625rem] font-semibold uppercase leading-[1.2] tracking-[0.06em] text-black sm:text-[0.6875rem] sm:tracking-[0.08em]">
                Years of
                <br />
                Experience
              </p>
            </div>
          </div>

          <div className="order-2 flex h-full min-h-[45vh] flex-col justify-end bg-black px-[var(--page-gutter-mobile)] pt-0 [container-type:size] sm:px-3 md:order-1 md:min-h-[70vh] md:px-5 lg:px-12">
            <div className="hero-copy pb-[12.5cqh]">
              <h1 id="hero-heading" className="hero-heading text-left">
                We treat your dirt
                <span className="sm:hidden"> </span>
                <br className="hidden sm:block" />
                like it’s our own
              </h1>
              <p className="hero-subheading">Excavation / Landscaping / Grading</p>
              <Link to="/#quote" className="hero-cta">
                Get a quote
                <ArrowRight className="h-4 w-4 shrink-0 sm:h-[1em] sm:w-[1em]" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="relative scroll-mt-20 overflow-hidden bg-white pb-[6.24rem] pt-[4.8rem] text-stone-950 sm:pb-[9.36rem] sm:pt-[6.4rem] md:pb-[10.92rem] md:pt-[7.2rem]"
        aria-labelledby="services-heading"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="flex h-full min-h-0 w-full items-end justify-start overflow-hidden">
            <img
              src={iconSolidBlack}
              alt=""
              className="services-watermark min-h-0 shrink-0"
              width={94}
              height={102}
              decoding="async"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-[var(--page-gutter-mobile)] sm:px-3 md:px-5 lg:px-[30px]">
          <div className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-2 lg:gap-x-0 lg:gap-y-8 lg:items-stretch xl:gap-y-[calc(theme(spacing.14)*2/3)]">
            <div>
              <h2
                id="services-heading"
                className="-ml-[var(--section-heading-shift)] max-sm:ml-0 text-left font-[family-name:var(--font-display)] text-[clamp(1.875rem,3.25vw+1.125rem,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[0.108em] text-stone-950 sm:tracking-[0.12em]"
              >
                Services
              </h2>
            </div>
            <div className="hidden min-h-0 lg:block" aria-hidden />
            <ul className="m-0 flex list-none flex-col gap-8 p-0 sm:gap-[calc(theme(spacing.14)*2/3)] lg:contents">
              {servicesItems.map(({ title, description, Icon }) => (
                <li key={title} className="flex gap-6 sm:gap-8 lg:contents">
                  <div className="hidden h-full min-h-0 shrink-0 justify-start self-stretch sm:flex lg:justify-end">
                    <div
                      className="flex aspect-square h-full min-h-16 w-auto shrink-0 items-center justify-center rounded-lg border-2 border-stone-950 text-stone-950 sm:min-h-[4.5rem]"
                      aria-hidden
                    >
                      <Icon className="h-10 w-10 sm:h-11 sm:w-11" strokeWidth={1.75} aria-hidden />
                    </div>
                  </div>
                  <div className="min-w-0 lg:pl-6 xl:pl-8">
                    <h3 className="text-left font-[family-name:var(--font-display)] text-lg font-extrabold uppercase leading-[1.2] tracking-[0.108em] text-stone-950 sm:text-xl md:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-stone-700 sm:text-lg sm:leading-[1.35] md:text-xl md:leading-[1.3]">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="bg-black py-12 text-white max-sm:text-left sm:text-center sm:py-14 md:py-16"
        aria-labelledby="servicing-heading"
      >
        <div className="mx-auto max-w-4xl px-[var(--page-gutter-mobile)] sm:px-3 lg:px-4">
          <h2
            id="servicing-heading"
            className="text-left font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-[0.108em] text-white sm:text-center"
          >
            Servicing
          </h2>
          <p className="mt-2 text-left text-xl leading-[1.3] text-white sm:text-center">
            Okotoks, High River, Foothills County, Priddis & South Calgary
          </p>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 bg-white pb-16 pt-18 text-stone-950 sm:pb-24 sm:pt-24 md:pb-28 md:pt-27"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-7xl px-[var(--page-gutter-mobile)] sm:px-3 md:px-5 lg:px-[30px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            <div className="relative order-1 min-h-0">
              <h2
                id="about-heading"
                className="pointer-events-none absolute top-0 left-0 z-10 max-w-none -translate-y-[42%] text-left font-[family-name:var(--font-display)] text-[clamp(1.875rem,3.25vw+1.125rem,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[0.108em] text-stone-950 sm:left-[calc(-1*var(--section-heading-shift))] sm:-translate-y-[38%] sm:tracking-[0.12em]"
              >
                About us
              </h2>
              <div className="aspect-[3/4] w-full overflow-hidden bg-stone-200">
                <img
                  src={aboutImage}
                  alt="Skid steer on graded soil beside a home under construction"
                  className="h-full w-full object-cover"
                  width={1200}
                  height={1600}
                  decoding="async"
                />
              </div>
            </div>

            <div className="order-2 flex min-h-0 flex-col justify-center">
              <p className="font-[family-name:var(--font-display)] text-xl font-light leading-snug text-stone-950 md:text-2xl">
                We are a small, local crew based right here in the Alberta Foothills.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg sm:leading-[1.35] md:text-xl md:leading-[1.3]">
                As a family-run company with over 35 years of combined experience, we believe in honest work,
                clear communication, and building real relationships with our clients. We show up on time, work
                hard, and take pride in doing the job right: no shortcuts, no surprises.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg sm:leading-[1.35] md:text-xl md:leading-[1.3]">
                If you&apos;re looking for a reliable team who cares as much about your property as you do,
                let&apos;s chat. We&apos;d love to help bring your outdoor vision to life.
              </p>
              <Link
                to="/#contact"
                className="mt-8 w-fit border-b-2 border-black pb-0.5 text-lg font-bold lowercase text-stone-950 transition-colors duration-150 hover:border-stone-500 hover:text-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
              >
                get in touch with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 bg-white pb-8 pt-[calc(theme(spacing.8)*2/3)] sm:pb-12 sm:pt-8 md:pb-14 md:pt-[calc(theme(spacing.14)*2/3)]"
        aria-labelledby="contact-heading"
      >
        <div className="contact-section-gutter-desktop-only">
          <div className="bg-black px-[var(--page-gutter-mobile)] pt-10 pb-8 text-white sm:px-5 sm:pt-12 sm:pb-10 md:px-8 md:pt-14 md:pb-12 lg:px-0">
            <div className="grid grid-cols-1 gap-[calc(theme(spacing.10)*3/4)] lg:grid-cols-2 lg:gap-0 lg:items-start">
              <div className="min-w-0 pl-0 lg:pl-[calc(theme(spacing.10)+theme(spacing.5))]">
                <h2
                  id="contact-heading"
                  className="text-left font-[family-name:var(--font-display)] text-[clamp(1.875rem,3.25vw+1.125rem,3.75rem)] font-light leading-[1.12] tracking-[-0.02em] text-white"
                >
                  Let&apos;s get digging
                </h2>
                <p className="mt-[calc(theme(spacing.5)*3/4)] max-w-md text-lg font-light leading-[1.45] text-white lg:max-w-none">
                  Contact us today for a free consultation and quote.
                </p>
                <dl className="mt-[calc(theme(spacing.20)*3/4)] space-y-[calc(theme(spacing.9)*3/4)] sm:mt-[calc(theme(spacing.24)*3/4)] sm:space-y-[calc(theme(spacing.10)*3/4)]">
                  <div>
                    <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-stone-400 sm:text-sm">
                      Phone
                    </dt>
                    <dd className="mt-2.5">
                      <a
                        href="tel:+14037100269"
                        className="text-lg text-white decoration-transparent underline-offset-[0.3em] transition-colors duration-150 hover:text-stone-200 hover:underline hover:decoration-2 hover:decoration-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        (403) 710-0269
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-stone-400 sm:text-sm">
                      Email
                    </dt>
                    <dd className="mt-2.5">
                      <a
                        href="mailto:jordan@alpineearthworks.ca"
                        className="break-all text-lg text-white decoration-transparent underline-offset-[0.3em] transition-colors duration-150 hover:text-stone-200 hover:underline hover:decoration-2 hover:decoration-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        jordan@alpineearthworks.ca
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-stone-400 sm:text-sm">
                      Servicing
                    </dt>
                    <dd className="mt-2.5 max-w-sm text-lg leading-[1.45] text-white">
                      Okotoks, High River, Foothills County, Priddis &amp; South Calgary
                    </dd>
                  </div>
                </dl>
              </div>
              <div
                id="quote"
                className="mx-0 flex min-h-0 min-w-0 w-full scroll-mt-20 flex-col border-x-4 border-black bg-white px-[var(--page-gutter-mobile)] py-[2.75rem] text-black shadow-sm sm:px-[calc(theme(spacing.5)+theme(spacing.5))] md:px-[calc(theme(spacing.8)+theme(spacing.5))] lg:px-[calc(theme(spacing.10)+theme(spacing.5))]"
              >
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="works"
        className="scroll-mt-20 bg-white pb-36 pt-14 text-stone-950 sm:pb-40 sm:pt-16 md:pb-44 md:pt-20"
        aria-labelledby="works-heading"
      >
        <div className="mx-auto max-w-7xl px-[var(--page-gutter-mobile)] sm:px-3 md:px-5 lg:px-[30px]">
          <h2
            id="works-heading"
            className="-ml-[var(--section-heading-shift)] max-sm:ml-0 text-left font-[family-name:var(--font-display)] text-base font-extrabold uppercase leading-none tracking-[0.108em] text-stone-950 sm:text-lg sm:tracking-[0.12em]"
          >
            Selected works
          </h2>
        </div>

        <SelectedWorksCarousel items={selectedWorks} />
      </section>
    </main>
  );
}
