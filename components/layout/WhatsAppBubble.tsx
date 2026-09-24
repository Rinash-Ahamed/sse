"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppBubble() {
  return (
    <motion.a
      href={generalWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className="fixed z-40 bottom-24 right-5 md:bottom-7 md:right-7 flex h-13 w-13 md:h-14 md:w-14 items-center justify-center rounded-full bg-accent hover:bg-accent-strong shadow-lg shadow-black/15"
      style={{ height: 52, width: 52 }}
    >
      <MessageCircle className="h-6 w-6 text-white" fill="white" strokeWidth={0} />
    </motion.a>
  );
}
