"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award, BookOpen, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { educationDetails } from "@/lib/data";

export default function Education() {
  return (
    <SectionWrapper id="education" className="bg-[var(--bg-secondary)]">
      <div className="container-custom" style={{ maxWidth: "1200px" }}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="section-label"
            style={{ marginBottom: "12px" }}
          >
            Academic Foundation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-display text-[var(--text-primary)]"
          >
            Education &amp; <span className="gradient-text">Qualifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-2"
          >
            Formal computer science engineering education, core coursework, and academic milestones.
          </motion.p>
        </div>

        {/* Education Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
          className="card glow-border relative overflow-hidden rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border)] p-6 sm:p-8"
        >
          {/* Decorative Corner Glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-bl-full"
            style={{
              background: "radial-gradient(circle at top right, rgba(180,154,90,0.18) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
            {/* Degree & College Info */}
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border flex-shrink-0"
                style={{
                  background: "rgba(180,154,90,0.12)",
                  borderColor: "rgba(180,154,90,0.30)",
                  boxShadow: "0 0 20px rgba(180,154,90,0.20)",
                }}
              >
                <GraduationCap size={28} className="text-[var(--accent)]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  {educationDetails.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-1 mb-1">
                  {educationDetails.degree} in {educationDetails.major}
                </h3>
                <p className="text-base font-semibold text-[var(--text-secondary)]">
                  {educationDetails.institution}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Affiliated with {educationDetails.university}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[var(--accent)]" />
                    {educationDetails.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[var(--accent)]" />
                    {educationDetails.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Badge */}
            <div className="lg:text-right flex-shrink-0">
              <div className="inline-flex flex-col items-start lg:items-end p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Cumulative Score
                </span>
                <span className="text-2xl font-bold gradient-text">
                  CGPA: {educationDetails.cgpa.split(" ")[0]}
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Scale of 10.0
                </span>
              </div>
            </div>
          </div>

          {/* Coursework & Focus Areas */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 relative z-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                <BookOpen size={13} className="text-[var(--accent)]" />
                Key Computer Science Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {educationDetails.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                <Award size={13} className="text-[var(--accent)]" />
                Campus &amp; Program Highlights
              </h4>
              <ul className="space-y-2">
                {educationDetails.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium"
                  >
                    <CheckCircle2 size={13} className="text-[var(--accent)] flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
