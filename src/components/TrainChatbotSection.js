import React, { useState } from 'react';
import { motion } from 'framer-motion';

// SVG Icon components
const CheckIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CloseIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const PlusIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChatBubbleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#8A77FB">
    <path d="M4.913 2h14.174C20.705 2 22 3.295 22 4.913v11.174C22 17.705 20.705 19 19.087 19h-3.87c-.02 0-.146.138-.184.195l-2.304 3.45c-.246.37-.708.37-.954 0l-2.304-3.45c-.038-.057-.165-.195-.184-.195h-3.87C2.295 19 1 17.705 1 16.087V4.913C1 3.295 2.295 2 4.913 2z"></path>
  </svg>
);

export default function TrainChatbotSection() {
  const [chatMessage] = useState("Can I train my bot on links and files?");
  const [modelAnswer] = useState(
    "Yes, of course! Our chatbot can be trained on both links and files. Here's what we support:\n\n1. PDF files"
  );

  return (
    <section className="train-chatbot-section">
      <div className="train-chatbot-container">
        <motion.div 
          className="chat-interface"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="chat-simulation">
            <div className="chat-sidebar-mockup">
              {/* Simulated sidebar gradient lines */}
              {[...Array(15)].map((_, i) => (
                <div key={i} className="sidebar-line" style={{ width: `${Math.floor(Math.random() * 40 + 60)}%`, opacity: i === 2 ? 1 : 0.6 - i * 0.03 }}></div>
              ))}
            </div>
            
            <div className="chat-content">
              <div className="user-message">
                <div className="chat-icon purple">
                  <ChatBubbleIcon />
                </div>
                <div className="message-bubble">
                  {chatMessage}
                </div>
              </div>
              
              <div className="corrections-modal">
                <div className="corrections-header">
                  <h3>Add Corrections</h3>
                  <button className="close-button">
                    <CloseIcon size={18} />
                  </button>
                </div>
                
                <div className="corrections-content">
                  <div className="question-display">
                    <label>Question</label>
                    <p>{chatMessage}</p>
                  </div>
                  
                  <div className="model-answer">
                    <div className="answer-label">
                      <CheckIcon size={14} />
                      <span>Model Answer</span>
                    </div>
                    <div className="answer-text">
                      {modelAnswer.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="add-source">
                    <div className="source-label">Source URL</div>
                    <button className="add-button">
                      <PlusIcon size={14} />
                    </button>
                  </div>
                  
                  <div className="add-image">
                    <div className="image-label">Upload Image</div>
                    <button className="add-button">
                      <PlusIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="training-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="feature-label">Agents that learn from human colleagues</p>
          <h2 className="content-title">Train Chatbot on real-time conversations</h2>
          <p className="content-description">
            Don't like a response your chatbot is giving out? Train your chatbot to learn
            from it's mistakes by informing it of what is a model answer.
          </p>
          
          <ul className="feature-list">
            <li>
              <div className="feature-check">
                <CheckIcon size={16} />
              </div>
              <span className="feature-text">Add corrections on the go</span>
            </li>
            <li>
              <div className="feature-check">
                <CheckIcon size={16} />
              </div>
              <span className="feature-text">Smarter responses over time</span>
            </li>
            <li>
              <div className="feature-check">
                <CheckIcon size={16} />
              </div>
              <span className="feature-text">Automated correction identification</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
