import React, { useState } from 'react';

const BlogNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="blog-newsletter">
      <div className="newsletter-content">
        <div className="newsletter-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        
        <div className="newsletter-text">
          <h3 className="newsletter-title">Subscribe to our newsletter</h3>
          <p className="newsletter-description">
            Get the latest AI insights and updates delivered straight to your inbox
          </p>
        </div>
        
        <div className="newsletter-form-container">
          {isSubmitted ? (
            <div className="newsletter-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="newsletter-input"
              />
              <button 
                type="submit" 
                className="newsletter-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="newsletter-spinner"></div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="newsletter-decoration">
        <div className="decoration-circle"></div>
        <div className="decoration-circle"></div>
        <div className="decoration-circle"></div>
      </div>
      
      <style jsx>{`
        .blog-newsletter {
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          border-radius: 1rem;
          padding: 2.5rem;
          color: white;
          position: relative;
          overflow: hidden;
          margin-bottom: 3rem;
          box-shadow: 0 10px 30px rgba(22, 163, 74, 0.2);
        }
        
        .newsletter-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }
        
        .newsletter-icon {
          background: rgba(255, 255, 255, 0.2);
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .newsletter-text {
          flex: 1;
        }
        
        .newsletter-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
        }
        
        .newsletter-description {
          font-size: 0.95rem;
          opacity: 0.9;
          margin: 0;
        }
        
        .newsletter-form-container {
          flex: 1;
          max-width: 400px;
        }
        
        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }
        
        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          outline: none;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
        }
        
        .newsletter-input::placeholder {
          color: #6b7280;
        }
        
        .newsletter-button {
          padding: 0 1.5rem;
          background: #111827;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }
        
        .newsletter-button:hover:not(:disabled) {
          background: #1f2937;
          transform: translateY(-2px);
        }
        
        .newsletter-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .newsletter-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.25rem;
          border-radius: 0.5rem;
          animation: fadeIn 0.5s ease;
        }
        
        .newsletter-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .decoration-circle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
        
        .decoration-circle:nth-child(1) {
          width: 150px;
          height: 150px;
          top: -50px;
          right: -30px;
        }
        
        .decoration-circle:nth-child(2) {
          width: 100px;
          height: 100px;
          bottom: -30px;
          right: 30%;
        }
        
        .decoration-circle:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20px;
          left: 10%;
          background: rgba(255, 255, 255, 0.05);
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 1024px) {
          .newsletter-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .newsletter-form-container {
            width: 100%;
            max-width: none;
          }
        }
        
        @media (max-width: 640px) {
          .blog-newsletter {
            padding: 1.5rem;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .newsletter-button {
            width: 100%;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogNewsletter;
