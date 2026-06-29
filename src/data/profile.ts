export const profile = {
  siteName: "Akbarali.dev",
  pageTitle: "Akbarali Sodikov — Proof of Work",
  name: "Akbarali Sodikov",
  title: "CS Graduate · EdTech Builder · Full-Stack Developer",
  location: "Bukhara, Uzbekistan",
  headline: "Building exam-tech products from Uzbekistan.",
  subheadline:
    "Computer Science graduate building real education technology products — from secure IELTS mock-exam platforms to adaptive Digital SAT systems.",
  heroCopy:
    "I build exam-tech products, learning platforms, and practical software systems used by students, teachers, and learning centers.",
  links: {
    github: "https://github.com/sodikovakbarali",
    telegram: "https://t.me/akbaraali",
    linkedin: "https://www.linkedin.com/in/akbarali-sodikov/",
    email: "mailto:akbaralisodikov12@gmail.com",
    instagram: "https://www.instagram.com/ad_astra_solutions/",
    personalInstagram: "https://www.instagram.com/akbarali_sodikov1/",
  },
  stats: [
    { value: "2", label: "Products", description: "major exam-tech platforms" },
    { value: "2", label: "Live", description: "production deployments" },
    { value: "1K+", label: "Load-Tested", description: "concurrent students" },
    { value: "U of A", label: "Education", description: "CS graduate" },
  ],
  statsNote: "Stress-tested for center-scale exam sessions.",
  currentlyBuilding: [
    {
      name: "IELTS Acer",
      description:
        "Improving mock test automation, center dashboards, grading workflows, and production exam operations.",
    },
    {
      name: "SAT Acer",
      description:
        "Building a Digital SAT prep platform with adaptive tests, analytics, AI tutoring, and proctoring.",
    },
    {
      name: "Next",
      description:
        "More public tools, learning systems, and small internet experiments.",
    },
  ],
  contact: {
    intro:
      "Interested in exam-tech, education platforms, or developer collaboration? Reach out.",
    availability: [
      {
        label: "EdTech collaborations",
        logo: "/logos/edtech.svg",
        logoAlt: "EdTech collaborations",
      },
      {
        label: "Developer networking",
        logo: "/logos/networking.svg",
        logoAlt: "Developer networking",
      },
      {
        label: "IELTS/SAT center partnerships",
        logo: "/logos/partnerships.svg",
        logoAlt: "IELTS and SAT center partnerships",
      },
      {
        label: "Technical consulting",
        logo: "/logos/consulting.svg",
        logoAlt: "Technical consulting",
      },
      {
        label: "AI automation projects",
        logo: "/logos/ai-automation.svg",
        logoAlt: "AI automation projects",
      },
    ],
  },
  promotions: {
    brand: "Ad Astra Solutions",
    handle: "@ad_astra_solutions",
    tagline: "Demos, promos, and product updates in the wild",
    description:
      "We publish software walkthroughs, feature demos, and center promotions on Instagram — real products shown to real learning centers.",
    highlights: [
      "Product demo reels",
      "Feature launch promos",
      "Center onboarding clips",
      "Behind-the-build updates",
    ],
  },
} as const;
