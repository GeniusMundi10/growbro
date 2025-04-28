import React, { useState, useEffect } from 'react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Extract headings from content
    if (!content) return;
    
    const extractHeadings = () => {
      const headingRegex = /^#{2,3} (.+)$/gm;
      const matches = [];
      let match;
      
      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[0].startsWith('## ') ? 2 : 3;
        const text = match[1];
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        
        matches.push({
          id,
          text,
          level
        });
      }
      
      return matches;
    };
    
    setHeadings(extractHeadings());
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean);
      
      const headingPositions = headingElements.map(element => ({
        id: element.id,
        position: element.getBoundingClientRect().top
      }));
      
      const visibleHeadings = headingPositions.filter(
        heading => heading.position > 0 && heading.position < window.innerHeight
      );
      
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (headings.length === 0) return null;

  return (
    <div className={`toc-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toc-header" onClick={toggleCollapse}>
        <div className="toc-title">Table of Contents</div>
        <button className="toc-toggle">
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          )}
        </button>
      </div>
      <nav className={`toc-nav ${isCollapsed ? 'hidden' : ''}`}>
        <ul className="toc-list">
          {headings.map(heading => (
            <li 
              key={heading.id} 
              className={`toc-item level-${heading.level} ${activeId === heading.id ? 'active' : ''}`}
            >
              <a 
                href={`#${heading.id}`}
                className="toc-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id).scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .toc-container {
          position: sticky;
          top: 2rem;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          padding: 0;
          margin-bottom: 2rem;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          z-index: 100;
          width: 100%;
          display: block;
        }
        
        .toc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
          border-bottom: 2px solid #e6f9ee;
          transition: background-color 0.2s;
          background-color: #ffffff;
        }
        
        .toc-header:hover {
          background-color: #f0fdf4;
        }
        
        .toc-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #16a34a;
        }
        
        .toc-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: #16a34a;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }
        
        .toc-toggle:hover {
          transform: translateY(-2px);
        }
        
        .toc-nav {
          padding: 1rem 0;
          max-height: 500px;
          transition: max-height 0.5s ease, opacity 0.3s ease;
          overflow: hidden;
          opacity: 1;
          background-color: #ffffff;
        }
        
        .toc-nav.hidden {
          max-height: 0;
          padding: 0;
          opacity: 0;
        }
        
        .toc-list {
          list-style: none;
          padding: 0 1.5rem;
          margin: 0;
        }
        
        .toc-item {
          margin: 0.5rem 0;
          line-height: 1.4;
          transform: translateX(0);
          transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .toc-item:hover {
          transform: translateX(5px);
        }
        
        .toc-item.level-3 {
          padding-left: 1rem;
          font-size: 0.9rem;
        }
        
        .toc-link {
          color: #4b5563;
          text-decoration: none;
          display: block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: all 0.2s;
          position: relative;
        }
        
        .toc-link::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 6px;
          border-color: transparent transparent transparent #16a34a;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        
        .toc-link:hover {
          background: #e6f9ee;
          color: #16a34a;
        }
        
        .toc-link:hover::before {
          opacity: 1;
          transform: translateY(-50%) translateX(-3px);
        }
        
        .toc-item.active .toc-link {
          background: #e6f9ee;
          color: #16a34a;
          font-weight: 600;
        }
        
        .toc-item.active .toc-link::before {
          opacity: 1;
        }
        
        /* Collapsed state */
        .toc-container.collapsed {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 768px) {
          .toc-container {
            position: fixed;
            top: auto;
            bottom: 5rem;
            right: 1rem;
            left: auto;
            width: 250px;
            max-width: calc(100vw - 2rem);
            max-height: 400px;
            transform: translateY(0);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .toc-container.collapsed {
            transform: translateY(calc(100% - 3.5rem));
          }
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
