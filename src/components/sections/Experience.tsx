"use client";

import { motion } from "framer-motion";
import { Trophy, Code2, Users } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const entries = [
  {
    role:        "Google Ambassador Program Member",
    org:         "Google",
    period:      "2025",
    type:        "experience",
    icon:        Users,
    description: "Represented Google technologies and organized technical initiatives on campus.",
    iconColor:   "#6366F1",
  },
  {
    role:        "HackIndia Participant",
    org:         "HackIndia",
    period:      "2026",
    type:        "achievement",
    icon:        Trophy,
    description: "Collaborated in a national hackathon to design and present a working solution.",
    iconColor:   "#F59E0B",
  },
  {
    role:        "Mobile App Developer",
    org:         "Self / Freelance",
    period:      "2026 – Present",
    type:        "experience",
    icon:        Code2,
    description: "Building cross-platform mobile applications using React Native and modern development practices.",
    iconColor:   "#8B5CF6",
  },
];

const typeConfig = {
  experience: {
    label:  "Experience",
    color:  "#818cf8",
    border: "rgba(129,140,248,0.28)",
    bg:     "rgba(129,140,248,0.09)",
    glow:   "rgba(129,140,248,0.15)",
  },
  achievement: {
    label:  "Achievement",
    color:  "#f59e0b",
    border: "rgba(245,158,11,0.28)",
    bg:     "rgba(245,158,11,0.09)",
    glow:   "rgba(245,158,11,0.15)",
  },
};

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div
        className="mx-auto w-full"
        style={{ maxWidth: "1300px", padding: "0 clamp(20px, 5vw, 80px)" }}
      >

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "40px",
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
            Journey
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Experience &{" "}
            <span className="gradient-text">Achievements</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              maxWidth: "700px",
            }}
          >
            Key milestones that reflect my growth in software development,
            leadership, innovation, and continuous learning.
          </motion.p>
        </div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: "860px" }}
        >
          {/* Vertical line */}
          <div
            className="absolute hidden sm:block"
            style={{
              left: "27px",
              top: "28px",
              bottom: "0",
              width: "2px",
              background: "linear-gradient(to bottom, var(--border-hover) 0%, var(--border) 70%, transparent 100%)",
            }}
          />

          <div className="flex flex-col" style={{ gap: "24px" }}>
            {entries.map((exp, i) => {
              const cfg = typeConfig[exp.type as keyof typeof typeConfig];
              const Icon = exp.icon;

              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: 'easeOut' as any }}
                  className="flex items-start"
                  style={{ gap: "20px" }}
                >
                  {/* Icon node — 56×56 */}
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: "56px",
                        height: "56px",
                        background: `${exp.iconColor}1A`, // 10% opacity
                        border: `1.5px solid ${exp.iconColor}33`, // 20% opacity for border
                        boxShadow: `0 0 16px ${exp.iconColor}1A`,
                      }}
                    >
                      <Icon size={22} style={{ color: exp.iconColor }} />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: `0 0 28px ${cfg.glow}, var(--shadow-lg)`,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 min-w-0 relative overflow-hidden"
                    style={{
                      padding: "20px 24px",
                      borderRadius: "16px",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "var(--shadow-md)",
                      cursor: "default",
                    }}
                  >
                    {/* Subtle corner glow */}
                    <div
                      className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
                      style={{
                        borderRadius: "0 16px 0 100%",
                        background: `radial-gradient(circle at top right, ${cfg.glow} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Row: title + badge/date */}
                    <div
                      className="relative z-10 flex flex-wrap items-start justify-between"
                      style={{ gap: "8px", marginBottom: "8px" }}
                    >
                      {/* Left */}
                      <div className="min-w-0">
                        <h3
                          className="text-[var(--text-primary)]"
                          style={{
                            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                            fontWeight: 700,
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            color: cfg.color,
                            marginTop: "3px",
                          }}
                        >
                          {exp.org}
                        </p>
                      </div>

                      {/* Right — badge + date */}
                      <div
                        className="flex flex-col items-end flex-shrink-0"
                        style={{ gap: "5px" }}
                      >
                        <span
                          className="rounded-full font-semibold whitespace-nowrap"
                          style={{
                            fontSize: "10px",
                            padding: "3px 10px",
                            background: cfg.bg,
                            color: cfg.color,
                            border: `1px solid ${cfg.border}`,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {cfg.label}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--text-muted)",
                            fontWeight: 500,
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="relative z-10"
                      style={{
                        height: "1px",
                        background: cfg.border,
                        marginBottom: "10px",
                      }}
                    />

                    {/* Description */}
                    <p
                      className="relative z-10 text-[var(--text-secondary)]"
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {exp.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
