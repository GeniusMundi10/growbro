import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function DualChatbotHero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="hero-container" ref={ref}>
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="hero-heading">
            Elevate Your <span className="gradient-text">Customer Engagement</span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="hero-subheading">
            Seamless AI-Powered Conversations Across Platforms
          </motion.h2>
          <motion.p variants={itemVariants} className="hero-description">
            Deploy intelligent AI chatbots on your WhatsApp Business account 
            and website to handle inquiries, close sales, and support customers 24/7.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-cta">
            <motion.button 
              className="cta-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Request Demo
            </motion.button>
            <motion.button 
              className="cta-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Pricing
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* 3D Device Group with Chatbots */}
          <div className="device-container">
            {/* WhatsApp Chatbot Interface */}
            <motion.div 
              className="whatsapp-device"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.7, 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="device-frame whatsapp-frame">
                <div className="device-header">
                  <div className="device-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="11" fill="#25D366" />
                      <path d="M17 15.2c-.4-.3-2.4-1.2-2.8-1.4-.4-.1-.7-.3-1 .3-.3.4-1.1 1.3-1.3 1.6-.3.3-.6.3-1 .2-.4-.2-1.8-.7-3.2-1.9-1.2-1.1-2-2.3-2.3-2.7-.3-.4 0-.6.2-1 .2-.2.3-.4.4-.5.1-.1.1-.3.3-.4.1-.2.2-.3.3-.4.2-.3.2-.6 0-.9-.2-.3-.9-2.4-1.4-3.2-.3-.7-.5-.7-1-.7h-.8c-.3 0-.7.1-1 .4-.4.4-1.5 1.5-1.5 3.5 0 2 1.5 4 1.7 4.3.3.3 3 4.7 7.3 5.8 1.1.3 1.9.4 2.5.3.8-.1 2.4-1 2.8-1.8.4-.9.4-1.7.3-1.8z" fill="#fff"/>
                    </svg>
                  </div>
                  <div className="device-title">
                    <p className="title-text">growbro.ai</p>
                    <p className="subtitle-text">Online</p>
                  </div>
                </div>
                <div className="chat-container">
                  <motion.div 
                    className="chat-message bot"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    👋 Hi there! How can I help you today?
                  </motion.div>
                  <motion.div 
                    className="chat-message user"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    I need information about your pricing plans
                  </motion.div>
                  <motion.div 
                    className="chat-message bot"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0 }}
                  >
                    <p>Our pricing plans start at $49/month for basic and $149 for premium features.</p>
                    <div className="chat-buttons">
                      <button>View Plans</button>
                      <button>Talk to Sales</button>
                    </div>
                  </motion.div>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Type a message..." />
                  <button>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="device-reflection"></div>
              <div className="device-shadow"></div>
            </motion.div>
            
            {/* Website Chatbot Interface */}
            <motion.div 
              className="website-device"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.9, 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="device-frame website-frame">
                <div className="device-browser-bar">
                  <div className="browser-actions">
                    <span className="browser-dot red"></span>
                    <span className="browser-dot yellow"></span>
                    <span className="browser-dot green"></span>
                  </div>
                  <div className="browser-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#16a34a" strokeWidth="2"/>
                      <path d="M12 18L12 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 8L12 8.01" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>growbro.ai</span>
                  </div>
                </div>
                <div className="website-content">
                  <div className="website-header"></div>
                  <div className="website-body">
                    <div className="website-section"></div>
                    <div className="website-section"></div>
                  </div>
                </div>
                <motion.div 
                  className="chatbot-widget"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
                >
                  <div className="chatbot-header">
                    <div className="chatbot-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" fill="#16a34a" />
                        <path d="M7 15C8.5 17 11 17.5 12 17.5C13 17.5 15.5 17 17 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="8.5" cy="10.5" r="1.5" fill="white" />
                        <circle cx="15.5" cy="10.5" r="1.5" fill="white" />
                      </svg>
                    </div>
                    <div className="chatbot-title">
                      <p className="title-text">Chat with Us</p>
                      <p className="subtitle-text">We're online</p>
                    </div>
                    <button className="chatbot-close">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="chatbot-messages">
                    <motion.div 
                      className="bot-message"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2 }}
                    >
                      👋 Hello! How can I assist you today?
                    </motion.div>
                    <motion.div 
                      className="bot-message"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                    >
                      I can help with product information, support, or connect you with our team.
                    </motion.div>
                    <motion.div 
                      className="quick-replies"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.8 }}
                    >
                      <button>Product Info</button>
                      <button>Pricing</button>
                      <button>Support</button>
                    </motion.div>
                  </div>
                  <div className="chatbot-input">
                    <input type="text" placeholder="Type your message here..." />
                    <button>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L11 13" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
              <div className="device-reflection"></div>
              <div className="device-shadow"></div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            className="floating-elements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 1.0 }}
          >
            <motion.div 
              className="floating-element ai-badge"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M8 12L10 14L16 8" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>AI-Powered</span>
            </motion.div>
            
            <motion.div 
              className="floating-element stats-badge"
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M8 15V12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 15V10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 15V8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>24/7 Support</span>
            </motion.div>
            
            <motion.div 
              className="floating-element multi-badge"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4.5,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18Z" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M16 10C17.1046 10 18 9.10457 18 8C18 6.89543 17.1046 6 16 6C14.8954 6 14 6.89543 14 8C14 9.10457 14.8954 10 16 10Z" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M8 18C9.10457 18 10 17.1046 10 16C10 14.8954 9.10457 14 8 14C6.89543 14 6 14.8954 6 16C6 17.1046 6.89543 18 8 18Z" stroke="#16a34a" strokeWidth="1.5"/>
              </svg>
              <span>Multi-Platform</span>
            </motion.div>
          </motion.div>
          
          {/* Background Blur Effects */}
          <div className="blur-effects">
            <motion.div 
              className="blur-circle blur-1"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="blur-circle blur-2"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10,
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3, duration: 0.8 }}
      >
        <div className="stat-item">
          <span className="stat-number">10x</span>
          <span className="stat-label">Faster Response</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Availability</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">95%</span>
          <span className="stat-label">Resolution Rate</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">40%</span>
          <span className="stat-label">Cost Reduction</span>
        </div>
      </motion.div>
    </div>
  );
} 