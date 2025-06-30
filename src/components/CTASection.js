import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="feature-badges">
          <motion.div 
            className="feature-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="badge-icon">🌐</span>
            <span className="badge-text">40+ Languages</span>
          </motion.div>
          
          <motion.div 
            className="feature-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge-icon">💰</span>
            <span className="badge-text">Starts at $0.02/message</span>
          </motion.div>
          
          <motion.div 
            className="feature-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="badge-icon">🕒</span>
            <span className="badge-text">Available 24/7</span>
          </motion.div>
        </div>
        
        <motion.h1
          className="cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          AI support agents that<br />
          service your customers<br />
          end-to-end
        </motion.h1>
        
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a
            href="https://crm.growbro.ai/signup"
            className="cta-button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start for Free
          </a>
          <Link to="/blog/add-ai-chatbot-to-website" className="cta-button secondary">
            View Demo
          </Link>
        </motion.div>
        
        <motion.p
          className="trial-text"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          14-day free trial. No credit card required
        </motion.p>
      </div>
    </section>
  );
}
