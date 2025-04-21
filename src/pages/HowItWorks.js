import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Connect WhatsApp',
    description: 'Integrate your WhatsApp Business account with growbro.ai in just a few clicks. Get verified and ready to go instantly.',
    svg: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="#e6f9ee"/><g><circle cx="36" cy="36" r="22" fill="#25D366"/><path d="M45.5 30.5c-1-2-3.5-3.5-7-3.5-5 0-9 3.5-9 8 0 2.5 1.5 4.5 3.5 6l-1 3 3-1c1.5 1 3.5 1.5 5.5 1.5 5 0 9-3.5 9-8 0-1-.5-2-1-3" fill="#fff"/></g></svg>
    ),
  },
  {
    title: 'Upload Knowledge & FAQs',
    description: 'Drag and drop your documents, FAQs, or website links. Our AI learns your business instantly, supporting English, Hindi, and more.',
    svg: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="#e6f9ee"/><rect x="20" y="24" width="32" height="24" rx="6" fill="#25D366"/><rect x="28" y="32" width="16" height="8" rx="2" fill="#fff"/><rect x="32" y="36" width="8" height="2" rx="1" fill="#25D366"/></svg>
    ),
  },
  {
    title: 'Customize Your AI Agent',
    description: 'Set your brand voice, select languages, and define business hours. Preview real conversations with your AI agent.',
    svg: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="#e6f9ee"/><rect x="22" y="26" width="28" height="20" rx="6" fill="#25D366"/><circle cx="36" cy="36" r="4" fill="#fff"/><rect x="30" y="42" width="12" height="2" rx="1" fill="#fff"/></svg>
    ),
  },
  {
    title: 'Go Live Instantly',
    description: 'Deploy your AI agent on WhatsApp. Start automating sales, support, and engagement within minutes.',
    svg: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="#e6f9ee"/><rect x="28" y="34" width="16" height="8" rx="4" fill="#25D366"/><path d="M36 28v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="36" cy="28" r="2" fill="#fff"/></svg>
    ),
  },
  {
    title: 'Track & Optimize',
    description: 'Monitor analytics, customer satisfaction, and ROI in real-time. Continuously improve your agent for better results.',
    svg: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="36" fill="#e6f9ee"/><rect x="24" y="28" width="24" height="16" rx="5" fill="#25D366"/><rect x="30" y="36" width="12" height="4" rx="2" fill="#fff"/><circle cx="36" cy="36" r="2" fill="#25D366"/></svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="howitworks-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="howitworks-title"
      >
        How Growbro.ai Works
      </motion.h2>
      <div className="howitworks-steps">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="howitworks-step"
          >
            <div className="howitworks-svg">{step.svg}</div>
            <div className="howitworks-number">{idx + 1}</div>
            <h3 className="howitworks-step-title">{step.title}</h3>
            <p className="howitworks-step-desc">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
