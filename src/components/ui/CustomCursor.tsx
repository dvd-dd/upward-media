"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 180, damping: 22 });
  const ringY = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const addHoverListeners = () => {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-magnetic]'
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, ringX, ringY]);

  const show = enabled && visible;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: show ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 12 : 8,
            height: hovering ? 12 : 8,
            backgroundColor: hovering ? "#8B5CF6" : "#00D4AA",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full"
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: show ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 52 : 32,
            height: hovering ? 52 : 32,
            borderColor: hovering
              ? "rgba(139, 92, 246, 0.6)"
              : "rgba(0, 212, 170, 0.4)",
          }}
          transition={{ duration: 0.25 }}
          className="rounded-full border"
        />
      </motion.div>
    </>
  );
}
