export const SITE = {
  name: "Upward Media",
  title: "Upward Media | Digital Agency",
  description:
    "Transformamos ideias em experiências digitais que geram resultados reais para o seu negócio.",
  url: "https://upwardbr.com",
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

export const SERVICE_DETAILS: Record<
  string,
  { fullDescription: string; features: string[] }
> = {
  "Web Development": {
    fullDescription:
      "We build fast, modern websites that don't just look great — they perform. From single landing pages designed to convert, to full multi-page business sites and custom web applications, every project is hand-coded with the latest technology. No templates. No page builders. Just clean, optimized code built for speed, SEO, and scalability.",
    features: [
      "Custom landing pages",
      "Multi-page business websites",
      "Custom web applications & systems",
      "Responsive design (mobile, tablet, desktop)",
      "Performance optimization & fast load times",
      "SEO-ready structure",
    ],
  },
  "Branding & Identity": {
    fullDescription:
      "Your brand is more than a logo — it's the feeling people get when they interact with your business. We create complete brand identities from scratch, or work with your existing brand to build a cohesive digital presence. Every color, font, and visual element is chosen with purpose to make your brand unforgettable.",
    features: [
      "Logo design & brand mark creation",
      "Complete color palette & typography system",
      "Brand guidelines document",
      "Visual identity across all platforms",
      "Brand strategy & positioning",
      "Integration with existing brand assets",
    ],
  },
  "Digital Marketing": {
    fullDescription:
      "Getting found online isn't luck — it's strategy. We combine SEO, paid advertising, and data-driven growth tactics to put your business in front of the people who matter most. Every campaign is tracked, measured, and optimized to maximize your return on investment.",
    features: [
      "Technical & on-page SEO optimization",
      "Google Ads campaign management",
      "Meta Ads (Instagram & Facebook) campaigns",
      "Lead generation funnels",
      "Analytics & performance tracking",
      "Custom growth strategy",
    ],
  },
  "Social Media": {
    fullDescription:
      "Your social media presence is your brand's daily conversation with the world. We handle everything — from creating scroll-stopping content and editing professional videos to managing your accounts and engaging with your audience. You focus on running your business; we'll make sure your brand stays active and relevant.",
    features: [
      "Content creation (posts, reels, stories)",
      "Professional video editing",
      "Account management & scheduling",
      "Community engagement",
      "Content calendar & strategy",
      "Performance reporting",
    ],
  },
  "Ongoing Support": {
    fullDescription:
      "Launching is just the beginning. We stay with you after go-live with reliable hosting, proactive maintenance, and weekly check-ins to review your performance and plan next steps. Think of us as your long-term digital partner, not a one-time vendor.",
    features: [
      "Managed hosting & maintenance",
      "Free first-month support",
      "Weekly performance reviews",
      "Google Business Profile management",
      "Priority bug fixes & updates",
      "Strategic growth recommendations",
    ],
  },
};

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
    image: "/images/portfolio/pecaai-logo.jpeg",
    tags: ["Branding", "Visual Identity", "App Design"],
    tagline: "Find it. Order it. Delivered.",
    about:
      "PeçaAí is a marketplace app designed for auto repair shops — think Uber Eats for car parts. We created the complete brand identity from scratch, including logo, color system, typography, tone of voice, and a full brand deck.",
    brandColor: "#1F6BFF",
    category: "Branding",
  },
  {
    slug: "luxor",
    title: "Luxor",
    description: "Premium gold logo for a luxury brand",
    image: "/images/portfolio/luxor-logo.jpg",
    tags: ["Logo Design", "Luxury", "Branding"],
    tagline: "Exclusivity. Sophistication. Prestige.",
    about:
      "A brand built to represent the highest standard — not just in products and services, but in experience, status, and perceived value. Luxor exists to elevate what it means to live with excellence.",
    brandColor: "#D4A853",
    category: "Branding",
  },
  // {
  //   slug: "nextmoney",
  //   title: "NextMoney",
  //   description: "Fintech brand for tax intelligence and business credit",
  //   image: "/images/portfolio/nextmoney-logo.jpeg",
  //   tags: ["Branding", "Fintech", "Logo Design"],
  //   tagline: "Tax intelligence and business credit in one ecosystem.",
  //   about:
  //     "NextNumber | NextMoney is a fintech ecosystem connecting companies to growth through strategy and security. The brand merges tax intelligence with business credit solutions into a single, unified platform.",
  //   brandColor: "#1B2A4A",
  //   category: "Branding",
  // },
  {
    slug: "woodframe",
    title: "Wood Frame",
    description: "Natural branding for a wood design company",
    image: "/images/portfolio/woodframe-logo.jpg",
    tags: ["Logo Design", "Natural", "Branding"],
    tagline: "Design born from nature.",
    about:
      "A brand that transforms the natural into the sophisticated — with calm, clarity, and elegance. Wood Frame brings the beauty of natural materials into a refined visual identity.",
    brandColor: "#B8956A",
    category: "Branding",
  },
  {
    slug: "phoenix",
    title: "Phoenix",
    description: "Cybersecurity brand with rebirth symbolism",
    image: "/images/portfolio/phoenix-logo.jpg",
    tags: ["Branding", "Cybersecurity", "Logo Design"],
    tagline: "Intelligent Protection. Constant Evolution.",
    about:
      "A brand born to protect people, data, and systems — with the strength of rebirth and the precision of modern technology. Phoenix combines cybersecurity with the symbolism of constant renewal.",
    brandColor: "#7C3AED",
    category: "Branding",
  },
] as const;
