import React from "react";
import { motion } from "framer-motion";

export default function FeatureIconShield() {
  return (
    <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Shield Security Icon">
      <motion.path d="M24 4L8 10v10c0 12 8 20 16 24 8-4 16-12 16-24V10L24 4z" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} />
      <motion.path d="M24 22v8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.7 }} />
      <motion.circle cx="24" cy="32" r="2" fill="#10B981" />
    </motion.svg>
  );
}
