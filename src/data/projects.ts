export type ProjectStatus = "live" | "development" | "coming-soon";

export type ProjectScreenshot = {
  title: string;
  description: string;
  src?: string;
  variant?: "landing" | "dashboard" | "exam" | "grading" | "score" | "proctor" | "ai" | "upcoming";
};

export type Project = {
  id: string;
  name: string;
  url?: string;
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  role: string;
  proof: string;
  badges: string[];
  screenshots: ProjectScreenshot[];
  heroImage?: string;
  logo?: string;
  accent: string;
  upcoming?: string[];
};

export const projects: Project[] = [
  {
    id: "ielts-acer",
    name: "IELTS Acer",
    url: "https://ielts-acer.com",
    status: "live",
    statusLabel: "Live / Actively Developed",
    tagline:
      "Secure multi-tenant IELTS mock-exam platform with desktop testing, grading, payments, and admin analytics.",
    description:
      "IELTS Acer helps IELTS prep centers run computer-delivered mock exams through a secure Electron desktop app and web-based admin dashboards. Students take Listening, Reading, and Writing tests in an exam-style interface, while admins assign tests, manage students, publish results, and handle paid mock bookings. The platform also includes examiner grading workflows, AI-assisted writing feedback, payment integrations, tenant billing, and developer operations tooling.",
    features: [
      "Secure cross-platform Electron desktop exam app",
      "Multi-tenant admin dashboard for IELTS centers",
      "Listening, Reading, and Writing exam sessions",
      "Student results, mistake review, and public result checking",
      "Examiner grading workflow with AI-assisted Writing feedback",
      "Paid mock booking and payment flows using Payme/Click",
      "Developer dashboard for tenants, billing, licenses, and system health",
      "Auto-update and deployment pipeline for production desktop releases",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Electron",
      "Express",
      "PostgreSQL",
      "Docker",
      "DigitalOcean",
      "S3-compatible storage",
      "Payme/Click",
      "OpenAI",
      "Jest",
      "Playwright",
      "k6",
    ],
    role: "Co-founder / full-stack developer",
    proof:
      "Live production deployment, multi-role SaaS architecture, payment workflows, desktop auto-updates, and load testing for 100+ concurrent students.",
    badges: [
      "Live Product",
      "Electron",
      "Multi-Tenant",
      "Payments",
      "AI Writing Feedback",
      "PostgreSQL",
      "Docker",
      "DigitalOcean",
    ],
    heroImage: "/projects/ielts-acer-mobile.png",
    logo: "/logos/ielts-acer.png",
    screenshots: [
      {
        title: "Mobile Landing",
        description: "Practice IELTS. Score higher. — center-facing product page with app download and mock test entry.",
        src: "/projects/ielts-acer-mobile.png",
        variant: "landing",
      },
    ],
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "sat-acer",
    name: "SAT Acer",
    url: "https://sat-acer.uz",
    status: "development",
    statusLabel: "In Development / Staging-ready",
    tagline:
      "Full-stack Digital SAT prep platform with adaptive Bluebook-style mocks, analytics, proctoring, admin tools, and AI tutoring.",
    description:
      "SAT Acer is a full-stack SAT preparation platform built to mirror the real Digital SAT experience. Students can take adaptive, timed mock tests, review score reports by domain, practice weak areas, and get help from an AI SAT tutor. Teachers and prep centers can manage students, groups, assignments, test content, and live proctored sessions from admin dashboards.",
    features: [
      "Bluebook-style adaptive SAT mock tests",
      "Timed modules, breaks, review, calculator, and reference tools",
      "Score reports with RW/Math scaling and domain breakdowns",
      "Student dashboard with goals, streaks, countdown, and study plan",
      "Admin/teacher tools for students, groups, assignments, and test publishing",
      "Live proctor dashboard with anti-cheat violation tracking",
      "AI SAT tutor with streaming Claude responses",
      "Free/Pro gating infrastructure for paid features",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Django REST Framework",
      "PostgreSQL",
      "SimpleJWT",
      "Docker",
      "Caddy",
      "Anthropic Claude",
      "Google OAuth",
    ],
    role: "Co-founder / full-stack developer",
    proof:
      "Adaptive testing engine, Bluebook-style session UI, AI tutoring, anti-cheat/proctoring, score analytics, and production-ready Docker deployment architecture.",
    badges: [
      "In Development",
      "Digital SAT",
      "Adaptive Testing",
      "AI Tutor",
      "Proctoring",
      "Next.js",
      "Django",
      "PostgreSQL",
    ],
    heroImage: "/projects/sat-acer-mobile.png",
    logo: "/logos/sat-acer.png",
    screenshots: [
      {
        title: "Mobile Landing",
        description:
          "The Digital SAT, rehearsed like the real thing — Bluebook-style practice with prep center trust signals.",
        src: "/projects/sat-acer-mobile.png",
        variant: "landing",
      },
    ],
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: "coming-soon",
    name: "More Projects Coming Soon",
    status: "coming-soon",
    statusLabel: "Upcoming",
    tagline:
      "New tools, experiments, and education products will be added here as they ship.",
    description:
      "New tools, experiments, and education products will be added here as they ship.",
    features: [],
    techStack: [],
    role: "",
    proof: "",
    badges: [],
    screenshots: [],
    accent: "from-zinc-500/10 to-zinc-600/5",
    upcoming: ["Scholara", "Tiny Invite", "SAT content tools", "AI education tools"],
  },
];
