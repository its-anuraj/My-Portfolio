"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--bg-secondary)]"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "36px",
        paddingBottom: "36px",
      }}
    >
      <div className="container-custom flex flex-col items-center text-center">
        {/* Footer Text Lines */}
        <div
          className="flex flex-col items-center"
          style={{ gap: "12px", maxWidth: "800px" }}
        >
          <p className="font-semibold text-sm text-[var(--text-primary)] tracking-wide">
            © {year} {personalInfo.name} — All Rights Reserved
          </p>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Mobile App Developer <span className="text-[var(--accent)]">|</span> React Native &amp; Expo
          </p>
          <p className="text-xs text-[var(--text-muted)] max-w-md">
            B.Tech Computer Science and Engineering, KCC Institute of Technology &amp; Management, Greater Noida.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--text-muted)] mt-2">
            <a
              href="#about"
              className="hover:text-[var(--accent)] transition-colors"
            >
              About
            </a>
            <span>•</span>
            <a
              href="#projects"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Projects
            </a>
            <span>•</span>
            <a
              href="#skills"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Skills
            </a>
            <span>•</span>
            <a
              href="#experience"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Experience
            </a>
            <span>•</span>
            <a
              href="#education"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Education
            </a>
            <span>•</span>
            <a
              href="#resume"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Resume
            </a>
            <span>•</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Anuraj Singh GitHub Profile"
              className="hover:text-[var(--accent)] transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Anuraj Singh LinkedIn Profile"
              className="hover:text-[var(--accent)] transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Send email to Anuraj Singh"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
