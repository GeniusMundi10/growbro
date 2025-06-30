import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-text">
          {new Date().getFullYear()} growbro.ai. All rights reserved.
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/company/growbro-ai/" target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="sr-only">LinkedIn</span>
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75c.97 0 1.75.78 1.75 1.75s-.78 1.76-1.75 1.76zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v4.73z"/></svg>
          </a>
          <a href="mailto:contact@growbro.ai" className="social-link">
            <span className="sr-only">Email</span>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
