"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import HeroOrbit from "@/components/ui/HeroOrbit";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden grid-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div
        className="container-custom relative z-10"
        style={{ paddingTop: "100px", paddingBottom: "72px" }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 xl:gap-10"
        >

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            {/* Available badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: "28px" }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              <span style={{ color: "var(--text-primary)" }}>Hi, I&apos;m </span>
              <span className="gradient-text animate-gradient">Anuraj</span>
              <br />
              <span style={{ color: "var(--text-primary)" }}>Singh</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
                fontWeight: 700,
                color: "var(--text-secondary)",
                marginBottom: "14px",
              }}
            >
              Mobile App Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                marginBottom: "18px",
              }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "0.93rem",
                lineHeight: 1.72,
                color: "var(--text-secondary)",
                maxWidth: "480px",
                margin: "0 auto",
                marginBottom: "32px",
              }}
              className="lg:!mx-0"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              {/* View My Work */}
              <motion.a
                href="#projects"
                id="hero-view-work"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.45), 0 4px 14px rgba(99,102,241,0.3)",
                }}
              >
                View My Work
                <ArrowRight size={16} />
              </motion.a>

              {/* Download Resume */}
              <motion.a
                href="/resume.pdf"
                id="hero-download-resume"
                download
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200"
                style={{
                  color: "var(--text-primary)",
                  borderColor: "rgba(139,92,246,0.45)",
                  background: "rgba(99,102,241,0.06)",
                  boxShadow: "0 0 16px rgba(99,102,241,0.12)",
                }}
              >
                Download Resume
                <Download size={15} />
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Orbital ─────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 w-full lg:w-auto flex justify-center"
          >
            <HeroOrbit />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="flex flex-col items-center gap-1 text-[var(--text-muted)]"
          style={{ marginTop: "48px" }}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
