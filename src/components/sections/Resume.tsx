"use client";

import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Resume() {
  return (
    <SectionWrapper id="resume" className="bg-[var(--bg-secondary)]">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label">Document</p>
          <h2 className="text-[var(--text-primary)] font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Download or preview my complete resume to learn more about my education,
            experience, and skills.
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as any }}
          className="max-w-2xl mx-auto card glow-border overflow-hidden"
        >
          {/* Preview area */}
          <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />

            <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                <FileText size={26} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-[var(--text-primary)] text-lg">Anuraj Singh</p>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  B.Tech CSE · Mobile App Developer
                </p>
              </div>

              {/* Mock document lines */}
              <div className="w-48 flex flex-col gap-2 opacity-30 mt-1">
                <div className="h-1.5 bg-[var(--accent)] rounded-full" />
                <div className="h-1.5 bg-[var(--text-muted)] rounded-full w-4/5" />
                <div className="h-1.5 bg-[var(--text-muted)] rounded-full w-3/5" />
                <div className="h-1.5 bg-[var(--text-muted)] rounded-full w-4/5 mt-2" />
                <div className="h-1.5 bg-[var(--text-muted)] rounded-full" />
              </div>
            </div>

            {/* Fade overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
          </div>

          {/* Action bar — properly padded, stacks on mobile */}
          <div className="p-5 sm:p-6 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* File info */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--text-primary)] text-sm sm:text-base truncate">
                  Anuraj_Singh_Resume.pdf
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Updated · PDF Format</p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  id="resume-preview"
                  disabled
                  className="btn-secondary opacity-50 cursor-not-allowed text-sm px-4 py-2"
                  title="Preview coming soon"
                >
                  <Eye size={15} />
                  Preview
                </button>
                <button
                  id="resume-download"
                  disabled
                  className="btn-primary opacity-50 cursor-not-allowed text-sm px-4 py-2"
                  title="Download coming soon"
                >
                  <Download size={15} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-[var(--text-muted)] text-xs sm:text-sm mt-5"
        >
          Resume download will be available soon. Contact me directly in the meantime.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
