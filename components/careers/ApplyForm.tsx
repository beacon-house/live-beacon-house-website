"use client";

import { useState } from "react";
import type { CareerRole } from "@/lib/careers-data";
import { applyCopy } from "@/lib/careers-data";

const MAX_CV_BYTES = 3 * 1024 * 1024;

type Status = "idle" | "submitting" | "done" | "error";

const fieldClass =
  "w-full rounded-lg border border-blue-gray bg-white px-4 py-3 font-body text-deep-ink placeholder:text-slate/50 focus:border-[var(--bh-warm-amber)] focus:outline-none focus:ring-2 focus:ring-[var(--bh-warm-amber)]/30";

const labelClass = "block font-sans text-sm font-semibold text-deep-ink mb-1.5";

export default function ApplyForm({ role }: { role: CareerRole }) {
  const [answer, setAnswer] = useState("");
  const [pasteNotice, setPasteNotice] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.length < role.screen.minChars) {
      setError(
        `Please write a fuller answer (at least ${role.screen.minChars} characters).`,
      );
      setStatus("error");
      return;
    }

    const cv = data.get("cv");
    if (!(cv instanceof File) || cv.size === 0) {
      setError("Please attach your CV as a PDF.");
      setStatus("error");
      return;
    }
    if (cv.size > MAX_CV_BYTES) {
      setError("That CV is over 3MB. Please attach a smaller PDF.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);

    data.set("role", role.title);
    data.set("roleSlug", role.slug);
    data.set("answer", trimmedAnswer);
    if (!data.get("videoUrl")) {
      data.set("videoUrl", "");
    }

    let saved = false;
    try {
      const response = await fetch("/api/careers-apply", {
        method: "POST",
        body: data,
      });
      saved = response.ok;
    } catch {
      saved = false;
    }

    if (!saved) {
      setError("Something went wrong at our end. Please try again in a moment.");
      setStatus("error");
      return;
    }

    setStatus("done");
    setAnswer("");
    setPasteNotice(false);
    form.reset();
  }

  return (
    <section id="apply" className="scroll-mt-28">
      <div className="mb-6">
        <span className="block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--bh-warm-amber)] mb-2">
          Last step
        </span>
        <h2 className="font-serif text-2xl md:text-[1.75rem] leading-tight text-deep-ink">
          {applyCopy.heading}
        </h2>
        <div className="mt-3 h-0.5 w-8 bg-[var(--bh-warm-amber)]" />
      </div>

      <p className="mb-8 max-w-text text-slate leading-[1.8]">
        {applyCopy.contactNote}
      </p>

      {status === "done" ? (
        <div className="rounded-xl border border-blue-gray bg-white p-8 md:p-10">
          <h3 className="font-serif text-2xl text-deep-ink">
            Thanks, that is in.
          </h3>
          <p className="mt-3 text-slate leading-[1.8]">
            {applyCopy.closingLine}
          </p>
        </div>
      ) : (
        <div className="max-w-2xl rounded-xl border border-blue-gray bg-white p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Spam trap. Left empty by humans, filled by bots. */}
            <div aria-hidden className="hidden">
              <label htmlFor={`company-${role.slug}`}>Company</label>
              <input
                id={`company-${role.slug}`}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className={labelClass} htmlFor={`name-${role.slug}`}>
                Name
              </label>
              <input
                id={`name-${role.slug}`}
                className={fieldClass}
                type="text"
                name="name"
                required
                autoComplete="name"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor={`email-${role.slug}`}>
                  Email
                </label>
                <input
                  id={`email-${role.slug}`}
                  className={fieldClass}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className={labelClass} htmlFor={`phone-${role.slug}`}>
                  Phone
                </label>
                <input
                  id={`phone-${role.slug}`}
                  className={fieldClass}
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor={`linkedin-${role.slug}`}>
                LinkedIn profile
              </label>
              <input
                id={`linkedin-${role.slug}`}
                className={fieldClass}
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor={`cv-${role.slug}`}>
                CV
              </label>
              <input
                id={`cv-${role.slug}`}
                className={`${fieldClass} file:mr-3 file:rounded file:border-0 file:bg-blue-mist file:px-3 file:py-1.5 file:font-sans file:text-sm file:font-semibold file:text-navy`}
                type="file"
                name="cv"
                accept="application/pdf"
                required
              />
              <p className="mt-1.5 text-xs text-slate/80">{applyCopy.cvHelp}</p>
            </div>

            {/* The question, restated at point of action. */}
            <div className="rounded-lg border border-blue-gray/70 bg-blue-mist/40 p-4">
              <p className="text-sm leading-[1.7] text-deep-ink">
                {role.screen.question}
              </p>
              <p className="mt-2 text-xs leading-[1.6] text-slate/80">
                {role.screen.helper}
              </p>
            </div>

            <div>
              <label className={labelClass} htmlFor={`answer-${role.slug}`}>
                {applyCopy.screenLabel}
              </label>
              <textarea
                id={`answer-${role.slug}`}
                name="answer"
                value={answer}
                onChange={(event) => {
                  const next = event.target.value.slice(
                    0,
                    role.screen.maxChars,
                  );
                  setAnswer(next);
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  setPasteNotice(true);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  setPasteNotice(true);
                }}
                required
                rows={8}
                className={`${fieldClass} min-h-[9rem] resize-y`}
                placeholder="Type your answer here…"
                autoComplete="off"
                spellCheck
              />
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate/80">
                  {pasteNotice ? applyCopy.screenPasteBlocked : null}
                </p>
                <p className="text-xs text-slate/70 tabular-nums">
                  {answer.trim().length} / {role.screen.maxChars}
                </p>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor={`video-${role.slug}`}>
                {applyCopy.videoLabel}
              </label>
              <input
                id={`video-${role.slug}`}
                className={fieldClass}
                type="url"
                name="videoUrl"
                placeholder="https://drive.google.com/… or YouTube"
              />
              <p className="mt-1.5 text-xs text-slate/80">
                {applyCopy.videoHelp}
              </p>
            </div>

            {error ? (
              <p role="alert" className="text-sm text-[#B3261E]">
                {error}
              </p>
            ) : null}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--bh-warm-amber)] px-6 py-3.5 font-sans font-semibold text-deep-ink shadow-[0_10px_22px_rgba(20,33,61,0.2),0_3px_0_rgba(20,33,61,0.22)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-[2px] disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send application"}
              </button>
              <p className="mt-3 text-center font-sans text-xs text-slate">
                {applyCopy.closingLine}
              </p>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
