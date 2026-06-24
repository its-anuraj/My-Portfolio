"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Star,
  Box,
  Layers,
  Smartphone,
  Database,
  LayoutGrid,
  Coffee,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NodeDef {
  label: string;
  icon:  LucideIcon;
  angle: number;
}

const CX      = 270;
const CY      = 270;
const OUTER_R = 175; // Radius for the icons
const AVATAR_R = 110;

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function round(n: number)   { return Math.round(n * 10000) / 10000; }

// Exactly 8 nodes, 45 degrees apart to match the reference design perfectly
const NODE_DEFS: NodeDef[] = [
  { label: "4th Year\nB.Tech CSE",    icon: GraduationCap, angle: 0   },
  { label: "Docker",                  icon: Box,           angle: 45  },
  { label: "Kubernetes",              icon: Layers,        angle: 90  },
  { label: "React Native",            icon: Smartphone,    angle: 135 },
  { label: "SQL",                     icon: Database,      angle: 180 },
  { label: "MS Excel",                icon: LayoutGrid,    angle: 225 },
  { label: "Java",                    icon: Coffee,        angle: 270 },
  { label: "Google\nAmbassador",      icon: Star,          angle: 315 },
];

const ORBIT_DURATION = 50; // seconds for one full orbit

export default function HeroOrbit() {
  return (
    <div className="relative mx-auto select-none w-[95vw] sm:w-[450px] lg:w-[480px] xl:w-[540px] aspect-square">
      
      {/* 1. Stationary SVG Rings & Avatar */}
      <svg 
        viewBox="0 0 540 540" 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        aria-hidden="true" 
        style={{ overflow: "visible" }}
      >
        <defs>
          <clipPath id="avatarClip">
            <circle cx={CX} cy={CY} r={AVATAR_R} />
          </clipPath>
        </defs>

        {/* Outer Gold Ring (Stationary) */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.6" />
        
        {/* Avatar Double Ring Border (Stationary) */}
        <circle cx={CX} cy={CY} r={AVATAR_R + 4} fill="none" stroke="var(--accent)" strokeWidth="2" />
        <circle cx={CX} cy={CY} r={AVATAR_R + 4} fill="none" stroke="var(--accent-glow)" strokeWidth="12" opacity="0.4" />
        
        {/* Central Avatar (Stationary) */}
        <image 
          href="/anuraj.png" 
          x={CX - AVATAR_R} 
          y={CY - AVATAR_R} 
          width={AVATAR_R * 2} 
          height={AVATAR_R * 2} 
          clipPath="url(#avatarClip)" 
          preserveAspectRatio="xMidYMid slice" 
        />
      </svg>

      {/* 2. Rotating HTML Layer (Solves SVG foreignObject drifting bugs) */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: ORBIT_DURATION, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {NODE_DEFS.map((node, i) => (
          <div 
            key={node.label}
            className="absolute top-1/2 left-1/2"
            style={{ 
              transform: `translate(-50%, -50%) rotate(${node.angle}deg) translateY(-${OUTER_R}px)`,
              backfaceVisibility: "hidden"
            }}
          >
            {/* Glowing dots exactly on the ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--accent-glow)] opacity-90" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-[var(--accent)]" />

            {/* Icon Container */}
            <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)", backfaceVisibility: "hidden" }}>
              <motion.div 
                initial={{ rotate: -node.angle }}
                animate={{ rotate: -node.angle - 360 }}
                transition={{ repeat: Infinity, duration: ORBIT_DURATION, ease: "linear" }}
                className="w-[52px] h-[52px] rounded-full border-[2px] border-white flex items-center justify-center bg-transparent" 
                style={{ willChange: "transform", backfaceVisibility: "hidden" }}
              >
                <node.icon size={22} style={{ color: "var(--accent)" }} />
              </motion.div>
            </div>
            
            {/* Label Container (Shifted outward from center) */}
            <div 
              className="absolute top-1/2 left-1/2" 
              style={{ transform: "translate(-50%, -50%) translateY(-54px)", backfaceVisibility: "hidden" }}
            >
              {/* Label text counter-rotates to stay perfectly upright */}
              <motion.div
                initial={{ rotate: -node.angle }}
                animate={{ rotate: -node.angle - 360 }}
                transition={{ repeat: Infinity, duration: ORBIT_DURATION, ease: "linear" }}
                className="text-center whitespace-pre-line font-semibold leading-tight w-[130px] text-[13.5px]"
                style={{ 
                  color: "var(--accent)", 
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased"
                }}
              >
                {node.label}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
