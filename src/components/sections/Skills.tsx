"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { skills } from "@/lib/data";

/* ─── Color palette per category ─────────────────────────────────────────── */
const colorMap: Record<string, { accent: string; bg: string; border: string; glow: string }> = {
  violet: {
    accent: "#818cf8",
    bg:     "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.22)",
    glow:   "rgba(99,102,241,0.18)",
  },
  blue: {
    accent: "#60a5fa",
    bg:     "rgba(59,130,246,0.07)",
    border: "rgba(59,130,246,0.22)",
    glow:   "rgba(59,130,246,0.18)",
  },
  emerald: {
    accent: "#34d399",
    bg:     "rgba(16,185,129,0.07)",
    border: "rgba(16,185,129,0.22)",
    glow:   "rgba(16,185,129,0.18)",
  },
  orange: {
    accent: "#fb923c",
    bg:     "rgba(249,115,22,0.07)",
    border: "rgba(249,115,22,0.22)",
    glow:   "rgba(249,115,22,0.18)",
  },
};

/* ─── Animation variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const badgeVariants = (delay: number) => ({
  hidden:  { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: { delay, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
});

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-[var(--bg-secondary)]">
      <div
        className="mx-auto w-full"
        style={{ maxWidth: "1400px", padding: "0 clamp(20px, 5vw, 80px)" }}
      >

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div
          className="w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-label"
            style={{ marginBottom: "20px" }}
          >
            My Expertise
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              maxWidth: "800px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Tech <span className="gradient-text">Stack</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "var(--text-secondary)",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.8,
              textAlign: "center",
            }}
          >
            A versatile technology stack focused on creating scalable, high-performance,
            and user-centric digital experiences across web and mobile platforms.
          </motion.p>
        </div>

        {/* ── Skill Category Cards ──────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2"
          style={{ gap: "24px", marginBottom: "24px" }}
        >
          {skills.map((group, gi) => {
            const c = colorMap[group.color];
            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  boxShadow: `0 0 40px ${c.glow}, var(--shadow-lg)`,
                }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-[20px] border border-l-4"
                style={{
                  minHeight: "130px",
                  padding: "28px",
                  background: "var(--bg-tertiary)",
                  borderColor: "var(--border)",
                  borderLeftColor: c.accent,
                  boxShadow: "var(--shadow-md)",
                  cursor: "default",
                }}
              >
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 pointer-events-none rounded-bl-full"
                  style={{
                    background: `radial-gradient(circle at top right, ${c.glow} 0%, transparent 70%)`,
                  }}
                />

                {/* Card header */}
                <div
                  className="flex items-center relative z-10"
                  style={{ gap: "14px", marginBottom: "20px" }}
                >
                  {/* We now rely on the card's left border instead of an inner colored bar */}
                  <div
                    className="flex-shrink-0"
                  />

                  <h3
                    className="font-bold text-[var(--text-primary)] flex-1"
                    style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                  >
                    {group.category}
                  </h3>

                  {/* Count badge */}
                  <span
                    className="flex-shrink-0 rounded-full font-semibold"
                    style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      background: c.bg,
                      color: c.accent,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    {group.items.length} skills
                  </span>
                </div>

                {/* Skill badges */}
                <div
                  className="flex flex-wrap relative z-10"
                  style={{ gap: "10px" }}
                >
                  {group.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      variants={badgeVariants(gi * 0.1 + si * 0.055)}
                      whileHover={{ scale: 1.05, background: c.bg, color: c.accent, borderColor: c.accent }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-[var(--bg-primary)] border-[var(--border)] text-[var(--text-secondary)]"
                      style={{
                        fontSize: "0.825rem",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Continuous Growth — compact closing card ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-[20px] border"
          style={{
            padding: "32px 40px",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.05) 100%)",
            borderColor: "rgba(99,102,241,0.25)",
            boxShadow: "0 0 40px rgba(99,102,241,0.10), 0 0 0 1px rgba(99,102,241,0.16)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Subtle top glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 65%)",
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col items-center"
            style={{ gap: "0px", textAlign: "center" }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{
                width: "48px",
                height: "48px",
                marginBottom: "20px",
                background: "rgba(99,102,241,0.14)",
                border: "1px solid rgba(99,102,241,0.30)",
                boxShadow: "0 0 20px rgba(99,102,241,0.22)",
              }}
            >
              <BookOpen size={20} style={{ color: "#818cf8" }} />
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              Continuous Growth
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                maxWidth: "650px",
              }}
            >
              Passionate about continuous learning, emerging technologies,
              and building efficient, scalable software solutions.
            </p>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
