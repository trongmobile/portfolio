import type { SiteConfig } from "../types/index.ts";

/**
 * Central configuration for identity, contact details and the CV file.
 * Source of truth: CV_TranThienTrong_Flutter.pdf.
 *
 * Any contact field set to `null` is hidden from the website — no empty or
 * broken links are rendered.
 */
export const siteConfig: SiteConfig = {
  name: "Trong Tran",
  nameAscii: "Tran Thien Trong",
  brand: "Portfolio",
  title: "Trong Tran — Flutter Developer & Mobile Engineer",
  role: "Flutter Developer · Mobile Engineer",
  location: "Ho Chi Minh City, Vietnam",
  description:
    "Portfolio of Trong Tran, a Flutter Developer building mobile products across public transportation, smart city solutions, and digital learning.",
  locale: "en",
  contact: {
    email: "tranthientrong1998@gmail.com",
    // Listed on the CV, intentionally not published on the website.
    // Replace `null` with the number (e.g. '+84 ...') to show it in the Contact section.
    phone: null,
    // Add the full profile URL, e.g. 'https://www.linkedin.com/in/your-handle'.
    linkedin: null,
    // Add the full profile URL, e.g. 'https://github.com/your-handle'.
    github: null,
  },
  cvPath: "cv/CV_TranThienTrong_Flutter.pdf",
};
