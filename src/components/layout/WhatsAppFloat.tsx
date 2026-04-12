"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5535998996851"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      style={{
        bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        right: "calc(env(safe-area-inset-right) + 1.5rem)",
      }}
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
}
