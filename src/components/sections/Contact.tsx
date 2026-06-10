"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, MapPin } from "lucide-react";
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
    color: "#818cf8",
    bg: "rgba(129,140,248,0.1)",
  },
  {
    id: "contact-phone",
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    description: "Available on WhatsApp",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
  },
  {
    id: "contact-github",
    icon: GitHubIcon,
    label: "GitHub",
    value: "its-anuraj",
    href: personalInfo.github,
    description: "Check out my code",
    color: "#a0a0b8",
    bg: "rgba(160,160,184,0.08)",
  },
  {
    id: "contact-linkedin",
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "anuraj-singh",
    href: personalInfo.linkedin,
    description: "Let's connect professionally",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.1)",
  },
];

export default function Contact() {
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
              marginBottom: "32px", 
              borderRadius: "20px",
              boxShadow: "var(--shadow-md)"
            }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-purple-500/5 pointer-events-none" />

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

          {/* Contact Links Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto"
            style={{ 
              maxWidth: "1200px",
              gap: "24px" 
            }}
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.href}
                id={link.id}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
                className="flex items-center group transition-all duration-300 w-full bg-[var(--bg-tertiary)] border border-[var(--border)]"
                style={{ 
                  padding: "24px", 
                  gap: "16px", 
                  minHeight: "120px", 
                  maxHeight: "140px", 
                  borderRadius: "20px",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                {/* Icon box */}
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: link.bg, width: "48px", height: "48px" }}
                >
                  <link.icon size={20} style={{ color: link.color }} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  <p 
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: link.color, marginBottom: "4px" }}
                  >
                    {link.label}
                  </p>
                  <p className="font-semibold text-[15px] text-[var(--text-primary)] truncate" style={{ marginBottom: "2px" }}>
                    {link.value}
                  </p>
                  <p className="text-[13px] text-[var(--text-muted)] leading-tight">
                    {link.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: link.bg }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: link.color }}>
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
