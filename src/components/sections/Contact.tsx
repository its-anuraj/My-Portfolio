"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, MapPin, CheckCircle, AlertCircle, FileText, RefreshCw } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo } from "@/lib/data";

const contactLinks = [
  {
    id: "contact-email",
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    description: "Best way to reach me",
    color: "#B49A5A",
    bg: "rgba(180,154,90,0.10)",
  },
  {
    id: "contact-phone",
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    description: "Available on WhatsApp",
    color: "#B49A5A",
    bg: "rgba(180,154,90,0.10)",
  },
  {
    id: "contact-resume",
    icon: FileText,
    label: "Resume / CV",
    value: "Anuraj_Singh_Resume.pdf",
    href: "/resume.pdf",
    description: "View or download official CV",
    color: "#B49A5A",
    bg: "rgba(180,154,90,0.10)",
    download: "Anuraj_Singh_Resume.pdf",
  },
  {
    id: "contact-github",
    icon: GitHubIcon,
    label: "GitHub",
    value: "its-anuraj",
    href: personalInfo.github,
    description: "Check out my code",
    color: "#B49A5A",
    bg: "rgba(180,154,90,0.10)",
  },
  {
    id: "contact-linkedin",
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "anuraj-singh",
    href: personalInfo.linkedin,
    description: "Let's connect professionally",
    color: "#B49A5A",
    bg: "rgba(180,154,90,0.10)",
  },
];

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Keep track of active requests to prevent race conditions and unmount memory leaks
  const abortControllerRef = useRef<AbortController | null>(null);
  const submissionSeqRef = useRef<number>(0);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message when user starts typing again
    if (status === "error") {
      setStatus("idle");
      setFeedbackMsg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submission triggers while active
    if (status === "submitting") return;

    // Client-side Honeypot Trap
    if (honey.trim() !== "") {
      setStatus("success");
      setFeedbackMsg("Message sent successfully. Thank you for reaching out!");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Client-side validation checks
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFeedbackMsg("Please complete all required fields (Name, Email, Message).");
      setStatus("error");
      return;
    }

    if (trimmedName.length > 100) {
      setFeedbackMsg("Name must not exceed 100 characters.");
      setStatus("error");
      return;
    }

    if (trimmedEmail.length > 254) {
      setFeedbackMsg("Email address must not exceed 254 characters.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFeedbackMsg("Please enter a valid email address (e.g., name@domain.com).");
      setStatus("error");
      return;
    }

    if (trimmedMessage.length < 5) {
      setFeedbackMsg("Message must be at least 5 characters long.");
      setStatus("error");
      return;
    }

    if (trimmedMessage.length > 3000) {
      setFeedbackMsg("Message must not exceed 3000 characters.");
      setStatus("error");
      return;
    }

    // Cancel any previous pending submission request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const currentSeq = ++submissionSeqRef.current;

    // Timeout: abort client request if backend takes longer than 15 seconds
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    setStatus("submitting");
    setFeedbackMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _honey_field: honey,
        }),
        signal: controller.signal,
      });

      // Avoid processing if a newer submission was started
      if (currentSeq !== submissionSeqRef.current) return;

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus("success");
        setFeedbackMsg(data.message || "Message sent successfully. Thank you for reaching out!");
        // Clear form only on confirmed successful delivery acceptance
        setFormData({ name: "", email: "", message: "" });

        // Auto-dismiss success notification after 7 seconds, restoring idle state
        if (successTimerRef.current) clearTimeout(successTimerRef.current);
        successTimerRef.current = setTimeout(() => {
          if (submissionSeqRef.current === currentSeq) {
            setStatus("idle");
            setFeedbackMsg("");
          }
        }, 7000);
      } else {
        const errorDetail = data.error || "Unable to send your message. Please try again or reach out via email.";
        setStatus("error");
        setFeedbackMsg(errorDetail);
        // Form data is preserved so user doesn't lose their input
      }
    } catch (err: unknown) {
      // Ignore abort errors from a superseded submission
      if (currentSeq !== submissionSeqRef.current) return;

      const isTimeout = err instanceof Error && err.name === "AbortError";
      setStatus("error");
      setFeedbackMsg(
        isTimeout
          ? "Request timed out. Please check your connection and try again, or email directly."
          : "Unable to connect to the server. Please check your network or email directly."
      );
      // Form data is preserved
    } finally {
      clearTimeout(timeoutId);
      // Guarantee that if this is still the active submission, loading spinner is stopped
      if (submissionSeqRef.current === currentSeq) {
        setStatus((prev) => (prev === "submitting" ? "error" : prev));
      }
    }
  };

  const mailtoFallbackUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name || "Visitor"}`
  )}&body=${encodeURIComponent(formData.message || "")}`;

  return (
    <SectionWrapper id="contact">
      <div 
        className="w-full mx-auto flex flex-col items-center justify-center"
        style={{
          maxWidth: "1200px",
          padding: "80px 32px",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div 
          className="text-center w-full"
          style={{
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
            style={{ marginBottom: "12px" }}
          >
            Get In Touch
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
            style={{ marginBottom: "16px", letterSpacing: "-0.02em" }}
          >
            Let&apos;s <span className="gradient-text">Connect</span>
          </motion.h2>
        </div>

        {/* ── Content ────────────────────────────────────────────────────── */}
        <div className="w-full flex flex-col items-center justify-center">
          {/* CTA Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden w-full mx-auto bg-[var(--bg-tertiary)] border border-[var(--border)] transition-all duration-300"
            style={{ 
              maxWidth: "900px",
              marginTop: "40px", 
              marginBottom: "40px", 
              borderRadius: "20px",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-transparent pointer-events-none" />

            <div 
              className="relative z-10 flex flex-col items-center text-center justify-center h-full"
              style={{ padding: "24px", gap: "12px" }}
            >
              <div 
                className="rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center shadow-[0_0_20px_var(--accent-glow)] flex-shrink-0"
                style={{ width: "56px", height: "56px" }}
              >
                <Send size={20} className="text-white" />
              </div>

              <div className="flex flex-col items-center" style={{ gap: "4px" }}>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Open to Opportunities
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed" style={{ maxWidth: "450px" }}>
                  Currently seeking internships, freelance projects,
                  and exciting collaboration opportunities.
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-[var(--text-muted)] mt-1">
                <MapPin size={13} />
                <span>Greater Noida, Uttar Pradesh, India</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1000px] mx-auto">
            {/* Contact Links Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Connect with me</h3>
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  id={link.id}
                  aria-label={link.label}
                  target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                  download={"download" in link ? link.download : undefined}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -2, boxShadow: "var(--shadow-md)" }}
                  className="flex items-center group transition-all duration-300 w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-2xl"
                  style={{ 
                    padding: "16px 20px", 
                    gap: "16px",
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: link.bg, width: "42px", height: "42px" }}
                  >
                    <link.icon size={18} style={{ color: link.color }} />
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: link.color, marginBottom: "2px" }}>
                      {link.label}
                    </p>
                    <p className="font-semibold text-[14px] text-[var(--text-primary)] truncate">
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-sm)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Send me a message</h3>
                <span className="text-xs text-[var(--text-muted)] font-medium">Direct delivery</span>
              </div>
              
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4" 
                noValidate
                aria-busy={status === "submitting"}
              >
                {/* Anti-spam honeypot (invisible to humans, traps automated spam bots) */}
                <input
                  type="text"
                  name="_honey_field"
                  id="_honey_field"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--text-secondary)]">
                    Name <span className="text-[var(--accent)]" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    maxLength={100}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors disabled:opacity-60"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">
                    Email <span className="text-[var(--accent)]" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    maxLength={254}
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors disabled:opacity-60"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-sm font-medium text-[var(--text-secondary)]">
                      Message <span className="text-[var(--accent)]" aria-hidden="true">*</span>
                    </label>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {formData.message.length}/3000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    disabled={status === "submitting"}
                    maxLength={3000}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can I help you? Project inquiries, collaborations, or questions are welcome."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-y min-h-[110px] disabled:opacity-60"
                  />
                </div>

                <div aria-live="polite" className="w-full">
                  <AnimatePresence mode="wait">
                    {status === "error" && (
                      <motion.div 
                        key="error-box"
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        role="alert"
                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-sm flex flex-col gap-1.5"
                      >
                        <div className="flex items-start gap-2">
                          <AlertCircle size={17} className="flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{feedbackMsg}</span>
                        </div>
                        <div className="text-xs text-[var(--text-muted)] pl-6">
                          Having trouble?{" "}
                          <a 
                            href={mailtoFallbackUrl}
                            className="text-[var(--accent)] font-semibold underline hover:opacity-80"
                          >
                            Click here to email directly via your mail client
                          </a>
                        </div>
                      </motion.div>
                    )}
                    
                    {status === "success" && (
                      <motion.div 
                        key="success-box"
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-2"
                      >
                        <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">{feedbackMsg}</p>
                          <p className="text-xs opacity-90 mt-0.5">
                            A notification has been dispatched to Anuraj&apos;s primary inbox.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  id="contact-submit-button"
                  disabled={status === "submitting"}
                  className="mt-2 w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed hover:opacity-95"
                  style={{
                    background: "linear-gradient(135deg, #B49A5A, #9D8449)",
                    boxShadow: "0 4px 14px rgba(180, 154, 90, 0.25)",
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <span 
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" 
                        aria-hidden="true" 
                      />
                      <span>Sending...</span>
                    </>
                  ) : status === "error" ? (
                    <>
                      <span>Try Again</span>
                      <RefreshCw size={16} aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
