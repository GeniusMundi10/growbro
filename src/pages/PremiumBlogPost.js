import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogPosts } from "../blog/posts";
import SocialShare from "../components/SocialShare";
import TableOfContents from "../components/TableOfContents";

// Utility to strip YAML frontmatter from markdown
function stripFrontmatter(md) {
  if (!md) return md;
  // Remove unnecessary escapes: /---[\s\S]*?---/
  return md.replace(/^---[\s\S]*?---/, '').trim();
}

// Process Instagram and YouTube video links
function processVideoEmbed(url) {
  // Instagram
  const instaMatch = url.match(/https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  if (instaMatch) {
    return (
      <div className="premium-video-embed">
        <iframe
          src={`https://www.instagram.com/p/${instaMatch[1]}/embed/captioned`}
          frameBorder="0"
          scrolling="no"
          allowTransparency="true"
          allowFullScreen={true}
          title="Instagram embed"
        ></iframe>
      </div>
    );
  }

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch) {
    return (
      <div className="premium-video-embed youtube">
        <iframe
          src={`https://www.youtube.com/embed/${ytMatch[1]}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      </div>
    );
  }

  // If no match, return the URL as a link (force growbro.ai domain for internal links)
  const isInternal = url.includes('localhost') || url.includes('127.0.0.1');
  const prodUrl = isInternal ? url.replace(/https?:\/\/(localhost:\d+|127.0.0.1:\d+)/, 'https://growbro.ai') : url;
  return <a href={prodUrl} target="_blank" rel="noopener noreferrer" className="premium-external-link">{prodUrl}</a>;
}

// Enhanced markdown renderer for headings and subheadings
function renderContentBlock(block, index) {
  // H1
  if (/^# /.test(block)) {
    const text = block.replace(/^# /, '');
    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    return (
      <div className="premium-hero-heading-container">
        <div className="premium-hero-heading-overlay"></div>
        <h1 id={id} className="premium-hero-heading">{text}</h1>
      </div>
    );
  }
  // H2
  if (/^## /.test(block)) {
    const text = block.replace(/^## /, '');
    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    return (
      <div className="premium-section">
        <h2 id={id} className="premium-heading">{text}</h2>
      </div>
    );
  }
  // H3
  if (/^### /.test(block)) {
    const text = block.replace(/^### /, '');
    const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
    return (
      <div className="premium-subsection">
        <h3 id={id} className="premium-subheading">{text}</h3>
      </div>
    );
  }
  // List
  if (block.startsWith('- ')) {
    return (
      <div className="premium-list-container">
        <ul className="premium-list">
          {block.split('\n').map((item, i) => (
            <li key={i} className="premium-list-item">{item.replace(/^- /, '')}</li>
          ))}
        </ul>
      </div>
    );
  }
  // Blockquote
  if (/^> /.test(block)) {
    return (
      <blockquote className="premium-blockquote">{block.replace(/^> /, '')}</blockquote>
    );
  }
  // Images
  if (/^!\[.*\]\(.*\)/.test(block)) {
    const match = block.match(/^!\[(.*)\]\((.*)\)/);
    return (
      <div className="premium-image-container">
        <img src={match[2]} alt={match[1]} className="premium-image" loading="lazy" />
        {match[1] && <figcaption className="premium-image-caption">{match[1]}</figcaption>}
      </div>
    );
  }
  // Links - check for video embeds first
  if (block.startsWith('http')) {
    return (
      <div className="premium-embed-container">
        {processVideoEmbed(block.trim())}
      </div>
    );
  }
  // Regular paragraph
  return (
    <div className={`premium-paragraph-container ${index % 2 === 0 ? 'even' : 'odd'}`}>
      <p className="premium-paragraph">{block}</p>
    </div>
  );
}

// Process markdown content into React components with premium styling
function renderPremiumContent(content) {
  if (!content) return null;
  
  const cleanContent = stripFrontmatter(content);
  const blocks = cleanContent.split(/\n{2,}/);
  
  return blocks.map((block, index) => {
    // Skip empty blocks
    if (!block.trim()) return null;
    
    // Calculate a small delay for staggered animations
    const delay = index * 0.05;
    
    // Wrap each content block in AnimatedSection
    return (
      <AnimatedSection key={index} delay={delay}>
        {renderContentBlock(block, index)}
      </AnimatedSection>
    );
  }).filter(Boolean);
}

// Animated background effect
function AnimatedBackground({ heroRef }) {
  useEffect(() => {
    let raf;
    const animate = () => {
      if (heroRef.current) {
        const y = window.scrollY || window.pageYOffset;
        heroRef.current.style.backgroundPosition = `center ${y * 0.2}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(raf);
  }, [heroRef]);
  
  return null;
}

// Add this progress bar component before the main PremiumBlogPost component
function ReadingProgressBar() {
  const [readingProgress, setReadingProgress] = useState(0);
  
  const scrollListener = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const windowScrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (totalHeight > 0) {
      setReadingProgress((windowScrollTop / totalHeight) * 100);
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [scrollListener]);
  
  return (
    <div className="reading-progress-container">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
}

// Add this component for animated section transitions
function AnimatedSection({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (node) {
      observer.observe(node);
    }
    
    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef} 
      className={`animated-section ${isVisible ? 'visible' : ''}`}
      style={{ 
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Add a back to top button component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div 
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
  );
}

// Add an estimated reading time calculator with word count
function getReadingStats(text) {
  if (!text) return { minutes: 0, words: 0 };
  
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return {
    minutes,
    words
  };
}

// Add a related articles component
function RelatedArticles({ currentSlug, tags }) {
  const navigate = useNavigate();
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    // Find related posts based on tags
    const related = blogPosts
      .filter(post => post.slug !== currentSlug && post.tags.some(tag => tags.includes(tag)))
      .slice(0, 3);
    
    setRelatedPosts(related);
  }, [currentSlug, tags]);
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <div className="premium-related-section">
      <h3 className="premium-related-heading">You might also like</h3>
      <div className="premium-related-grid">
        {relatedPosts.map(post => (
          <div 
            key={post.slug} 
            className="premium-related-card"
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <div className="premium-related-image-container">
              <img 
                src={post.image} 
                alt={post.title}
                className="premium-related-image"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
                }}
              />
              <div className="premium-related-tags">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="premium-related-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="premium-related-content">
              <h4 className="premium-related-title">{post.title}</h4>
              <p className="premium-related-date">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add a newsletter subscription component
function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    setIsSubmitted(true);
    setEmail('');
  };
  
  return (
    <div className="premium-newsletter">
      <div className="premium-newsletter-content">
        <h3 className="premium-newsletter-title">Subscribe to our newsletter</h3>
        <p className="premium-newsletter-description">
          Get the latest AI insights and updates delivered straight to your inbox.
        </p>
        
        {isSubmitted ? (
          <div className="premium-newsletter-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p>Thanks for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="premium-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="premium-newsletter-input"
            />
            <button type="submit" className="premium-newsletter-button">
              Subscribe
            </button>
          </form>
        )}
      </div>
      <div className="premium-newsletter-decoration">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </div>
    </div>
  );
}

export default function PremiumBlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const heroRef = useRef();
  const [mdContent, setMdContent] = useState(null);
  const [readingStats, setReadingStats] = useState({ minutes: 0, words: 0 });
  
  useEffect(() => {
    let isMounted = true;
    
    if (post) {
      try {
        const mdPath = require(`../blog/${post.date}-${slug}.md`);
        
        fetch(mdPath)
          .then(res => res.text())
          .then(content => {
            if (isMounted) {
              setMdContent(content);
              setReadingStats(getReadingStats(stripFrontmatter(content)));
            }
          })
          .catch(err => {
            console.error("Error loading markdown:", err);
            setMdContent(null);
          });
      } catch (error) {
        console.error("Error requiring markdown file:", error);
        setMdContent(null);
      }
    }
    
    return () => { isMounted = false; };
  }, [post, slug]);

  // Add this function to handle text selection for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      // Show a tooltip or highlight option
      console.log('Text selected:', selection.toString());
    }
  };
  
  if (!post) {
    return (
      <div className="premium-not-found">
        <h1>Blog post not found</h1>
        <Link to="/blog" className="premium-back-link">← Back to Blog</Link>
      </div>
    );
  }
  
  return (
    <div className="premium-blog-container" onMouseUp={handleTextSelection}>
      <ReadingProgressBar />
      
      {/* Hero section */}
      <div ref={heroRef} className="premium-hero">
        <AnimatedBackground heroRef={heroRef} />
        <div className="premium-hero-content">
          <div className="premium-hero-meta">
            <Link to="/blog" className="premium-back-link">← Back to Blog</Link>
            <div className="premium-tags">
              {post.tags && post.tags.map((tag, i) => (
                <span 
                  key={tag} 
                  className="premium-tag"
                  style={{ 
                    animationDelay: `${0.1 + i * 0.1}s`,
                    '--index': i 
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1 className="premium-title">{post.title}</h1>
          <div className="premium-post-info">
            <div className="premium-author">{post.author}</div>
            <div className="premium-date">{post.date}</div>
            <div className="premium-reading-time">
              {readingStats.minutes} min read
              <span className="premium-word-count">({readingStats.words} words)</span>
            </div>
          </div>
        </div>
        <div className="premium-hero-image-container">
          <img
            src={post.image}
            alt={post.title}
            className="premium-hero-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div className="premium-hero-overlay"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="premium-content-wrapper">
        <div className="premium-sidebar">
          <TableOfContents content={mdContent} />
        </div>
        
        <main className="premium-main-content">
          <div className="premium-summary-box">
            <p className="premium-summary">{post.summary}</p>
          </div>
          
          <div className="premium-content">
            {mdContent ? renderPremiumContent(mdContent) : <div className="premium-loading">Loading...</div>}
          </div>
          
          <NewsletterSubscription />
          
          <SocialShare 
            url={`https://growbro.ai/blog/${slug}`} 
            title={post.title} 
          />
          
          <div className="premium-author-box">
            <div className="premium-author-avatar">
              <span>{post.author.charAt(0)}</span>
            </div>
            <div className="premium-author-info">
              <h3 className="premium-author-name">{post.author}</h3>
              <p className="premium-author-bio">AI enthusiast and technical writer at Growbro.ai, passionate about making artificial intelligence accessible to everyone.</p>
            </div>
          </div>
          
          <RelatedArticles currentSlug={slug} tags={post.tags} />
        </main>
      </div>
      
      {/* Add the back to top button */}
      <BackToTopButton />
      
      {/* Styles */}
      <style jsx>{`
        .premium-blog-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f9fafb 0%, #f0fdf4 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* Hero section */
        .premium-hero {
          position: relative;
          height: 70vh;
          min-height: 500px;
          max-height: 800px;
          overflow: hidden;
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          color: white;
        }
        
        .premium-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .premium-hero-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .premium-back-link {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .premium-back-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .premium-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .premium-tag {
          padding: 0.35rem 0.8rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.5s forwards;
        }
        
        .premium-tag {
          animation-delay: calc(var(--index) * 0.5s);
        }
        
        .premium-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          max-width: 800px;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 0.5s 0.2s forwards;
          opacity: 0;
          transform: translateY(20px);
          position: relative;
          z-index: 3;
        }
        
        .premium-post-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 1rem;
          opacity: 0.9;
          animation: fadeInUp 0.5s 0.3s forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .premium-post-info > div:not(:last-child)::after {
          content: "•";
          margin-left: 1rem;
          opacity: 0.7;
        }
        
        .premium-hero-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .premium-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
          animation: zoomIn 20s linear infinite alternate;
        }
        
        .premium-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(22, 163, 74, 0.7) 100%);
          mix-blend-mode: multiply;
        }
        
        /* Content layout */
        .premium-content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 2rem;
          position: relative;
          margin-top: -4rem;
        }
        
        .premium-sidebar {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }
        
        .premium-main-content {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          z-index: 10;
        }
        
        .premium-summary-box {
          padding: 2rem;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .premium-summary {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #16a34a;
          font-weight: 500;
        }
        
        .premium-content {
          padding: 2rem;
        }
        
        /* Content styling */
        .premium-section {
          margin: 3rem 0 1.5rem;
        }
        
        .premium-heading {
          font-size: 2rem;
          font-weight: 800;
          color: #16a34a;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e6f9ee;
        }
        
        .premium-subsection {
          margin: 2rem 0 1rem;
        }
        
        .premium-subheading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 1rem;
        }
        
        .premium-paragraph-container {
          margin: 1.5rem 0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          transition: all 0.3s;
        }
        
        .premium-paragraph-container.even {
          background: #f9fafb;
        }
        
        .premium-paragraph-container.odd {
          background: #f0fdf4;
        }
        
        .premium-paragraph {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
        }
        
        .premium-list-container {
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 0.75rem;
          border-left: 4px solid #16a34a;
        }
        
        .premium-list-container.ordered {
          background: #f0f9ff;
          border-left-color: #0ea5e9;
        }
        
        .premium-list, .premium-ordered-list {
          padding-left: 1.5rem;
          margin: 0;
        }
        
        .premium-list-item {
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
          line-height: 1.6;
          color: #374151;
        }
        
        .premium-blockquote-container {
          margin: 2rem 0;
        }
        
        .premium-blockquote {
          padding: 1.5rem 2rem;
          background: #f0fdf4;
          border-left: 4px solid #16a34a;
          font-size: 1.25rem;
          line-height: 1.6;
          color: #16a34a;
          font-style: italic;
          position: relative;
          border-radius: 0 0.75rem 0.75rem 0;
        }
        
        .premium-blockquote::before {
          content: """;
          position: absolute;
          top: -0.5rem;
          left: 0.5rem;
          font-size: 4rem;
          color: rgba(22, 163, 74, 0.2);
          font-family: Georgia, serif;
        }
        
        .premium-code-container {
          margin: 2rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .premium-code-header {
          padding: 0.75rem 1.5rem;
          background: #1e293b;
          color: white;
          font-family: monospace;
          font-size: 0.875rem;
        }
        
        .premium-code {
          margin: 0;
          padding: 1.5rem;
          background: #0f172a;
          color: #e2e8f0;
          font-family: monospace;
          font-size: 0.875rem;
          line-height: 1.6;
          overflow-x: auto;
        }
        
        .premium-image-container {
          margin: 2rem 0;
          text-align: center;
        }
        
        .premium-image {
          max-width: 100%;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .premium-image-caption {
          margin-top: 0.75rem;
          font-size: 0.875rem;
          color: #6b7280;
          font-style: italic;
        }
        
        .premium-embed-container {
          margin: 2rem 0;
        }
        
        .premium-video-embed {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .premium-video-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .premium-video-embed.youtube {
          padding-bottom: 56.25%; /* YouTube aspect ratio */
        }
        
        .premium-external-link {
          color: #16a34a;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 2px solid #bbf7d0;
          transition: all 0.2s;
        }
        
        .premium-external-link:hover {
          color: #15803d;
          border-bottom-color: #15803d;
        }
        
        /* Author box */
        .premium-author-box {
          margin: 3rem 0;
          padding: 2rem;
          background: #f9fafb;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .premium-author-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a 0%, #10b981 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          font-weight: 700;
        }
        
        .premium-author-info {
          flex: 1;
        }
        
        .premium-author-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.5rem;
        }
        
        .premium-author-bio {
          font-size: 1rem;
          line-height: 1.6;
          color: #4b5563;
        }
        
        /* Related posts */
        .premium-related-posts {
          margin: 3rem 0;
        }
        
        .premium-related-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e6f9ee;
        }
        
        .premium-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .premium-related-card {
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }
        
        .premium-related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        
        .premium-related-image-container {
          height: 180px;
          overflow: hidden;
        }
        
        .premium-related-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s;
        }
        
        .premium-related-card:hover .premium-related-image {
          transform: scale(1.05);
        }
        
        .premium-related-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .premium-related-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.75rem;
        }
        
        .premium-related-summary {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #4b5563;
          flex: 1;
        }
        
        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .premium-content-wrapper {
            grid-template-columns: 1fr;
          }
          
          .premium-sidebar {
            display: none;
          }
          
          .premium-title {
            font-size: 2.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .premium-hero {
            min-height: 400px;
          }
          
          .premium-hero-content {
            padding: 2rem 1.5rem;
          }
          
          .premium-title {
            font-size: 2rem;
          }
          
          .premium-content {
            padding: 1.5rem;
          }
          
          .premium-heading {
            font-size: 1.75rem;
          }
          
          .premium-subheading {
            font-size: 1.25rem;
          }
          
          .premium-paragraph {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .premium-hero {
            min-height: 350px;
          }
          
          .premium-hero-content {
            padding: 1.5rem 1rem;
          }
          
          .premium-title {
            font-size: 1.75rem;
          }
          
          .premium-post-info {
            font-size: 0.875rem;
          }
          
          .premium-content {
            padding: 1rem;
          }
          
          .premium-heading {
            font-size: 1.5rem;
          }
          
          .premium-related-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .reading-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          z-index: 1000;
        }
        
        .reading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #10b981);
          width: 0%;
          transition: width 0.2s ease;
        }
        
        .animated-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animated-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .premium-image {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        
        .premium-image:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }
        
        .premium-blockquote {
          transition: transform 0.3s ease;
        }
        
        .premium-blockquote:hover {
          transform: translateX(5px);
        }
        
        .premium-list-item {
          transition: transform 0.2s ease;
        }
        
        .premium-list-item:hover {
          transform: translateX(5px);
        }
        
        .premium-hero-image {
          transition: transform 20s ease;
        }
        
        .premium-hero:hover .premium-hero-image {
          transform: scale(1.1);
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(22, 163, 74, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
          }
        }
        
        .premium-tag {
          animation: pulse 2s infinite;
          animation-delay: calc(var(--index) * 0.5s);
        }
        
        .premium-title {
          background: linear-gradient(90deg, #16a34a, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: gradientText 4s linear infinite;
        }
        
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Add a floating action button for quick navigation to top */
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #16a34a;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s, transform 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }
        
        .back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .back-to-top:hover {
          background: #15803d;
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        /* Add these new styles */
        .premium-word-count {
          font-size: 0.85em;
          opacity: 0.7;
          margin-left: 0.5rem;
        }
        
        .premium-newsletter {
          margin: 4rem 0;
          padding: 2.5rem;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }
        
        .premium-newsletter-content {
          flex: 1;
          position: relative;
          z-index: 1;
        }
        
        .premium-newsletter-decoration {
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.1;
        }
        
        .premium-newsletter-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.5rem;
        }
        
        .premium-newsletter-description {
          font-size: 1rem;
          color: #4b5563;
          margin-bottom: 1.5rem;
        }
        
        .premium-newsletter-form {
          display: flex;
          gap: 0.5rem;
        }
        
        .premium-newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .premium-newsletter-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
        }
        
        .premium-newsletter-button {
          padding: 0.75rem 1.5rem;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        
        .premium-newsletter-button:hover {
          background: #15803d;
          transform: translateY(-2px);
        }
        
        .premium-newsletter-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #16a34a;
          font-weight: 600;
        }
        
        .premium-related-section {
          margin: 4rem 0 2rem;
        }
        
        .premium-related-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e6f9ee;
        }
        
        .premium-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .premium-related-card {
          background: white;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          cursor: pointer;
        }
        
        .premium-related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        
        .premium-related-image-container {
          height: 150px;
          overflow: hidden;
          position: relative;
        }
        
        .premium-related-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s;
        }
        
        .premium-related-card:hover .premium-related-image {
          transform: scale(1.05);
        }
        
        .premium-related-tags {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          gap: 0.5rem;
        }
        
        .premium-related-tag {
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.9);
          color: #16a34a;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 9999px;
        }
        
        .premium-related-content {
          padding: 1.25rem;
        }
        
        .premium-related-title {
          font-size: 1rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        
        .premium-related-date {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .premium-newsletter {
            padding: 1.5rem;
            flex-direction: column;
          }
          
          .premium-newsletter-decoration {
            display: none;
          }
          
          .premium-newsletter-form {
            flex-direction: column;
          }
          
          .premium-newsletter-button {
            width: 100%;
          }
        }
        
        /* Keep existing styles */
        {{ ... }}
        
        /* Add these new styles */
        .premium-hero-heading-container {
          position: relative;
          width: 100%;
          text-align: center;
          margin-top: 0;
          margin-bottom: 2.5rem;
          z-index: 10;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          min-height: 15vw;
          min-height: 120px;
        }
        
        .premium-hero-heading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100%;
          background: linear-gradient(180deg,rgba(0,0,0,0.82) 60%,rgba(0,0,0,0.4) 100%);
          z-index: 2;
          filter: none;
          pointer-events: none;
        }
        
        .premium-hero-heading {
          position: relative;
          font-size: 3.3rem;
          font-weight: 900;
          color: #fff;
          z-index: 3;
          text-shadow:
            0 4px 32px #000,
            0 2px 0 #16a34a,
            0 0 18px #000,
            0 0 2px #fff;
          line-height: 1.13;
          letter-spacing: -0.04em;
          margin: 0 auto 0.7rem;
          padding: 0.7rem 2vw 0.5rem 2vw;
          display: inline-block;
          border-radius: 1.2rem;
          border: 2.5px solid rgba(22,163,74,0.18);
          box-shadow: 0 8px 36px 0 rgba(0,0,0,0.34), 0 0 0 4px rgba(22,163,74,0.08);
          background: rgba(0,0,0,0.18);
        }
        
        @media (max-width: 900px) {
          .premium-hero-heading {
            font-size: 2.1rem;
            padding: 0.6rem 1vw 0.4rem 1vw;
          }
          .premium-hero-heading-container {
            min-height: 80px;
          }
        }
        
        @media (max-width: 600px) {
          .premium-hero-heading {
            font-size: 1.2rem;
            padding: 0.5rem 0.5vw 0.3rem 0.5vw;
            border-radius: 0.7rem;
          }
          .premium-hero-heading-container {
            min-height: 48px;
          }
        }
        
        .premium-heading {
          font-size: 2rem;
          font-weight: 800;
          color: #16a34a;
          margin: 2.5rem 0 1.2rem 0;
          text-shadow: 0 1px 0 #fff, 0 0 8px #e6f9ee;
        }
        
        .premium-subheading {
          font-size: 1.35rem;
          font-weight: 700;
          color: #189c4a;
          margin: 2rem 0 1rem 0;
          text-shadow: 0 1px 0 #fff;
        }
      `}</style>
    </div>
  );
}
