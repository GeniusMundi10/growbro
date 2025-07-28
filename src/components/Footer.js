import React from 'react';
import { Link } from 'react-router-dom';
import './FooterModern.css';

export default function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-content">
        <div className="footer-container">
          {/* Logo and company info */}
          <div className="footer-branding">
            <Link to="/" className="footer-logo">
              <span className="logo-green">grow</span>
              <span className="logo-light">bro</span>
              <span className="logo-green">.ai</span>
            </Link>
            <p className="footer-description">
              Build AI agents trained on your data, no coding required.
            </p>
            <div className="footer-status">
              <span className="status-indicator"></span>
              <span className="status-text">All systems operational</span>
            </div>
          </div>
          
          <div className="footer-columns">
            {/* Product column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Product</h3>
              <ul className="footer-links">
                <li><Link to="/products/sales-agent">AI Sales Agent</Link></li>
                <li><Link to="/products/customer-care">Customer Service</Link></li>
                <li><Link to="/use-cases">Use Cases</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>
            
            {/* Solutions column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Solutions</h3>
              <ul className="footer-links">
                <li><Link to="/how-it-works">How it Works</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            {/* Resources column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Resources</h3>
              <ul className="footer-links">
                <li><a href="https://docs.growbro.ai" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="https://help.growbro.ai" target="_blank" rel="noopener noreferrer">Help Center</a></li>
                <li><a href="https://growbro.ai/video-tutorials" target="_blank" rel="noopener noreferrer">Video Tutorials</a></li>
                <li><a href="https://growbro.ai/downloads" target="_blank" rel="noopener noreferrer">Downloads</a></li>
              </ul>
            </div>
            
            {/* Contact column */}
            <div className="footer-column footer-contact">
              <h3 className="footer-column-title">Contact Sales</h3>
              <div className="contact-info">
                <a href="tel:+919312639676" className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                  </svg>
                  +91 9312639676
                </a>
                <a href="mailto:conversation@growbro.ai" className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                  conversation@growbro.ai
                </a>
                <address className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Delhi, India
                </address>
              </div>
              
              {/* Social media links under Contact Sales */}
              <div className="footer-social-contact">
                <a href="https://www.linkedin.com/company/growbro-ai/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="social-icon">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75c.97 0 1.75.78 1.75 1.75s-.78 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v4.73z" />
                  </svg>
                </a>
                <a href="https://x.com/growbro_ai" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="social-icon">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.035 10.035 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="https://facebook.com/growbroai" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="social-icon">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © {new Date().getFullYear()} growbro.ai. All rights reserved.
            </div>
            <div className="footer-legal">
              <a href="/privacy-policy" className="legal-link">Privacy Policy</a>
              <a href="/terms-of-service" className="legal-link">Terms of Service</a>
              <a href="/security" className="legal-link">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
