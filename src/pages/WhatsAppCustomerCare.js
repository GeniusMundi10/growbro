import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppCustomerCare() {
  return (
    <div className="coming-soon-container">
      <motion.div
        className="coming-soon-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="coming-soon-icon">
          <FaWhatsapp size={60} color="#25D366" />
        </div>
        <h1>WhatsApp AI Customer Care Agent</h1>
        <div className="coming-soon-badge">Coming Soon</div>
        <p>
          We're working hard to bring you our next-generation AI Customer Care solution. 
          It will revolutionize how businesses handle customer service through WhatsApp.
        </p>
        <div className="features-preview">
          <div className="feature-preview-item">
            <h3>24/7 Customer Support</h3>
            <p>Provide round-the-clock support without increasing staffing costs</p>
          </div>
          <div className="feature-preview-item">
            <h3>Intelligent Ticket Routing</h3>
            <p>AI routes complex issues to human agents while handling routine queries</p>
          </div>
          <div className="feature-preview-item">
            <h3>Multilingual Support</h3>
            <p>Communicate with customers in their preferred language automatically</p>
          </div>
        </div>
        <div className="cta-buttons">
          <Link to="/products/sales-agent" className="cta-button primary">
            Check Out Our Sales Agent
          </Link>
          <a href="/contact" className="cta-button secondary">
            Get Notified When It Launches
          </a>
        </div>
      </motion.div>
      
      <style jsx>{`
        .coming-soon-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(236,253,245,0.9) 100%);
        }
        
        .coming-soon-content {
          max-width: 800px;
          text-align: center;
          background-color: white;
          padding: 4rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(22, 163, 74, 0.25);
        }
        
        .coming-soon-icon {
          margin-bottom: 1.5rem;
        }
        
        h1 {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }
        
        .coming-soon-badge {
          display: inline-block;
          background-color: #16a34a;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          margin-bottom: 2rem;
        }
        
        p {
          color: #6b7280;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 3rem;
          font-size: 1.1rem;
        }
        
        .features-preview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .feature-preview-item {
          text-align: left;
          padding: 1.5rem;
          background-color: #f9fafb;
          border-radius: 0.75rem;
        }
        
        .feature-preview-item h3 {
          color: #16a34a;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }
        
        .feature-preview-item p {
          color: #6b7280;
          margin: 0;
          font-size: 0.95rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button.primary {
          background-color: #25D366;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }
        
        .cta-button.secondary {
          background-color: white;
          color: #16a34a;
          border: 2px solid #16a34a;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
} 