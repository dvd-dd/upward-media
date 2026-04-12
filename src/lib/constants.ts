export const SITE = {
  name: "Upward Media",
  url: "https://upwardbr.com",
  whatsapp: "https://wa.me/5535998996851",
  whatsappNumber: "5535998996851",
  email: "hello@upwardbr.com",
  phone: "+55 35 99899-6851",
};

// Service keys + structural metadata. Strings live in messages/*.json under "services.items".
export const SERVICE_KEYS = [
  "webdev",
  "branding",
  "marketing",
  "social",
  "support",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_ICONS: Record<ServiceKey, "Globe" | "Palette" | "TrendingUp" | "Video" | "Headphones"> = {
  webdev: "Globe",
  branding: "Palette",
  marketing: "TrendingUp",
  social: "Video",
  support: "Headphones",
};

// Process step keys. Strings live in messages/*.json under "process.steps".
export const PROCESS_KEYS = [
  "discovery",
  "strategy",
  "design",
  "development",
  "launch",
  "growth",
] as const;

export type ProcessKey = (typeof PROCESS_KEYS)[number];

// Differential keys. Strings live in messages/*.json under "differentials.items".
export const DIFFERENTIAL_KEYS = [
  "tailored",
  "weekly",
  "performance",
  "fullService",
  "postLaunch",
] as const;

export type DifferentialKey = (typeof DIFFERENTIAL_KEYS)[number];

// Form service option keys. Strings live in messages/*.json under "contact.form.services".
export const SERVICE_OPTION_KEYS = [
  "webdev",
  "branding",
  "marketing",
  "social",
  "full",
  "other",
] as const;

export type PortfolioCategory = "Branding" | "Website";

export type PortfolioProject = {
  slug: string;
  image: string;
  brandColor: string;
  category: PortfolioCategory;
  liveUrl?: string;
};

// Structural project data. User-facing strings (title, description, tagline, tags, about)
// live in messages/*.json under "portfolio.projects.<slug>" and per-case namespaces.
export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    slug: "pecaai",
    image: "/images/portfolio/pecaai-logo.jpeg",
    brandColor: "#1F6BFF",
    category: "Branding",
  },
  {
    slug: "luxor",
    image: "/images/portfolio/luxor-logo.jpg",
    brandColor: "#D4A853",
    category: "Branding",
  },
  {
    slug: "woodframe",
    image: "/images/portfolio/woodframe-logo.jpg",
    brandColor: "#B8956A",
    category: "Branding",
  },
  {
    slug: "phoenix",
    image: "/images/portfolio/phoenix-logo.jpg",
    brandColor: "#7C3AED",
    category: "Branding",
  },
  {
    slug: "luxor-site",
    image: "/images/portfolio/luxor-logo.jpg",
    brandColor: "#D4A853",
    category: "Website",
    liveUrl: "/portfolio/luxor-site/index.html",
  },
  {
    slug: "phoenix-site",
    image: "/images/portfolio/phoenix-logo.jpg",
    brandColor: "#7C3AED",
    category: "Website",
    liveUrl: "/portfolio/phoenix-site/index.html",
  },
  {
    slug: "woodframe-site",
    image: "/images/portfolio/woodframe-logo.jpg",
    brandColor: "#B8956A",
    category: "Website",
    liveUrl: "/portfolio/woodframe-site/index.html",
  },
  {
    slug: "pecaai-site",
    image: "/images/portfolio/pecaai-logo.jpeg",
    brandColor: "#1F6BFF",
    category: "Website",
    liveUrl: "/portfolio/pecaai-site/index.html",
  },
];
