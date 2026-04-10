import { useState } from "react";
import { ArrowRight } from "lucide-react";

const empty = {
  name: "",
  email: "",
  phone: "",
  details: "",
  botField: "",
};

const inputClass =
  "w-full border border-black bg-white px-3 py-2.5 text-sm text-black placeholder:text-stone-400 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-black";

const labelClass =
  "block text-xs font-bold uppercase tracking-[0.12em] text-black";

export function QuoteForm() {
  const [values, setValues] = useState(empty);
  const [status, setStatus] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = "Required";
    if (!values.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      e.email = "Enter a valid email";
    }
    if (!values.details.trim()) e.details = "Required";
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setFieldErrors({});
    const params = new URLSearchParams({
      "form-name": "quote",
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      details: values.details.trim(),
      "bot-field": values.botField,
    });
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="text-lg font-medium text-black">Thanks — we&apos;ll be in touch shortly.</p>
        <button
          type="button"
          className="mt-6 text-sm font-bold uppercase tracking-wide text-black underline decoration-black underline-offset-4 transition-colors duration-150 hover:text-stone-600 hover:decoration-stone-600 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      name="quote"
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
      noValidate
    >
      <p className="sr-only">
        <label>
          Do not fill this in:{" "}
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={values.botField}
            onChange={(e) => setValues((v) => ({ ...v, botField: e.target.value }))}
          />
        </label>
      </p>

      <div>
        <label htmlFor="quote-name" className={labelClass}>
          Your name<span aria-hidden="true">*</span>
        </label>
        <input
          id="quote-name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          placeholder="your full name"
          className={`mt-2 ${inputClass}`}
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? "quote-name-error" : undefined}
        />
        {fieldErrors.name ? (
          <p id="quote-name-error" className="mt-1 text-xs text-red-700" role="alert">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="quote-email" className={labelClass}>
          Email<span aria-hidden="true">*</span>
        </label>
        <input
          id="quote-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="your@email.com"
          className={`mt-2 ${inputClass}`}
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "quote-email-error" : undefined}
        />
        {fieldErrors.email ? (
          <p id="quote-email-error" className="mt-1 text-xs text-red-700" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="max-w-full md:max-w-[50%]">
        <label htmlFor="quote-phone" className={labelClass}>
          Phone number
        </label>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          maxLength={40}
          autoComplete="tel"
          placeholder="403 000 0000"
          className={`mt-2 ${inputClass}`}
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="quote-details" className={labelClass}>
          Project details<span aria-hidden="true">*</span>
        </label>
        <textarea
          id="quote-details"
          name="details"
          required
          rows={5}
          maxLength={4000}
          placeholder="Tell us about your project..."
          className={`mt-2 resize-y ${inputClass}`}
          value={values.details}
          onChange={(e) => setValues((v) => ({ ...v, details: e.target.value }))}
          aria-invalid={fieldErrors.details ? true : undefined}
          aria-describedby={fieldErrors.details ? "quote-details-error" : undefined}
        />
        {fieldErrors.details ? (
          <p id="quote-details-error" className="mt-1 text-xs text-red-700" role="alert">
            {fieldErrors.details}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong. Please try again or call us directly.
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 border-[2pt] border-transparent border-solid bg-stone-950 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:border-black hover:bg-transparent hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-transparent disabled:hover:bg-stone-950 disabled:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </form>
  );
}
