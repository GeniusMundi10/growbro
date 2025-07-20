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
  // No filter functionality - showing all posts directly
  const filteredPosts = blogPosts;

  return (
    <div className="blog-container">
      {/* Mobile filter fixes are now applied via direct DOM manipulation in useEffect */}
      <BlogHeader />
      
      {/* Filters have been removed per user request */}

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
