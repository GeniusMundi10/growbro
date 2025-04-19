import React from "react";
import { motion } from "framer-motion";

export default function FeatureIconGlobe() {
  return (
    <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Globe Icon">
      <motion.circle cx="24" cy="24" r="22" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} />
      <motion.ellipse cx="24" cy="24" rx="16" ry="10" fill="#D1FAE5" initial={{ scaleY: 0.7 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2, duration: 0.7 }} />
      <motion.path d="M24 4v40M4 24h40" stroke="#10B981" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.7 }} />
    </motion.svg>
  );
}
