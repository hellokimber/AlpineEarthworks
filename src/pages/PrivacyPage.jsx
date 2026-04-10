import { Link, useLocation } from "react-router-dom";

const inlineLinkClass =
  "font-semibold text-stone-950 underline decoration-stone-950 underline-offset-2 transition-colors duration-150 hover:text-stone-600 hover:decoration-stone-600 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950";

const sectionHeadingClass =
  "mt-10 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-[0.12em] text-stone-950 first:mt-8 sm:text-2xl sm:tracking-[0.14em]";

const bodyClass = "mt-4 text-lg leading-relaxed text-stone-700";

export default function PrivacyPage() {
  const { pathname } = useLocation();

  return (
    <main className="min-w-0 flex-1 scroll-mt-20 bg-white text-stone-950">
      <div className="mx-auto max-w-3xl px-[var(--page-gutter-mobile)] py-16 sm:px-3 sm:py-20 md:px-5 md:py-24 lg:px-[30px]">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.18em] text-stone-950 sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-stone-500">
          Last updated: April 2026
        </p>
        <p className={`${bodyClass} mt-8`}>
          At Alpine Earthworks, we value your privacy. This policy explains how we handle the information you
          provide through our website.
        </p>

        <section>
          <h2 className={sectionHeadingClass}>1. Information we collect</h2>
          <p className={bodyClass}>
            When you request a quote using our contact form, we collect the following personal information:
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-relaxed text-stone-700">
            <li>
              <span className="font-semibold text-stone-950">Name:</span> To know who we are speaking with.
            </li>
            <li>
              <span className="font-semibold text-stone-950">Email address:</span> To send you the written quote
              and project updates.
            </li>
            <li>
              <span className="font-semibold text-stone-950">Phone number:</span> To discuss project details or
              schedule a site visit.
            </li>
            <li>
              <span className="font-semibold text-stone-950">Project details:</span> Any info you provide regarding
              the earthworks services needed.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>2. How we use your information</h2>
          <p className={bodyClass}>We use the information you provide solely for:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-stone-700">
            <li>Providing accurate service quotes.</li>
            <li>Scheduling and performing earthworks services.</li>
            <li>Internal record-keeping and billing.</li>
          </ul>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>3. Data protection & sharing</h2>
          <p className={bodyClass}>
            We do not sell, rent, or lease your personal information to third parties. Your data is only shared
            with employees or subcontractors as necessary to complete your specific project.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>4. Cookies</h2>
          <p className={bodyClass}>
            Our website may use basic cookies to enhance your browsing experience. You can choose to disable
            cookies through your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>5. Contact us</h2>
          <p className={bodyClass}>
            If you have questions regarding this policy, please{" "}
            <Link to={`${pathname}#footer`} className={inlineLinkClass}>
              contact us
            </Link>
            .
          </p>
        </section>

        <p className="mt-10">
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-wide text-stone-950 underline decoration-stone-950 decoration-1 underline-offset-[0.2em] transition-colors duration-150 hover:text-stone-600 hover:decoration-stone-600 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-950 sm:text-base"
          >
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
