export const SITE = {
  name: "Upward Media",
  title: "Upward Media | Digital Agency",
  description:
    "Transformamos ideias em experiências digitais que geram resultados reais para o seu negócio.",
  url: "https://upwardmedia.com.br",
  whatsapp: "https://wa.me/5535989896851",
};

export const NAV_LINKS = [
  { label: "What We Do", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES = [
  {
    icon: "Globe" as const,
    title: "Web Development",
    description:
      "Landing pages, multi-page websites, and custom web applications crafted with modern technology and built for performance.",
  },
  {
    icon: "Palette" as const,
    title: "Branding & Identity",
    description:
      "Complete brand creation or integration of your existing brand into a stunning digital presence. Logo, colors, typography, and beyond.",
  },
  {
    icon: "TrendingUp" as const,
    title: "Digital Marketing",
    description:
      "SEO optimization, Meta and Google Ads campaigns, and custom growth strategies to put your business in front of the right people.",
  },
  {
    icon: "Video" as const,
    title: "Social Media",
    description:
      "Content creation, professional video editing, and full account management to keep your brand active and engaging.",
  },
  {
    icon: "Headphones" as const,
    title: "Ongoing Support",
    description:
      "Hosting, maintenance, weekly performance reviews, and Google Business Profile management. We're with you after launch.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, goals, audience, and competitive landscape.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "A custom roadmap is built around your specific objectives and budget.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Wireframes, mockups, and brand elements come to life for your approval.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Your project is built with modern tech, optimized for speed and SEO.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Rigorous testing, final tweaks, and a smooth go-live day.",
  },
  {
    number: "06",
    title: "Growth",
    description:
      "Ongoing optimization, performance tracking, and strategic scaling.",
  },
] as const;

export const DIFFERENTIALS = [
  {
    title: "Tailored Strategy",
    description:
      "No cookie-cutter solutions. Every plan is built from scratch based on your unique goals and market.",
  },
  {
    title: "Weekly Check-ins",
    description:
      "We meet with you every week to review performance, adjust tactics, and make sure you're in the loop.",
  },
  {
    title: "Performance-First",
    description:
      "Every design choice, every line of code, every ad dollar — optimized for measurable results.",
  },
  {
    title: "Full-Service Agency",
    description:
      "Branding, development, marketing, social media — one team handling everything seamlessly.",
  },
  {
    title: "Post-Launch Support",
    description:
      "Free first-month support, ongoing maintenance, and a dedicated team that doesn't disappear after delivery.",
  },
] as const;

export const PORTFOLIO_PROJECTS = [
  {
    slug: "pecaai",
    title: "PeçaAí",
    description: "Complete brand identity for an automotive marketplace",
    image: "/images/portfolio/pecaai-icon.png",
    tags: ["Branding", "Visual Identity", "App Design"],
    featured: true,
  },
  {
    slug: "luxor",
    title: "Luxor",
    description: "Premium gold logo for a luxury brand",
    image: "/images/portfolio/luxor-logo.jpg",
    tags: ["Logo Design", "Luxury"],
  },
  {
    slug: "nextfinder",
    title: "NEXTFINDER",
    description: "Bold tech wordmark for a digital platform",
    image: "/images/portfolio/nextfinder-logo.jpg",
    tags: ["Logo Design", "Tech"],
  },
  {
    slug: "woodframe",
    title: "Wood Frame",
    description: "Natural branding for a wood design company",
    image: "/images/portfolio/woodframe-logo.jpg",
    tags: ["Logo Design", "Natural"],
  },
  {
    slug: "phoenix",
    title: "Phoenix",
    description: "Abstract ethereal bird symbol",
    image: "/images/portfolio/phoenix-logo.jpg",
    tags: ["Logo Design", "Abstract"],
  },
] as const;
