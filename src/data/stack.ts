export type StackGroup = {
  category: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "Django REST Framework",
      "PostgreSQL",
      "JWT Auth",
    ],
  },
  {
    category: "Desktop",
    items: ["Electron", "electron-builder", "auto-update pipelines"],
  },
  {
    category: "AI",
    items: [
      "OpenAI",
      "Anthropic Claude",
      "AI-assisted grading",
      "AI tutoring",
    ],
  },
  {
    category: "Infrastructure",
    items: [
      "Docker",
      "DigitalOcean",
      "Caddy",
      "Nginx",
      "S3-compatible storage",
      "GitHub Actions",
    ],
  },
  {
    category: "Product",
    items: [
      "Exam platforms",
      "Admin dashboards",
      "Multi-role systems",
      "Payment flows",
      "Proctoring",
      "Analytics",
    ],
  },
];
