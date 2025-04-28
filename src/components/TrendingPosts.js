import React from 'react';
import { Link } from 'react-router-dom';

const TrendingPosts = ({ posts }) => {
  // Sort posts by a "trending" factor (in a real app, this would be based on views/shares)
  // Here we'll just take the most recent posts
  const trendingPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  }).slice(0, 3);
  
  return (
    <div className="trending-posts">
      <h3 className="trending-title">Trending Now</h3>
      
      <div className="trending-list">
        {trendingPosts.map((post, index) => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`} 
            className="trending-item"
          >
            <div className="trending-rank">{index + 1}</div>
            <div className="trending-content">
              <h4 className="trending-item-title">{post.title}</h4>
              <div className="trending-meta">
                <span className="trending-date">{post.date}</span>
                <span className="trending-tag">{post.tags[0]}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <style jsx>{`
        .trending-posts {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .trending-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #f3f4f6;
        }
        
        .trending-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .trending-item {
          display: flex;
          text-decoration: none;
          color: inherit;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transition: background-color 0.2s, transform 0.2s;
        }
        
        .trending-item:hover {
          background-color: #f9fafb;
          transform: translateX(4px);
        }
        
        .trending-rank {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: #e6f9ee;
          color: #16a34a;
          font-weight: 700;
          border-radius: 0.5rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .trending-content {
          flex: 1;
        }
        
        .trending-item-title {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .trending-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .trending-date {
          opacity: 0.8;
        }
        
        .trending-tag {
          background: #f3f4f6;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .trending-posts {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TrendingPosts;
