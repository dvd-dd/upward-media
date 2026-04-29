"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle, AlertCircle } from "lucide-react";

const inputClass =
  "w-full bg-surface border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted text-base sm:text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";

const labelClass =
  "block text-text-primary text-sm font-medium mb-3 leading-snug";

const helperClass = "text-text-muted text-xs mb-3 -mt-1";

export default function BriefingForm() {
  const t = useTranslations("briefing");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<
    "error" | "errorInvalidEmail" | "errorMissingFields"
  >("error");

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  const sectionsT = (key: string) => t(`sections.${key}`);
  const labelsT = (key: string) => t(`labels.${key}`);
  const optionsT = (key: string) =>
    t.raw(`options.${key}`) as readonly string[];
  const submitT = (key: string) => t(`submit.${key}`);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");

    const form = formRef.current;
    const data = new FormData(form);

    const features: string[] = [];
    data.getAll("features").forEach((v) => features.push(String(v)));

    const languages: string[] = [];
    data.getAll("languages").forEach((v) => languages.push(String(v)));

    const payload = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      business_summary: String(data.get("business_summary") ?? ""),
      site_type: String(data.get("site_type") ?? ""),
      site_goal: String(data.get("site_goal") ?? ""),
      has_current_site: String(data.get("has_current_site") ?? ""),
      current_site_url: String(data.get("current_site_url") ?? ""),
      visual_style: String(data.get("visual_style") ?? ""),
      color_palette: String(data.get("color_palette") ?? ""),
      theme: String(data.get("theme") ?? ""),
      inspiration: String(data.get("inspiration") ?? ""),
      brand_identity: String(data.get("brand_identity") ?? ""),
      features,
      languages,
      content_ready: String(data.get("content_ready") ?? ""),
      photos_ready: String(data.get("photos_ready") ?? ""),
      extra_notes: String(data.get("extra_notes") ?? ""),
    };

    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (data.error === "invalid_email") {
          setErrorKey("errorInvalidEmail");
        } else if (data.error === "missing_fields") {
          setErrorKey("errorMissingFields");
        } else {
          setErrorKey("error");
        }
        setStatus("error");
        setTimeout(() => setStatus("idle"), 8000);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorKey("error");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    } finally {
      setLoading(false);
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-center text-center bg-primary/10 border border-primary/30 rounded-2xl px-6 py-12 sm:px-10 sm:py-14"
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <CheckCircle size={36} className="text-primary" />
        </div>
        <h2 className="font-clash font-extrabold text-2xl sm:text-3xl text-text-primary mb-3">
          {submitT("successTitle")}
        </h2>
        <p className="text-text-secondary text-base leading-relaxed max-w-md">
          {submitT("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
      {/* Section 1 — About you */}
      <SectionHeader number="1" title={sectionsT("about")} />
      <Field label={labelsT("name")} required>
        <input
          type="text"
          name="name"
          required
          placeholder={labelsT("namePlaceholder")}
          className={inputClass}
        />
      </Field>
      <Field label={labelsT("company")} required>
        <input
          type="text"
          name="company"
          required
          placeholder={labelsT("companyPlaceholder")}
          className={inputClass}
        />
      </Field>
      <Field label={labelsT("email")} required>
        <input
          type="email"
          name="email"
          required
          placeholder={labelsT("emailPlaceholder")}
          className={inputClass}
        />
      </Field>
      <Field
        label={labelsT("businessSummary")}
        helper={labelsT("businessSummaryHelper")}
        required
      >
        <input
          type="text"
          name="business_summary"
          required
          placeholder={labelsT("businessSummaryPlaceholder")}
          className={inputClass}
        />
      </Field>

      {/* Section 2 — The project */}
      <SectionHeader number="2" title={sectionsT("project")} />
      <RadioField
        label={labelsT("siteType")}
        name="site_type"
        options={optionsT("siteTypes")}
        required
      />
      <RadioField
        label={labelsT("siteGoal")}
        name="site_goal"
        options={optionsT("siteGoals")}
        required
      />
      <RadioField
        label={labelsT("hasCurrentSite")}
        name="has_current_site"
        options={optionsT("yesNo")}
      />
      <Field label={labelsT("currentSiteUrl")}>
        <input
          type="url"
          name="current_site_url"
          placeholder="https://"
          className={inputClass}
        />
      </Field>

      {/* Section 3 — Visual style */}
      <SectionHeader number="3" title={sectionsT("visual")} />
      <RadioField
        label={labelsT("visualStyle")}
        name="visual_style"
        options={optionsT("visualStyles")}
        required
      />
      <RadioField
        label={labelsT("colorPalette")}
        name="color_palette"
        options={optionsT("colorPalettes")}
      />
      <RadioField
        label={labelsT("theme")}
        name="theme"
        options={optionsT("themes")}
      />
      <Field
        label={labelsT("inspiration")}
        helper={labelsT("inspirationHelper")}
      >
        <textarea
          name="inspiration"
          rows={3}
          placeholder={labelsT("inspirationPlaceholder")}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Section 4 — Brand identity */}
      <SectionHeader number="4" title={sectionsT("identity")} />
      <RadioField
        label={labelsT("brandIdentity")}
        name="brand_identity"
        options={optionsT("brandIdentities")}
        required
      />

      {/* Section 5 — Features */}
      <SectionHeader number="5" title={sectionsT("features")} />
      <CheckboxField
        label={labelsT("features")}
        name="features"
        options={optionsT("features")}
      />
      <CheckboxField
        label={labelsT("languages")}
        name="languages"
        options={optionsT("languages")}
      />

      {/* Section 6 — Content */}
      <SectionHeader number="6" title={sectionsT("content")} />
      <RadioField
        label={labelsT("contentReady")}
        name="content_ready"
        options={optionsT("contentOptions")}
      />
      <RadioField
        label={labelsT("photosReady")}
        name="photos_ready"
        options={optionsT("photosOptions")}
      />

      {/* Section 7 — Final */}
      <SectionHeader number="7" title={sectionsT("final")} />
      <Field label={labelsT("extraNotes")}>
        <textarea
          name="extra_notes"
          rows={4}
          placeholder={labelsT("extraNotesPlaceholder")}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto gradient-primary text-background px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
              {submitT("sending")}
            </>
          ) : (
            submitT("button")
          )}
        </button>

        {status === "error" && (
          <div className="flex items-start gap-2 text-red-400 text-sm mt-4">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{submitT(errorKey)}</span>
          </div>
        )}
      </div>
    </form>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 pt-4">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full gradient-primary text-background text-xs font-bold font-clash">
        {number}
      </span>
      <h2 className="font-clash font-bold text-xl sm:text-2xl text-text-primary">
        {title}
      </h2>
    </div>
  );
}

function RequiredBadge() {
  const t = useTranslations("briefing");
  return (
    <span className="inline-flex items-center align-middle ml-2 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
      {t("required")}
    </span>
  );
}

function Field({
  label,
  helper,
  required,
  children,
}: {
  label: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <RequiredBadge />}
      </label>
      {helper && <p className={helperClass}>{helper}</p>}
      {children}
    </div>
  );
}

function RadioField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <RequiredBadge />}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-3 bg-surface border border-border rounded-lg py-3 px-4 cursor-pointer hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
          >
            <input
              type="radio"
              name={name}
              value={option}
              required={required}
              className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-text-primary text-sm leading-snug">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CheckboxField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-3 bg-surface border border-border rounded-lg py-3 px-4 cursor-pointer hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="mt-0.5 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-text-primary text-sm leading-snug">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
