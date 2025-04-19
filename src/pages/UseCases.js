import React from 'react';
import { motion } from 'framer-motion';

const useCases = [
  {
    title: 'Customer Support',
    description: 'Instantly resolve customer queries with AI-powered WhatsApp chatbots, available 24/7.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.2-.9L3 21l1.9-4.2A7.975 7.975 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
    ),
  },
  {
    title: 'Sales & Lead Generation',
    description: 'Qualify leads, answer product questions, and drive sales directly from WhatsApp.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1m-4 0h-1m6 0h-1m-2 0v-4a4 4 0 10-8 0v4a4 4 0 008 0z"/></svg>
    ),
  },
  {
    title: 'Appointment Booking',
    description: 'Let customers book appointments and receive reminders, all via WhatsApp.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"/></svg>
    ),
  },
  {
    title: 'Order Tracking',
    description: 'Send real-time order updates and tracking info to customers on WhatsApp.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    ),
  },
  {
    title: 'Custom Solutions',
    description: 'Have a unique workflow? We build custom WhatsApp RAG apps for your business.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
  },
];

export default function UseCases() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        Business Use Cases
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {useCases.map((useCase, idx) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow"
          >
            <div className="mb-4">{useCase.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">{useCase.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{useCase.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
