import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <main className="flex-1 scroll-mt-20 bg-white text-stone-950">
      <div className="mx-auto max-w-3xl px-2 py-16 sm:px-3 sm:py-20 md:px-5 md:py-24 lg:px-[30px]">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.18em] text-stone-950 sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-stone-700">
          This page is a placeholder. A full privacy policy will be published here before we collect or process
          personal information beyond what is needed to respond to your inquiries.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          If you have questions in the meantime, please contact us at{" "}
          <a
            href="mailto:jordan@alpineearthworks.ca"
            className="font-semibold text-stone-950 underline decoration-stone-950 underline-offset-2 transition-colors duration-150 hover:text-stone-600 hover:decoration-stone-600 hover:decoration-2"
          >
            jordan@alpineearthworks.ca
          </a>
          .
        </p>
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
