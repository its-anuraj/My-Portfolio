"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { skills } from "@/lib/data";



/* ─── Animation variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const badgeVariants = (delay: number) => ({
  hidden:  { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: { delay, duration: 0.35, ease: "backOut" } },
});

export default function Skills() {
  return (
    <SectionWrapper id="skills">
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
            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  boxShadow: `0 0 40px var(--accent-glow), var(--shadow-lg)`,
                }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-[20px] border border-l-4"
                style={{
                  minHeight: "130px",
                  padding: "28px",
                  background: "var(--bg-tertiary)",
                  borderColor: "var(--border)",
                  borderLeftColor: "var(--accent)",
                  boxShadow: "var(--shadow-md)",
                  cursor: "default",
                }}
              >
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 pointer-events-none rounded-bl-full"
                  style={{
                    background: `radial-gradient(circle at top right, var(--accent-glow) 0%, transparent 70%)`,
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
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                      border: `1px solid var(--accent-glow)`,
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
                      className="tag"
                      style={{
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
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg-tertiary)]"
          style={{
            padding: "32px 40px",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-md)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Subtle top glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, var(--accent-glow) 0%, transparent 65%)",
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col items-center"
            style={{ gap: "0px", textAlign: "center" }}
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)]"
              style={{
                width: "48px",
                height: "48px",
                marginBottom: "20px",
                boxShadow: "0 0 20px var(--accent-glow)",
              }}
            >
              <BookOpen size={20} style={{ color: "var(--accent)" }} />
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
