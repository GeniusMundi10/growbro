import React from 'react';
import { motion } from 'framer-motion';
import './AdvancedAnalyticsSection.css';

// Analytics card icon for checkmarks
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Graph icon for the analytics dashboard
const AnalyticsGraph = () => (
  <svg className="analytics-graph" width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M0,100 C20,85 40,90 60,60 C80,30 100,40 120,50 C140,60 160,20 180,10 C200,0 220,30 240,20" 
      stroke="#10b981" 
      strokeWidth="3"
      strokeLinecap="round" 
      fill="none"
    />
    <path 
      d="M0,100 C20,85 40,90 60,60 C80,30 100,40 120,50 C140,60 160,20 180,10 C200,0 220,30 240,20" 
      stroke="rgba(16, 185, 129, 0.2)" 
      strokeWidth="12"
      strokeLinecap="round" 
      fill="none"
    />
  </svg>
);

// Emoji icons for customer satisfaction
const SatisfactionEmojis = () => (
  <div className="satisfaction-emojis">
    <div className="emoji excellent">😀</div>
    <div className="emoji good">🙂</div>
    <div className="emoji neutral">😐</div>
    <div className="emoji poor">🙁</div>
    <div className="emoji terrible">😠</div>
  </div>
);

export default function AdvancedAnalyticsSection() {
  return (
    <section className="advanced-analytics-section">
      <div className="analytics-container">
        <div className="analytics-content">
          {/* Analytics Text and Features - LEFT SIDE */}
          <motion.div 
            className="analytics-text-features"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="analytics-header">
              <span className="analytics-label">Advanced analytics</span>
              <motion.h2 
                className="analytics-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Built-in Analytics Dashboard
              </motion.h2>
              <motion.p 
                className="analytics-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Track every metric that matters in one powerful dashboard that quantifies 
                your chatbot's ROI and reveals exactly where to optimize for better 
                performance.
              </motion.p>
            </div>
            
            {/* Analytics Features List */}
            <div className="analytics-features">
              <ul className="features-list">
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CheckIcon />
                  <span>Resolution rate tracking</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <CheckIcon />
                  <span>Summary reports of top customer queries</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <CheckIcon />
                  <span>Trace top knowledge gaps</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
          
          {/* Analytics Dashboard Preview - RIGHT SIDE */}
          <motion.div 
            className="analytics-dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="dashboard-header">
              <h3>Last 24 hours</h3>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            
            <div className="dashboard-content">
              <div className="satisfaction-card">
                <h4>Customer Satisfaction Score</h4>
                <div className="score-content">
                  <div className="main-score">
                    <span className="score-value">4.0</span>
                    <span className="score-label">Very Good</span>
                  </div>
                  <SatisfactionEmojis />
                </div>
              </div>
              
              <div className="analytics-graph-container">
                <AnalyticsGraph />
              </div>
              
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-header">Overall Resolution Rate</div>
                  <div className="metric-content">
                    <span className="metric-value">62%</span>
                    <span className="metric-change positive">+44%</span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-header">No. of Resolved Chats</div>
                  <div className="metric-content">
                    <span className="metric-value">372</span>
                    <span className="metric-change positive">+23%</span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-header">Good Chats</div>
                  <div className="metric-content">
                    <span className="metric-value">15</span>
                    <span className="metric-change positive">+12%</span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-header">Bad Chats</div>
                  <div className="metric-content">
                    <span className="metric-value">10</span>
                    <span className="metric-change negative">-6%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
