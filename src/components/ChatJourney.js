import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaCheckDouble, FaBook, FaSearch, FaShoppingCart, FaCreditCard, FaBox, FaTruck } from 'react-icons/fa';

const ChatJourney = () => {
  // Chat steps showing the complete user journey
  const chatSequence = [
    // Discovery phase
    { type: 'user', message: 'Hi! I want to read something new but not sure what to get.' },
    { type: 'typing', duration: 1500 },
    { type: 'assistant', message: 'Hello! 👋 I can help you find your next favorite book. What genres do you typically enjoy reading?' },
    { type: 'user', message: 'I like fantasy and sci-fi, but want to try something different this time.' },
    { type: 'typing', duration: 2000 },
    { type: 'assistant', message: 'Great! I\'d be happy to suggest something new. Are you in the mood for something thrilling, emotional, or thought-provoking?' },
    { type: 'user', message: 'Thought-provoking would be nice.' },
    { type: 'typing', duration: 2500 },
    
    // Recommendation phase
    { type: 'assistant', message: 'Based on your preferences, I think you might enjoy "Project Hail Mary" by Andy Weir. It\'s sci-fi but with deep philosophical themes.' },
    { type: 'assistant-card', 
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: '$12.99',
      rating: '4.8 ★★★★★ (2,300+ reviews)',
      description: 'A lone astronaut must save humanity from extinction in this thrilling sci-fi adventure with thought-provoking themes.'
    },
    { type: 'typing', duration: 1000 },
    { type: 'assistant', message: 'Would you like to hear more about this book or would you prefer other recommendations?' },
    { type: 'user', message: 'This sounds perfect! I\'d like to buy it.' },
    { type: 'typing', duration: 1200 },
    
    // Purchase phase
    { type: 'assistant', message: 'Great choice! Would you like hardcover ($17.99), paperback ($12.99) or ebook ($9.99)?' },
    { type: 'user', message: 'Paperback please.' },
    { type: 'typing', duration: 1500 },
    { type: 'assistant', message: 'Perfect. I\'ll add the paperback to your cart. Would you like to use your saved address for shipping?' },
    { type: 'user', message: 'Yes, please use my saved address.' },
    { type: 'typing', duration: 2000 },
    { type: 'assistant', message: 'Here\'s your order summary:' },
    { type: 'assistant-summary', 
      items: [{ title: 'Project Hail Mary (Paperback)', price: '$12.99' }],
      shipping: '$3.99',
      tax: '$1.02',
      total: '$18.00'
    },
    { type: 'typing', duration: 1000 },
    { type: 'assistant', message: 'Would you like to proceed to payment?' },
    { type: 'user', message: 'Yes, let\'s complete the purchase.' },
    { type: 'typing', duration: 1800 },
    { type: 'assistant', message: 'Great! You can complete your purchase securely by clicking this payment link:' },
    { type: 'assistant-payment', 
      text: 'Secure Checkout - $18.00',
      status: 'Processing payment...'
    },
    { type: 'system', message: '2 minutes later...' },
    { type: 'assistant', message: 'Thank you for your purchase! Your order #TB39571 has been confirmed.' },
    
    // Order tracking phase
    { type: 'system', message: '2 days later...' },
    { type: 'user', message: 'Hi, can you tell me when my book will arrive?' },
    { type: 'typing', duration: 1200 },
    { type: 'assistant', message: 'Hello again! I\'d be happy to check on your order #TB39571.' },
    { type: 'typing', duration: 1500 },
    { type: 'assistant-tracking', 
      status: 'In Transit',
      shipDate: 'June 12, 2023',
      estimatedDelivery: 'June 15, 2023',
      currentLocation: 'Regional Distribution Center'
    },
    { type: 'assistant', message: 'Your package is on its way! Is there anything else I can help with?' },
    { type: 'user', message: 'That\'s perfect, thank you!' },
    { type: 'typing', duration: 1000 },
    { type: 'assistant', message: 'You\'re welcome! I\'ll send you another update when your package is out for delivery. Happy reading! 📚' },
  ];

  // State to track the current messages to display
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Function to add the next message
  const addNextMessage = () => {
    if (currentIndex >= chatSequence.length) return;
    
    const currentMessage = chatSequence[currentIndex];
    
    if (currentMessage.type === 'typing') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, currentMessage.duration);
    } else {
      setVisibleMessages(prev => [...prev, currentMessage]);
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  // Start the chat sequence
  useEffect(() => {
    if (currentIndex === 0) {
      // Add the first message after a short delay
      setTimeout(() => {
        addNextMessage();
      }, 1000);
    }
  }, []);

  // Move to the next message in the sequence
  useEffect(() => {
    if (currentIndex > 0 && currentIndex < chatSequence.length) {
      const timer = setTimeout(() => {
        addNextMessage();
      }, chatSequence[currentIndex - 1].type === 'system' ? 1200 : 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  // Animation for messages appearing
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Generate different message bubbles based on type
  const renderMessage = (message, index) => {
    switch (message.type) {
      case 'user':
        return (
          <motion.div 
            key={index} 
            className="chat-bubble user"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            {message.message}
            <span className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="read-status"><FaCheckDouble /></span>
          </motion.div>
        );
      
      case 'assistant':
        return (
          <motion.div 
            key={index} 
            className="chat-bubble assistant"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            {message.message}
            <span className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        );
      
      case 'assistant-card':
        return (
          <motion.div 
            key={index} 
            className="chat-bubble assistant book-card"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            <div className="book-card-content">
              <div className="book-card-cover">
                <FaBook size={30} />
              </div>
              <div className="book-card-info">
                <h4>{message.title}</h4>
                <p className="book-author">{message.author}</p>
                <p className="book-rating">{message.rating}</p>
                <p className="book-description">{message.description}</p>
                <p className="book-price">{message.price}</p>
              </div>
            </div>
            <span className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        );
      
      case 'assistant-summary':
        return (
          <motion.div 
            key={index} 
            className="chat-bubble assistant order-summary"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            <div className="order-summary-content">
              <h4>Order Summary</h4>
              {message.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div className="order-divider"></div>
              <div className="order-item">
                <span>Shipping</span>
                <span>{message.shipping}</span>
              </div>
              <div className="order-item">
                <span>Tax</span>
                <span>{message.tax}</span>
              </div>
              <div className="order-divider"></div>
              <div className="order-item total">
                <span>Total</span>
                <span>{message.total}</span>
              </div>
            </div>
            <span className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        );
      
      case 'assistant-payment':
        return (
          <motion.div 
            key={index} 
            className="chat-bubble assistant"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            <div className="payment-button">
              <FaCreditCard /> {message.text}
            </div>
            <div className="payment-status">{message.status}</div>
            <span className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        );
      
      case 'assistant-tracking':
        return (
          <motion.div 
            key={index} 
            className="chat-bubble assistant tracking-info"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            <div className="tracking-content">
              <h4>Order Tracking <span className={`status ${message.status.toLowerCase().replace(' ', '-')}`}>{message.status}</span></h4>
              <div className="tracking-timeline">
                <div className="timeline-item done">
                  <div className="timeline-icon"><FaShoppingCart /></div>
                  <div className="timeline-text">Order Placed</div>
                </div>
                <div className="timeline-item done">
                  <div className="timeline-icon"><FaBox /></div>
                  <div className="timeline-text">Shipped</div>
                </div>
                <div className="timeline-item active">
                  <div className="timeline-icon"><FaTruck /></div>
                  <div className="timeline-text">In Transit</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon"><FaCheckDouble /></div>
                  <div className="timeline-text">Delivered</div>
                </div>
              </div>
              <div className="tracking-details">
                <div className="tracking-detail">
                  <span>Ship Date:</span>
                  <span>{message.shipDate}</span>
                </div>
                <div className="tracking-detail">
                  <span>Estimated Delivery:</span>
                  <span>{message.estimatedDelivery}</span>
                </div>
                <div className="tracking-detail">
                  <span>Current Location:</span>
                  <span>{message.currentLocation}</span>
                </div>
              </div>
            </div>
            <span className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        );
      
      case 'system':
        return (
          <motion.div 
            key={index} 
            className="system-message"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            {message.message}
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="chat-journey-container">
      <div className="chat-journey-header">
        <div className="chat-avatar">
          <FaBook />
        </div>
        <div className="chat-info">
          <div className="chat-name">ThriftBooks AI</div>
          <div className="chat-status">Online</div>
        </div>
      </div>
      
      <div className="chat-journey-messages">
        {visibleMessages.map((message, index) => renderMessage(message, index))}
        
        {isTyping && (
          <motion.div 
            className="chat-bubble assistant typing"
            initial="hidden"
            animate="visible"
            variants={messageVariants}
          >
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      <div className="chat-journey-input">
        <input type="text" placeholder="Type a message..." disabled />
        <button className="send-button" disabled>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatJourney; 