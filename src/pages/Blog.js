import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../blog/posts";

// Parallax and animated gradient background
function AnimatedParallaxBG() {
  const bgRef = useRef();
  useEffect(() => {
    let frame = 0;
    let raf;
    function animate() {
      frame += 1;
      const angle = frame * 0.12;
      if (bgRef.current) {
        bgRef.current.style.background = `radial-gradient(circle at ${50 + 10 * Math.sin(angle / 2)}% ${40 + 10 * Math.cos(angle / 3)}%, #bbf7d0 0%, #d1fae5 35%, #f0fdf4 80%, #f9fafb 100%)`;
      }
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <div ref={bgRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', transition: 'background 0.3s', willChange: 'background', minHeight: '100vh' }} />;
}

export default function Blog() {
  const cardsRef = useRef([]);
  // Parallax tilt on hover
  function handleCardMouseMove(e, idx) {
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg) scale(1.035)`;
    card.style.boxShadow = `0 18px 48px 0 rgba(36,181,98,0.19), 0 1.5px 6px rgba(0,0,0,0.10)`;
  }
  function handleCardMouseLeave(idx) {
    const card = cardsRef.current[idx];
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
  }
  // Animate cards in on mount
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (card) {
        card.style.opacity = 0;
        card.style.transform = 'translateY(40px) scale(0.98)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.7s cubic-bezier(.6,.1,.2,1), transform 0.7s cubic-bezier(.6,.1,.2,1)';
          card.style.opacity = 1;
          card.style.transform = 'translateY(0) scale(1)';
        }, 200 + i * 120);
      }
    });
  }, []);

  return (
    <div className="main-content" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <AnimatedParallaxBG />
      <section className="section" style={{ background: 'transparent', paddingBottom: 0, position: 'relative', zIndex: 2 }}>
        <h1 className="section-title" style={{ fontSize: '2.7rem', fontWeight: 900, letterSpacing: '-1.5px', color: '#189c4a', marginBottom: '0.7rem', textShadow: '0 2px 0 #e6f9ee' }}>
          Growbro.ai Blog
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '2.5rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Insights, stories, and updates from the frontier of trustworthy AI & business growth.
        </p>
      </section>
      <div className="card-grid" style={{ marginTop: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem', position: 'relative', zIndex: 2 }}>
        {blogPosts.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            ref={el => cardsRef.current[i] = el}
            className="card group"
            style={{ boxShadow: '0 6px 36px rgba(36,181,98,0.13)', background: 'rgba(255,255,255,0.97)', border: '1.5px solid #e5e7eb', borderRadius: 28, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer', backdropFilter: 'blur(2.5px)', position: 'relative', willChange: 'transform, box-shadow' }}
            aria-label={`Read blog: ${post.title}`}
            onMouseMove={e => handleCardMouseMove(e, i)}
            onMouseLeave={() => handleCardMouseLeave(i)}
          >
            <div style={{ position: 'relative', height: 200, width: '100%', overflow: 'hidden', background: 'linear-gradient(90deg,#f0fdf4 0%,#d1fae5 100%)' }}>
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', height: 200, objectFit: 'cover', transition: 'transform 0.45s cubic-bezier(.6,.1,.2,1), filter 0.3s', display: 'block', borderTopLeftRadius: 28, borderTopRightRadius: 28, filter: 'brightness(0.97) saturate(1.1)' }}
                className="group-hover:scale-105"
                loading="lazy"
                onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'; }}
              />
              <div style={{ position: 'absolute', top: 20, left: 20, background: 'linear-gradient(90deg,#e6f9ee 0%,#d1fae5 100%)', color: '#16a34a', fontWeight: 800, fontSize: 14, padding: '0.35rem 1.2rem', borderRadius: 999, boxShadow: '0 2px 8px rgba(36,181,98,0.10)', letterSpacing: '0.04em', opacity: 0.93, transform: 'scale(1)', transition: 'background 0.3s, transform 0.3s', animation: `badgeFadeIn 0.7s ${0.5 + i * 0.12}s both` }} className="group-hover:scale-105">
                {post.tags[0]}
              </div>
            </div>
            <div style={{ padding: '1.7rem 1.3rem 1.3rem 1.3rem', display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 170 }}>
              <h3 style={{ fontWeight: 900, fontSize: '1.32rem', color: '#111827', marginBottom: 12, lineHeight: 1.22, letterSpacing: '-0.5px', minHeight: 56, textShadow: '0 1px 0 #f0fdf4', transition: 'color 0.2s' }} className="group-hover:text-green-700">
                {post.title}
              </h3>
              <p style={{ color: '#444', fontSize: 15, marginBottom: 18, lineHeight: 1.5, minHeight: 48, flexGrow: 1, opacity: 0.92 }}>
                {post.summary}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280', marginTop: 'auto' }}>
                <span>{post.author}</span>
                <span style={{ margin: '0 6px' }}>·</span>
                <span>{post.date}</span>
              </div>
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 28, pointerEvents: 'none', boxShadow: '0 0 0 0 #16a34a', transition: 'box-shadow 0.3s' }} className="card-anim-border"></div>
            {/* Sparkle effect */}
            <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, borderRadius: 28, zIndex: 3, background: 'repeating-radial-gradient(circle at 80% 10%, rgba(34,197,94,0.06) 0, rgba(34,197,94,0.03) 4px, transparent 8px)', opacity: 0.7, mixBlendMode: 'lighten', animation: 'sparkleGlow 3.5s linear infinite' }} />
          </Link>
        ))}
      </div>
      <style>{`
        @keyframes badgeFadeIn {
          0% { opacity: 0; transform: translateY(-10px) scale(0.7); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sparkleGlow {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        .card:hover, .card:focus {
          box-shadow: 0 18px 54px 0 rgba(36,181,98,0.21), 0 1.5px 6px rgba(0,0,0,0.10);
          transform: translateY(-2px) scale(1.045);
        }
        .card:hover .card-anim-border {
          box-shadow: 0 0 0 5px #6ee7b7;
        }
        .card:hover img {
          filter: brightness(1.08) saturate(1.16);
        }
        .card:hover .group-hover\\:scale-105 {
          transform: scale(1.09) !important;
        }
        .card:hover .group-hover\\:text-green-700 {
          color: #16a34a !important;
        }
        .card:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}
