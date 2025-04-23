import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogoSprout from './AnimatedLogoSprout';
import { supabase } from '../supabaseClient';

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
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Listen for auth state changes and check session on load
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    return () => authListener.subscription.unsubscribe();
  }, []);

  // Sign in with Google via Supabase
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  // Sign out via Supabase
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!userDropdownOpen) return;
    function handle(e) {
      if (!e.target.closest('.navbar-user-premium')) setUserDropdownOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [userDropdownOpen]);

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
          {/* Sign In Button or User Display */}
          {!user ? (
            <button
              className="navbar-signin-btn"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          ) : (
            <div className="navbar-user-premium" tabIndex={0} onClick={() => setUserDropdownOpen(v => !v)} onBlur={e => {
              if (!e.relatedTarget || !e.relatedTarget.classList.contains('navbar-signout-btn')) {
                setUserDropdownOpen(false);
              }
            }}>
              {/* Show avatar if available, else fallback */}
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || user.email} className="navbar-user-avatar" />
              ) : (
                <span className="navbar-user-avatar-fallback">{user.email[0].toUpperCase()}</span>
              )}
              <span className="navbar-user-name">{user.user_metadata?.full_name?.split(' ')[0] || user.email}</span>
              <svg className="navbar-user-caret" width="18" height="18" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#219150" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              {userDropdownOpen && (
                <div className="navbar-user-dropdown">
                  <button
                    className="navbar-signout-btn"
                    tabIndex={0}
                    onClick={e => { e.stopPropagation(); handleSignOut(); setUserDropdownOpen(false); }}
                  >Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
