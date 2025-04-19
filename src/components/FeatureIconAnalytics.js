import React from "react";
import { motion } from "framer-motion";

export default function FeatureIconAnalytics() {
  return (
    <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Analytics Icon">
      <motion.rect x="8" y="28" width="6" height="12" rx="2" fill="#D1FAE5" initial={{ scaleY: 0.7 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7 }} />
      <motion.rect x="20" y="20" width="6" height="20" rx="2" fill="#10B981" initial={{ scaleY: 0.6 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2, duration: 0.7 }} />
      <motion.rect x="32" y="12" width="6" height="28" rx="2" fill="#6EE7B7" initial={{ scaleY: 0.5 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4, duration: 0.7 }} />
      <motion.circle cx="24" cy="24" r="22" stroke="#10B981" strokeWidth="2" fill="none" />
    </motion.svg>
  );
}
