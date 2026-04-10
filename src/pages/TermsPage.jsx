import { Link } from "react-router-dom";

const sectionHeadingClass =
  "mt-10 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-[0.12em] text-stone-950 first:mt-8 sm:text-2xl sm:tracking-[0.14em]";

const bodyClass = "mt-4 text-lg leading-relaxed text-stone-700";

export default function TermsPage() {
  return (
    <main className="min-w-0 flex-1 scroll-mt-20 bg-white text-stone-950">
      <div className="mx-auto max-w-3xl px-[var(--page-gutter-mobile)] py-16 sm:px-3 sm:py-20 md:px-5 md:py-24 lg:px-[30px]">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.18em] text-stone-950 sm:text-4xl">
          Terms of use
        </h1>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.14em] text-stone-500">
          Last updated: April 2026
        </p>
        <p className={`${bodyClass} mt-8`}>
          By using our website and requesting a quote, you agree to the following terms:
        </p>

        <section>
          <h2 className={sectionHeadingClass}>1. Services & quotes</h2>
          <p className={bodyClass}>
            All quotes provided through this website are estimates only based on the information provided. A final
            binding price will only be issued after a site inspection and a signed service agreement.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>2. Accuracy of information</h2>
          <p className={bodyClass}>
            By submitting a contact form, you agree that the information provided (site location, project scope, and
            contact details) is accurate to the best of your knowledge.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>3. Site access & safety</h2>
          <p className={bodyClass}>
            For quotes requiring an on-site visit, the client is responsible for ensuring the property is safe and
            accessible for our team.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>4. Intellectual property</h2>
          <p className={bodyClass}>
            All content on this website, including photos of past earthworks projects, logos, and text, is the property
            of Alpine Earthworks and may not be used without permission.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>5. Limitation of liability</h2>
          <p className={bodyClass}>
            Alpine Earthworks is not liable for any damages resulting from the use of this website or the inability to
            access our online forms.
          </p>
        </section>

        <section>
          <h2 className={sectionHeadingClass}>6. Governing law</h2>
          <p className={bodyClass}>These terms are governed by the laws of Alberta, Canada.</p>
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
