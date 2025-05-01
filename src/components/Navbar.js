import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogoSprout from './AnimatedLogoSprout';
import { supabase } from '../supabaseClient';

// NOTE: /products/sales-agent now shows the ThriftBooks Showcase (premium landing page)
const products = [
  { name: 'Whatsapp AI Sales Agent', path: '/products/sales-agent' },
  { name: 'Whatsapp AI Customer Care Agent', path: '/products/customer-care' }
];

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Solutions', 
    children: [
      { 
        name: 'Products', 
        children: products
      },
      { name: 'Usecases', path: '/use-cases' }
    ]
  },
  { name: 'How it Works', path: '/how-it-works' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' }
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Refs for tracking dropdown state and timeouts
  const dropdownRefs = useRef({});
  const submenuRefs = useRef({});
  const timeoutRef = useRef(null);
  const submenuTimeoutRef = useRef(null);
  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 900;

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
    function handleClickOutside(e) {
      // Close all dropdowns if clicking outside of any dropdown
      if (!e.target.closest('.navbar-item.dropdown') && 
          !e.target.closest('.dropdown-menu') &&
          !e.target.closest('.navbar-user-premium')) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
        setUserDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown on click for touch devices
  const handleDropdownClick = (idx, e) => {
    // For mobile devices, toggle the dropdown
    if (isMobileView || window.innerWidth < 900) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === idx ? null : idx);
      setActiveSubmenu(null);
    }
  };

  // Toggle submenu on click for touch devices
  const handleSubmenuClick = (idx, e) => {
    // For mobile devices, toggle the submenu
    if (isMobileView || window.innerWidth < 900) {
      e.preventDefault();
      e.stopPropagation();
      setActiveSubmenu(activeSubmenu === idx ? null : idx);
    }
  };

  // Handle mouse events for desktop dropdowns
  const handleDropdownMouseEnter = (idx) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Set active dropdown immediately
    setActiveDropdown(idx);
  };

  const handleDropdownMouseLeave = () => {
    // Set a timeout to close the dropdown after a delay
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 300); // Longer delay to prevent accidental closing
  };

  // Handle mouse events for submenu
  const handleSubmenuMouseEnter = (idx) => {
    // Clear any existing submenu timeout
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    
    // Keep parent dropdown open
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Set active submenu immediately
    setActiveSubmenu(idx);
  };

  const handleSubmenuMouseLeave = () => {
    // Set a timeout to close the submenu after a delay
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300); // Longer delay to prevent accidental closing
  };

  return (
    <nav className="navbar-premium">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <AnimatedLogoSprout size={32} />
          <span className="logo-text"><span className="logo-green">growbro</span><span className="logo-dark">.ai</span></span>
        </Link>
        
        {/* Hamburger button for mobile */}
        <button
          className="hamburger"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`hamburger-bar ${mobileOpen ? 'open-top' : ''}`}></span>
          <span className={`hamburger-bar ${mobileOpen ? 'open-middle' : ''}`}></span>
          <span className={`hamburger-bar ${mobileOpen ? 'open-bottom' : ''}`}></span>
        </button>
        
        <div className={`navbar-links${mobileOpen ? ' navbar-links-mobile-open' : ''}`}>
          {navLinks.map((link, idx) => (
            link.children ? (
              <div
                key={link.name}
                ref={el => dropdownRefs.current[idx] = el}
                className={`navbar-item dropdown ${activeDropdown === idx ? 'expanded' : ''}`}
                onClick={(e) => handleDropdownClick(idx, e)}
                onMouseEnter={() => handleDropdownMouseEnter(idx)}
                onMouseLeave={handleDropdownMouseLeave}
                tabIndex={0}
                role="button"
                aria-expanded={activeDropdown === idx}
                aria-haspopup="true"
              >
                <span className={`nav-link ${activeDropdown === idx ? 'active' : ''}`}>
                  {link.name}
                  <svg className={`dropdown-arrow ${activeDropdown === idx ? 'rotated' : ''}`} width="10" height="6" viewBox="0 0 10 6">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
                
                <div 
                  className={`dropdown-menu ${activeDropdown === idx ? 'visible' : ''}`}
                  onMouseEnter={() => handleDropdownMouseEnter(idx)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {link.children.map((child, cidx) =>
                    child.children ? (
                      <div
                        key={child.name}
                        ref={el => submenuRefs.current[cidx] = el}
                        className={`dropdown-item nested ${activeSubmenu === cidx ? 'expanded' : ''}`}
                        onClick={(e) => handleSubmenuClick(cidx, e)}
                        onMouseEnter={() => handleSubmenuMouseEnter(cidx)}
                        onMouseLeave={handleSubmenuMouseLeave}
                        tabIndex={0}
                        role="button"
                        aria-expanded={activeSubmenu === cidx}
                        aria-haspopup="true"
                      >
                        <span className="item-with-icon">
                          {child.name}
                          <svg className={`dropdown-arrow ${activeSubmenu === cidx ? 'rotated' : ''}`} width="10" height="6" viewBox="0 0 10 6">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                          </svg>
                        </span>
                        
                        <div 
                          className={`dropdown-menu submenu ${activeSubmenu === cidx ? 'visible' : ''}`}
                          onMouseEnter={() => handleSubmenuMouseEnter(cidx)}
                          onMouseLeave={handleSubmenuMouseLeave}
                        >
                          {child.children.map(sub => (
                            <Link 
                              key={sub.path} 
                              to={sub.path} 
                              className="dropdown-item"
                              onClick={() => {
                                setActiveDropdown(null);
                                setActiveSubmenu(null);
                                setMobileOpen(false);
                              }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        key={child.path} 
                        to={child.path} 
                        className="dropdown-item"
                        onClick={() => {
                          setActiveDropdown(null);
                          setMobileOpen(false);
                        }}
                      >
                        {child.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-item nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            )
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
            <div className="navbar-user-premium" 
              tabIndex={0} 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)} 
              onBlur={e => {
                if (!e.relatedTarget || !e.relatedTarget.classList.contains('navbar-signout-btn')) {
                  setUserDropdownOpen(false);
                }
              }}
            >
              {/* Show avatar if available, else fallback */}
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || user.email} className="navbar-user-avatar" />
              ) : (
                <span className="navbar-user-avatar-fallback">{user.email[0].toUpperCase()}</span>
              )}
              <span className="navbar-user-name">{user.user_metadata?.full_name?.split(' ')[0] || user.email}</span>
              <svg className={`navbar-user-caret ${userDropdownOpen ? 'rotated' : ''}`} width="18" height="18" viewBox="0 0 20 20">
                <path d="M6 8l4 4 4-4" stroke="#219150" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
              
              {userDropdownOpen && (
                <div className="navbar-user-dropdown">
                  <button
                    className="navbar-signout-btn"
                    tabIndex={0}
                    onClick={e => { 
                      e.stopPropagation(); 
                      handleSignOut(); 
                      setUserDropdownOpen(false); 
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
