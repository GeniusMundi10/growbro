import React, { useState, useEffect } from 'react';

const BlogFilters = ({ posts, onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Extract unique categories from posts
    const allTags = posts.flatMap(post => post.tags);
    const uniqueTags = ['all', ...new Set(allTags)];
    setCategories(uniqueTags);
  }, [posts]);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Filter posts based on selected category
    const filteredPosts = category === 'all' 
      ? posts 
      : posts.filter(post => post.tags.includes(category));
    
    onFilterChange(filteredPosts);
  };
  
  return (
    <div className="blog-filters">
      <div className="blog-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .blog-filters {
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        
        .blog-categories {
          display: flex;
          gap: 0.75rem;
          padding: 0.25rem;
        }
        
        .blog-category-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.7);
          color: #4b5563;
          font-weight: 600;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(229, 231, 235, 0.5);
        }
        
        .blog-category-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .blog-category-btn.active {
          background: #16a34a;
          color: white;
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.2);
        }
        
        @media (max-width: 768px) {
          .blog-filters {
            margin-bottom: 1.5rem;
          }
          
          .blog-category-btn {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogFilters;
