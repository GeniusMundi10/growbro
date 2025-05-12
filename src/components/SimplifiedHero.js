import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/simplifiedHero.css';

const SimplifiedHero = () => {
  const heroRef = useRef();
  const isInView = useInView(heroRef, { once: true, threshold: 0.1 });

  return (
    <section ref={heroRef} className="simplified-hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            AI Chatbots for<br />
            <span className="highlighted">WhatsApp & Websites</span>
          </h1>
          
          <p className="hero-description">
            Growbro ai helps you automate sales and support with state-of-the-art AI chatbots. 
            Seamlessly integrate with WhatsApp and your website to engage customers 24/7.
          </p>
          
          <div className="hero-cta">
            <button className="cta-primary">
              <span>Get Started</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 5L21 12M21 12L13.5 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="cta-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M15.4 12L10.6 8.8V15.2L15.4 12Z" fill="currentColor"/>
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visuals"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="visual-container">
            <div className="whatsapp-visual">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="wa-header">
                    <div className="wa-contact">
                      <div className="wa-avatar">G</div>
                      <div className="wa-name">Growbro Bot</div>
                    </div>
                    <div className="wa-options">•••</div>
                  </div>
                  <div className="wa-messages">
                    <div className="message bot">
                      <p>Hi there! How can I help you today?</p>
                    </div>
                    <div className="message user">
                      <p>I'd like to learn about your pricing plans.</p>
                    </div>
                    <div className="message bot">
                      <p>Sure! We offer plans starting at...</p>
                    </div>
                  </div>
                  <div className="wa-input">
                    <input type="text" placeholder="Type" readOnly />
                    <div className="wa-send-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="website-visual">
              <div className="browser-frame">
                <div className="browser-screen">
                  <div className="chat-widget">
                    <div className="chat-avatar"></div>
                    <div className="chat-bubble">
                      <p>Hello! I'm here to help. :)</p>
                    </div>
                    <div className="chat-bubble user">
                      <p>Can you tell me more about...</p>
                    </div>
                    <div className="chat-label">AI Widget</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimplifiedHero; 