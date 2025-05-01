import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp, FaSearch, FaComments, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';

const CustomerJourney = () => {
  const journeyRef = useRef(null);
  const isInView = useInView(journeyRef, { once: true, threshold: 0.2 });
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  // Journey stages data with icons and descriptions
  const journeyStages = [
    {
      id: 1,
      icon: <FaWhatsapp />,
      title: "Discovery & Initiation",
      description: "Customer discovers the ThriftBooks WhatsApp AI Sales Agent through marketing channels and initiates the first conversation with a simple message.",
      color: "#25D366",
      animation: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
      }
    },
    {
      id: 2,
      icon: <FaSearch />,
      title: "Preference Collection",
      description: "The AI engages in natural conversation to understand customer preferences, reading history, and specific book requirements through intelligent questions.",
      color: "#128C7E",
      animation: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
      }
    },
    {
      id: 3,
      icon: <FaComments />,
      title: "Personalized Recommendations",
      description: "Using advanced algorithms and ThriftBooks' vast catalog, the AI suggests perfectly matched titles with details on pricing, availability and reviews.",
      color: "#075E54",
      animation: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.4 } }
      }
    },
    {
      id: 4,
      icon: <FaShoppingCart />,
      title: "Seamless Purchase",
      description: "Customer selects their preferred books, with the AI handling cart management, payment processing, and checkout all within the WhatsApp conversation.",
      color: "#34B7F1",
      animation: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
      }
    },
    {
      id: 5,
      icon: <FaBoxOpen />,
      title: "Ongoing Relationship",
      description: "After purchase, the AI provides order confirmation, shipping updates, delivery notifications, and maintains the relationship for future book recommendations.",
      color: "#00A884",
      animation: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.8 } }
      }
    }
  ];

  // Path for journey line connector
  const timelineHeight = 80 * (journeyStages.length - 1) + 40; // 80px per gap, 40px padding
  const journeyPath = `M50,20 ${journeyStages.map((_, i) => `L50,${20 + i * 80}`).join(' ')}`;
  
  return (
    <section 
      id="journey-section" 
      className="journey-section"
      ref={journeyRef}
    >
      <div className="section-header">
        <h2>The Customer Journey</h2>
        <p>Experience how our WhatsApp AI Sales Agent guides customers from discovery to purchase</p>
      </div>
      
      <motion.div
        className="journey-timeline"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Journey connector line */}
        <svg className="journey-connector" viewBox={`0 0 100 ${timelineHeight}`} height={timelineHeight} width={100} preserveAspectRatio="none">
          <defs>
            <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#25D366" />
              <stop offset="100%" stopColor="#00A884" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={journeyPath}
            stroke="url(#timeline-gradient)"
            strokeWidth="6"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {journeyStages.map((stage, index) => (
            <motion.circle
              key={stage.id}
              cx="50"
              cy={20 + index * 80}
              r="13"
              fill={stage.color}
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
            />
          ))}
        </svg>
        
        {/* Journey stages */}
        <div className="journey-stages">
          {journeyStages.map((stage, idx) => (
            <motion.div
              key={stage.id}
              className="journey-stage"
              variants={itemVariants}
            >
              <div className="stage-step-number">{idx + 1}</div>
              <motion.div 
                className="stage-icon"
                style={{ backgroundColor: stage.color }}
                whileHover={{ scale: 1.1 }}
              >
                {stage.icon}
              </motion.div>
              
              <div className="stage-content">
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
              
              {/* Interactive elements */}
              <div className="stage-interactions">
                {stage.id === 1 && (
                  <motion.div 
                    className="chat-bubble"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 1 + stage.id * 0.2, duration: 0.5 }}
                  >
                    <span className="user-message">Hi, I'm looking for book recommendations</span>
                  </motion.div>
                )}
                
                {stage.id === 3 && (
                  <motion.div 
                    className="book-recommendations"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 1 + stage.id * 0.2, duration: 0.5 }}
                  >
                    <div className="mini-book"></div>
                    <div className="mini-book"></div>
                    <div className="mini-book"></div>
                  </motion.div>
                )}
                
                {stage.id === 4 && (
                  <motion.div 
                    className="cart-animation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1 + stage.id * 0.2, duration: 0.5 }}
                  >
                    <span className="cart-confirmation">Order Placed!</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* CTA button to try the journey */}
      <motion.div 
        className="journey-cta"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <a 
          href="https://wa.me/15556415118?text=Hi%20ThriftBooks%20AI%2C%20I%27d%20like%20to%20find%20a%20book"
          className="whatsapp-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> Start Your Journey Now
        </a>
      </motion.div>
    </section>
  );
};

export default CustomerJourney; 