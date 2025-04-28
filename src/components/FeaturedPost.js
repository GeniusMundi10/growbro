import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedPost = ({ post }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Animate in on mount
    card.style.opacity = 0;
    card.style.transform = 'translateY(40px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.8s cubic-bezier(.6,.1,.2,1), transform 0.8s cubic-bezier(.6,.1,.2,1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 200);
    
    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Move image in opposite direction for parallax effect
      const image = card.querySelector('.featured-image');
      if (image) {
        image.style.transform = `translate(${-x / 30}px, ${-y / 30}px) scale(1.05)`;
      }
      
      // Subtle card tilt
      card.style.transform = `perspective(1000px) rotateY(${x / 60}deg) rotateX(${-y / 60}deg)`;
    };
    
    const handleMouseLeave = () => {
      const image = card.querySelector('.featured-image');
      if (image) {
        image.style.transform = 'translate(0, 0) scale(1)';
      }
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  if (!post) return null;
  
  // Calculate reading time (rough estimate)
  const readingTime = post.summary ? Math.ceil(post.summary.split(' ').length / 20) : 2;
  
  return (
    <Link to={`/blog/${post.slug}`} className="featured-post-link">
      <div ref={cardRef} className="featured-post">
        <div className="featured-image-container">
          <img 
            src={post.image} 
            alt={post.title}
            className="featured-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="featured-overlay"></div>
        </div>
        
        <div className="featured-content">
          <div className="featured-tags">
            {post.tags && post.tags.map((tag, i) => (
              <span key={tag} className="featured-tag" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="featured-title">{post.title}</h2>
          
          <p className="featured-summary">{post.summary}</p>
          
          <div className="featured-meta">
            <div className="featured-author">{post.author}</div>
            <div className="featured-date">{post.date}</div>
            <div className="featured-reading-time">{readingTime} min read</div>
          </div>
          
          <div className="featured-cta">
            <span className="featured-cta-text">Read Article</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .featured-post-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .featured-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          margin-bottom: 3rem;
          position: relative;
          will-change: transform;
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .featured-post:hover {
          box-shadow: 0 20px 60px rgba(22, 163, 74, 0.15);
        }
        
        .featured-image-container {
          position: relative;
          height: 100%;
          min-height: 400px;
          overflow: hidden;
        }
        
        .featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .featured-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
        }
        
        .featured-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
        }
        
        .featured-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .featured-tag {
          padding: 0.35rem 1rem;
          background: #e6f9ee;
          color: #16a34a;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 9999px;
          animation: fadeInUp 0.5s forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        
        .featured-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #111827;
        }
        
        .featured-summary {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 2rem;
          flex-grow: 1;
        }
        
        .featured-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.95rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        
        .featured-meta > div:not(:last-child)::after {
          content: "•";
          margin-left: 1rem;
          opacity: 0.5;
        }
        
        .featured-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #16a34a;
          font-weight: 600;
          transition: gap 0.3s ease;
        }
        
        .featured-post:hover .featured-cta {
          gap: 0.75rem;
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
        
        @media (max-width: 1024px) {
          .featured-post {
            grid-template-columns: 1fr;
          }
          
          .featured-image-container {
            min-height: 300px;
          }
          
          .featured-content {
            padding: 2rem;
          }
          
          .featured-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </Link>
  );
};

export default FeaturedPost;
