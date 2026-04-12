"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { sendEmail } from "@/lib/emailjs";
import { SERVICE_OPTION_KEYS } from "@/lib/constants";
import TextReveal from "@/components/ui/TextReveal";

const countries = [
  { code: "BR", dial: "+55", flag: "🇧🇷", placeholder: "(00) 00000-0000" },
  { code: "US", dial: "+1", flag: "🇺🇸", placeholder: "(000) 000-0000" },
] as const;

type CountryCode = (typeof countries)[number]["code"];

function formatPhone(raw: string, country: CountryCode) {
  const digits = raw.replace(/\D/g, "");
  if (country === "BR") {
    const d = digits.slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10)
      return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  /* US */
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function Contact() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [country, setCountry] = useState<CountryCode>("BR");
  const [phone, setPhone] = useState("");

  const activeCountry = countries.find((c) => c.code === country)!;

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as CountryCode;
    setCountry(next);
    setPhone((prev) => formatPhone(prev, next));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value, country));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");

    try {
      await sendEmail(formRef.current);
      setStatus("success");
      formRef.current.reset();
      setPhone("");
      setCountry("BR");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full bg-surface border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column */}
          <div>
            <TextReveal>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                {t("eyebrow")}
              </p>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="font-clash font-extrabold text-3xl xs:text-4xl md:text-5xl text-text-primary mb-6">
                {t("title")}
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                {t("paragraph1")}
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                {t("paragraph2")}
              </p>
            </TextReveal>

            <TextReveal delay={0.4}>
              <div className="space-y-4">
                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/5535998996851?text=${encodeURIComponent(t("whatsappMessage"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-base hover:shadow-[0_0_24px_rgba(37,211,102,0.4)] transition-shadow duration-300"
                >
                  <MessageCircle size={22} />
                  {t("whatsapp")}
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@upwardbr.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  <Mail size={18} className="text-primary shrink-0" />
                  hello@upwardbr.com
                </a>
              </div>
            </TextReveal>
          </div>

          {/* Right column — form */}
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="user_name"
                    className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                  >
                    {tForm("name")} <span className="text-primary">*</span>
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    placeholder={tForm("namePlaceholder")}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="user_company"
                    className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                  >
                    {tForm("company")}
                  </label>
                  <input
                    id="user_company"
                    name="user_company"
                    type="text"
                    placeholder={tForm("companyPlaceholder")}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="user_email"
                    className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                  >
                    {tForm("email")} <span className="text-primary">*</span>
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    placeholder={tForm("emailPlaceholder")}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="user_phone"
                    className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                  >
                    {tForm("phone")}
                  </label>
                  <div className="flex gap-2 min-w-0">
                    <select
                      aria-label="Country code"
                      value={country}
                      onChange={handleCountryChange}
                      className="shrink-0 bg-surface border border-border rounded-lg py-3 px-2 sm:px-3 text-text-primary text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors appearance-none cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dial}
                        </option>
                      ))}
                    </select>
                    <input
                      id="user_phone"
                      name="user_phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={activeCountry.placeholder}
                      className={`${inputClasses} flex-1 min-w-0`}
                    />
                    <input
                      type="hidden"
                      name="user_phone_country"
                      value={activeCountry.dial}
                    />
                  </div>
                </div>
              </div>

              {/* Service Interest */}
              <div>
                <label
                  htmlFor="service_interest"
                  className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                >
                  {tForm("serviceInterest")}
                </label>
                <select
                  id="service_interest"
                  name="service_interest"
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {tForm("selectService")}
                  </option>
                  {SERVICE_OPTION_KEYS.map((key) => {
                    const label = tForm(`services.${key}`);
                    return (
                      <option key={key} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                >
                  {tForm("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder={tForm("messagePlaceholder")}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary text-background py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,212,170,0.45)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    {tForm("sending")}
                  </>
                ) : (
                  tForm("send")
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-primary text-sm">
                  <CheckCircle size={16} />
                  {tForm("status.success")}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {tForm("status.error")}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
