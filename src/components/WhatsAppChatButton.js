import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '15556415118'; // International format, no + or spaces
const PREFILL_MESSAGE = encodeURIComponent('👋 Hi! Welcome to growbro.ai. How can we help you today?');
const CHAT_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILL_MESSAGE}`;

export default function WhatsAppChatButton() {
  const [showText, setShowText] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device for hover behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show text initially, then switch to icon after 2.5s
  useEffect(() => {
    if (!hovered && !isMobile) {
      const timer = setTimeout(() => setShowText(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [hovered, isMobile]);

  // Pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 900);
    }, 9000);
    return () => clearInterval(pulseInterval);
  }, []);

  // On mobile, always show icon; tap shows text for 2.5s
  const handleMobileClick = () => {
    if (isMobile && !showText) {
      setShowText(true);
      setTimeout(() => setShowText(false), 2500);
    }
  };

  return (
    <a
      href={CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-chat-btn"
      onMouseEnter={() => !isMobile && (setHovered(true), setShowText(true))}
      onMouseLeave={() => !isMobile && (setHovered(false), setShowText(false))}
      onClick={handleMobileClick}
    >
      <motion.div
        className={`wa-btn-inner${pulse ? ' pulse' : ''}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 1.2 }}
        whileHover={!isMobile ? { scale: 1.18 } : {}}
      >
        <AnimatePresence mode="wait">
          {showText ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
              className="wa-btn-text"
            >
              <span className="wa-bubble wa-bubble-big">
                <WhatsAppIcon big />
              </span>
              <span className="wa-label">Chat with us</span>
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1.35 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5 }}
              className="wa-btn-icon"
            >
              <WhatsAppIcon big />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </a>
  );
}

function WhatsAppIcon({ big }) {
  // Make SVG even larger when big is true
  return (
    <svg width={big ? 44 : 32} height={big ? 44 : 32} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="#25D366" />
      <path d="M31.5 27.5c-.4-.3-2.4-1.2-2.8-1.4-0.4-.1-.7-.3-1 .3-.3.4-1.1 1.3-1.3 1.6-.3.3-.6.3-1 .2-.4-.2-1.8-.7-3.2-1.9-1.2-1.1-2-2.3-2.3-2.7-.3-.4 0-.6.2-1 .2-.2.3-.4.4-.5.1-.1.1-.3.3-.4.1-.2.2-.3.3-.4.2-.3.2-.6 0-.9-.2-.3-.9-2.4-1.4-3.2-.3-.7-.5-.7-1-.7h-.8c-.3 0-.7.1-1 .4-.4.4-1.5 1.5-1.5 3.5 0 2 1.5 4 1.7 4.3.3.3 3 4.7 7.3 5.8 1.1.3 1.9.4 2.5.3.8-.1 2.4-1 2.8-1.8.4-.9.4-1.7.3-1.8z" fill="#fff"/>
    </svg>
  );
}
