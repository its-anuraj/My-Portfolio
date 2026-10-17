export const personalInfo = {
  name: "Anuraj Singh",
  role: "Mobile App Developer | React Native & Expo",
  titlePositioning: "Anuraj Singh — Mobile App Developer | React Native & Expo",
  tagline: "B.Tech CSE (2023–2027) · KCC Institute of Technology & Management · Greater Noida",
  college: "KCC Institute of Technology & Management",
  educationDegree: "B.Tech in Computer Science and Engineering",
  graduationYear: "2027",
  cgpa: "7.62 / 10.0",
  location: "Greater Noida, Uttar Pradesh, India",
  email: "ajsinghindolia@gmail.com",
  phone: "+91 6397193704",
  github: "https://github.com/its-anuraj",
  linkedin: "https://www.linkedin.com/in/anuraj-singh-47330030a/",
  website: "https://anuraj-singh.vercel.app",
  bio: "I'm Anuraj Singh, a Mobile App Developer and 4th-year B.Tech Computer Science student at KCC Institute of Technology & Management, Greater Noida (expected graduation 2027). I specialize in engineering cross-platform mobile applications using React Native, Expo, and TypeScript, backed by modern cloud databases like Supabase and Firebase. A former Google Ambassador alum and HackIndia participant, I focus on clean architecture, smooth 60fps animations, and practical AI integrations.",
  shortBio: "Mobile App Developer specializing in React Native, Expo, and TypeScript. 4th-year B.Tech CSE student at KCC ITM, Greater Noida. Google Ambassador alum & HackIndia builder crafting elegant, performant mobile applications.",
};

export const stats = [
  { label: "Graduation", value: "2027" },
  { label: "Primary Stack", value: "React Native" },
  { label: "Core Skills", value: "25+" },
  { label: "Hackathons", value: "HackIndia" },
];

export const educationDetails = {
  degree: "Bachelor of Technology (B.Tech)",
  major: "Computer Science and Engineering",
  institution: "KCC Institute of Technology & Management",
  university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
  location: "Greater Noida, Uttar Pradesh, India",
  duration: "2023 – 2027",
  status: "4th Year · Expected Graduation 2027",
  cgpa: "7.62 / 10.0",
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (Java / C++)",
    "Database Management Systems (SQL)",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
  ],
  highlights: [
    "Google Ambassador Program Member (2025)",
    "HackIndia Hackathon Participant (2026)",
    "Specialization in Mobile Application Engineering",
  ],
};

export const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Python", "SQL", "C", "C++", "HTML5/CSS3"],
    color: "gold",
  },
  {
    category: "Mobile & Frontend",
    items: [
      "React Native",
      "Expo",
      "Android Studio",
      "React.js",
      "NativeWind",
      "Zustand",
      "Tailwind CSS",
      "Framer Motion",
    ],
    color: "gold",
  },
  {
    category: "Cloud, BaaS & Backend",
    items: [
      "Supabase",
      "Firebase",
      "Clerk Auth",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "Gemini AI API",
    ],
    color: "gold",
  },
  {
    category: "DevOps & Developer Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "VS Code",
      "Power BI",
      "MS Excel",
    ],
    color: "gold",
  },
];

export interface ProjectItem {
  title: string;
  subtitle: string;
  purpose: string;
  problem: string;
  contribution: string;
  features: string[];
  tags: string[];
  github?: string;
  demo?: string;
  demoCredentials?: { email?: string; password?: string };
  status: "Completed" | "In Progress" | "Completed MVP" | "Working Prototype";
  featured: boolean;
}

export const projects: ProjectItem[] = [
  {
    title: "Keepr — Personal Asset Management Application",
    subtitle: "AI-Powered Digital Ownership & Asset Vault",
    purpose:
      "A comprehensive digital ownership vault engineered to organize purchased assets, warranties, receipts, return deadlines, and service maintenance records.",
    problem:
      "Physical paper receipts fade, return windows expire unnoticed, and misplaced warranty papers create major friction during repair or insurance claims.",
    contribution:
      "Architected the complete mobile client in React Native and Expo; structured the Supabase database schema with Row Level Security (RLS) policies for encrypted document storage; integrated Google Gemini Multimodal API via Edge Functions for automated receipt OCR and metadata classification; implemented client-side state using Zustand.",
    features: [
      "Google Gemini Multimodal API integration for automatic receipt scanning and invoice parsing",
      "Supabase PostgreSQL backend with strict Row Level Security (RLS) data isolation",
      "Encrypted cloud document storage for receipts, invoices, and warranty cards",
      "Automated return window and warranty expiration alerts",
      "Total asset valuation metrics, category breakdown, and item maintenance log",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini AI", "Zustand"],
    github: "https://github.com/its-anuraj/Keepr",
    status: "Completed MVP",
    featured: true,
  },
  {
    title: "SERS — Smart Emergency Response System",
    subtitle: "Real-Time Incident Detection & Emergency Telemetry",
    purpose:
      "A real-time emergency response mobile application engineered to detect severe accident triggers and rapidly route location telemetry to families and medical responders.",
    problem:
      "Accident victims are frequently unable to dial emergency numbers, and panicked witnesses struggle to convey precise GPS coordinates to first responders in time.",
    contribution:
      "Developed the mobile interface using React Native and TypeScript; designed the multi-factor accident detection algorithms using mobile sensor telemetry; built a 10-second fail-safe false-alarm cancellation system; integrated Google Maps API and cloud services for automated alert broadcasting with live GPS coordinates.",
    features: [
      "Multi-factor emergency trigger detection based on speed drop and motion sensor signals",
      "10-second fail-safe countdown timer preventing accidental false-alarm dispatches",
      "Automated dispatch of live GPS telemetry to designated family contacts and responder services",
      "Integrated emergency medical guidelines and interactive mapping to nearest hospitals",
    ],
    tags: ["React Native", "TypeScript", "Firebase", "Node.js", "Maps API"],
    github: "https://github.com/its-anuraj/Disaster-alert/releases/tag/Disaster_alert",
    status: "Working Prototype",
    featured: true,
  },
  {
    title: "TeamForge.ai — Smart Workforce Orchestrator",
    subtitle: "Intelligent Project & Team Allocation System",
    purpose:
      "A collaborative project management platform developed during HackIndia 2026 to analyze contributor skill profiles, balance workloads, and optimize sprint execution.",
    problem:
      "Hackathon and engineering teams frequently struggle with mismatched skill sets, uneven task distribution, and invisible project bottlenecks.",
    contribution:
      "Co-developed the full-stack system architecture during the 48-hour HackIndia 2026 hackathon; engineered responsive dashboard interfaces in React; built RESTful API endpoints for skill profiles and task assignments; integrated team composition matching logic.",
    features: [
      "Candidate skill profiling and automated recommendations for balanced team formation",
      "Unified project dashboard for task lifecycle management, status tracking, and milestone reviews",
      "Early deadline risk indicator highlighting bottlenecks across pending deliverables",
      "Role-based access control and live demo login credentials",
    ],
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "REST APIs"],
    github: "https://github.com/its-anuraj/hackindia-spark-4-ncr-east-region-bit-rebels",
    demo: "https://hackindia-spark-4-ncr-east-region-b.vercel.app/",
    demoCredentials: {
      email: "user@gmail.com",
      password: "1234",
    },
    status: "Completed",
    featured: true,
  },
  {
    title: "Personal Expense Tracker",
    subtitle: "Offline-First Daily Expense Logging",
    purpose:
      "A lightweight mobile application designed for frictionless tracking of daily personal expenses, category management, and budget monitoring directly on Android.",
    problem:
      "Complex financial apps often require persistent internet access, complicated multi-step flows, and unnecessary bloat for simple daily cash expenses.",
    contribution:
      "Engineered the mobile client, created intuitive transaction entry flows, and published standalone installable Android APK builds on GitHub.",
    features: [
      "Rapid one-tap expense logging and custom category classification",
      "Daily and monthly expenditure summaries with visual budget breakdowns",
      "Standalone Android APK distribution for offline use",
    ],
    tags: ["React Native", "TypeScript", "Android", "Mobile App"],
    github: "https://github.com/its-anuraj/Expense-tracker/releases/tag/v1.0.0",
    status: "Completed",
    featured: false,
  },
];

export const experiences = [
  {
    role: "Google Student Ambassador",
    org: "Google",
    period: "Aug 2024 – Jan 2025",
    description:
      "Selected as Google Ambassador representing Google technologies on campus. Conducted hands-on developer workshops on Gemini AI and generative developer tools, organized tech talks, and mentored students in AI-powered development workflows.",
    type: "experience",
    icon: "google",
  },
  {
    role: "HackIndia Hackathon Participant",
    org: "HackIndia",
    period: "2026",
    description:
      "Competed in HackIndia, one of India's largest nationwide hackathons. Collaborated in a team to build and present TeamForge within 48 hours, delivering a functional full-stack prototype under strict deadlines.",
    type: "achievement",
    icon: "trophy",
  },
  {
    role: "Mobile App Developer",
    org: "Independent & Open Source",
    period: "2024 – Present",
    description:
      "Focusing on cross-platform mobile development with React Native, Expo, and TypeScript. Engineering high-performance mobile architectures, state management with Zustand, and multimodal AI integrations.",
    type: "experience",
    icon: "code",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];
