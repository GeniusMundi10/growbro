import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";

// Utility to strip YAML frontmatter from markdown
function stripFrontmatter(md) {
  if (!md) return md;
  // Remove YAML frontmatter between --- ... ---
  return md.replace(/^---[\s\S]*?---/, '').trim();
}

const fallbackContent = {
  "build-your-ai-clone": `## Step 1: Define Your Use Case\nDescribe what you want your AI clone to do.\n\n## Step 2: Choose Tools\nPick a no-code or low-code AI platform.\n\n## Step 3: Integrate with APIs\nConnect to OpenAI or similar APIs for intelligence.\n\n## Step 4: Add UI/UX\nDesign a simple, user-friendly interface.\n\n## Step 5: Test & Deploy\nTest thoroughly and deploy your clone.`,
  "trustworthy-ai": `## Our Principles\n- Ethics\n- Transparency\n- Security\n\n## How We Ensure Trust\n- Human-in-the-loop\n- Open data\n- Auditable models`,
  "customer-engagement": `## Why AI for Engagement?\nAI helps automate and personalize customer journeys.\n\n## Use Cases\n- Chatbots\n- Email personalization\n- Automated follow-ups` 
};

function getColorShade(index) {
  const shades = [
    "#f0fdf4", // light mint
    "#f9fafb", // white
    "#e6f9ee", // light green
    "#f3f4f6", // light gray
    "#e0f2fe", // blue tint
    "#fef9c3", // yellow tint
  ];
  return shades[index % shades.length];
}

function extractInstagramEmbed(link) {
  // Only for Instagram video links
  const match = link.match(/https?:\/\/(?:www\.)?instagram\.com\/.*\/([\w-]+)/);
  if (match) {
    return (
      <div className="premium-md-video-wrap">
        <iframe
          className="premium-md-video"
          src={`https://www.instagram.com/p/${match[1]}/embed`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Instagram Video Demo"
          frameBorder="0"
        />
      </div>
    );
  }
  // For YouTube or other video links, add more cases here
  return null;
}

function renderMarkdownBlock(block, i) {
  // Instagram video embedding
  const instaRegex = /https?:\/\/(?:www\.)?instagram\.com\/.*\/(?:reel|p)\/([\w-]+)/;
  if (instaRegex.test(block)) {
    const match = block.match(instaRegex);
    if (match) {
      return extractInstagramEmbed(block);
    }
  }
  if (/^### /.test(block))
    return <h3 key={i} className="premium-md-h3">{block.replace(/^### /, '')}</h3>;
  if (/^## /.test(block))
    return <h2 key={i} className="premium-md-h2">{block.replace(/^## /, '')}</h2>;
  if (/^\*\*([^*]+)\*\*/.test(block))
    return <strong key={i} className="premium-md-strong">{block.replace(/\*\*([^*]+)\*\*/, '$1')}</strong>;
  if (/^- /.test(block))
    return <ul key={i} className="premium-md-ul">{block.split(/\n/).map((li, j) => li.startsWith('- ') ? <li key={j} className="premium-md-li">{li.replace(/^- /, '')}</li> : null)}</ul>;
  if (/^\d+\. /.test(block))
    return <ol key={i} className="premium-md-ol">{block.split(/\n/).map((li, j) => /^\d+\. /.test(li) ? <li key={j} className="premium-md-li">{li.replace(/^\d+\. /, '')}</li> : null)}</ol>;
  if (/^> /.test(block))
    return <blockquote key={i} className="premium-md-blockquote">{block.replace(/^> /, '')}</blockquote>;
  if (/^!\[.*\]\(.*\)/.test(block)) {
    const match = block.match(/^!\[(.*)\]\((.*)\)/);
    return <img key={i} src={match[2]} alt={match[1]} className="premium-md-img" />;
  }
  if (/^\[.*\]\(.*\)/.test(block)) {
    const match = block.match(/^\[(.*)\]\((.*)\)/);
    return <a key={i} href={match[2]} className="premium-md-link" rel="noopener noreferrer" target="_blank">{match[1]}</a>;
  }
  return <p key={i} className="premium-md-p">{block}</p>;
}

function renderPremiumMarkdown(md) {
  const cleanMd = stripFrontmatter(md);
  const blocks = cleanMd.split(/\n{2,}/);
  return blocks.map((block, i) => (
    <div key={i} style={{ background: getColorShade(i), borderRadius: 16, padding: '1.2em 1.3em', marginBottom: 20, boxShadow: '0 2px 16px rgba(36,181,98,0.07)' }}>
      {renderMarkdownBlock(block, i)}
    </div>
  ));
}

function renderMarkdown(md) {
  // Use a simple markdown renderer for fallback only
  return md.split(/\n+/).map((line, i) => {
    if (line.startsWith('##'))
      return <h2 key={i} className="premium-md-h2">{line.replace(/^## /, '')}</h2>;
    if (line.startsWith('- '))
      return <li key={i} className="premium-md-li">{line.replace(/^- /, '')}</li>;
    if (line.trim() === '') return null;
    return <p key={i} className="premium-md-p">{line}</p>;
  });
}

function AnimatedHeroBG({ parallaxRef }) {
  useEffect(() => {
    let raf;
    function animate() {
      if (parallaxRef.current) {
        const y = window.scrollY || window.pageYOffset;
        parallaxRef.current.style.background = `linear-gradient(120deg, #bbf7d0 ${30+y/8}%, #d1fae5 70%, #f0fdf4 100%)`;
        parallaxRef.current.style.backgroundPosition = `center ${(y/5)}px`;
      }
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [parallaxRef]);
  return null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const heroRef = useRef();
  const [mdContent, setMdContent] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (post) {
      const mdPath = require(`../blog/${post.date}-${slug}.md`);
      fetch(mdPath)
        .then(res => res.text())
        .then(content => {
          if (isMounted) setMdContent(content);
        })
        .catch(() => setMdContent(null));
    }
    return () => { isMounted = false; };
  }, [post, slug]);

  if (!post) return <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center', color: '#6b7280' }}>Blog post not found.</div>;

  return (
    <div className="premium-blog-bg">
      <div ref={heroRef} className="premium-hero">
        <AnimatedHeroBG parallaxRef={heroRef} />
        <div className="premium-hero-img-wrap">
          <img
            src={post.image}
            alt={post.title}
            className="premium-hero-img"
            onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'; }}
          />
          <div className="premium-hero-gradient" />
        </div>
      </div>
      <article className="premium-article">
        <Link to="/blog" className="premium-back-link">← Back to Blog</Link>
        <div className="premium-tags">
          {post.tags && post.tags.map((t, i) => (
            <span key={t} className="premium-tag" style={{ animationDelay: `${0.5 + i * 0.13}s` }}>{t}</span>
          ))}
        </div>
        <h1 className="premium-title">{post.title}</h1>
        <div className="premium-meta">
          <span>{post.author}</span>
          <span className="premium-meta-dot">·</span>
          <span>{post.date}</span>
        </div>
        <p className="premium-summary">{post.summary}</p>
        <div className="premium-md-content">
          {mdContent
            ? renderPremiumMarkdown(mdContent)
            : fallbackContent[slug]
              ? renderMarkdown(fallbackContent[slug])
              : <div style={{ color: '#6b7280' }}>Post content coming soon.</div>
          }
        </div>
      </article>
      <style>{`
        .premium-blog-bg {
          min-height: 100vh;
          background: linear-gradient(115deg,#f0fdf4 0%,#f9fafb 100%);
          padding: 0 0 4rem 0;
          position: relative;
          z-index: 1;
        }
        .premium-hero {
          position: relative;
          z-index: 2;
          border-radius: 32px;
          overflow: hidden;
          margin: 0 auto;
          margin-top: 48px;
          max-width: 820px;
          box-shadow: 0 8px 48px rgba(36,181,98,0.13);
        }
        .premium-hero-img-wrap {
          position: relative;
          width: 100%;
          height: 340px;
          overflow: hidden;
        }
        .premium-hero-img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          filter: brightness(0.97) saturate(1.10);
          transition: transform 0.6s cubic-bezier(.6,.1,.2,1);
        }
        .premium-hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg,rgba(34,197,94,0.11) 0%,rgba(16,185,129,0.10) 70%,rgba(255,255,255,0.09) 100%);
          z-index: 1;
          pointer-events: none;
          animation: heroGradAnim 4s linear infinite alternate;
        }
        .premium-article {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(255,255,255,0.98);
          border-radius: 32px;
          box-shadow: 0 8px 48px rgba(36,181,98,0.13);
          margin-top: -60px;
          padding: 2.5rem 2rem 2.5rem 2rem;
          position: relative;
          z-index: 3;
        }
        .premium-back-link {
          display: inline-block;
          margin-bottom: 24px;
          border-radius: 999px;
          background: #e6f9ee;
          padding: 0.35em 1.6em;
          font-weight: 700;
          color: #16a34a;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 2px 12px #bbf7d0;
          transition: background 0.3s;
        }
        .premium-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
          font-size: 15px;
          font-weight: 700;
          color: #16a34a;
          text-transform: uppercase;
        }
        .premium-tag {
          background: linear-gradient(90deg,#e6f9ee 0%,#d1fae5 100%);
          color: #189c4a;
          padding: 3px 16px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 1px 4px #bbf7d0;
          opacity: 0;
          transform: translateY(-10px) scale(0.7);
          animation: badgeFadeIn 0.7s forwards;
        }
        .premium-title {
          font-weight: 900;
          font-size: 2.65rem;
          margin-bottom: 12px;
          color: #189c4a;
          letter-spacing: -2px;
          line-height: 1.12;
          text-shadow: 0 1px 0 #f0fdf4;
          animation: fadeInUp 1.1s 0.35s both;
        }
        .premium-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #6b7280;
          margin-bottom: 12px;
          font-weight: 600;
          animation: fadeInUp 1.1s 0.45s both;
        }
        .premium-meta-dot {
          margin: 0 8px;
          font-weight: 400;
        }
        .premium-summary {
          font-size: 20px;
          color: #374151;
          margin-top: 6px;
          margin-bottom: 18px;
          opacity: 0.95;
          font-weight: 500;
          animation: fadeInUp 1.1s 0.55s both;
        }
        .premium-md-content {
          font-size: 18px;
          color: #232323;
          line-height: 1.8;
          margin-top: 30px;
          animation: fadeInUp 1.1s 0.65s both;
        }
        .premium-md-h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #16a34a;
          margin: 2.2em 0 0.7em;
          letter-spacing: -0.5px;
          text-shadow: 0 1px 0 #f0fdf4;
        }
        .premium-md-h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #189c4a;
          margin: 1.5em 0 0.5em;
        }
        .premium-md-p {
          margin: 0.8em 0;
          font-size: 18px;
          color: #232323;
          line-height: 1.8;
        }
        .premium-md-li {
          margin-left: 22px;
          font-size: 18px;
          color: #374151;
          margin-bottom: 7px;
        }
        .premium-md-ul, .premium-md-ol {
          margin: 1em 0 1em 1.5em;
        }
        .premium-md-blockquote {
          border-left: 4px solid #16a34a;
          background: #e6f9ee;
          color: #189c4a;
          padding: 0.7em 1.2em;
          margin: 1.5em 0;
          font-style: italic;
          border-radius: 8px;
        }
        .premium-md-img {
          display: block;
          max-width: 100%;
          margin: 2em auto;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(36,181,98,0.12);
        }
        .premium-md-link {
          color: #189c4a;
          text-decoration: underline;
          font-weight: 600;
        }
        .premium-md-video-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2em 0;
        }
        .premium-md-video {
          width: 100%;
          max-width: 420px;
          min-height: 420px;
          aspect-ratio: 1/1;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(36,181,98,0.12);
          background: #000;
        }
        @keyframes badgeFadeIn {
          0% { opacity: 0; transform: translateY(-10px) scale(0.7); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroGradAnim {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
