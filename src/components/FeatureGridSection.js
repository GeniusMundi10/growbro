import React from 'react';
import { motion } from 'framer-motion';

// Feature icons as SVG components
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const TicketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M13 5v2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M13 17v2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M13 11v2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 3v18h18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="m19 9-5 5-4-4-3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const BoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const DevicesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="10" height="14" x="4" y="2" rx="2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></rect>
    <rect width="8" height="7" x="12" y="15" rx="2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></rect>
    <path d="M12 8v7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

export default function FeatureGridSection() {
  const features = [
    {
      id: 'rocket',
      icon: <RocketIcon />,
      title: 'Super fast, 5 minute setup',
      description: '5 minutes is all it takes for the Chatbot to train on your website and files. Once done, you can instantly converse with it.',
      className: 'rocket-feature'
    },
    {
      id: 'ticket',
      icon: <TicketIcon />,
      title: 'Escalate queries into your ticketing helpdesk',
      description: 'Your AI will handover ticket escalations direct into your ticketing helpdesk for a human to takeover.',
      className: 'ticket-feature'
    },
    {
      id: 'analytics',
      icon: <AnalyticsIcon />,
      title: 'Detailed Analytics Reporting',
      description: 'Unlock user insights by monitoring the quality of user conversations, advanced AI summaries and topic classifications.',
      className: 'analytics-feature'
    },
    {
      id: 'bolt',
      icon: <BoltIcon />,
      title: 'Accurate and fast responses',
      description: 'Reliable, business-ready chatbot responses backed by your webpages and files. Built-in safeguards prevent the chatbot from answering out-of-scope questions.',
      className: 'bolt-feature'
    },
    {
      id: 'devices',
      icon: <DevicesIcon />,
      title: 'Multi-modal AI agents',
      description: 'From web to phone to voice. Your AI agents go wherever your users are. Train once, deploy anywhere.',
      className: 'devices-feature'
    },
    {
      id: 'settings',
      icon: <SettingsIcon />,
      title: 'Pick from any AI provider',
      description: 'Build your AI agent with any major model such as OpenAI, Claude, Gemini, Mistral, Llama, DeepSeek, and more. Combine or swap models any time with no lock-in.',
      className: 'settings-feature'
    }
  ];

  return (
    <section className="feature-grid-section">
      <div className="feature-grid-container">
        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.div 
              className={`feature-item ${feature.className}`}
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <div className="feature-text">
                  <h3 className="feature-title">
                    <a href="#" className="feature-link">{feature.title}</a>
                  </h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
