import React from 'react';
import { motion } from 'framer-motion';

const useCases = [
  {
    title: 'E-commerce & D2C',
    description: 'Send order confirmations, shipping updates, and personalized product recommendations on WhatsApp. Recover abandoned carts and provide instant support in Hinglish or regional languages.',
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#e6f9ee"/><rect x="18" y="22" width="28" height="20" rx="4" fill="#25D366"/><rect x="22" y="26" width="20" height="4" rx="2" fill="#fff"/><rect x="22" y="34" width="12" height="4" rx="2" fill="#fff"/></svg>
    ),
    chat: [
      { from: 'user', text: 'Order status for #12345?' },
      { from: 'bot', text: 'Hi 👋, your order #12345 has shipped! Track: bit.ly/track123' },
    ],
  },
  {
    title: 'EdTech & Coaching',
    description: 'Automate class reminders, share study material, and answer student queries instantly. Capture leads for demo classes and send fee reminders.',
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#e6f9ee"/><rect x="19" y="27" width="26" height="14" rx="3" fill="#25D366"/><rect x="23" y="31" width="18" height="3" rx="1.5" fill="#fff"/><rect x="23" y="36" width="10" height="3" rx="1.5" fill="#fff"/></svg>
    ),
    chat: [
      { from: 'user', text: 'When is my next class?' },
      { from: 'bot', text: 'Your next class is tomorrow at 11am. Link sent to your WhatsApp!' },
    ],
  },
  {
    title: 'Healthcare & Clinics',
    description: 'Book appointments, send reminders, and share lab reports securely. Answer patient queries and automate follow-ups—all on WhatsApp.',
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#e6f9ee"/><rect x="20" y="24" width="24" height="16" rx="4" fill="#25D366"/><rect x="28" y="32" width="8" height="2" rx="1" fill="#fff"/><rect x="31" y="29" width="2" height="8" rx="1" fill="#fff"/></svg>
    ),
    chat: [
      { from: 'user', text: 'Book appointment with Dr. Sharma' },
      { from: 'bot', text: 'Appointment booked for 5pm today with Dr. Sharma. See you soon!' },
    ],
  },
  {
    title: 'FinTech & Banking',
    description: 'Send KYC reminders, EMI alerts, and policy renewals. Automate account queries and share statements instantly, securely, and in compliance with RBI guidelines.',
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#e6f9ee"/><rect x="18" y="28" width="28" height="12" rx="4" fill="#25D366"/><rect x="22" y="32" width="20" height="4" rx="2" fill="#fff"/></svg>
    ),
    chat: [
      { from: 'user', text: 'Show my latest statement' },
      { from: 'bot', text: 'Here is your latest statement (PDF): bit.ly/statement' },
    ],
  },
  {
    title: 'Travel & Hospitality',
    description: 'Automate booking confirmations, itinerary updates, and feedback collection. Upsell meals or upgrades and enable guests to chat in their local language.',
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#e6f9ee"/><rect x="21" y="27" width="22" height="14" rx="4" fill="#25D366"/><rect x="25" y="32" width="14" height="4" rx="2" fill="#fff"/></svg>
    ),
    chat: [
      { from: 'user', text: 'Hotel booking for Goa?' },
      { from: 'bot', text: 'Booking confirmed at Sea View Resort, Goa. Details sent on WhatsApp.' },
    ],
  },
  {
    title: 'Retail & Local Businesses',
    description: 'Share flash sale alerts, loyalty updates, and collect feedback. Help customers find store locations and hours instantly.',
    svg: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="#e6f9ee"/><rect x="20" y="28" width="24" height="12" rx="4" fill="#25D366"/><rect x="28" y="32" width="8" height="4" rx="2" fill="#fff"/></svg>
    ),
    chat: [
      { from: 'user', text: 'Is there a sale today?' },
      { from: 'bot', text: 'Yes! Flash sale: 30% off on all items till 6pm. Visit our store or order online.' },
    ],
  },
];

const chatBubbleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.35, duration: 0.6 } }),
};

export default function UseCases() {
  return (
    <section className="usecases-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="usecases-title"
      >
        How Indian Businesses Use WhatsApp AI Agents
      </motion.h2>
      <div className="usecases-grid">
        {useCases.map((useCase, idx) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="usecase-card"
          >
            <div className="usecase-svg">{useCase.svg}</div>
            <h3 className="usecase-title">{useCase.title}</h3>
            <p className="usecase-desc">{useCase.description}</p>
            <div className="usecase-chat-demo">
              {useCase.chat.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chat-bubble ${msg.from}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={chatBubbleVariants}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
