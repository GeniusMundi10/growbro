import React, { useState } from 'react';
import { motion } from 'framer-motion';

// SVG Icon components to replace react-feather
const CheckIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const VideoIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
    <line x1="7" y1="2" x2="7" y2="22"></line>
    <line x1="17" y1="2" x2="17" y2="22"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="2" y1="7" x2="7" y2="7"></line>
    <line x1="2" y1="17" x2="7" y2="17"></line>
    <line x1="17" y1="17" x2="22" y2="17"></line>
    <line x1="17" y1="7" x2="22" y2="7"></line>
  </svg>
);

const XIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function CustomizeAISection() {
  const [selectedColor, setSelectedColor] = useState('purple');
  
  // Avatar with selected color border
  const avatarColors = {
    purple: '#8A77FB',
    blue: '#00B7FA',
    pink: '#E83A95',
    orange: '#F39C12',
    green: '#2ECC71',
    rainbow: 'linear-gradient(90deg, #FF4B2B, #FF416C, #8A77FB, #2ECC71)'
  };
  
  const colorOptions = [
    { id: 'purple', color: '#8A77FB' },
    { id: 'blue', color: '#00B7FA' },
    { id: 'pink', color: '#E83A95' },
    { id: 'orange', color: '#F39C12' },
    { id: 'green', color: '#2ECC71' },
    { id: 'rainbow', color: 'linear-gradient(90deg, #FF4B2B, #FF416C, #8A77FB, #2ECC71)' }
  ];
  
  return (
    <section className="customize-ai-section">
      <div className="customize-ai-container">
        <motion.div 
          className="customize-preview"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="customize-card">
            <div className="card-header">
              <h3>Create an AI Chatbot</h3>
              <button className="close-button">
                <XIcon />
              </button>
            </div>
            
            <div className="ai-avatar-container">
              <div 
                className="ai-avatar" 
                style={{ 
                  borderColor: avatarColors[selectedColor].startsWith('linear') ? 'transparent' : avatarColors[selectedColor],
                  background: avatarColors[selectedColor].startsWith('linear') ? avatarColors[selectedColor] : 'transparent'
                }}
              >
                <img src="/ai-assistant.png" alt="AI Assistant" onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150?text=AI';
                }} />
              </div>
              <h4 className="avatar-name">Emily</h4>
              <p className="avatar-description">Your AI Assistant</p>
            </div>
            
            <div className="color-selector">
              {colorOptions.map(option => (
                <button
                  key={option.id}
                  className={`color-option ${selectedColor === option.id ? 'selected' : ''}`}
                  style={{ 
                    background: option.color,
                    border: selectedColor === option.id ? '2px solid #333' : '2px solid transparent' 
                  }}
                  onClick={() => setSelectedColor(option.id)}
                />
              ))}
            </div>
            
            <div className="ai-settings-group">
              <div className="setting-item">
                <label>AI Model</label>
                <div className="select-control">
                  <span>gpt-4o-mini</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
              
              <div className="setting-item">
                <label>Chatbot Role</label>
                <div className="select-control">
                  <span>Customer Support</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
              
              <div className="setting-item">
                <label>Language</label>
                <div className="select-control">
                  <span>English</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="customize-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="customize-label">Customized for Your Brand</p>
          <h2 className="customize-title">Fully customizable to fit your brand</h2>
          <p className="customize-description">
            Customize your chatbot's role, tone, style, and write custom instructions to
            give your chatbot a behavior and personality that perfectly represents your brand.
          </p>
          
          <div className="custom-features">
            <div className="feature-row">
              <div className="feature-item">
                <div className="feature-check">
                  <CheckIcon size={16} />
                </div>
                <span>Custom instructions & personas</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <CheckIcon size={16} />
                </div>
                <span>Tailored tones & personalities</span>
              </div>
            </div>
            <div className="feature-row">
              <div className="feature-item">
                <div className="feature-check">
                  <CheckIcon size={16} />
                </div>
                <span>Brand-aligned responses</span>
              </div>
              <div className="feature-item">
                <div className="feature-check">
                  <CheckIcon size={16} />
                </div>
                <span>Control over AI outputs</span>
              </div>
            </div>
          </div>
          
          <div className="video-tutorial">
            <div className="video-thumbnail">
              <img src="/tutorial-thumbnail.jpg" alt="Tutorial Video" onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x120?text=Video+Tutorial';
              }} />
              <div className="play-icon">
                <VideoIcon size={24} />
              </div>
            </div>
            <div className="video-info">
              <h4>Uploading Documentation</h4>
              <p>Watch video tutorial</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
