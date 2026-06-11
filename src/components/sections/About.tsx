"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Smartphone, Code2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo, stats } from "@/lib/data";

const highlights = [
  {
    icon: GraduationCap,
    label: "College",
    value: "KCC Institute of Technology & Management",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Greater Noida, Uttar Pradesh, India",
  },
  {
    icon: Smartphone,
    label: "Focus",
    value: "Mobile App Development",
  },
  {
    icon: Code2,
    label: "Primary Stack",
    value: "React Native · TypeScript · Java · SQL",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as any } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as any } },
};

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* ── LEFT: Text ─────────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="section-label">About Me</motion.p>

            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "24px",
                maxWidth: "640px",
              }}
            >
              Crafting Scalable{" "}
              <span className="gradient-text">Digital Experiences</span>
              {" "}Through Code
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: "0.95rem", marginBottom: "14px", maxWidth: "580px" }}
            >
              {personalInfo.bio}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[var(--text-muted)] leading-relaxed"
              style={{ fontSize: "0.9rem", marginBottom: "36px", maxWidth: "560px" }}
            >
              Currently in my 4th year of B.Tech in Computer Science, I&apos;m deeply focused on
              mastering mobile development paradigms — from architecture patterns to advanced
              animations and performance tuning.
            </motion.p>

            {/* Highlights list */}
            <motion.div
              variants={stagger}
              className="flex flex-col"
              style={{ gap: "20px" }}
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeLeft}
                  className="flex items-center"
                  style={{ gap: "16px" }}
                >
                  {/* Icon box */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl border"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "var(--accent-glow)",
                      borderColor: "rgba(99,102,241,0.18)",
                    }}
                  >
                    <item.icon size={16} className="text-[var(--accent)]" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="uppercase text-[var(--text-muted)] font-semibold tracking-widest"
                      style={{ fontSize: "10px", marginBottom: "3px" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-semibold text-[var(--text-primary)] leading-snug"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stats + Profile card ────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
            style={{ gap: "20px" }}
          >

            {/* Stats grid — 2×2 equal cards */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2"
              style={{ gap: "16px" }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="card glow-border text-center flex flex-col items-center justify-center"
                  style={{ padding: "28px 20px" }}
                >
                  <p
                    className="gradient-text font-bold"
                    style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: "8px", lineHeight: 1 }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="uppercase text-[var(--text-muted)] font-semibold tracking-widest leading-snug"
                    style={{ fontSize: "10px" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Profile / trait card */}
            <motion.div
              variants={fadeUp}
              className="card glow-border relative overflow-hidden"
              style={{ padding: "28px" }}
            >
              {/* Deco gradient corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full pointer-events-none" />

              {/* Profile header */}
              <div
                className="flex items-center"
                style={{ gap: "14px", marginBottom: "24px" }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold"
                  style={{
                    width: "44px",
                    height: "44px",
                    fontSize: "15px",
                    background: "linear-gradient(135deg, #7c3aed, #6366f1)",
                    boxShadow: "0 0 20px rgba(99,102,241,0.35)",
                  }}
                >
                  A
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="font-semibold text-[var(--text-primary)] truncate"
                    style={{ fontSize: "0.9rem", marginBottom: "2px" }}
                  >
                    {personalInfo.name}
                  </p>
                  <p
                    className="text-[var(--text-muted)] truncate"
                    style={{ fontSize: "0.78rem" }}
                  >
                    {personalInfo.role}
                  </p>
                </div>

                <div className="flex items-center flex-shrink-0" style={{ gap: "6px" }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span
                    className="text-[var(--text-muted)] hidden sm:inline"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Available
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="rounded-full"
                style={{
                  height: "1px",
                  background: "var(--border)",
                  marginBottom: "20px",
                }}
              />

              {/* Traits */}
              <div className="flex flex-col" style={{ gap: "14px" }}>
                {[
                  "Former Google Ambassador Program Member",
                  "HackIndia Hackathon Participant",
                  "Passionate about Mobile & Software Dev",
                  "Problem Solver · Quick Learner",
                ].map((trait) => (
                  <div key={trait} className="flex items-start" style={{ gap: "12px" }}>
                    <div
                      className="flex-shrink-0 rounded-full bg-[var(--accent)]"
                      style={{ width: "6px", height: "6px", marginTop: "7px" }}
                    />
                    <span
                      className="text-[var(--text-secondary)] leading-snug"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {trait}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
