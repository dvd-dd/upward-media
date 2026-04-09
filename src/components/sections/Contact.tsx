"use client";

import { useRef, useState, FormEvent } from "react";
import { MessageCircle, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { sendEmail } from "@/lib/emailjs";
import TextReveal from "@/components/ui/TextReveal";

const serviceOptions = [
  "Web Development",
  "Branding & Identity",
  "Digital Marketing",
  "Social Media Management",
  "Full Package",
  "Other",
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");

    try {
      await sendEmail(formRef.current);
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses =
    "w-full bg-surface border border-border rounded-lg py-3 px-4 text-white placeholder:text-text-muted text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";

  return (
    <section id="contact" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left column */}
          <div>
            <TextReveal>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                Contact
              </p>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="font-clash font-extrabold text-3xl md:text-5xl text-white mb-6">
                Let&apos;s build something great
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                Every business is unique. We take the time to understand your
                goals before recommending a solution. No templates. No
                guesswork. Just strategy.
              </p>
            </TextReveal>
            <TextReveal delay={0.3}>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                Reach out and let&apos;s start a conversation about your growth.
              </p>
            </TextReveal>

            <TextReveal delay={0.4}>
              <div className="space-y-4">
                {/* WhatsApp button */}
                <a
                  href="https://wa.me/5535989896851?text=Hello!%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold text-base hover:shadow-[0_0_24px_rgba(37,211,102,0.4)] transition-shadow duration-300"
                >
                  <MessageCircle size={22} />
                  Chat on WhatsApp
                </a>

                {/* Email */}
                <a
                  href="mailto:azevedoesilva_luiz@outlook.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors text-sm"
                >
                  <Mail size={18} className="text-primary shrink-0" />
                  azevedoesilva_luiz@outlook.com
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
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="user_company"
                    className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="user_company"
                    name="user_company"
                    type="text"
                    placeholder="Your company"
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
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="user_phone"
                    className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                  >
                    Phone
                  </label>
                  <input
                    id="user_phone"
                    name="user_phone"
                    type="tel"
                    placeholder="+55 (00) 00000-0000"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Service Interest */}
              <div>
                <label
                  htmlFor="service_interest"
                  className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                >
                  Service Interest
                </label>
                <select
                  id="service_interest"
                  name="service_interest"
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-text-secondary text-xs uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-primary text-sm">
                  <CheckCircle size={16} />
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or contact us via
                  WhatsApp.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
