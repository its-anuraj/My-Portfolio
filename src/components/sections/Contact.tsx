"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, MapPin, CheckCircle, AlertCircle, FileText } from "lucide-react";
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

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }
    
    // Simple email regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      // Send data to Formsubmit.co API
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Contact Form Submission from Portfolio",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact">
      {/* Container max-width 1200px, padding 80px top/bottom */}
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
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-transparent pointer-events-none" />

            <div 
              className="relative z-10 flex flex-col items-center text-center justify-center h-full"
              style={{ padding: "24px", gap: "12px" }}
            >
              {/* Icon */}
              <div 
                className="rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center shadow-[0_0_20px_var(--accent-glow)] flex-shrink-0"
                style={{ width: "56px", height: "56px" }}
              >
                <Send size={20} className="text-white" />
              </div>

              {/* Text */}
              <div className="flex flex-col items-center" style={{ gap: "4px" }}>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Open to Opportunities
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed" style={{ maxWidth: "450px" }}>
                  Currently seeking internships, freelance projects,
                  and exciting collaboration opportunities.
                </p>
              </div>

              {/* Location */}
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
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--text-secondary)]">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--text-secondary)]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can I help you?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-y min-h-[100px]"
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm mt-1"
                    >
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                  
                  {status === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-2 text-emerald-500 text-sm mt-1"
                    >
                      <CheckCircle size={16} />
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-95"
                  style={{
                    background: "linear-gradient(135deg, #B49A5A, #9D8449)",
                    boxShadow: "0 4px 14px rgba(180, 154, 90, 0.25)",
                  }}
                >
                  {status === "submitting" ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
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
