import React from 'react';
import AnimatedLogoSprout from '../components/AnimatedLogoSprout';

export default function About() {
  return (
    <section className="about-section">
      <div className="about-hero">
        <AnimatedLogoSprout size={54} />
        <h2 className="about-title">About growbro.ai</h2>
        <p className="about-tagline">Empowering Business Growth with AI</p>
      </div>
      <div className="about-content">
        <p>
          <b>growbro.ai</b> is dedicated to empowering businesses with cutting-edge AI solutions. Our mission is to make advanced AI technology accessible, secure, and impactful for organizations of all sizes.
        </p>
        <p>
          Our team consists of AI experts, engineers, and business strategists passionate about transforming customer engagement through automation and intelligence. We believe in innovation, transparency, and delivering measurable business value.
        </p>
        <p>
          Whether you're a startup or an enterprise, we help you unlock the full potential of modern AI-driven automation tailored to your needs.
        </p>
      </div>
      <div className="about-values">
        <div className="about-value-card">
          <span className="about-value-icon">🚀</span>
          <span className="about-value-title">Innovation</span>
        </div>
        <div className="about-value-card">
          <span className="about-value-icon">🤝</span>
          <span className="about-value-title">Partnership</span>
        </div>
        <div className="about-value-card">
          <span className="about-value-icon">🔒</span>
          <span className="about-value-title">Trust & Security</span>
        </div>
        <div className="about-value-card">
          <span className="about-value-icon">📈</span>
          <span className="about-value-title">Growth</span>
        </div>
      </div>
    </section>
  );
}
