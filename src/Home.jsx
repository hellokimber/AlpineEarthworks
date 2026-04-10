import { Link } from "react-router-dom";
import { ArrowRight, Pickaxe, Road, Tractor, Trees } from "lucide-react";
import { QuoteForm } from "./QuoteForm.jsx";
import iconSolidBlack from "./assets/logo/Icon_SolidBlack_Tight.svg";
import heroImage from "./assets/imgs/AlpineEarthworks_Hero.webp";
import aboutImage from "./assets/imgs/AlpineEarthworks_About.webp";

const servicesItems = [
  {
    title: "Excavation",
    description:
      "Professional site preparation, grading, and earthmoving services for any project scale.",
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
      "Custom landscape design and installation to enhance your property's beauty and value.",
    Icon: Trees,
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="border-b border-stone-800/80" aria-labelledby="hero-heading">
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
            <div className="hero-exp-badge absolute z-10 inline-flex aspect-square w-fit max-w-[min(100%,calc(100vw-2rem))] flex-col items-center justify-center gap-[3px] p-[15px] sm:gap-1 [bottom:var(--hero-inline-padding)] [right:var(--hero-inline-padding)]">
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

          <div className="order-2 flex h-full min-h-[45vh] flex-col justify-end bg-black pt-0 pr-2 pl-[var(--hero-inline-padding)] [container-type:size] sm:pr-3 md:order-1 md:min-h-[70vh] md:pr-5 lg:pr-[30px]">
            <div className="hero-copy pb-[12.5cqh]">
              <h1 id="hero-heading" className="hero-heading">
                We treat your dirt
                <br />
                like it’s our own
              </h1>
              <p className="hero-subheading">Excavation / Landscaping / Grading</p>
              <Link to="/#contact" className="hero-cta">
                Get a quote
                <ArrowRight className="h-[1em] w-[1em] shrink-0" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="relative scroll-mt-20 overflow-hidden border-b border-stone-200 bg-white pb-[6.24rem] pt-[4.8rem] text-stone-950 sm:pb-[9.36rem] sm:pt-[6.4rem] md:pb-[10.92rem] md:pt-[7.2rem]"
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

        <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-3 md:px-5 lg:px-[30px]">
          <div className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-2 lg:gap-x-0 lg:gap-y-12 lg:items-stretch xl:gap-y-14">
            <div>
              <h2
                id="services-heading"
                className="-ml-[var(--section-heading-shift)] font-[family-name:var(--font-display)] text-[clamp(3rem,2vw+2.5rem,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[0.108em] text-stone-950 sm:tracking-[0.12em]"
              >
                Services
              </h2>
            </div>
            <div className="hidden min-h-0 lg:block" aria-hidden />
            <ul className="m-0 flex list-none flex-col gap-12 p-0 sm:gap-14 lg:contents">
              {servicesItems.map(({ title, description, Icon }) => (
                <li key={title} className="flex gap-6 sm:gap-8 lg:contents">
                  <div className="flex h-full min-h-0 shrink-0 justify-start self-stretch lg:justify-end">
                    <div
                      className="flex aspect-square h-full min-h-16 w-auto shrink-0 items-center justify-center rounded-lg border-2 border-stone-950 text-stone-950 sm:min-h-[4.5rem]"
                      aria-hidden
                    >
                      <Icon className="h-10 w-10 sm:h-11 sm:w-11" strokeWidth={1.75} aria-hidden />
                    </div>
                  </div>
                  <div className="min-w-0 lg:pl-6 xl:pl-8">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-[0.108em] text-stone-950">
                      {title}
                    </h3>
                    <p className="mt-2 text-xl leading-[1.3] text-stone-700">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="border-b border-stone-800/80 bg-black py-12 text-center text-white sm:py-14 md:py-16"
        aria-labelledby="servicing-heading"
      >
        <div className="mx-auto max-w-4xl px-2 sm:px-3 lg:px-4">
          <h2
            id="servicing-heading"
            className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase tracking-[0.108em] text-white"
          >
            Servicing
          </h2>
          <p className="mt-2 text-xl leading-[1.3] text-white">
            Okotoks, High River, Foothills County, Priddis & South Calgary
          </p>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 border-b border-stone-200 bg-white pb-16 pt-24 text-stone-950 sm:pb-24 sm:pt-32 md:pb-28 md:pt-36"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-3 md:px-5 lg:px-[30px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            <div className="relative order-1 min-h-0">
              <h2
                id="about-heading"
                className="pointer-events-none absolute top-0 left-[calc(-1*var(--section-heading-shift))] z-10 max-w-none -translate-y-[42%] font-[family-name:var(--font-display)] text-[clamp(3rem,2vw+2.5rem,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-[0.108em] text-stone-950 sm:-translate-y-[38%] sm:tracking-[0.12em]"
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
              <p className="font-[family-name:var(--font-display)] text-3xl font-light leading-snug text-stone-950">
                We are a small, local crew based right here in the Alberta Foothills.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-stone-700">
                As a family-run company with over 35 years of combined experience, we believe in honest work,
                clear communication, and building real relationships with our clients. We show up on time, work
                hard, and take pride in doing the job right: no shortcuts, no surprises.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-stone-700">
                If you&apos;re looking for a reliable team who cares as much about your property as you do,
                let&apos;s chat. We&apos;d love to help bring your outdoor vision to life.
              </p>
              <Link
                to="/#contact"
                className="mt-8 w-fit text-lg font-bold lowercase text-stone-950 underline decoration-stone-950 decoration-1 underline-offset-[0.2em] transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950"
              >
                get in touch with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-20 bg-white py-8 sm:py-12 md:py-14"
        aria-labelledby="contact-heading"
      >
        <div className="px-2 sm:px-3 md:px-5 lg:px-[30px]">
          <div className="bg-black pt-10 pb-8 pl-4 pr-0 text-white sm:pt-12 sm:pb-10 sm:pl-5 md:pt-14 md:pb-12 md:pl-8 lg:pl-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(17.5rem,1fr)] lg:gap-14 xl:gap-16 lg:items-start">
              <div className="min-w-0">
                <h2
                  id="contact-heading"
                  className="font-[family-name:var(--font-display)] text-[clamp(3.575rem,2.86vw+2.6rem,4.875rem)] font-light leading-[1.12] tracking-[-0.02em] text-white"
                >
                  Let&apos;s get digging
                </h2>
                <p className="mt-5 max-w-md text-lg font-light leading-[1.45] text-white lg:max-w-none">
                  Contact us today for a free consultation and quote.
                </p>
                <dl className="mt-20 space-y-9 sm:mt-24 sm:space-y-10">
                  <div>
                    <dt className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-stone-400 sm:text-sm">
                      Phone
                    </dt>
                    <dd className="mt-2.5">
                      <a
                        href="tel:+14037100269"
                        className="text-lg text-white transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
                        className="break-all text-lg text-white transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
              <div className="flex min-h-0 min-w-0 w-full flex-col border-r-4 border-black bg-white px-[1.375rem] py-[2.75rem] text-black shadow-sm">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
