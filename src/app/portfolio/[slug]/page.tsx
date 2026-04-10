import { notFound } from "next/navigation";

/*
  All portfolio projects now have dedicated static pages:
  /portfolio/pecaai, /portfolio/luxor, /portfolio/phoenix,
  /portfolio/woodframe, /portfolio/nextmoney

  This dynamic route serves as a 404 fallback for unknown slugs.
  Next.js prioritizes static routes over dynamic ones, so the
  dedicated pages will always be used for known projects.
*/
export default function PortfolioFallback() {
  notFound();
}
