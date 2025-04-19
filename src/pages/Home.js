import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSVG from '../components/HeroSVG';
import FeatureIconBot from '../components/FeatureIconBot';
import FeatureIconChat from '../components/FeatureIconChat';
import FeatureIconAnalytics from '../components/FeatureIconAnalytics';
import FeatureIconGlobe from '../components/FeatureIconGlobe';
import FeatureIconShield from '../components/FeatureIconShield';

export default function Home() {
  return (
    <>
      {/* Animated Hero Section */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontSize: '3.2rem', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: 900, margin: '0 auto', whiteSpace: 'pre-line', wordBreak: 'break-word' }}
          >
            Let WhatsApp AI Agents handle your customer chats{`\n`}24/7
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ fontSize: '1.6rem', maxWidth: 700, margin: '1.5rem auto 0 auto', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', color: '#374151' }}
          >
            Autonomous agents that answer purchase inquiries, close new sales, engage loyal customers & resolve support queries instantly.
          </motion.p>
          <motion.div
            className="button-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/contact" className="button-primary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', fontWeight: 700 }}>
              Request Demo
            </Link>
            <Link to="/pricing" className="button-secondary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', fontWeight: 700 }}>
              Get Volume Pricing
            </Link>
          </motion.div>
        </motion.div>
        {/* Animated SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ marginTop: '2.5rem' }}
        >
          <HeroSVG />
        </motion.div>
      </section>

      {/* Features Overview Section */}
      <section className="section" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #fff 100%)' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem' }}>
          Everything You Need to Scale Customer Engagement on WhatsApp
        </h2>
        <div className="card-grid">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.07, duration: 0.5 }}
              style={{ minHeight: 240 }}
            >
              <div className="card-icon">{feature.icon}</div>
              <div className="card-title" style={{ fontSize: '1.3rem', fontWeight: 700 }}>{feature.title}</div>
              <div className="card-description" style={{ fontSize: '1.05rem', fontWeight: 400 }}>{feature.description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <h2 className="section-title" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.2rem' }}>
          Power Your WhatsApp Strategy with Speed, Compliance, and Expertise
        </h2>
        <div className="card-grid">
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={item.title}
              className="card"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.09, duration: 0.5 }}
              style={{ minHeight: 200 }}
            >
              <div className="card-icon">{item.icon}</div>
              <div className="card-title" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.title}</div>
              <div className="card-description" style={{ fontSize: '1.05rem', fontWeight: 400 }}>{item.description}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-section" style={{ background: 'linear-gradient(90deg, #d1fae5 0%, #f0fdf4 100%)' }}>
        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}
        >
          Launch Your WhatsApp AI Agents Today
        </motion.h2>
        <motion.div
          className="button-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/contact" className="button-primary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', fontWeight: 700 }}>
            Request Demo
          </Link>
          <Link to="/pricing" className="button-secondary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem', fontWeight: 700 }}>
            Get Volume Pricing
          </Link>
        </motion.div>
      </section>
    </>
  );
}

const features = [
  {
    title: 'Customize AI Agents to your Brand',
    description: "Personalize your AI agents to reflect your brand's voice and values for highly engaging interactions.",
    icon: <FeatureIconBot />,
  },
  {
    title: 'Natural, human-like conversations',
    description: 'AI agents chat just like real people, understanding context and resolving queries quickly.',
    icon: <FeatureIconChat />,
  },
  {
    title: 'Engagement Analytics',
    description: 'Track success, satisfaction, and performance in real-time.',
    icon: <FeatureIconAnalytics />,
  },
  {
    title: 'Chat across multiple languages',
    description: 'Automatic detection and natural responses in 28+ languages.',
    icon: <FeatureIconGlobe />,
  },
  {
    title: 'Built-In Compliance & Regulatory Adherence',
    description: 'Pre-configured controls for GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2, and more.',
    icon: <FeatureIconShield />,
  },
  {
    title: '24/7 Availability',
    description: 'Serve customers instantly at any time, ensuring no lost sales or unanswered queries.',
    icon: <FeatureIconBot />,
  },
  {
    title: 'Scales Infinitely – No Hiring Needed',
    description: 'Handle unlimited conversations simultaneously without increasing your team size.',
    icon: <FeatureIconChat />,
  },
  {
    title: 'Smarter Conversations with Memory',
    description: 'Remembers customer preferences and history for accurate, personalized answers.',
    icon: <FeatureIconAnalytics />,
  },
  {
    title: 'Unified Customer Profiles',
    description: '360° view of each customer to resolve complex, multi-part questions.',
    icon: <FeatureIconGlobe />,
  },
  {
    title: 'Integrate Knowledge Sources',
    description: 'Connect internal documents, FAQs, and blogs for accurate, context-aware responses.',
    icon: <FeatureIconShield />,
  },
  {
    title: 'No-Code AI Agent Studio',
    description: 'Easily build custom AI agents with a visual studio—no coding required.',
    icon: <FeatureIconBot />,
  },
  {
    title: 'Human-in-the-loop',
    description: 'Seamlessly escalate complex queries to humans, preserving conversation context.',
    icon: <FeatureIconChat />,
  },
  {
    title: 'Seamless Integrations',
    description: 'Connect with Shopify, Salesforce, Zendesk, and more for context-aware actions.',
    icon: <FeatureIconAnalytics />,
  },
  {
    title: 'Rich Media Support',
    description: 'Share images, videos, documents, and buttons for engaging conversations.',
    icon: <FeatureIconGlobe />,
  },
  {
    title: 'Verified Business Profile & Green Tick',
    description: 'Build trust with an official WhatsApp Business presence.',
    icon: <FeatureIconShield />,
  },
  {
    title: 'Quick Reply & Interactive Buttons',
    description: 'One-tap response options help customers make choices quickly.',
    icon: <FeatureIconBot />,
  },
  {
    title: 'Message Templates',
    description: 'Reuse approved templates for consistent, personalized messaging.',
    icon: <FeatureIconChat />,
  },
  {
    title: 'Broadcast & Bulk Messages',
    description: 'Send targeted updates and offers to thousands of customers at once.',
    icon: <FeatureIconAnalytics />,
  },
];

const whyChooseUs = [
  {
    title: 'Faster Onboarding & Approval',
    description: 'Get verified and set up your WhatsApp Business account quickly with priority approval.',
    icon: <FeatureIconBot />,
  },
  {
    title: 'Number Flexibility & Global Reach',
    description: 'Choose from mobile, landline, or toll-free numbers—or use your existing number.',
    icon: <FeatureIconGlobe />,
  },
  {
    title: 'Premium Support & Priority Meta Assistance',
    description: 'Expedited support and faster issue resolution for uninterrupted operations.',
    icon: <FeatureIconChat />,
  },
  {
    title: 'Built-In Compliance & Regulatory Adherence',
    description: 'Pre-configured controls for GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2, and more.',
    icon: <FeatureIconShield />,
  },
  {
    title: 'Enterprise-Grade Reliability',
    description: 'Direct connections and 99.99% uptime for fast, secure message delivery.',
    icon: <FeatureIconAnalytics />,
  },
];
