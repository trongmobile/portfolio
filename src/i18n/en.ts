/**
 * English UI copy — the default locale. `vi.ts` must match this shape
 * (TypeScript enforces it through `Dictionary`).
 */
export const en = {
  site: {
    title: "Trong Tran — Flutter Developer & Mobile Engineer",
    description:
      "Portfolio of Trong Tran, a Flutter Developer building mobile products across public transportation, smart city solutions, and digital learning.",
    location: "Ho Chi Minh City, Vietnam",
  },
  nav: {
    language: "Language",
    backToTop: "back to top",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    downloadCv: "Download CV",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primary: "Primary",
    skipToContent: "Skip to content",
  },
  hero: {
    eyebrow: "Mobile Engineer",
    headlineLead: "Building mobile products",
    headlineTail: "that solve real‑world problems.",
    expertiseLabel: "Core expertise",
    scrollHint: "Scroll",
    scrollHintLabel: "Scroll to highlights",
    intro:
      "I’m Trong Tran, a Flutter Developer focused on building reliable, scalable, and user-centered mobile applications. From public transportation and smart city platforms to digital learning products, I turn product requirements into production-ready experiences.",
    primaryCta: "Explore My Work",
    secondaryCta: "Get In Touch",
    expertise: [
      "Flutter",
      "Dart",
      "Mobile Architecture",
      "REST APIs",
      "Product Engineering",
    ],
    visualLabel:
      "Abstract illustration of a mobile app connected to product services",
  },
  highlights: {
    title: "Professional highlights",
    releasedOn: "Shipped to",
  },
  about: {
    eyebrow: "About",
    title: "A Flutter engineer who cares about the whole product.",
    paragraphs: [
      "I’m a Flutter Developer at FPT IS with more than five years of professional experience, most of it spent shipping cross-platform mobile apps that people rely on every day — metro ticketing, live traffic information, public bus tracking, HR self-service and online learning.",
      "My focus is maintainable architecture: clear layers with Bloc and Clean Architecture, predictable state, and careful integration with REST APIs, WebSocket streams, Firebase and payment services. I take apps from requirements through Google Play and App Store releases.",
      "I work closely with backend, design, QA and product teams, lead a small Flutter team, and spend real time on code reviews and mentoring. I care about building software that stays reliable, easy to change, and genuinely useful to the people who use it.",
    ],
    factsTitle: "At a glance",
    facts: {
      basedIn: "Based in",
      current: "Currently",
      focus: "Focus",
      education: "Education",
    },
    focusValue: "Flutter · Mobile architecture",
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I’ve been building.",
    description:
      "From web fundamentals to leading Flutter development for public-sector and enterprise products.",
    educationTitle: "Education",
    current: "Current",
  },
  projects: {
    eyebrow: "Selected work",
    title: "Products in the hands of real users.",
    description:
      "Applications for public transportation, smart cities, education and enterprise — built as part of product teams at FPT IS and earlier roles.",
    filterLabel: "Filter projects by category",
    viewDetails: "View details",
    moreTitle: "More projects",
    moreDescription: "Additional apps, regional variants and Zalo Mini Apps.",
    empty: "No projects in this category yet.",
    showing: (count: number) => `${count} project${count === 1 ? "" : "s"}`,
    dialog: {
      close: "Close project details",
      overview: "Overview",
      features: "Key features",
      featuresToVerify: "To be confirmed",
      related: "Product family",
      role: "My contribution",
      technologies: "Technologies",
      platforms: "Platforms",
      teamSize: "Team size",
      links: "Links",
      screenshots: "Screenshots",
    },
    platformsUnknown: "Platforms to be confirmed",
  },
  skills: {
    eyebrow: "Skills",
    title: "Tools I use to ship.",
    description:
      "Grouped by how I use them day to day — Flutter and mobile architecture at the core.",
  },
  approach: {
    eyebrow: "Approach",
    title: "How I work on a product.",
    description:
      "A general pattern rather than a fixed recipe — each team and project shapes the details.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s build something meaningful.",
    text: "I’m interested in opportunities to build impactful digital products, collaborate with strong engineering teams, and solve challenging mobile development problems.",
    email: "Email",
    copyEmail: "Copy email address",
    copied: "Copied",
    linkedin: "LinkedIn",
    github: "GitHub",
    phone: "Phone",
    cv: "Download CV",
    cvMeta: "PDF",
    location: "Location",
  },
  footer: {
    navLabel: "Footer",
    backToTop: "Back to top",
  },
  platforms: {
    android: "Android",
    ios: "iOS",
    web: "Web",
    zalo: "Zalo Mini App",
  },
  links: {
    "google-play": "Google Play",
    "app-store": "App Store",
    website: "Website",
    zalo: "Zalo Mini App",
  },
};

export type Dictionary = typeof en;
