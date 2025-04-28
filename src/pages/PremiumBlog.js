import React, { useState, useEffect, useRef } from "react";
import { blogPosts } from "../blog/posts";
import BlogFilters from "../components/BlogFilters";
import BlogSearch from "../components/BlogSearch";
import BlogNewsletter from "../components/BlogNewsletter";
import FeaturedPost from "../components/FeaturedPost";
import PremiumBlogCard from "../components/PremiumBlogCard";
import TrendingPosts from "../components/TrendingPosts";

// Animated background component
function AnimatedBackground() {
  const bgRef = useRef();
  
  useEffect(() => {
    let frame = 0;
    let raf;
    
    function animate() {
      frame += 1;
      const angle = frame * 0.08;
      
      if (bgRef.current) {
        bgRef.current.style.background = `
          radial-gradient(
            circle at ${50 + 8 * Math.sin(angle / 2)}% ${40 + 8 * Math.cos(angle / 3)}%, 
            #bbf7d0 0%, 
            #d1fae5 35%, 
            #f0fdf4 80%, 
            #f9fafb 100%
          )
        `;
      }
      
      raf = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => cancelAnimationFrame(raf);
  }, []);
  
  return (
    <div 
      ref={bgRef} 
      className="animated-background"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'background 0.3s',
        willChange: 'background',
        minHeight: '100vh'
      }}
    />
  );
}

export default function PremiumBlog() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get featured post (most recent)
  const featuredPost = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  })[0];
  
  // Initialize with all posts
  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      setFilteredPosts(blogPosts);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (posts) => {
    setFilteredPosts(posts);
  };
  
  // Handle search results
  const handleSearchResults = (results) => {
    setFilteredPosts(results);
  };
  
  return (
    <div className="premium-blog">
      <AnimatedBackground />
      
      <div className="premium-blog-container">
        <header className="premium-blog-header">
          <h1 className="premium-blog-title">Growbro.ai Blog</h1>
          <p className="premium-blog-subtitle">
            Insights, stories, and updates from the frontier of trustworthy AI & business growth
          </p>
        </header>
        
        <div className="premium-blog-search-bar">
          <BlogSearch posts={blogPosts} onSearchResults={handleSearchResults} />
        </div>
        
        <div className="premium-blog-filters">
          <BlogFilters posts={blogPosts} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="premium-blog-content">
          <main className="premium-blog-main">
            {isLoading ? (
              <div className="premium-blog-loading">
                <div className="premium-blog-spinner"></div>
                <span>Loading articles...</span>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {featuredPost && <FeaturedPost post={featuredPost} />}
                
                {/* Blog posts grid */}
                {filteredPosts.length > 0 ? (
                  <div className="premium-blog-grid">
                    {filteredPosts.map((post, index) => (
                      post.slug !== featuredPost.slug && (
                        <PremiumBlogCard key={post.slug} post={post} index={index} />
                      )
                    ))}
                  </div>
                ) : (
                  <div className="premium-blog-no-results">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3>No articles found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                )}
                
                {/* Newsletter */}
                <BlogNewsletter />
              </>
            )}
          </main>
          
          <aside className="premium-blog-sidebar">
            <TrendingPosts posts={blogPosts} />
            
            <div className="premium-blog-tags">
              <h3 className="premium-blog-tags-title">Popular Topics</h3>
              <div className="premium-blog-tags-cloud">
                {/* Extract unique tags and count occurrences */}
                {[...new Set(blogPosts.flatMap(post => post.tags))].map(tag => {
                  const count = blogPosts.filter(post => post.tags.includes(tag)).length;
                  return (
                    <button 
                      key={tag} 
                      className="premium-blog-tag-btn"
                      onClick={() => {
                        const filtered = blogPosts.filter(post => post.tags.includes(tag));
                        setFilteredPosts(filtered);
                      }}
                    >
                      {tag}
                      <span className="premium-blog-tag-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <style jsx>{`
        .premium-blog {
          min-height: 100vh;
          padding: 2rem 0 4rem;
          position: relative;
        }
        
        .premium-blog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .premium-blog-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .premium-blog-title {
          font-size: 3rem;
          font-weight: 900;
          color: #16a34a;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        
        .premium-blog-subtitle {
          font-size: 1.25rem;
          color: #4b5563;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .premium-blog-search-bar {
          margin-bottom: 1.5rem;
        }
        
        .premium-blog-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2.5rem;
          align-items: start;
        }
        
        .premium-blog-main {
          width: 100%;
        }
        
        .premium-blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .premium-blog-sidebar {
          position: sticky;
          top: 2rem;
        }
        
        .premium-blog-tags {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }
        
        .premium-blog-tags-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #f3f4f6;
        }
        
        .premium-blog-tags-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .premium-blog-tag-btn {
          background: #f9fafb;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .premium-blog-tag-btn:hover {
          background: #f3f4f6;
          transform: translateY(-2px);
        }
        
        .premium-blog-tag-count {
          background: #e6f9ee;
          color: #16a34a;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.1rem 0.5rem;
          border-radius: 9999px;
        }
        
        .premium-blog-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          color: #6b7280;
        }
        
        .premium-blog-spinner {
          width: 2.5rem;
          height: 2.5rem;
          border: 3px solid #e6f9ee;
          border-top-color: #16a34a;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }
        
        .premium-blog-no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
          color: #6b7280;
          text-align: center;
        }
        
        .premium-blog-no-results svg {
          margin-bottom: 1.5rem;
          color: #9ca3af;
        }
        
        .premium-blog-no-results h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }
        
        .premium-blog-no-results p {
          font-size: 1.1rem;
          color: #6b7280;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (max-width: 1024px) {
          .premium-blog-content {
            grid-template-columns: 1fr;
          }
          
          .premium-blog-sidebar {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .premium-blog-title {
            font-size: 2.5rem;
          }
          
          .premium-blog-subtitle {
            font-size: 1.1rem;
          }
          
          .premium-blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
