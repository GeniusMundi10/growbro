import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PremiumBlogCard.css';

const PremiumBlogCard = ({ post, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Animate in on mount with staggered delay
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 150 + index * 100);
  }, [index]);

  // Calculate reading time (rough estimate)
  const readingTime = post.summary ? Math.ceil(post.summary.split(' ').length / 200) : 1;

  return (
    <Link to={`/blog/${post.slug}`} className="premium-card-link">
      <article ref={cardRef} className="premium-card">
        <div className="premium-card-image-container">
          <img
            src={post.image}
            alt={post.title}
            className="premium-card-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="premium-card-tags">
            {post.tags && post.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={tag} 
                className="premium-card-tag"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="premium-card-content">
          <h3 className="premium-card-title">{post.title}</h3>
          <p className="premium-card-summary">{post.summary}</p>
          
          <div className="premium-card-meta">
            <div className="premium-card-author">
              <div className="premium-card-author-avatar">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="premium-card-info">
              <span className="premium-card-date">{post.date}</span>
              <span className="premium-card-reading-time">{readingTime} min read</span>
            </div>
          </div>
        </div>
        
        <div className="premium-card-shine"></div>
      </article>
    </Link>
  );
};

export default PremiumBlogCard;
