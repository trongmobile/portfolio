/**
 * Shared content types. All portfolio content lives in `src/data/*` and is
 * typed against these interfaces so the UI never hard-codes copy.
 */

export type Platform = 'android' | 'ios' | 'web' | 'zalo';

export type ProjectCategory =
  | 'transportation'
  | 'smart-city'
  | 'learning'
  | 'enterprise';

/** Abstract illustration used when no real screenshots are supplied. */
export type ProjectArtwork = 'metro' | 'traffic' | 'bus' | 'learning' | 'hr' | 'gis' | 'survey';

export type ProjectLinkKind = 'google-play' | 'app-store' | 'website' | 'zalo';

export interface ProjectLink {
  kind: ProjectLinkKind;
  /** Must be a real, verified URL. Omit the link entirely when unknown. */
  href: string;
  /** Optional override of the default button label. */
  label?: string;
}

export interface ProjectScreenshot {
  /** Path relative to `public/`, e.g. `images/projects/hcmc-metro/home.webp`. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  /** Stable, URL-safe identifier. */
  id: string;
  name: string;
  /** Short display label for the domain, e.g. "Public Transportation". */
  domain: string;
  /** Used by the gallery filters. */
  category: ProjectCategory;
  /** Featured projects get a large card + detail dialog; others go to "More projects". */
  featured: boolean;
  summary: string;
  /** Related products delivered within the same product family (from the CV). */
  relatedProducts?: string[];
  features: string[];
  /** Capabilities that still need to be confirmed against the shipped product. */
  featuresToVerify?: string[];
  technologies: string[];
  platforms: Platform[];
  /** Team size as listed in the CV. */
  teamSize?: number;
  /** Personal contribution. Only list what can be backed up. */
  contribution?: string[];
  links?: ProjectLink[];
  screenshots?: ProjectScreenshot[];
  artwork: ProjectArtwork;
}

export interface ExperienceItem {
  company: string;
  role: string;
  /** Human readable period, e.g. "May 2021 – Present". */
  period: string;
  /** ISO-like start used for `<time datetime>`. */
  start: string;
  end?: string;
  location?: string;
  summary?: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface EducationItem {
  institution: string;
  url?: string;
  degree: string;
  period: string;
  detail?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

export interface Highlight {
  id: string;
  value: string;
  label: string;
  /** Short context so a figure is never presented without its scope. */
  note?: string;
}

export type ApproachIcon = 'search' | 'layers' | 'plug' | 'shield' | 'rocket';

export interface ApproachStep {
  title: string;
  description: string;
  icon: ApproachIcon;
}

export interface SiteConfig {
  name: string;
  /** Name without diacritics, used where ASCII is safer (file names, meta). */
  nameAscii: string;
  brand: string;
  title: string;
  role: string;
  location?: string;
  description: string;
  /** Locale of the current content. */
  locale: string;
  contact: {
    /** Set to `null` to hide the email link everywhere. */
    email: string | null;
    /** Set to `null` to keep the phone number off the website. */
    phone: string | null;
    /** Full profile URL or `null` to hide. */
    linkedin: string | null;
    /** Full profile URL or `null` to hide. */
    github: string | null;
  };
  /**
   * CV file path relative to `public/`. Set to `null` to hide every
   * "Download CV" button. The build warns when the file is missing.
   */
  cvPath: string | null;
}
