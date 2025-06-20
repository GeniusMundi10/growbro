import React from 'react';
import { motion } from 'framer-motion';
import './SmartRoutingSection.css';

// Check icon for features list
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Component for chat message bubbles
const ChatBubble = ({ isUser, text, time, avatar }) => (
  <div className={`chat-bubble ${isUser ? 'user' : 'ai'}`}>
    {avatar && <div className="avatar"><img src={avatar} alt="Avatar" /></div>}
    <div className="message-container">
      <div className="message">{text}</div>
      {time && <div className="timestamp">{time}</div>}
    </div>
  </div>
);

// Component for chat form
const ChatForm = () => (
  <div className="chat-form">
    <input type="text" className="chat-input" value="morris.v@gmail.com" readOnly />
    <div className="chat-textarea">
      <div className="textarea-content">
        Hi I would like to know if I am eligible for a refund for my flight booking fees? I am cancelling 12 hours ahead of my booked flight.
      </div>
    </div>
    <button className="send-button">Send</button>
  </div>
);

export default function SmartRoutingSection() {
  // Sample avatar images - replace with actual avatar URLs
  const userAvatar = 'https://i.pravatar.cc/40?img=5';
  
  return (
    <section className="smart-routing-section">
      <div className="routing-container">
        <div className="routing-content">
          {/* Chat Conversation - LEFT SIDE */}
          <motion.div 
            className="chat-conversation"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="chat-purple-bubble">
              Am I am eligible to cancel my flight booking?
              <div className="timestamp">8:50 AM</div>
            </div>
            
            <ChatBubble 
              isUser={false} 
              text="I am not too sure at the moment, let me escalate your query to my human colleague!"
              avatar={userAvatar}
            />
            
            <ChatBubble 
              isUser={false} 
              text="Leave us a message, we'll email you back."
              avatar={userAvatar}
            />
            
            <ChatForm />
            <div className="timestamp chat-end">8:51 AM</div>
          </motion.div>
          
          {/* Features Text - RIGHT SIDE */}
          <motion.div 
            className="routing-text-features"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="routing-header">
              <span className="routing-label">Route support queries to multiple channels</span>
              <motion.h2 
                className="routing-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Smart routing to email support or live chat
              </motion.h2>
              <motion.p 
                className="routing-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Let your AI chatbot call in a human if it can't answer all your queries. Your
                support agents can reply the query straight from their inbox or our live chat
                interface
              </motion.p>
            </div>
            
            {/* Routing Features List */}
            <div className="routing-features">
              <ul className="features-list">
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <CheckIcon />
                  <span>Automatic Human Escalation if AI lacks answers</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <CheckIcon />
                  <span>Route to Live Agents or Email Instantly</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <CheckIcon />
                  <span>Escalate Tickets into your Helpdesk</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
