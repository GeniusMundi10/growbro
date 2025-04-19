import React from "react";
import { motion } from "framer-motion";

export default function FeatureIconChat() {
  return (
    <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Chat Bubble Icon">
      <motion.ellipse cx="24" cy="28" rx="16" ry="10" fill="#D1FAE5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
      <motion.rect x="12" y="14" width="24" height="16" rx="8" fill="#fff" stroke="#10B981" strokeWidth="2" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} />
      <motion.circle cx="20" cy="22" r="2" fill="#10B981" />
      <motion.circle cx="24" cy="22" r="2" fill="#10B981" />
      <motion.circle cx="28" cy="22" r="2" fill="#10B981" />
    </motion.svg>
  );
}
