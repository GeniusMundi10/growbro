import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import "../styles/Blog.css";

const BlogHeader = () => (
  <div className="blog-header">
    <div className="blog-header-content">
      <div className="blog-header-tag">Blog</div>
      <h1>The Growbro.ai Blog</h1>
      <p>
        Discover expert articles, best practices, and case studies on
        leveraging AI-powered chatbots to enhance customer engagement
        and streamline support.
      </p>
    </div>
  </div>
);

const BlogPostCard = ({ post }) => {
  // Get the first tag for the badge (if exists)
  const firstTag = post.tags && post.tags.length > 0 ? post.tags[0] : null;
  
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card-image-container">
          <img 
            src={post.image} 
            alt={post.title} 
            className="blog-card-image"
          />
        </div>
        <div className="blog-card-content">
          <div className="blog-card-meta">
            <span className="blog-post-date">{post.date}</span>
            {firstTag && <span className="blog-post-tag">{firstTag}</span>}
          </div>
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-summary">{post.summary}</p>
        </div>
      </Link>
    </article>
  );
};

const BlogPostFeatured = ({ post }) => {
  // Get the first tag for the badge (if exists)
  const firstTag = post.tags && post.tags.length > 0 ? post.tags[0] : null;
  
  return (
    <article className="blog-featured-post">
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        <div className="blog-card">
          <div className="blog-card-image-container">
            <img 
              src={post.image} 
              alt={post.title}
              className="blog-card-image"
            />
          </div>
          <div className="blog-card-content">
            <div className="blog-card-meta">
              <span className="blog-post-date">{post.date}</span>
              {firstTag && <span className="blog-post-tag">{firstTag}</span>}
            </div>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-summary">{post.summary}</p>
            <div className="blog-card-footer">
              <span className="blog-post-read-more">Read Article →</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Enhanced mobile detection and guaranteed style injection
  useEffect(() => {
    const handleResize = () => {
      // More aggressive mobile detection at 768px for broader mobile support
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Apply direct CSS overrides for mobile - ULTRA HIGH PRIORITY
      if (mobile) {
        // Override with direct DOM manipulation to guarantee it works
        // This bypasses all CSS cascade issues and Next.js/React hydration problems
        const style = document.createElement('style');
        style.id = 'blog-filter-mobile-fix';
        style.innerHTML = `
          /* CRITICAL: Force blog controls to stack vertically */
          .blog-controls {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 20px !important;
          }
          
          /* CRITICAL: Force blog filters to scroll horizontally */
          .blog-category-nav {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 8px !important;
            padding: 4px 0 12px 0 !important;
            scrollbar-width: none !important; /* Firefox */
            -webkit-overflow-scrolling: touch !important;
            gap: 8px !important;
          }
          
          /* Hide scrollbar */
          .blog-category-nav::-webkit-scrollbar {
            display: none !important;
            height: 0 !important;
            width: 0 !important;
          }
          
          /* Prevent blog category buttons from wrapping */
          .blog-category-btn {
            flex: 0 0 auto !important;
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
            white-space: nowrap !important;
            margin-right: 0 !important;
            display: inline-block !important;
          }
          
          /* Force search to be full width */
          .blog-search {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .blog-search-input {
            width: 100% !important;
          }
        `;
        
        // Remove any existing style with the same ID
        const existingStyle = document.getElementById('blog-filter-mobile-fix');
        if (existingStyle) {
          existingStyle.remove();
        }
        
        // Add at the very end of head to override everything else
        document.head.appendChild(style);
        
        // Double-check that our style was added and is working
        setTimeout(() => {
          const blogControls = document.querySelector('.blog-controls');
          const blogCategoryNav = document.querySelector('.blog-category-nav');
          
          // If elements exist but styles aren't applied, try direct manipulation
          if (blogControls && window.getComputedStyle(blogControls).flexDirection !== 'column') {
            blogControls.style.cssText = 'display: flex !important; flex-direction: column !important; align-items: flex-start !important;';
          }
          
          if (blogCategoryNav) {
            blogCategoryNav.style.cssText = 'display: flex !important; flex-wrap: nowrap !important; overflow-x: auto !important; width: 100% !important;';
          }
        }, 100);
      } else {
        // Remove the style if not mobile
        const existingStyle = document.getElementById('blog-filter-mobile-fix');
        if (existingStyle) {
          existingStyle.remove();
        }
      }
    };
    
    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    
    // Call again after a delay to catch any race conditions with hydration
    setTimeout(handleResize, 500);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up on unmount
      const existingStyle = document.getElementById('blog-filter-mobile-fix');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
  
  // Define categories
  const categories = ['All', 'Guides', 'News', 'Announcements'];
  
  // Filter posts by category and search query
  const filteredPosts = blogPosts
    .filter(post => {
      // First apply category filter
      if (activeCategory !== 'All') {
        if (activeCategory === 'Guides') {
          if (!post.tags || !post.tags.some(tag => ['Tutorial', 'Guide', 'How-to'].includes(tag))) {
            return false;
          }
        }
        if (activeCategory === 'News') {
          if (!post.tags || !post.tags.some(tag => ['News', 'Update'].includes(tag))) {
            return false;
          }
        }
        if (activeCategory === 'Announcements') {
          if (!post.tags || !post.tags.some(tag => ['Announcement', 'Company'].includes(tag))) {
            return false;
          }
        }
      }
      
      // Then apply search filter if there's a query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
      
      return true;
    });

  return (
    <div className="blog-container">
      {/* Mobile filter fixes are now applied via direct DOM manipulation in useEffect */}
      <BlogHeader />
      
      <div className="blog-controls" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
        <div className="blog-category-nav" style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          width: '100%',
          maxWidth: '100%',
          marginBottom: '8px',
          padding: '4px 0 12px 0',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          gap: '8px'
        }}>
          {categories.map(category => (
            <button
              key={category}
              className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              style={{ flex: '0 0 auto', flexShrink: 0, whiteSpace: 'nowrap', marginRight: '0' }}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="blog-search">
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="blog-content">
        {filteredPosts.length > 0 ? (
          <>
            <div className="blog-featured-section">
              {filteredPosts[0] && <BlogPostFeatured post={filteredPosts[0]} />}
            </div>
            
            <div className="blog-post-grid">
              {filteredPosts.slice(1).map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            
            <div className="blog-newsletter">
              <div className="newsletter-content">
                <h3>Stay Updated with Growbro.ai</h3>
                <p>Subscribe to our newsletter for the latest AI chatbot trends and product updates</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="blog-no-posts">
            <h3>No articles found</h3>
            <p>Try changing your search criteria or check back later for new content.</p>
          </div>
        )}
      </div>
    </div>
  );
}
