import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogoSprout from './AnimatedLogoSprout';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Use Cases', path: '/use-cases' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <AnimatedLogoSprout size={38} />
          <span className="logo-green" style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>growbro</span>
          <span className="logo-dark" style={{ fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>.ai</span>
        </Link>
        {/* Hamburger button for mobile */}
        <button
          className="hamburger"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <div className={`nav-links${mobileOpen ? ' nav-links-mobile-open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
