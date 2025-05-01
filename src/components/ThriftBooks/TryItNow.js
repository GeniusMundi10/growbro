import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaArrowRight, FaBookOpen, FaSearch, FaCreditCard } from 'react-icons/fa';

const TryItNow = () => {
  const tryItRef = useRef(null);
  const isInView = useInView(tryItRef, { once: true, threshold: 0.2 });
  
  // WhatsApp number to direct users to
  const whatsappNumber = "15556415118";
  
  // Sample prompts for users to try
  const samplePrompts = [
    "I'm looking for science fiction books with unique aliens",
    "Do you have any historical fiction set in ancient Rome?",
    "Recommend me a book similar to The Night Circus",
    "I need a gift for a 12-year-old who loves adventure stories",
    "What are your bestselling mystery novels this month?"
  ];
  
  return (
    <section id="try-it-section" className="try-it-section" ref={tryItRef}>
      <div className="section-header">
        <h2>Experience It Yourself</h2>
        <p>Try our ThriftBooks WhatsApp AI Sales Agent right now</p>
      </div>
      
      <div className="try-it-content">
        <motion.div 
          className="qr-code-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <div className="animated-qr">
            {/* Dynamic QR code that links to the WhatsApp number */}
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/${whatsappNumber}?text=Hi%20ThriftBooks%20AI%2C%20I%27d%20like%20to%20find%20a%20book`} 
              alt="WhatsApp QR Code" 
              className="qr-image"
            />
            <div className="qr-pulse"></div>
          </div>
          <p className="qr-instruction">Scan to start chatting with our AI</p>
        </motion.div>
        
        <div className="try-it-info">
          <motion.div 
            className="direct-message"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3>Or message directly:</h3>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hi%20ThriftBooks%20AI%2C%20I%27d%20like%20to%20find%20a%20book`}
              className="whatsapp-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Chat with ThriftBooks AI
            </a>
          </motion.div>
          
          <motion.div 
            className="prompt-suggestions"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h4>Try these sample prompts:</h4>
            <ul className="sample-prompts">
              {samplePrompts.map((prompt, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    "{prompt}" <FaArrowRight className="prompt-arrow" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="experience-highlights"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="highlight-card">
          <FaBookOpen className="highlight-icon" />
          <h4>Discover Books</h4>
          <p>Find your next favorite read through natural conversation</p>
        </div>
        
        <div className="highlight-card">
          <FaSearch className="highlight-icon" />
          <p>Get personalized recommendations based on your preferences</p>
        </div>
        
        <div className="highlight-card">
          <FaCreditCard className="highlight-icon" />
          <h4>Easy Purchase</h4>
          <p>Buy books directly within the WhatsApp conversation</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="try-it-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <a 
          href={`https://wa.me/${whatsappNumber}`}
          className="primary-cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="cta-icon" /> Try the ThriftBooks AI Sales Agent Now
        </a>
      </motion.div>
    </section>
  );
};

export default TryItNow; 