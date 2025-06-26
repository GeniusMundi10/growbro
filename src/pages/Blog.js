import React, { useState } from "react";
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
      <BlogHeader />
      
      <div className="blog-controls">
        <div className="blog-category-nav">
          {categories.map(category => (
            <button
              key={category}
              className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
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
