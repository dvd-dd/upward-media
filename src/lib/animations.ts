import gsap from "gsap";

export const fadeInUp = (element: Element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out" }
  );
};

export const staggerChildren = (parent: Element, stagger = 0.1) => {
  gsap.fromTo(
    parent.children,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger,
      ease: "power3.out",
    }
  );
};

export const scaleIn = (element: Element, delay = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.6, delay, ease: "power3.out" }
  );
};
