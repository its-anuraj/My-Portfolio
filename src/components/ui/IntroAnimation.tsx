"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HELLO_CURSIVE_PATH, HELLO_UNDERLINE_PATH } from "./helloPath";
import { IntroContext, type IntroState } from "@/context/IntroContext";

interface IntroAnimationProps {
  children: React.ReactNode;
}

export default function IntroAnimation({ children }: IntroAnimationProps) {
  // Start true on initial render so SSR markup contains intro screen
  const [showIntro, setShowIntro] = useState(true);
  const [introState, setIntroState] = useState<IntroState>("active");
  const [phase, setPhase] = useState<"hello" | "underline" | "done">("hello");
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    try {
      sessionStorage.setItem("portfolio_intro_seen", "true");
    } catch {
      // Ignore sessionStorage restrictions (e.g., incognito privacy shields)
    }

    setIntroState("exiting");
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-intro", "exiting");
    }

    setShowIntro(false);

    // Safety fallback in case onExitComplete is delayed
    setTimeout(() => {
      if (typeof document !== "undefined") {
        document.documentElement.removeAttribute("data-intro");
      }
      setIntroState("completed");
    }, 800);
  }, []);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceIntro =
        urlParams.get("intro") === "1" || urlParams.get("preview") === "intro";
      const seen = !forceIntro && sessionStorage.getItem("portfolio_intro_seen");
      const reduced =
        !forceIntro &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (seen || reduced) {
        if (typeof document !== "undefined") {
          document.documentElement.removeAttribute("data-intro");
        }
        setShowIntro(false);
        setIntroState("completed");
        return;
      }
    } catch {
      // Fallback
    }

    // Play intro for first-time visitors or forced preview
    setIntroState("active");
    setShowIntro(true);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-intro", "active");
    }

    // IMPORTANT: Do NOT remove data-intro in cleanup!
    // In React 18 Strict Mode, cleanup runs on temporary unmount-remount in development,
    // which would strip the shield and cause heroOrbit to flash.
  }, []);

  // Keyboard accessibility: Skip on Escape, Space, or Enter
  useEffect(() => {
    if (!showIntro) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showIntro, handleComplete]);

  // Safety fallback: only fires if animation somehow gets permanently blocked
  useEffect(() => {
    if (!showIntro) return;

    const safetyGuard = setTimeout(() => {
      handleComplete();
    }, 6000);

    return () => {
      clearTimeout(safetyGuard);
    };
  }, [showIntro, handleComplete]);

  return (
    <IntroContext.Provider
      value={{
        introState,
        isIntroActive: introState === "active",
      }}
    >
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (typeof document !== "undefined") {
            document.documentElement.removeAttribute("data-intro");
          }
          setIntroState("completed");
        }}
      >
        {showIntro && (
          <motion.div
            key="cinematic-intro-overlay"
            id="intro-animation-screen"
            role="region"
            aria-label="Welcome intro animation"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -14,
              scale: 0.99,
              filter: "blur(6px)",
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg-primary)] px-6 select-none cursor-pointer overflow-hidden transition-colors duration-300"
            onClick={handleComplete}
          >
            {/* Subtle luxury champagne-gold ambient backlighting */}
            <div
              className="absolute w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full blur-[110px] opacity-20 pointer-events-none transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              }}
            />

            {/* Minimalist, subtle Skip cue */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              whileHover={{ opacity: 1, scale: 1.03 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                handleComplete();
              }}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 px-3 py-1 text-[11px] font-medium tracking-widest uppercase rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--bg-secondary)] transition-all duration-200"
              aria-label="Skip intro animation"
            >
              Skip <span className="opacity-50 ml-1 font-mono text-[9px]">Esc</span>
            </motion.button>

            {/* Visual Centerpiece: Handwritten cursive "Hello" + Underline */}
            <div className="relative flex flex-col items-center justify-center w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[500px] md:max-w-[640px] lg:max-w-[740px]">
              <svg
                viewBox="0 0 1240 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible select-none drop-shadow-sm"
                aria-label="Hello"
                role="img"
              >
                <defs>
                  {/* Tailored champagne-gold gradient matching the portfolio's palette */}
                  <linearGradient
                    id="champagne-gold-stroke"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#C5AF77" />
                    <stop offset="35%" stopColor="#DFC892" />
                    <stop offset="70%" stopColor="#C5AF77" />
                    <stop offset="100%" stopColor="#9E8446" />
                  </linearGradient>

                  {/* Restrained soft calligraphy glow */}
                  <filter
                    id="refined-calligraphy-glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g filter="url(#refined-calligraphy-glow)">
                  {/* Continuous stroke-by-stroke cursive handwriting of "Hello" */}
                  <motion.path
                    d={HELLO_CURSIVE_PATH}
                    transform="translate(315 450)"
                    fill="none"
                    stroke="url(#champagne-gold-stroke)"
                    strokeWidth={13.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: 1.85,
                        ease: [0.45, 0, 0.2, 1],
                        delay: 0.15,
                      },
                      opacity: {
                        duration: 0.08,
                        delay: 0.15,
                      },
                    }}
                    onAnimationComplete={() => {
                      setPhase("underline");
                    }}
                  />

                  {/* Subtle champagne-gold underline flourish drawing left to right */}
                  <motion.path
                    d={HELLO_UNDERLINE_PATH}
                    fill="none"
                    stroke="url(#champagne-gold-stroke)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      phase === "underline" || phase === "done"
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{
                      pathLength: {
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.15,
                      },
                    }}
                    onAnimationComplete={() => {
                      if (phase === "underline") {
                        setPhase("done");
                        setTimeout(() => {
                          handleComplete();
                        }, 550);
                      }
                    }}
                  />
                </g>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout content wrapped with smooth reveal transition */}
      <div
        id="main-layout-content"
        className="flex-1 flex flex-col min-h-full"
      >
        {children}
      </div>
    </IntroContext.Provider>
  );
}
