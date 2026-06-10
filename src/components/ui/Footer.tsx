"use client";

import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer 
      className="bg-[var(--bg-secondary)]"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "32px",
        paddingBottom: "32px",
      }}
    >
      <div className="container-custom flex flex-col items-center text-center">
        
        {/* Footer Text Lines */}
        <div 
          className="flex flex-col items-center"
          style={{ gap: "12px", maxWidth: "800px" }}
        >
          <p className="font-semibold text-sm text-[var(--text-primary)] tracking-wide">
            © {year} Anuraj Singh
          </p>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Mobile App Developer • React Native Developer
          </p>
          
          <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mt-2">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-[var(--text-primary)] transition-colors">
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
