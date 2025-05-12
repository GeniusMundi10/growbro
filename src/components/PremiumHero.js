import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/premiumHero.css';

const PremiumHero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [conversationStage, setConversationStage] = useState(0);
  const [typing, setTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentTextWeb, setCurrentTextWeb] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [controlsInitialized, setControlsInitialized] = useState(false);

  // Conversation flow
  const conversation = [
    { 
      waMessage: "I'd like to learn about your pricing plans.",
      webMessage: "Can you tell me about your product?",
      sender: 'user'
    },
    { 
      waMessage: "Sure! We offer plans starting at $49/month with unlimited messages.",
      webMessage: "Our AI chatbots handle inquiries, recommend products and book appointments.",
      sender: 'bot',
      showCard: true
    },
    { 
      waMessage: "Can you help with appointment booking?",
      webMessage: "Does it integrate with my systems?",
      sender: 'user'
    },
    { 
      waMessage: "Absolutely! You can schedule calls and meetings directly through the chat.",
      webMessage: "Yes! Seamless integration with CRM, e-commerce, and calendars.",
      sender: 'bot',
      showLink: true
    }
  ];

  // Safe animation start function
  const safelyStartAnimation = useCallback(() => {
    if (controls && typeof controls.start === 'function') {
      try {
        controls.start('visible').catch(err => {
          console.error("Animation error handled:", err);
        });
        setControlsInitialized(true);
      } catch (err) {
        console.error("Animation error caught:", err);
      }
    }
  }, [controls]);

  // Define animateConversation using useCallback to prevent circular dependency
  const animateConversation = useCallback((stage) => {
    if (!isInitialized || stage >= conversation.length) return;
    
    setConversationStage(stage);
    
    // If it's a bot message, animate typing effect
    if (conversation[stage].sender === 'bot') {
      setTyping(true);
      
      // Animated typing effect
      let index = 0;
      setCurrentText('');
      setCurrentTextWeb('');
      
      const waTypeInterval = setInterval(() => {
        if (!isInitialized) {
          clearInterval(waTypeInterval);
          return;
        }
        
        setCurrentText(prev => {
          const nextText = conversation[stage].waMessage.slice(0, index + 1);
          index++;
          
          if (index >= conversation[stage].waMessage.length) {
            clearInterval(waTypeInterval);
            
            // After typing completes, show any rich elements and move to next message
            const typingCompleteTimer = setTimeout(() => {
              if (isInitialized) {
                setTyping(false);
                
                // Move to next message after a delay
                const nextMessageTimer = setTimeout(() => {
                  if (isInitialized) {
                    animateConversation(stage + 1);
                  }
                }, 3500); // Increased delay between messages
                
                return () => clearTimeout(nextMessageTimer);
              }
            }, 800); // Slightly longer pause after typing completes
            
            return () => clearTimeout(typingCompleteTimer);
          }
          
          return nextText;
        });
      }, 60); // Slower typing speed (was 30)
      
      // Stagger the website chat typing
      let webIndex = 0;
      const webTypeStartTimer = setTimeout(() => {
        if (!isInitialized) {
          return;
        }
        
        const webTypeInterval = setInterval(() => {
          if (!isInitialized) {
            clearInterval(webTypeInterval);
            return;
          }
          
          setCurrentTextWeb(prev => {
            const nextText = conversation[stage].webMessage.slice(0, webIndex + 1);
            webIndex++;
            
            if (webIndex >= conversation[stage].webMessage.length) {
              clearInterval(webTypeInterval);
            }
            
            return nextText;
          });
        }, 60); // Slower typing speed (was 30)
        
        return () => clearInterval(webTypeInterval);
      }, 800); // More delay before web chat typing starts
      
      return () => {
        clearTimeout(webTypeStartTimer);
      };
      
    } else {
      // User messages appear immediately
      setCurrentText(conversation[stage].waMessage);
      setCurrentTextWeb(conversation[stage].webMessage);
      
      // Move to next message after a delay
      const userMessageTimer = setTimeout(() => {
        if (isInitialized) {
          animateConversation(stage + 1);
        }
      }, 2500); // Increased delay for user messages (was 1500)
      
      return () => clearTimeout(userMessageTimer);
    }
  }, [conversation, isInitialized]);

  // Define startConversation with useCallback, now that animateConversation is defined
  const startConversation = useCallback(() => {
    if (!isInitialized) return;
    // Start the conversation animation sequence
    animateConversation(0);
  }, [animateConversation, isInitialized]);

  useEffect(() => {
    // Set initialization state
    setIsInitialized(true);
    
    return () => {
      setIsInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (isInView && isInitialized && !controlsInitialized) {
      // Start animation with a small delay to ensure controls are ready
      const timer = setTimeout(() => {
        if (isInitialized) {
          safelyStartAnimation();
          
          // Start conversation animation after controls animation
          const conversationTimer = setTimeout(() => {
            if (isInitialized) {
              startConversation();
            }
          }, 2500); 
          
          return () => clearTimeout(conversationTimer);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, controls, startConversation, isInitialized, controlsInitialized, safelyStartAnimation]);

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slowed down from 0.1
        delayChildren: 0.2 // Increased from 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" } // Slowed down from 0.6
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5, // Slowed down from 4
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={heroRef} className="premium-hero">
      <div className="hero-background">
        <div className="dot-pattern"></div>
        <div className="gradient-overlay"></div>
      </div>

      <div className="hero-content-container">
        <motion.div 
          className="text-content"
          initial="hidden"
          animate={controlsInitialized ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="hero-headline">
            AI Chatbots for<br />
            <span className="highlight">WhatsApp & Websites</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="hero-description">
            Growbro ai helps you automate sales and support with state-of-the-art AI chatbots. 
            Seamlessly integrate with WhatsApp and your website to engage customers 24/7.
          </motion.p>
        </motion.div>

        <div className="chat-interfaces-container">
          <motion.div 
            className="interface-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.7 }} 
          >
            <motion.div 
              className="whatsapp-interface"
              initial="initial"
              animate="animate"
              variants={floatVariants}
            >
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="wa-header">
                    <div className="wa-profile">
                      <div className="wa-avatar">G</div>
                      <div className="wa-name">Growbro Bot</div>
                    </div>
                    <div className="wa-actions">
                      <div className="wa-dots"></div>
                    </div>
                  </div>
                  
                  <div className="wa-chat">
                    <div className="wa-message bot">
                      <p>Hi there! How can I help you today?</p>
                      <span className="wa-timestamp">10:24 AM</span>
                    </div>
                    
                    {conversationStage >= 0 && (
                      <div className="wa-message user animate-in">
                        <p>{conversation[0].waMessage}</p>
                        <span className="wa-timestamp">10:25 AM</span>
                      </div>
                    )}
                    
                    {conversationStage >= 1 && (
                      <div className="wa-message bot animate-in">
                        {typing && conversationStage === 1 ? (
                          <>
                            <p>{currentText}<span className={typing ? "typing-cursor" : ""}></span></p>
                            {currentText.length < conversation[1].waMessage.length && (
                              <div className="typing-indicator">
                                <span></span><span></span><span></span>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <p>{conversation[1].waMessage}</p>
                            {conversation[1].showCard && (
                              <div className="wa-product-card">
                                <div className="product-card-header">Premium Plan</div>
                                <ul className="product-features">
                                  <li>Unlimited conversations</li>
                                  <li>AI training & customization</li>
                                  <li>Advanced analytics</li>
                                </ul>
                                <div className="product-price">$49/month</div>
                                <div className="pulse-animation"></div>
                              </div>
                            )}
                          </>
                        )}
                        <span className="wa-timestamp">10:25 AM</span>
                      </div>
                    )}
                    
                    {conversationStage >= 2 && (
                      <div className="wa-message user animate-in">
                        <p>{conversation[2].waMessage}</p>
                        <span className="wa-timestamp">10:26 AM</span>
                      </div>
                    )}
                    
                    {conversationStage >= 3 && (
                      <div className="wa-message bot animate-in">
                        {typing && conversationStage === 3 ? (
                          <>
                            <p>{currentText}<span className={typing ? "typing-cursor" : ""}></span></p>
                            {currentText.length < conversation[3].waMessage.length && (
                              <div className="typing-indicator">
                                <span></span><span></span><span></span>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <p>{conversation[3].waMessage}</p>
                            {conversation[3].showLink && (
                              <div className="wa-calendar-link">
                                <span className="calendar-icon"></span>
                                <span className="link-text">Schedule a Meeting</span>
                                <div className="pulse-animation"></div>
                              </div>
                            )}
                          </>
                        )}
                        <span className="wa-timestamp">10:27 AM</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="wa-input-area">
                    <input type="text" placeholder="Type" readOnly />
                    <div className="mic-icon"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="/contact" className="cta-button">
              Try Demo
            </Link>
          </motion.div>
          
          <motion.div 
            className="interface-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.div 
              className="website-interface"
              initial="initial"
              animate="animate"
              variants={floatVariants}
              style={{ animationDelay: "1s" }}
            >
              <div className="browser-frame">
                <div className="browser-controls">
                  <div className="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="browser-address">growbro.ai</div>
                </div>
                
                <div className="browser-content">
                  <div className="site-preview">
                    <div className="site-preview-blur"></div>
                  </div>
                  
                  <div className="chatbot-widget">
                    <div className="chatbot-header">
                      <div className="chatbot-title">
                        <div className="chatbot-avatar">G</div>
                        <div>Growbro Assistant</div>
                      </div>
                      <div className="chatbot-controls">
                        <span className="minimize-icon"></span>
                        <span className="close-icon"></span>
                      </div>
                    </div>
                    
                    <div className="chatbot-messages">
                      <div className="chatbot-message bot">
                        <p>Hello! I'm here to help. How can I assist you today?</p>
                      </div>
                      
                      {conversationStage >= 0 && (
                        <div className="chatbot-message user animate-in">
                          <p>{conversation[0].webMessage}</p>
                        </div>
                      )}
                      
                      {conversationStage >= 1 && (
                        <div className="chatbot-message bot animate-in">
                          {typing && conversationStage === 1 ? (
                            <>
                              <p>{currentTextWeb}<span className={typing ? "typing-cursor" : ""}></span></p>
                              {currentTextWeb.length < conversation[1].webMessage.length && (
                                <div className="typing-indicator dark">
                                  <span></span><span></span><span></span>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <p>{conversation[1].webMessage}</p>
                              {conversation[1].showCard && (
                                <div className="chatbot-faq-list">
                                  <div className="faq-item">
                                    <span className="faq-icon"></span>
                                    <span>Integration Guide</span>
                                  </div>
                                  <div className="faq-item">
                                    <span className="faq-icon"></span>
                                    <span>Pricing Plans</span>
                                  </div>
                                  <div className="pulse-animation blue"></div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      
                      {conversationStage >= 2 && (
                        <div className="chatbot-message user animate-in">
                          <p>{conversation[2].webMessage}</p>
                        </div>
                      )}
                      
                      {conversationStage >= 3 && (
                        <div className="chatbot-message bot animate-in">
                          {typing && conversationStage === 3 ? (
                            <>
                              <p>{currentTextWeb}<span className={typing ? "typing-cursor" : ""}></span></p>
                              {currentTextWeb.length < conversation[3].webMessage.length && (
                                <div className="typing-indicator dark">
                                  <span></span><span></span><span></span>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <p>{conversation[3].webMessage}</p>
                              {conversation[3].showLink && (
                                <div className="chatbot-integration-icons">
                                  <div className="integration-icon salesforce" title="Salesforce"></div>
                                  <div className="integration-icon shopify" title="Shopify"></div>
                                  <div className="integration-icon calendar" title="Calendar"></div>
                                  <div className="pulse-animation blue"></div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="chatbot-input">
                      <input type="text" placeholder="Type your message..." readOnly />
                      <button className="send-button"></button>
                    </div>
                    
                    <div className="chatbot-footer">
                      <span>Powered by Growbro AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero; 