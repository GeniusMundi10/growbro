import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-400">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    title: 'Connect WhatsApp',
    description: 'Easily integrate your WhatsApp Business account with growbro.ai in minutes.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"/></svg>
    ),
  },
  {
    title: 'Upload Knowledge Base',
    description: 'Add your business documents, FAQs, or databases. Our AI learns instantly.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
    ),
  },
  {
    title: 'Deploy AI Bot',
    description: 'Launch your RAG-powered WhatsApp bot to automate conversations and drive results.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
    ),
  },
];
