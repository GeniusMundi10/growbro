import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

// This component renders a 3D phone with animated WhatsApp conversation
const Phone3D = ({ scrollY }) => {
  // Fallback phone/chat UI
  const renderFallbackPhone = () => (
    <motion.div 
      className="phone-model"
      style={{ y: scrollY }}
      animate={{ 
        rotateY: [0, 10, 0, -10, 0],
        transition: { 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        } 
      }}
    >
      <div className="phone-screen">
        <div className="chat-interface">
          <div className="chat-header">
            <div className="chat-avatar">
              <img src="/assets/thriftbooks-logo-circle.png" alt="ThriftBooks" />
            </div>
            <div className="chat-info">
              <div className="chat-name">ThriftBooks AI Assistant</div>
              <div className="chat-status">Online</div>
            </div>
          </div>
          <div className="chat-messages">
            {conversationData.map((message, index) => (
              <motion.div 
                key={index}
                className={`chat-message ${message.role}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.5 + 1, 
                    duration: 0.5 
                  } 
                }}
              >
                {message.message}
              </motion.div>
            ))}
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button className="send-button">
              <FaWhatsapp />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="phone-3d-container">
      {/* Spline 3D model is commented out for now */}
      {/*
      <div className="spline-container">
        <Spline 
          scene="https://prod.spline.design/7OhtrMJEsLuDOXdc/scene.splinecode" 
          onLoad={(spline) => {
            console.log('Spline scene loaded');
          }}
          onError={() => {
            console.log('Error loading Spline scene');
          }}
        />
      </div>
      */}
      {renderFallbackPhone()}
      {/* Floating 3D books around the phone */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-book-3d"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            rotateX: [0, Math.random() * 40 - 20, 0],
            rotateY: [0, Math.random() * 360, 0],
            z: [0, Math.random() * 100 - 50, 0],
            transition: { 
              delay: i * 0.7, 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            } 
          }}
        >
          <div className="book-cover" style={{ backgroundColor: `hsl(${120 + i * 40}, 70%, 50%)` }}>
            <FaWhatsapp />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Sample conversation data for the demo
const conversationData = [
  { role: 'ai', message: "Hello! I'm your ThriftBooks AI Sales Assistant. What type of books are you looking for today?" },
  { role: 'user', message: "I'm interested in science fiction with female protagonists" },
  { role: 'ai', message: "Great choice! Based on your interest, I'd recommend \"The Long Way to a Small, Angry Planet\" by Becky Chambers, \"Ancillary Justice\" by Ann Leckie, or \"The Power\" by Naomi Alderman. Would you like more details on any of these?" },
  { role: 'user', message: "Tell me more about The Power" },
  { role: 'ai', message: "The Power by Naomi Alderman is a speculative fiction novel where young women develop the ability to release electrical jolts from their fingertips, shifting gender power dynamics worldwide. It won the Baileys Women's Prize for Fiction. I have it available for $8.99 in paperback. Would you like to purchase it?" },
  { role: 'user', message: "I'd like to buy it" },
  { role: 'ai', message: "Great choice! I've added \"The Power\" to your cart. Would you like to continue shopping or proceed to checkout?" },
];

export default Phone3D; 