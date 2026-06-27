export type BuildLogEntry = {
  date: string;
  title: string;
  description: string;
  tags: string[];
};

export const buildLogEntries: BuildLogEntry[] = [
  {
    date: "2026-06-27",
    title: "Launched Akbarali.dev",
    description:
      "Published public proof-of-work site to showcase exam-tech products and builder profile.",
    tags: ["Website", "Next.js"],
  },
  {
    date: "2026-06-15",
    title: "SAT Acer Proctor Dashboard",
    description:
      "Built live proctor monitoring with violation tracking and session controls.",
    tags: ["SAT Acer", "Proctoring"],
  },
  {
    date: "2026-06-01",
    title: "IELTS Acer Load Testing",
    description:
      "Validated 100+ concurrent student sessions with k6 load testing.",
    tags: ["IELTS Acer", "Infrastructure"],
  },
  {
    date: "2026-05-20",
    title: "AI Writing Feedback Pipeline",
    description:
      "Integrated AI-assisted Writing feedback into examiner grading workflow.",
    tags: ["IELTS Acer", "AI"],
  },
  {
    date: "2026-05-01",
    title: "SAT Acer Adaptive Engine",
    description:
      "Implemented Bluebook-style adaptive mock test engine with domain scoring.",
    tags: ["SAT Acer", "Testing"],
  },
  {
    date: "2026-04-10",
    title: "IELTS Acer Desktop Auto-Updates",
    description:
      "Shipped production auto-update pipeline for Electron exam client.",
    tags: ["IELTS Acer", "Desktop"],
  },
];
