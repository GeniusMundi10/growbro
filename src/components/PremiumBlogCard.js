import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PremiumBlogCard = ({ post, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Animate in on mount with staggered delay
    card.style.opacity = 0;
    card.style.transform = 'translateY(40px) scale(0.98)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.7s cubic-bezier(.6,.1,.2,1), transform 0.7s cubic-bezier(.6,.1,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0) scale(1)';
    }, 100 + index * 100);
    
    // Parallax tilt effect on mouse move
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Tilt the card
      card.style.transform = `perspective(1000px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg) scale(1.02)`;
      card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.1)';
      
      // Move image in opposite direction for parallax effect
      if (imageRef.current) {
        imageRef.current.style.transform = `translateX(${-x / 20}px) translateY(${-y / 20}px) scale(1.05)`;
      }
    };
    
    const handleMouseLeave = () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      
      if (imageRef.current) {
        imageRef.current.style.transform = '';
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);
  
  // Calculate reading time (rough estimate)
  const readingTime = post.summary ? Math.ceil(post.summary.split(' ').length / 20) : 2;
  
  return (
    <Link to={`/blog/${post.slug}`} className="premium-card-link">
      <article ref={cardRef} className="premium-card">
        <div className="premium-card-image-container">
          <img
            ref={imageRef}
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
      
      <style jsx>{`
        .premium-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
          height: 100%;
        }
        
        .premium-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          will-change: transform, box-shadow;
          transform-style: preserve-3d;
        }
        
        .premium-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(22, 163, 74, 0.15);
        }
        
        .premium-card-image-container {
          height: 200px;
          position: relative;
          overflow: hidden;
        }
        
        .premium-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .premium-card-tags {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          gap: 0.5rem;
        }
        
        .premium-card-tag {
          background: rgba(255, 255, 255, 0.9);
          color: #16a34a;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          backdrop-filter: blur(4px);
          animation: fadeInUp 0.5s forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        
        .premium-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .premium-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.75rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        
        .premium-card:hover .premium-card-title {
          color: #16a34a;
        }
        
        .premium-card-summary {
          font-size: 0.95rem;
          color: #4b5563;
          margin: 0 0 1.5rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }
        
        .premium-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #6b7280;
          margin-top: auto;
        }
        
        .premium-card-author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .premium-card-author-avatar {
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          color: white;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .premium-card-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }
        
        .premium-card-date {
          opacity: 0.8;
        }
        
        .premium-card-reading-time {
          background: #f3f4f6;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .premium-card-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
          transform: translateX(-100%);
        }
        
        .premium-card:hover .premium-card-shine {
          opacity: 1;
          transform: translateX(100%);
          transition: transform 0.8s ease;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .premium-card-image-container {
            height: 180px;
          }
          
          .premium-card-content {
            padding: 1.25rem;
          }
          
          .premium-card-title {
            font-size: 1.1rem;
          }
          
          .premium-card-summary {
            font-size: 0.9rem;
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </Link>
  );
};

export default PremiumBlogCard;
