import React, { useState, useEffect, useRef, useMemo } from 'react';
import './HeroSection.css';
import { Check, Send, MoreHorizontal, Sparkles, ArrowRight } from 'lucide-react';
import AnimatedLogoSprout from './AnimatedLogoSprout';

export default function HeroSection() {
  const features = [
    "Built for smart, human-like customer service",
    "Trained on your files and webpages",
    "5 minute setup on any website",
    "Works via chat, voice, and phone",
    "24/7 instant support, no wait time",
  ];
  
  // Chat animation state
  const [chatStep, setChatStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  // Track visible messages for animation
  const [visibleMessages, setVisibleMessages] = useState([]);
  
  const chatContainerRef = useRef(null);
  
  // Chat conversation flow - exactly like Wonderchat but rebranded with Growbro.ai green palette
  const chatConversation = useMemo(() => [
    { type: 'assistant', text: 'Welcome to Growbro AI! How can I help you today?' },
    { type: 'user', text: 'Hi can you help me track my order?' },
    { type: 'assistant-typing' },
    { type: 'assistant', text: 'Sure, please hold on for a second.' },
    { type: 'assistant-typing' },
    { type: 'assistant', text: 'Your order has been updated with a tracking number of RT29388392. Your courier, Fed-Ex has picked it up. It is currently In-Transit. It\'s expected to arrive in 4 days time, on the 26th April 2025.' },
    { type: 'assistant', text: 'Would you like to receive an SMS message on the day it arrives?' },
    { type: 'options', options: ['Yes please!', 'No thanks'] },
    { type: 'user', text: 'Yes please!' },
    { type: 'assistant-typing' },
    { type: 'assistant', text: 'Your SMS reminder has been successfully scheduled for the 26th April 2025.' },
    { type: 'user', text: 'Thank you!' },
    { type: 'assistant-typing' },
    { type: 'assistant', text: 'You\'re welcome! Is there anything else I can help you with today?' },
  ], []);

  // Scroll chat to bottom on new message with smooth animation
  useEffect(() => {
    if (chatContainerRef.current && visibleMessages.length > 0) {
      // Add a small delay to ensure the new message is rendered before scrolling
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
      
      // Apply shift-up animation to previous messages
      const messages = chatContainerRef.current.querySelectorAll('.message-group');
      if (messages.length > 1) {
        messages.forEach((msg, index) => {
          if (index < messages.length - 1) {
            msg.style.transform = 'translateY(-8px)';
          }
        });
      }
    }
  }, [visibleMessages.length]);
  
  // Auto advance the chat
  useEffect(() => {
    const chatTimeline = [
      800,  // Welcome message
      1200, // User question
      600,  // Start typing
      1000, // Quick response
      800,  // Start typing again
      1800, // Order details
      1200, // Would you like SMS
      1000, // Options
      1200, // User yes please
      600,  // Start typing
      1200, // SMS confirmation
      1000, // User thank you
      600,  // Start typing
      1200, // You're welcome
      800,  // SMS question
      1200, // User confirms
      600,  // Start typing
      1000, // SMS confirmation
      1000, // User says thanks
      600,  // Start typing
      1000, // Final response
      2000, // Pause before reset
    ];
    
    let timer;
    if (chatStep < chatConversation.length) {
      // Still displaying messages
      timer = setTimeout(() => {
        if (chatConversation[chatStep]?.type === 'assistant-typing') {
          setTyping(true);
        } else {
          setTyping(false);
          // Add the current message to visible messages
          if (chatConversation[chatStep] && chatConversation[chatStep].type !== 'assistant-typing') {
            setVisibleMessages(prev => [...prev, { ...chatConversation[chatStep], id: `msg-${chatStep}` }]);
          }
        }
        setChatStep(prev => prev + 1);
      }, chatTimeline[chatStep] || 800); // Faster default timing
    } else if (chatStep === chatConversation.length) {
      // All messages displayed, wait before resetting
      timer = setTimeout(() => {
        // Reset with fade out animation
        const chatContainer = document.querySelector('.chat-messages');
        const chatPreview = document.querySelector('.chat-preview');
        
        if (chatContainer && chatPreview) {
          // Add fade-out class to create disappearing effect
          chatContainer.classList.add('fade-out');
          chatPreview.style.opacity = '0';
          chatPreview.style.transition = 'opacity 0.8s ease-out';
          
          // Reset after fade out animation
          setTimeout(() => {
            setChatStep(0);
            setTyping(false);
            setVisibleMessages([]);
            
            // Reset classes
            chatContainer.classList.remove('fade-out');
            
            // Allow a small delay before fading back in
            setTimeout(() => {
              chatPreview.style.opacity = '1';
              chatPreview.style.transition = 'opacity 0.8s ease-in';
            }, 200);
          }, 800);
        } else {
          setChatStep(0);
          setTyping(false);
          setVisibleMessages([]);
        }
      }, 3000); // Shorter wait (3s) before resetting for better user experience
    }
    
    return () => clearTimeout(timer);
  }, [chatStep, chatConversation]);
  
  // Handle user input
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setUserInput("");
    }
  };
  
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <Sparkles size={14} strokeWidth={2} /> Modernizing AI Chatbots for websites
            </div>
            <h1 className="hero-heading">
              AI Support Agents that <span className="hero-heading-gradient">feel human</span>
            </h1>
            
            <div className="feature-list">
              {features.map((feature, index) => (
                <div className="feature-item" key={index}>
                  <div className="feature-icon">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <div className="feature-text">{feature}</div>
                </div>
              ))}
            </div>
            
            <div className="hero-buttons">
              <a
  className="btn btn-primary"
  href="https://crm.growbro.ai/signup"
  target="_blank"
  rel="noopener noreferrer"
>
  Start for Free
</a>
              <button className="btn btn-outline">View Demo <ArrowRight size={16} /></button>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="chat-preview">
              <div className="chat-ui">
                <div className="chat-header">
                  <div className="avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', boxShadow: 'none', padding: 0 }}>
  <AnimatedLogoSprout size={38} />
</div>
                  <div className="chat-user-info">
                    <div className="chat-user-name">Growbro AI</div>
                    <div className="chat-user-role">AI Assistant</div>
                  </div>
                  <div className="chat-options">
                    <MoreHorizontal size={16} strokeWidth={2} />
                  </div>
                </div>
                
                <div className="chat-messages">
                  <div className="chat-messages-container" ref={chatContainerRef}>
                    {visibleMessages.map((msg, index) => {
                        // Calculate animation delay based on message index
                        const animationDelay = `${index * 0.1}s`;
                        
                        let msgClass = 'message-group';
                        if (msg.type === 'assistant') {
                          msgClass += ' assistant';
                        } else if (msg.type === 'user') {
                          msgClass += ' user';
                        }
                        if (msg.type === 'assistant') {
                          return (
                            <div
                              key={msg.id || `assistant-${index}`}
                              className={msgClass}
                              style={{ 
                                animationDelay, 
                                animation: 'fadeInUp 0.4s ease forwards',
                                opacity: 1,
                                transform: index < visibleMessages.length - 1 ? 'translateY(-8px)' : 'translateY(0)'
                              }}
                            >
                              <div className="message-author subtle-author">Growbro AI</div>
                              <div className="message assistant-message subtle-bg">
                                {msg.text}
                              </div>
                            </div>
                          );
                        } else if (msg.type === 'user') {
                          return (
                            <div
                              key={msg.id || `user-${index}`}
                              className={msgClass}
                              style={{ 
                                animationDelay, 
                                animation: 'fadeInUp 0.4s ease forwards',
                                opacity: 1,
                                transform: index < visibleMessages.length - 1 ? 'translateY(-8px)' : 'translateY(0)'
                              }}
                            >
                              <div className="message user-message subtle-user-bg">
                                {msg.text}
                              </div>
                            </div>
                          );
                        } else if (msg.type === 'options') {
                          return (
                            <div
                              key={msg.id || `options-${index}`}
                              className={msgClass}
                              style={{ 
                                animationDelay, 
                                animation: 'fadeInUp 0.4s ease forwards',
                                opacity: 1,
                                transform: index < visibleMessages.length - 1 ? 'translateY(-8px)' : 'translateY(0)'
                              }}
                            >
                              <div className="message-actions">
                                {msg.options.map((option, i) => (
                                  <button 
                                    key={i} 
                                    className={i === 0 ? "message-btn btn-primary" : "message-btn btn-outline"}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                      
                      {typing && (
                        <div 
                          key="typing"
                          className="message-group animate-in"
                        >
                          <div className="message-author">Growbro AI</div>
                          <div className="message assistant-message typing-indicator">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="chat-input">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={handleInputChange}
                    className="chat-input-field"
                  />
                  <button type="submit" className="send-btn">
                    <Send size={16} strokeWidth={2.5} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
