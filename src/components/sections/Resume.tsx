"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  Eye,
  ExternalLink,
  Maximize2,
  X,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

/* ─── Structured Resume Data from resume.pdf ────────────────────────────── */
const resumeHighlights = {
  education: {
    institution: "KCC Institute of Technology & Management",
    degree: "B.Tech in Computer Science Engineering",
    period: "2023 – 2027",
    location: "Greater Noida, India",
    score: "CGPA: 7.62",
  },
  experience: [
    {
      role: "Google Student Ambassador",
      org: "Google",
      period: "Aug 2024 – Jan 2025",
      points: [
        "Conducted Gemini AI workshops and hands-on sessions on campus, enabling students to integrate Google's generative AI tools into developer workflows.",
        "Organized and led Gemini-focused events and tech talks, driving student awareness of AI-powered development capabilities across campus.",
      ],
    },
    {
      role: "1M1B | AI & Sustainability Program Participant",
      org: "1M1B",
      period: "Jul 2026",
      points: [
        "Completed a structured AI and sustainability-focused program, exploring applications of artificial intelligence in addressing large-scale global development challenges.",
      ],
    },
  ],
  projects: [
    {
      name: "Keepr – Personal Ownership Vault",
      stack: "React Native, Expo, Supabase, Google Gemini API, Zustand",
      points: [
        "Personal ownership vault to organize purchased assets, warranties, receipts, return deadlines, and service history with summary metrics.",
        "Integrated Google Gemini Multimodal API via Supabase Edge Functions for AI-powered receipt scanning and automatic classification.",
      ],
    },
    {
      name: "TeamForge AI",
      stack: "React, Node.js, PostgreSQL, LLM Integration",
      points: [
        "AI-powered workforce allocation system analyzing employee skill profiles, project history, and workload to auto-recommend optimal project teams.",
        "Embedded predictive analytics for early detection of budget overruns and deadline risks.",
      ],
    },
    {
      name: "SERS – Smart Emergency Response System",
      stack: "React Native, Node.js, Web Dashboard",
      points: [
        "Engineered multi-factor accident detection analyzing airbag deployment, speed drops, and voice-triggered SOS keywords.",
        "Automated 10-second false-alert cancellation before dispatching GPS location to family and hospital live dashboard.",
      ],
    },
  ],
  skillsSummary: [
    { category: "Languages", items: "Java, C, C++, Python, JavaScript, TypeScript, SQL, HTML/CSS" },
    { category: "Mobile Dev", items: "React Native, Expo, Android Studio, NativeWind, Zustand" },
    { category: "Cloud & BaaS", items: "Supabase, Clerk Auth, Firebase, Node.js, REST APIs" },
    { category: "Databases & DevOps", items: "PostgreSQL, MongoDB, MySQL, Git, Docker, Postman" },
  ],
  certifications: [
    "Software Engineering Job Simulation | JPMorgan Chase & Co. via Forage",
    "Android Development Training Program | Codec Technologies (ICAC Recognized)",
  ],
};

export default function Resume() {
  const [viewMode, setViewMode] = useState<"document" | "interactive">("document");
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <SectionWrapper id="resume" className="bg-[var(--bg-secondary)] relative">
      <div className="container-custom" style={{ maxWidth: "1280px" }}>

        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="section-label"
          >
            Curriculum Vitae
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[var(--text-primary)] font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            My <span className="gradient-text">Resume</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore my official resume below with live interactive preview, structured key milestones,
            or download the document directly.
          </motion.p>

          {/* ── View Toggle Pills ─────────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 mt-7">
            <div className="inline-flex p-1 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] shadow-sm">
              <button
                type="button"
                id="resume-tab-document"
                onClick={() => setViewMode("document")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  viewMode === "document"
                    ? "bg-[var(--accent)] text-white shadow-md shadow-[rgba(180,154,90,0.3)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                <FileText size={15} />
                <span>Live Document</span>
              </button>
              <button
                type="button"
                id="resume-tab-interactive"
                onClick={() => setViewMode("interactive")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  viewMode === "interactive"
                    ? "bg-[var(--accent)] text-white shadow-md shadow-[rgba(180,154,90,0.3)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                <Layers size={15} />
                <span>Interactive Summary</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Container ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto card glow-border overflow-hidden rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border)] shadow-[var(--shadow-lg)]"
        >
          {/* Top Window / Control Bar */}
          <div className="px-5 py-3.5 bg-[var(--bg-primary)] border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
            {/* Left window badge */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-[var(--text-primary)] leading-tight">
                    Anuraj_Singh_Resume.pdf
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    Single Page · ATS-Optimized · PDF Format
                  </p>
                </div>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2">
              {viewMode === "document" && (
                <button
                  type="button"
                  id="resume-fullscreen"
                  onClick={() => setIsFullscreen(true)}
                  className="btn-secondary text-xs px-3 py-1.5 hidden md:flex items-center gap-1.5 rounded-lg"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 size={13} />
                  <span>Fullscreen</span>
                </button>
              )}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="resume-preview"
                className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5 rounded-lg"
                title="Preview resume in new tab"
              >
                <ExternalLink size={13} />
                <span>Open in Tab</span>
              </a>
              <a
                href="/resume.pdf"
                download="Anuraj_Singh_Resume.pdf"
                id="resume-download"
                className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5 rounded-lg font-medium"
                title="Download resume PDF"
              >
                <Download size={13} />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* ── View Mode: Live Document ─────────────────────────────────── */}
          {viewMode === "document" ? (
            <div className="relative w-full bg-neutral-900/40">
              {/* Responsive Container for PDF Embed */}
              <div className="relative w-full h-[620px] sm:h-[750px] lg:h-[880px] overflow-hidden bg-white">
                <iframe
                  src="/resume.pdf?v=2#view=FitH"
                  title="Anuraj Singh Official Resume"
                  className="w-full h-full border-0 block"
                />

                {/* Mobile Fallback Overlay hint */}
                <div className="sm:hidden absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md rounded-xl text-center border border-white/10 z-10 shadow-lg">
                  <p className="text-xs text-white/90 mb-2 font-medium">
                    Viewing on mobile? Open full PDF or switch to interactive view for optimal experience.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[var(--accent)] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Eye size={12} />
                      Open Full PDF
                    </a>
                    <button
                      type="button"
                      onClick={() => setViewMode("interactive")}
                      className="px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Layers size={12} />
                      Summary View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── View Mode: Interactive Summary ─────────────────────────── */
            <div className="p-6 sm:p-8 space-y-8 bg-[var(--bg-tertiary)]">
              {/* Summary Banner */}
              <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-[var(--accent)]" />
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">
                    Professional Summary
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Mobile-first software developer pursuing B.Tech in Computer Science, with experience building
                  AI-integrated mobile and web applications end-to-end using React Native, Expo, and Node.js.
                  Demonstrated ability to identify real-world problems, architect multi-role platforms, and deliver
                  demo-ready products with institutional buy-in. Hands-on experience in developer advocacy and
                  AI-focused community engagement through Google.
                </p>
              </div>

              {/* Grid: Education & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
                          <GraduationCap size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-[var(--text-primary)]">Education</h4>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent)]/30">
                        {resumeHighlights.education.score}
                      </span>
                    </div>

                    <h5 className="font-semibold text-sm text-[var(--text-primary)]">
                      {resumeHighlights.education.degree}
                    </h5>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {resumeHighlights.education.institution}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      {resumeHighlights.education.location}
                    </p>
                  </div>
                  <p className="text-[11px] font-semibold text-[var(--accent)] mt-4">
                    {resumeHighlights.education.period}
                  </p>
                </div>

                {/* Experience */}
                <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
                      <Briefcase size={18} />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">Work Experience</h4>
                  </div>
                  <div className="space-y-3">
                    {resumeHighlights.experience.map((exp) => (
                      <div key={exp.role} className="border-l-2 border-[var(--accent)] pl-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-xs text-[var(--text-primary)]">{exp.role}</p>
                          <span className="text-[10px] text-[var(--text-muted)] shrink-0">{exp.period}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
                          {exp.points[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Projects Highlight */}
              <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
                    <Code2 size={18} />
                  </div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Key Resume Projects</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {resumeHighlights.projects.map((proj) => (
                    <div key={proj.name} className="p-3.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border)]">
                      <p className="font-bold text-xs text-[var(--text-primary)] mb-1">{proj.name}</p>
                      <p className="text-[10px] text-[var(--accent)] font-medium mb-2">{proj.stack}</p>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {proj.points[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skills */}
                <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <h4 className="font-bold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[var(--accent)]" />
                    <span>Technical Arsenal</span>
                  </h4>
                  <div className="space-y-2.5">
                    {resumeHighlights.skillsSummary.map((s) => (
                      <div key={s.category} className="text-xs">
                        <span className="font-semibold text-[var(--text-primary)]">{s.category}: </span>
                        <span className="text-[var(--text-secondary)]">{s.items}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                  <h4 className="font-bold text-sm text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <Award size={16} className="text-[var(--accent)]" />
                    <span>Validated Certifications</span>
                  </h4>
                  <div className="space-y-3">
                    {resumeHighlights.certifications.map((c) => (
                      <div key={c} className="flex items-start gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                        <span className="text-[var(--text-secondary)]">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer Bar */}
          <div className="px-5 py-4 bg-[var(--bg-primary)] border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                Looking for the full uncompressed document?
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Directly download or view the PDF in any viewer of your choice.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs px-4 py-2 flex items-center gap-2"
              >
                <Eye size={14} />
                <span>Open In Browser</span>
              </a>
              <a
                href="/resume.pdf"
                download="Anuraj_Singh_Resume.pdf"
                className="btn-primary text-xs px-4 py-2 flex items-center gap-2 font-medium"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── 4 Quick Highlight Cards Below ───────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
          {[
            { label: "Education", val: "B.Tech CSE (2023–27)", sub: "KCC ITM · CGPA 7.62", icon: GraduationCap, color: "#B49A5A" },
            { label: "Community", val: "Google Ambassador", sub: "GenAI & Workshops", icon: Briefcase, color: "#B49A5A" },
            { label: "Specialty", val: "Mobile & AI Systems", sub: "React Native & Supabase", icon: Code2, color: "#B49A5A" },
            { label: "Location", val: "Greater Noida, India", sub: "Available for Work", icon: Sparkles, color: "#B49A5A" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center gap-3 transition-colors hover:border-[var(--accent)]"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                <item.icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                  {item.label}
                </p>
                <p className="text-xs font-bold text-[var(--text-primary)] truncate mt-0.5">
                  {item.val}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Fullscreen Modal Preview ─────────────────────────────────────── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white mb-3">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[var(--accent)]" />
                <span className="font-semibold text-sm">Anuraj_Singh_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Anuraj_Singh_Resume.pdf"
                  className="px-3 py-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close fullscreen"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: Full height iframe */}
            <div className="flex-1 w-full bg-white rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="/resume.pdf?v=2#view=FitH"
                title="Fullscreen Resume Preview"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
