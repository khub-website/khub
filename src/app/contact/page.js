"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INQUIRY_TYPES = [
  { value: "internship", label: "Internship" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiry: "internship",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      setStatus({
        type: "success",
        msg: data?.message || "Message sent. We'll be in touch.",
      });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiry: "internship",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        msg: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-[0.9rem] text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:border-primary focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.18)] transition-all duration-200";

  return (
    <>
      <Navbar />
      <main className="relative min-h-[100dvh] bg-surface flex items-center pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-14 md:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(var(--color-primary-rgb),0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--color-primary-rgb),0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 90%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(var(--color-primary-rgb),0.25)_0%,rgba(var(--color-primary-rgb),0.08)_40%,transparent_70%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-14%] right-[-8%] h-[520px] w-[520px] rounded-full bg-[conic-gradient(from_120deg,rgba(var(--color-primary-container-rgb),0.25),transparent_45%,rgba(var(--color-primary-rgb),0.18))] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-24 w-[70%] -translate-x-1/2 rounded-[999px] bg-[linear-gradient(90deg,transparent,rgba(var(--color-primary-rgb),0.2),transparent)]"
        />
        <div className="relative w-full page-container">
          <header className="mb-8 sm:mb-10 md:mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface-container-lowest px-4 py-2 text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-primary">
              Studio Line
              <span className="text-on-surface-variant">Open for ideas</span>
            </div>
            <h1 className="font-display mt-5 text-[clamp(2.1rem,5.6vw,4rem)] font-medium tracking-tight text-on-surface leading-[0.98]">
              Let&apos;s sketch the next
              <span className="block italic text-on-surface-variant">deep-tech story</span>
            </h1>
            <p className="mt-4 text-[0.95rem] sm:text-[1rem] leading-relaxed text-on-surface-variant max-w-xl">
              Drop a note, request a visit, or share a bold idea. We&apos;ll reply with the
              right mentor, team, or pathway.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
            <form
              onSubmit={handleSubmit}
              className="bg-surface-container-lowest/90 border border-outline-variant rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_24px_60px_rgba(15,22,20,0.08)] backdrop-blur"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.78rem] font-semibold text-on-surface mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className={inputClass}
                    placeholder="Jane"
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label className="block text-[0.78rem] font-semibold text-on-surface mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className={inputClass}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[0.78rem] font-semibold text-on-surface mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div className="mt-4">
                <label className="block text-[0.78rem] font-semibold text-on-surface mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="inquiry"
                  className="block text-[0.78rem] font-semibold text-on-surface mb-2"
                >
                  I&apos;m interested in
                </label>
                <div className="relative">
                  <select
                    id="inquiry"
                    value={form.inquiry}
                    onChange={(e) => update("inquiry", e.target.value)}
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                  >
                    {INQUIRY_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 8l4 4 4-4"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[0.78rem] font-semibold text-on-surface mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-surface-container-lowest text-[0.9rem] font-semibold rounded-xl hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-surface-container-lowest/40 border-t-surface-container-lowest rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {status && (
                <p
                  className={`mt-4 text-[0.82rem] ${
                    status.type === "success" ? "text-primary" : "text-red-500"
                  }`}
                  role="status"
                >
                  {status.msg}
                </p>
              )}
            </form>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Teleparadigm+Towers&query_place_id=&ll=17.3941203,78.6214986"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Teleparadigm Towers in Google Maps"
              className="group relative block rounded-2xl overflow-hidden border border-outline-variant bg-surface-container-lowest shadow-[0_18px_48px_rgba(15,22,20,0.08)]"
            >
              <iframe
                title="Office location — Teleparadigm Towers"
                src="https://www.google.com/maps?q=Teleparadigm+Towers&ll=17.3941203,78.6214986&z=17&output=embed"
                className="w-full h-[280px] sm:h-[380px] md:h-[600px] pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <span className="absolute inset-0" aria-hidden="true" />
              <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                Map print
              </span>
              <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur text-[0.72rem] font-semibold text-primary border border-primary/20 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Open in Google Maps ↗
              </span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
