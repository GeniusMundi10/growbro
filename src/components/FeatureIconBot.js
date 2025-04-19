import React from "react";
import { motion } from "framer-motion";

export default function FeatureIconBot() {
  return (
    <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="AI Bot Icon">
      <motion.circle cx="24" cy="24" r="22" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} />
      <motion.circle cx="24" cy="22" r="12" fill="#fff" stroke="#10B981" strokeWidth="2" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} />
      <motion.circle cx="20" cy="21" r="2" fill="#10B981" />
      <motion.circle cx="28" cy="21" r="2" fill="#10B981" />
      <motion.path d="M20 27 Q24 31 28 27" stroke="#10B981" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.7 }} />
    </motion.svg>
  );
}
