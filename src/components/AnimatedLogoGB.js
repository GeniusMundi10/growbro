import React from "react";
import { motion } from "framer-motion";

// Abstract, geometric GB monogram with subtle AI/network accents
export default function AnimatedLogoGB({ size = 64 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      initial="hidden"
      animate="visible"
    >
      {/* Background circle for premium feel */}
      <motion.circle
        cx="32"
        cy="32"
        r="30"
        fill="url(#gb-gradient)"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
      />
      {/* GB Monogram Path */}
      <motion.path
        d="M19 44V20C19 17.8 20.8 16 23 16H32C34.2 16 36 17.8 36 20V28C36 30.2 34.2 32 32 32H23M32 32C34.2 32 36 33.8 36 36V44C36 46.2 37.8 48 40 48H45C47.2 48 49 46.2 49 44V36C49 33.8 47.2 32 45 32H36"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      {/* AI/Network dots (nodes) - FIXED: only two keyframes */}
      <motion.circle
        cx="23"
        cy="20"
        r="2.1"
        fill="#fff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.0, duration: 0.5, type: "spring" }}
      />
      <motion.circle
        cx="36"
        cy="28"
        r="1.5"
        fill="#fff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
      />
      <motion.circle
        cx="45"
        cy="44"
        r="1.7"
        fill="#fff"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
      />
      {/* Gradient Definition */}
      <defs>
        <radialGradient id="gb-gradient" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#0e4023" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
