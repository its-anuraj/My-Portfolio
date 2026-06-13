"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

/* Simulated certificates data for a modern card layout */
const certs = [
  {
    title: "HackIndia Hackathon",
    issuer: "HackIndia",
    date: "2026",
    status: "Participant",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.25)",
    image: "/certifications/hackindia.png",
  },
  {
    title: "Google Ambassador Program",
    issuer: "Google",
    date: "2025",
    status: "Completed",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    glow: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.25)",
    image: "/certifications/google-ambassador.png",
  },
  {
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte",
    date: "June 2026",
    status: "Completed",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    glow: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.25)",
    image: "/certifications/data-analytics.png",
  },
  {
    title: "JPMorgan Chase & Co. Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co.",
    date: "June 2026",
    status: "Completed",
    color: "#005eb8",
    bg: "rgba(0,94,184,0.08)",
    glow: "rgba(0,94,184,0.15)",
    border: "rgba(0,94,184,0.25)",
    image: "/certifications/jpmorgan.png",
  },
  {
    title: "Tata GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata",
    date: "June 2026",
    status: "Completed",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    glow: "rgba(37,99,235,0.15)",
    border: "rgba(37,99,235,0.25)",
    image: "/certifications/tata.png",
  },
  {
    title: "Mastercard Cybersecurity Job Simulation",
    issuer: "Mastercard",
    date: "June 2026",
    status: "Completed",
    color: "#eb001b",
    bg: "rgba(235,0,27,0.08)",
    glow: "rgba(235,0,27,0.15)",
    border: "rgba(235,0,27,0.25)",
    image: "/certifications/mastercard.png",
  },
];

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <div className="container-custom" style={{ maxWidth: "1200px" }}>
        
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="section-label"
            style={{ marginBottom: "12px" }}
          >
            Credentials
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Certificates & <span className="gradient-text">Credentials</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "600px",
            }}
          >
            A showcase of professional certifications highlighting validated expertise
            in modern software engineering, cloud architecture, and mobile development.
          </motion.p>
        </div>

        {/* ── Modern Card Layout ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: `0 0 30px ${cert.glow}, var(--shadow-lg)` }}
              className="relative flex flex-col overflow-hidden rounded-[20px] border transition-all duration-300 group"
              style={{
                background: "var(--bg-tertiary)",
                borderColor: "var(--border)",
                minHeight: "260px",
                backdropFilter: "blur(12px)",
                padding: "24px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* Corner radial glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-bl-full opacity-60 z-0"
                style={{
                  background: `radial-gradient(circle at top right, ${cert.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Card Header (Icon & Status) */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{ background: cert.bg, borderColor: cert.border, boxShadow: `0 0 20px ${cert.glow}` }}
                >
                  <Award size={22} style={{ color: cert.color }} />
                </div>
                <div
                  className="px-3 py-1 text-[11px] font-bold tracking-wide uppercase rounded-full"
                  style={{ background: cert.color, color: "#fff" }}
                >
                  {cert.status}
                </div>
              </div>

              {/* Certificate Image Preview */}
              {cert.image && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden border border-[var(--border)] z-10 bg-[var(--bg-secondary)]">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    quality={100}
                    unoptimized
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex-1 flex flex-col justify-end">
                <h3
                  className="font-bold text-[var(--text-primary)] mb-2"
                  style={{ fontSize: "1.1rem", lineHeight: 1.3 }}
                >
                  {cert.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
                  <ShieldCheck size={15} style={{ color: cert.color }} />
                  {cert.issuer}
                </div>
                
                <div className="text-xs text-[var(--text-muted)] font-medium pl-6">
                  {cert.date}
                </div>
              </div>

              {/* View Credentials Button Overlay */}
              {cert.image && (
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 rounded-2xl"
                >
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                    <ExternalLink size={16} />
                    <span>Preview Certificate</span>
                  </div>
                </a>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
