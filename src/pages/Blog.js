import React, { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import "../styles/Blog.css";

const BlogHeader = () => (
  <div className="blog-central-header">
    <div className="blog-header-tag">Blog</div>
    <h1 className="blog-main-title">The Growbro.ai Blog</h1>
    <p className="blog-main-subtitle">
      Discover expert articles, best practices, and case studies on leveraging AI-powered chatbots 
      to enhance customer engagement and streamline support.
    </p>
  </div>
);

const BlogPostCard = ({ post, isAnnouncement }) => (
  <article className="blog-card">
    <Link to={`/blog/${post.slug}`} className="blog-card-link">
      <div className="blog-card-content">
        <div className="blog-post-meta">
          {isAnnouncement && <span className="blog-post-category">Announcements</span>}
          <span className="blog-post-date">{post.date}</span>
        </div>
        <h2 className="blog-post-title">{post.title}</h2>
        <p className="blog-post-excerpt">{post.summary}</p>
      </div>
    </Link>
  </article>
);

const BlogPostFeatured = ({ post }) => (
  <article className="blog-featured-card">
    <Link to={`/blog/${post.slug}`} className="blog-card-link">
      <div className="blog-featured-img">
        <img 
          src={post.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80'} 
          alt={post.title}
        />
      </div>
      <div className="blog-featured-content">
        <div className="blog-post-meta">
          <span className="blog-post-date">{post.date}</span>
        </div>
        <h2 className="blog-post-title">{post.title}</h2>
        <p className="blog-post-excerpt">{post.summary}</p>
      </div>
    </Link>
  </article>
);

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Define categories
  const categories = ['All', 'Guides', 'News', 'Announcements'];
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => {
        if (activeCategory === 'Guides') {
          return post.tags && post.tags.some(tag => ['Tutorial', 'Guide', 'How-to'].includes(tag));
        }
        if (activeCategory === 'News') {
          return post.tags && post.tags.some(tag => ['News', 'Update'].includes(tag));
        }
        if (activeCategory === 'Announcements') {
          return post.tags && post.tags.some(tag => ['Announcement', 'Company'].includes(tag));
        }
        return false;
      });

  return (
    <div className="blog-container">
      <BlogHeader />
      
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

      <div className="blog-content">
        {filteredPosts.length > 0 ? (
          <>
            <div className="blog-featured-section">
              <BlogPostFeatured post={filteredPosts[0]} />
            </div>
            
            <div className="blog-posts-grid">
              {filteredPosts.slice(1).map((post, index) => (
                <BlogPostCard 
                  key={post.slug} 
                  post={post} 
                  isAnnouncement={post.tags && post.tags.includes('Announcement')}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="blog-no-posts">
            <h3>No articles found in this category</h3>
            <p>Please select another category or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
