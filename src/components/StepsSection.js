import React from 'react';
import { motion } from 'framer-motion';
import './StepsSection.css';

export default function StepsSection() {
  const steps = [
    {
      number: 1,
      title: 'Sign up & Train AI',
      description: 'Sign up, and Growbro will automatically train your first AI using information from your website.'
    },
    {
      number: 2,
      title: 'Customize Your AI',
      description: 'Further train your AI agent and add your brand colors to align perfectly with the style of your company.'
    },
    {
      number: 3,
      title: 'Deploy Your AI',
      description: 'Copy a single line of code and place it on your website. Your AI sales expert is now live!'
    }
  ];

  return (
    <section className="steps-section">
      <div className="steps-container">
        <motion.h2 
          className="steps-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create your AI in 3<br />simple steps
        </motion.h2>

        <div className="steps-row">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              className="step-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
            >
              <div className="step-number">{step.number}</div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
