"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  GraduationCap,
  Star,
  Box,
  Layers,
  Smartphone,
  Zap,
  Database,
  LayoutGrid,
  Coffee,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useIntro } from "@/context/IntroContext";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface NodeDef {
  label: string;
  icon:  LucideIcon;
  color: string;
  angle: number;
}

/* ─── SVG geometry ───────────────────────────────────────────────────────── */
const CX      = 220;
const CY      = 220;
const OUTER_R = 155;
const INNER_R = 78;
const RING_PCT = (OUTER_R / 440) * 100;

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function round(n: number)   { return Math.round(n * 10000) / 10000; }

/* ─── 9 nodes evenly at 40° (360/9) — clockwise from top ────────────────── */
const NODE_DEFS: NodeDef[] = [
  { label: "4th Year\nB.Tech CSE",    icon: GraduationCap, color: "#B49A5A", angle: -90  },
  { label: "Docker",                  icon: Box,           color: "#B49A5A", angle: -50  },
  { label: "Kubernetes",              icon: Layers,        color: "#B49A5A", angle: -10  },
  { label: "React Native",            icon: Smartphone,    color: "#B49A5A", angle:  30  },
  { label: "Java Script",             icon: Zap,           color: "#B49A5A", angle:  70  },
  { label: "SQL",                     icon: Database,      color: "#B49A5A", angle: 110  },
  { label: "MS Excel",                icon: LayoutGrid,    color: "#B49A5A", angle: 150  },
  { label: "Java",                    icon: Coffee,        color: "#B49A5A", angle: 190  },
  { label: "Google\nAmbassador",      icon: Star,          color: "#B49A5A", angle: 230  },
];

/* ─── Pre-computed (eliminates SSR/client hydration mismatch) ───────────── */
const NODE_SVG = NODE_DEFS.map((n) => ({
  ...n,
  svgX: round(CX + OUTER_R * Math.cos(toRad(n.angle))),
  svgY: round(CY + OUTER_R * Math.sin(toRad(n.angle))),
}));

const NODE_CSS = NODE_DEFS.map((n) => {
  const rad = toRad(n.angle);
  const outwardOffset = 42; // Distance from center of icon to center of label
  return {
    ...n,
    leftPct: round(50 + RING_PCT * Math.cos(rad)),
    topPct:  round(50 + RING_PCT * Math.sin(rad)),
    labelX: round(Math.cos(rad) * outwardOffset),
    labelY: round(Math.sin(rad) * outwardOffset),
  };
});

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const r   = 110 + (i % 3) * 22;
  const rad = toRad((360 / 12) * i);
  return { key: i, cx: round(CX + r * Math.cos(rad)), cy: round(CY + r * Math.sin(rad)) };
});

const ARC_TOP    = `M ${CX} ${CY - OUTER_R} A ${OUTER_R} ${OUTER_R} 0 0 1 ${CX + OUTER_R} ${CY}`;
const ARC_BOTTOM = `M ${CX} ${CY + OUTER_R} A ${OUTER_R} ${OUTER_R} 0 0 1 ${CX - OUTER_R} ${CY}`;

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function HeroOrbit() {
  const { isIntroActive } = useIntro();

  return (
    <div
      className="relative mx-auto select-none"
      style={{ 
        width: "min(580px, 100vw)", 
        aspectRatio: "1 / 1",
        padding: "40px" 
      }}
    >
      {/* SVG rings */}
      <svg viewBox="0 0 440 440" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* Glow band */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="rgba(180,154,90,0.08)" strokeWidth="40" />
        {/* Solid ring */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="rgba(180,154,90,0.22)" strokeWidth="1.5" />
        {/* Rotating dashed ring */}
        <motion.circle
          cx={CX} cy={CY} r={OUTER_R} fill="none"
          stroke="rgba(180,154,90,0.45)" strokeWidth="1" strokeDasharray="10 24"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          animate={isIntroActive ? { rotate: 0 } : { rotate: 360 }}
          transition={
            isIntroActive
              ? { duration: 0 }
              : { duration: 30, repeat: Infinity, ease: "linear" }
          }
        />
        {/* Counter-rotating fine ring */}
        <motion.circle
          cx={CX} cy={CY} r={OUTER_R - 8} fill="none"
          stroke="rgba(180,154,90,0.16)" strokeWidth="1" strokeDasharray="4 18"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          animate={isIntroActive ? { rotate: 0 } : { rotate: -360 }}
          transition={
            isIntroActive
              ? { duration: 0 }
              : { duration: 45, repeat: Infinity, ease: "linear" }
          }
        />
        {/* Inner avatar ring — matches 50% avatar size */}
        <circle cx={CX} cy={CY} r={110} fill="none" stroke="rgba(180,154,90,0.22)" strokeWidth="1" />
        {/* HUD arcs */}
        <path d={ARC_TOP}    fill="none" stroke="rgba(180,154,90,0.65)"  strokeWidth="1.8" strokeLinecap="round" />
        <path d={ARC_BOTTOM} fill="none" stroke="rgba(180,154,90,0.35)" strokeWidth="1.2" strokeLinecap="round" />
        {/* Node anchor dots */}
        {NODE_SVG.map((n) => (
          <g key={n.label}>
            <circle cx={n.svgX} cy={n.svgY} r={8} fill={n.color} opacity="0.14" />
            <circle cx={n.svgX} cy={n.svgY} r={3.5} fill={n.color} opacity="0.90" />
          </g>
        ))}
        {/* Particles */}
        {PARTICLES.map((p) => (
          <circle key={p.key} cx={p.cx} cy={p.cy} r="1.2" fill="rgba(180,154,90,0.28)" />
        ))}
      </svg>

      {/* Skill nodes */}
      {NODE_CSS.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={isIntroActive ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
          transition={
            isIntroActive
              ? { duration: 0 }
              : { delay: 0.15 + i * 0.08, duration: 0.5, ease: "backOut" }
          }
          className="absolute flex justify-center group z-10"
          style={{ 
            left: `${node.leftPct}%`, 
            top: `${node.topPct}%`, 
            width: "44px", 
            height: "44px", 
            transform: "translate(-50%,-50%)" 
          }}
        >
          {/* Icon bubble */}
          <motion.div
            whileHover={{ scale: 1.28, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border flex-shrink-0"
            style={{
              background:  `${node.color}1a`,
              borderColor: `${node.color}55`,
              boxShadow:   `0 0 18px ${node.color}45, inset 0 0 8px ${node.color}15`,
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 1 }}
              whileHover={{ opacity: [0, 0.4, 0], scale: [1, 1.9, 2.3] }}
              transition={{ duration: 0.65 }}
              style={{ background: `${node.color}28` }}
            />
            <node.icon size={16} style={{ color: node.color }} />
          </motion.div>
          {/* Label — split on \n */}
          <span
            className="absolute font-semibold leading-tight opacity-75 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-pre-line text-center"
            style={{
              color:      node.color,
              fontSize:   "clamp(6.5px, 1.8vw, 9.5px)",
              width:      "max-content",
              maxWidth:   "90px",
              textShadow: `0 0 8px ${node.color}55`,
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${node.labelX}px), calc(-50% + ${node.labelY}px))`
            }}
          >
            {node.label}
          </span>
        </motion.div>
      ))}

      {/* Central avatar */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        {/* Outer ambient glow — behind avatar, no blur bleed on image */}
        <div
          className="absolute rounded-full"
          style={{
            width: "58%", height: "58%",
            background: "radial-gradient(circle, rgba(180, 154, 90, 0.22) 0%, rgba(180, 154, 90, 0.06) 60%, transparent 100%)",
            filter: "blur(32px)",
          }}
        />

        {/* Avatar frame — 50% of container, clearly visible */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: "50%",
            height: "50%",
            border: "2.5px solid rgba(180, 154, 90, 0.75)",
            boxShadow: "0 0 0 5px rgba(180, 154, 90, 0.15), 0 0 45px rgba(180, 154, 90, 0.40)",
            zIndex: 2,
          }}
        >
          <Image
            src="/anuraj.png"
            alt="Anuraj Singh — Mobile App Developer specializing in React Native and Expo"
            fill
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 290px, 320px"
            className="object-cover"
            style={{ objectPosition: "center center" }}
            priority
            quality={90}
          />
        </div>

        {/* HUD scanning dot — orbits just outside avatar */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: "55%", height: "55%",
            borderColor: "rgba(180, 154, 90, 0.35)",
            zIndex: 3,
          }}
          animate={isIntroActive ? { rotate: 0 } : { rotate: -360 }}
          transition={
            isIntroActive
              ? { duration: 0 }
              : { duration: 7, repeat: Infinity, ease: "linear" }
          }
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 9, height: 9,
              top: "50%", left: "-4.5px",
              transform: "translateY(-50%)",
              background: "#B49A5A",
              boxShadow: "0 0 14px #B49A5A, 0 0 28px #B49A5A",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
