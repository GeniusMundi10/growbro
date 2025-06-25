import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import PremiumBlogCard from "../components/PremiumBlogCard";
import "../styles/PremiumBlog.css";

// Debounce hook for search input
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function PremiumBlog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const allTags = ["All", ...new Set(blogPosts.flatMap((post) => post.tags))];
  const trendingPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 4);

  useEffect(() => {
    let posts = blogPosts;

    if (activeFilter !== "All") {
      posts = posts.filter((post) => post.tags.includes(activeFilter));
    }

    if (debouncedSearchTerm) {
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    setFilteredPosts(posts);
  }, [activeFilter, debouncedSearchTerm]);

  return (
    <div className="premium-blog-container">
      <header className="premium-blog-header">
        <h1 className="premium-blog-title">Growbro.ai Blog</h1>
        <p className="premium-blog-subtitle">
          Insights, stories, and updates from the frontier of trustworthy AI & business growth.
        </p>
      </header>

      <div className="premium-blog-filters">
        <div className="premium-blog-filter-buttons">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={activeFilter === tag ? "active" : ""}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="premium-blog-main-layout">
        <main className="premium-blog-posts">
          <div className="premium-blog-posts-grid">
            {filteredPosts.map((post, index) => (
              <PremiumBlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </main>

        <aside className="premium-blog-sidebar">
          <div className="premium-blog-sidebar-widget">
            <h3 className="premium-blog-sidebar-title">Search</h3>
            <div className="premium-blog-search-bar">
              <span className="premium-blog-search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="premium-blog-sidebar-widget">
            <h3 className="premium-blog-sidebar-title">Trending Posts</h3>
            <div className="premium-blog-trending-posts-list">
              {trendingPosts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.slug} className="premium-blog-trending-post">
                  <img src={post.image} alt={post.title} />
                  <div className="premium-blog-trending-post-info">
                    <h4 className="premium-blog-trending-post-title">{post.title}</h4>
                    <p className="premium-blog-trending-post-meta">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="premium-blog-sidebar-widget">
            <h3 className="premium-blog-sidebar-title">Popular Topics</h3>
            <div className="premium-blog-tags-container">
              {allTags.slice(1, 8).map((tag) => (
                <button key={tag} className="premium-blog-tag" onClick={() => setActiveFilter(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
