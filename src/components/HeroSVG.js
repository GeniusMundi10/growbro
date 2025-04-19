import React from "react";
import { motion } from "framer-motion";

// Modern AI/Chat/WhatsApp illustration (SVG, animated with Framer Motion)
export default function HeroSVG() {
  return (
    <motion.svg
      width="340"
      height="220"
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AI Chatbot Illustration"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 1.1 }}
      style={{ maxWidth: "100%" }}
    >
      {/* Chat bubble */}
      <motion.ellipse
        cx="170"
        cy="120"
        rx="120"
        ry="70"
        fill="#16a34a"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
      />
      {/* Main bot face */}
      <motion.circle
        cx="170"
        cy="105"
        r="56"
        fill="#fff"
        stroke="#10b981"
        strokeWidth="6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
      />
      {/* Eyes */}
      <motion.circle
        cx="150"
        cy="110"
        r="7"
        fill="#10b981"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      />
      <motion.circle
        cx="190"
        cy="110"
        r="7"
        fill="#10b981"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      />
      {/* Smile */}
      <motion.path
        d="M155 128 Q170 140 185 128"
        stroke="#10b981"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2.5, duration: 0.7 }}
      />
      {/* WhatsApp icon in bubble */}
      <motion.g
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.7 }}
      >
        <circle cx="260" cy="80" r="20" fill="#fff" />
        <path
          d="M260 62c-9.941 0-18 8.059-18 18 0 3.06.784 6.073 2.278 8.726L242 108l9.586-4.192A17.93 17.93 0 00260 98c9.941 0 18-8.059 18-18s-8.059-18-18-18zm0 32c-2.055 0-4.062-.316-5.967-.917l-.426-.136-5.687 2.486 1.21-6.021-.188-.312A14.04 14.04 0 01246 80c0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zm7.07-10.33c-.387-.193-2.282-1.127-2.635-1.256-.353-.13-.61-.193-.868.194-.258.387-.995 1.256-1.22 1.514-.224.258-.449.29-.836.097-.387-.193-1.635-.602-3.116-1.922-1.152-1.028-1.93-2.298-2.158-2.685-.224-.387-.024-.596.17-.789.175-.174.387-.449.581-.673.194-.224.258-.387.387-.645.129-.258.064-.484-.032-.677-.097-.193-.868-2.09-1.19-2.86-.314-.758-.637-.655-.868-.667-.224-.009-.484-.011-.742-.011-.258 0-.677.097-1.03.484-.353.387-1.353 1.324-1.353 3.23 0 1.905 1.386 3.747 1.579 4.01.193.258 2.73 4.187 6.617 5.708.926.319 1.646.51 2.207.653.927.236 1.77.203 2.434.123.743-.089 2.282-.933 2.604-1.834.322-.901.322-1.672.226-1.834-.097-.161-.353-.258-.742-.451z"
          fill="#16a34a"
        />
      </motion.g>
      {/* Decorative floating dots */}
      <motion.circle
        cx="80"
        cy="60"
        r="7"
        fill="#d1fae5"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 2 }}
      />
      <motion.circle
        cx="300"
        cy="160"
        r="5"
        fill="#d1fae5"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, delay: 2.5 }}
      />
      <motion.circle
        cx="120"
        cy="180"
        r="4"
        fill="#d1fae5"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 2.3 }}
      />
    </motion.svg>
  );
}
