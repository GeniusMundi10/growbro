import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const BlogSearch = ({ posts, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  
  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 1) {
      setIsSearching(true);
      
      // Simulate search delay for better UX
      setTimeout(() => {
        const results = posts.filter(post => 
          post.title.toLowerCase().includes(value.toLowerCase()) || 
          post.summary.toLowerCase().includes(value.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
        );
        
        setSearchResults(results);
        setIsSearching(false);
        setIsResultsVisible(true);
        
        // Notify parent component of search results
        if (onSearchResults) {
          onSearchResults(results);
        }
      }, 300);
    } else {
      setIsResultsVisible(false);
      setSearchResults([]);
      
      // Reset to show all posts when search is cleared
      if (onSearchResults && value.trim().length === 0) {
        onSearchResults(posts);
      }
    }
  };
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        resultsRef.current && 
        !searchRef.current.contains(event.target) && 
        !resultsRef.current.contains(event.target)
      ) {
        setIsResultsVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle escape key to close results
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsResultsVisible(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);
  
  return (
    <div className="blog-search-container">
      <div className="blog-search-wrapper" ref={searchRef}>
        <div className="blog-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="blog-search-input"
        />
        {searchTerm && (
          <button 
            className="blog-search-clear" 
            onClick={() => {
              setSearchTerm('');
              setIsResultsVisible(false);
              if (onSearchResults) {
                onSearchResults(posts);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      {isResultsVisible && (
        <div className="blog-search-results" ref={resultsRef}>
          {isSearching ? (
            <div className="blog-search-loading">
              <div className="blog-search-spinner"></div>
              <span>Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="blog-search-results-header">
                <span>{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found</span>
              </div>
              <div className="blog-search-results-list">
                {searchResults.map(post => (
                  <Link 
                    key={post.slug} 
                    to={`/blog/${post.slug}`} 
                    className="blog-search-result-item"
                    onClick={() => setIsResultsVisible(false)}
                  >
                    <div className="blog-search-result-image">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    </div>
                    <div className="blog-search-result-content">
                      <h4 className="blog-search-result-title">{post.title}</h4>
                      <p className="blog-search-result-summary">{post.summary}</p>
                      <div className="blog-search-result-tags">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="blog-search-result-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="blog-search-no-results">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>No results found for "{searchTerm}"</span>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        .blog-search-container {
          position: relative;
          margin-bottom: 2rem;
          z-index: 100;
        }
        
        .blog-search-wrapper {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 9999px;
          padding: 0.75rem 1.25rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        
        .blog-search-wrapper:focus-within {
          box-shadow: 0 6px 16px rgba(22, 163, 74, 0.15);
          transform: translateY(-2px);
        }
        
        .blog-search-icon {
          color: #9ca3af;
          margin-right: 0.75rem;
        }
        
        .blog-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
          color: #4b5563;
        }
        
        .blog-search-input::placeholder {
          color: #9ca3af;
        }
        
        .blog-search-clear {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: 9999px;
          transition: background-color 0.2s;
        }
        
        .blog-search-clear:hover {
          background-color: #f3f4f6;
          color: #4b5563;
        }
        
        .blog-search-results {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          max-height: 400px;
          overflow-y: auto;
          animation: slideDown 0.3s ease;
        }
        
        .blog-search-results-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .blog-search-results-list {
          padding: 0.5rem 0;
        }
        
        .blog-search-result-item {
          display: flex;
          padding: 1rem 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s;
        }
        
        .blog-search-result-item:hover {
          background-color: #f9fafb;
        }
        
        .blog-search-result-image {
          width: 60px;
          height: 60px;
          border-radius: 0.5rem;
          overflow: hidden;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .blog-search-result-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .blog-search-result-content {
          flex: 1;
          min-width: 0;
        }
        
        .blog-search-result-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .blog-search-result-summary {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0 0 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .blog-search-result-tags {
          display: flex;
          gap: 0.5rem;
        }
        
        .blog-search-result-tag {
          font-size: 0.75rem;
          color: #16a34a;
          background: #e6f9ee;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }
        
        .blog-search-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #6b7280;
        }
        
        .blog-search-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #e5e7eb;
          border-top-color: #16a34a;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 0.75rem;
        }
        
        .blog-search-no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          color: #6b7280;
          text-align: center;
        }
        
        .blog-search-no-results svg {
          margin-bottom: 1rem;
          color: #9ca3af;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (max-width: 768px) {
          .blog-search-wrapper {
            padding: 0.6rem 1rem;
          }
          
          .blog-search-input {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogSearch;
