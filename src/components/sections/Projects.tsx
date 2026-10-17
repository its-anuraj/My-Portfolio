"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, CheckCircle2, Shield, Wrench, Layers } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { projects } from "@/lib/data";

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  "In Progress": { color: "#B49A5A", bg: "rgba(180,154,90,0.12)", label: "In Progress" },
  "Completed": { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "Completed" },
  "Completed MVP": { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "Completed MVP" },
  "Working Prototype": { color: "#B49A5A", bg: "rgba(180,154,90,0.12)", label: "Working Prototype" },
};

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "1320px",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
        }}
      >
        {/* Section Header */}
        <div className="featured-header text-center" style={{ marginBottom: "52px" }}>
          <p className="section-label" style={{ marginBottom: "14px" }}>
            Real-World Engineering
          </p>
          <h2 className="text-display text-[var(--text-primary)]">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-2">
            A showcase of mobile applications and engineering solutions built using React Native,
            Expo, TypeScript, and modern cloud architectures. Factual contributions, real code, and live demos.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto">
          {projects.map((project, i) => {
            const status = statusConfig[project.status] || statusConfig["Completed"];

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
                className="card flex flex-col group overflow-hidden bg-[var(--bg-tertiary)] border transition-all duration-300"
                style={{
                  borderRadius: "22px",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {/* Header Banner */}
                <div
                  className="w-full relative flex items-center justify-between px-6 py-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(180, 154, 90, 0.12) 0%, rgba(180, 154, 90, 0.03) 100%)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-[0_0_18px_rgba(180,154,90,0.35)] flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #B49A5A 0%, #9D8449 100%)",
                      }}
                    >
                      {project.title.charAt(0)}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--accent)]">
                        {project.subtitle}
                      </span>
                      <h3 className="font-bold text-lg sm:text-xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex-shrink-0"
                    style={{
                      background: status.bg,
                      color: status.color,
                      border: `1px solid ${status.color}40`,
                    }}
                  >
                    <CheckCircle2 size={11} />
                    <span>{status.label}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="flex flex-col flex-1 p-6 space-y-4">
                  {/* Purpose & Problem */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                      {project.purpose}
                    </p>
                    <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        <strong className="text-[var(--text-primary)]">Problem Solved: </strong>
                        {project.problem}
                      </p>
                    </div>
                  </div>

                  {/* Actual Contribution */}
                  <div className="p-3.5 rounded-xl bg-[var(--accent-glow)] border border-[rgba(180,154,90,0.22)]">
                    <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[var(--accent)]">
                      <Wrench size={13} />
                      <span>My Actual Contribution:</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {project.contribution}
                    </p>
                  </div>

                  {/* Implemented Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                      <Layers size={12} className="text-[var(--accent)]" />
                      Key Implemented Features
                    </h4>
                    <ul className="space-y-1.5">
                      {project.features.map((feature, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-xs text-[var(--text-secondary)] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Demo Credentials if any */}
                  {project.demoCredentials && (
                    <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                      <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                        Demo Account Credentials:
                      </p>
                      <div className="flex flex-wrap gap-x-4 text-xs text-[var(--text-muted)]">
                        <span>
                          Email: <strong className="text-[var(--text-secondary)]">{project.demoCredentials.email}</strong>
                        </span>
                        <span>
                          Password: <strong className="text-[var(--text-secondary)]">{project.demoCredentials.password}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-1 font-medium border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className={`grid ${
                      project.demo && project.github ? "grid-cols-2" : "grid-cols-1"
                    } gap-3 pt-3 mt-auto border-t border-[var(--border)]`}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title} on GitHub`}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all duration-200 shadow-sm"
                      >
                        <GitHubIcon size={14} />
                        <span>Source / GitHub</span>
                      </a>
                    )}

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo for ${project.title}`}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-all duration-200 shadow-sm"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
