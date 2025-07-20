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
      <div className="premium-blog-top">
        <header className="premium-blog-header">
          <a href="/blog" className="premium-blog-top-link">Blog</a>
          <h1 className="premium-blog-title">The Growbro.ai Blog</h1>
          <p className="premium-blog-subtitle">
            Discover expert articles, best practices, and case studies on leveraging AI-powered chatbots to enhance customer engagement and streamline support.
          </p>
        </header>
      </div>

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

        {/* Sidebar removed to match Wonderchat design */}
      </div>
    </div>
  );
}
