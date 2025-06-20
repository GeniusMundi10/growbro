import React from 'react';
import { motion } from 'framer-motion';

// Icons for the circle diagram
const WordIcon = () => (
  <div className="app-icon word-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#2B579A" width="24" height="24" rx="2" />
      <text x="12" y="16" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">W</text>
    </svg>
  </div>
);

const ExcelIcon = () => (
  <div className="app-icon excel-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#217346" width="24" height="24" rx="2" />
      <text x="12" y="16" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">X</text>
    </svg>
  </div>
);

const PDFIcon = () => (
  <div className="app-icon pdf-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#F40F02" width="24" height="24" rx="2" />
      <text x="12" y="16" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">PDF</text>
    </svg>
  </div>
);

const VideoIcon = () => (
  <div className="app-icon video-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#7952B3" width="24" height="24" rx="2" />
      <path d="M9,7 L9,17 L18,12 L9,7" fill="white" />
    </svg>
  </div>
);

const DriveIcon = () => (
  <div className="app-icon drive-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <path d="M4.17157 2.82843L12 10.6569L19.8284 2.82843C19.2663 2.29799 18.4791 2 17.6569 2H6.34315C5.52091 2 4.7337 2.29799 4.17157 2.82843Z" fill="#4285F4" />
      <path d="M2.82843 4.17157C2.29799 4.7337 2 5.52091 2 6.34315V17.6569C2 18.4791 2.29799 19.2663 2.82843 19.8284L10.6569 12L2.82843 4.17157Z" fill="#34A853" />
      <path d="M10.6569 12L2.82843 19.8284C3.39038 20.3904 4.17748 20.6882 5 20.6882H12V12H10.6569Z" fill="#FBBC05" />
      <path d="M12 12V20.6882H19C19.8225 20.6882 20.6096 20.3904 21.1716 19.8284L13.3431 12H12Z" fill="#EA4335" />
    </svg>
  </div>
);

const ShopifyIcon = () => (
  <div className="app-icon shopify-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#95BF47" width="24" height="24" rx="2" />
      <path d="M16,10 L16,14 C16,14.5523 15.5523,15 15,15 L9,15 C8.44772,15 8,14.5523 8,14 L8,10" stroke="white" strokeWidth="2" fill="none" />
      <path d="M9,6 L15,6 L15,10 L9,10 Z" fill="white" />
    </svg>
  </div>
);

const PowerPointIcon = () => (
  <div className="app-icon powerpoint-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#D24726" width="24" height="24" rx="2" />
      <text x="12" y="16" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">P</text>
    </svg>
  </div>
);

const YoutubeIcon = () => (
  <div className="app-icon youtube-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#FF0000" width="24" height="24" rx="2" />
      <path d="M16,12 L10,15 L10,9 L16,12 Z" fill="white" />
    </svg>
  </div>
);

const SalesforceIcon = () => (
  <div className="app-icon salesforce-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
      <rect fill="#00A1E0" width="24" height="24" rx="2" />
      <text x="12" y="16" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">S</text>
    </svg>
  </div>
);

const ChatIcon = () => (
  <div className="app-icon chat-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
      <circle cx="12" cy="12" r="12" fill="#8A77FB" />
      <path d="M6,10 C6,7.79086 7.79086,6 10,6 L14,6 C16.2091,6 18,7.79086 18,10 C18,12.2091 16.2091,14 14,14 L12,14 L10,17 L10,14 C7.79086,14 6,12.2091 6,10 Z" fill="white" />
      <circle cx="10" cy="10" r="1" fill="#8A77FB" />
      <circle cx="12" cy="10" r="1" fill="#8A77FB" />
      <circle cx="14" cy="10" r="1" fill="#8A77FB" />
    </svg>
  </div>
);

export default function TrainAISection() {
  return (
    <section className="train-ai-section">
      <div className="train-ai-container">
        <div className="train-ai-diagram">
          <div className="diagram-circle">
            <div className="icon-position top-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <WordIcon />
              </motion.div>
            </div>
            <div className="icon-position top">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <PDFIcon />
              </motion.div>
            </div>
            <div className="icon-position top-right">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <VideoIcon />
              </motion.div>
            </div>
            <div className="icon-position right">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <ShopifyIcon />
              </motion.div>
            </div>
            <div className="icon-position bottom-right">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <SalesforceIcon />
              </motion.div>
            </div>
            <div className="icon-position bottom">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <YoutubeIcon />
              </motion.div>
            </div>
            <div className="icon-position bottom-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <PowerPointIcon />
              </motion.div>
            </div>
            <div className="icon-position left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <ExcelIcon />
              </motion.div>
            </div>
            <div className="icon-position center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <ChatIcon />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="train-ai-content">
          <motion.div 
            className="content-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="connect-text">Connect to a Knowledge Base</p>
            <h2 className="train-ai-title">Train AI Agents on your data</h2>
            <p className="train-ai-description">
              Upload documentation and integrate with help desk systems. 
              Growbro learns from PDFs, URLs, Zendesk, and other 
              sources to provide accurate responses.
            </p>
            <ul className="feature-list">
              <li>
                <span className="check-icon">✓</span>
                <span className="feature-text">Train on all file formats</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span className="feature-text">Index unlimited websites</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span className="feature-text">Sync your data automatically</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
