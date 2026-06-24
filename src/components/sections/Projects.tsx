"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, CheckCircle } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { projects } from "@/lib/data";

const statusConfig = {
  "In Progress": { color: "var(--accent)", bg: "var(--bg-primary)", icon: Clock },
  Completed: { color: "var(--accent)", bg: "var(--bg-primary)", icon: CheckCircle },
};

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div 
        className="mx-auto"
        style={{
          maxWidth: "1280px",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        {/* Header */}
        <div className="featured-header" style={{ marginBottom: "56px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>
            What I Build
          </p>
          <h2 className="text-display text-[var(--text-primary)]">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            A selection of real-world applications, hackathon projects,
            and software solutions built using modern technologies.
          </p>
        </div>

          <div 
            className={
              projects.length === 1 
                ? "w-full mx-auto" 
                : "grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto"
            }
            style={{ 
              maxWidth: projects.length === 1 ? "700px" : "900px"
            }}
          >
          {projects.map((project, i) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = status?.icon;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "var(--shadow-lg)" }}
                className="card flex flex-col group overflow-hidden bg-[var(--bg-tertiary)] border transition-all duration-300"
                style={{ 
                  borderRadius: "24px", 
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                {/* Large Preview Image / Header Area */}
                  <div 
                    className="w-full relative flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
                    style={{ 
                      height: "120px",
                      borderBottom: "1px solid var(--border)"
                    }}
                  >
                  {/* Decorative background grid/pattern */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />
                  
                  {/* Floating App Icon */}
                  <div
                    className="relative z-10 rounded-xl flex items-center justify-center text-white font-bold shadow-[0_0_30px_var(--accent-glow)] transition-transform duration-500 group-hover:scale-110 btn-primary"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "28px",
                    }}
                  >
                    {project.title[0]}
                  </div>

                  {/* Status Badge floating on image */}
                  <div
                    className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg"
                    style={{ 
                      top: "16px", 
                      right: "16px",
                      background: status?.bg, 
                      color: status?.color, 
                      border: `1px solid ${status?.color}40` 
                    }}
                  >
                    {StatusIcon && <StatusIcon size={12} />}
                    <span>{project.status}</span>
                  </div>
                </div>

                <div 
                  className="flex flex-col flex-1 mx-auto w-full" 
                  style={{ padding: "24px" }}
                >
                  {/* Title */}
                  <h3 
                    className="font-bold text-[22px] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug text-center sm:text-left"
                    style={{ marginTop: "4px", marginBottom: "12px" }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <div 
                    className="flex flex-col text-center sm:text-left" 
                    style={{ marginBottom: "16px", maxWidth: "95%" }}
                  >
                    <p className="text-[13px] text-[var(--text-secondary)]" style={{ lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div 
                    className="flex flex-wrap items-center justify-center sm:justify-start"
                    style={{ gap: "8px", marginBottom: "16px" }}
                  >
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-[11px] px-2.5 py-1 font-medium border border-[var(--border)] bg-[var(--bg-tertiary)] rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div 
                    className={`grid ${project.demo && project.github ? "grid-cols-2" : "grid-cols-1"} mt-auto`}
                    style={{ gap: "12px", marginTop: "4px" }}
                  >
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[13px] font-bold transition-all duration-300 shadow-sm"
                        style={{ height: "40px" }}
                      >
                        <GitHubIcon size={14} />
                        GitHub
                      </a>
                    ) : (
                      <div className="flex items-center justify-center py-2 px-4 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] text-[13px] font-bold text-center opacity-50 cursor-not-allowed border border-[var(--border)]" style={{ height: "40px" }}>
                        Private
                      </div>
                    )}
                    
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg btn-primary text-white text-[13px] font-bold transition-all duration-300 shadow-sm"
                        style={{ height: "40px" }}
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
