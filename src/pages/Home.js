import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureIconBot from '../components/FeatureIconBot';
import FeatureIconChat from '../components/FeatureIconChat';
import FeatureIconAnalytics from '../components/FeatureIconAnalytics';
import FeatureIconGlobe from '../components/FeatureIconGlobe';
import FeatureIconShield from '../components/FeatureIconShield';
import HeroSection from '../components/HeroSection';
import VideoSection from '../components/VideoSection';
import StepsSection from '../components/StepsSection';
import TrainAISection from '../components/TrainAISection';
import CustomizeAISection from '../components/CustomizeAISection';
import TrainChatbotSection from '../components/TrainChatbotSection';
import FeatureGridSection from '../components/FeatureGridSection';
import AdvancedAnalyticsSection from '../components/AdvancedAnalyticsSection';
import SmartRoutingSection from '../components/SmartRoutingSection';
import IntegrationsSection from '../components/IntegrationsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import '../components/TrainAISection.css';
import '../components/CustomizeAISection.css';
import '../components/TrainChatbotSection.css';
import '../components/FeatureGridSection.css';
import '../components/AdvancedAnalyticsSection.css';
import '../components/SmartRoutingSection.css';
import '../components/IntegrationsSection.css';
import '../components/FAQSection.css';
import '../components/CTASection.css';
import '../components/StepsSection.css';
import '../components/VideoSection.css';

export default function Home() {
  return (
    <>
      {/* Hero Section (Wonderchat-style) */}
      <HeroSection />

      {/* Video Demo Section (Crisp-style) */}
      <VideoSection />

      {/* 3-Steps Section (Growbro-style) */}
      <StepsSection />

      {/* Train AI Section (Wonderchat-style) */}
      <TrainAISection />

      {/* Customize AI Section (Wonderchat-style) */}
      <CustomizeAISection />

      {/* Train Chatbot Section (Wonderchat-style) */}
      <TrainChatbotSection />

      {/* Feature Grid Section (Wonderchat-style) */}
      <FeatureGridSection />

      {/* Advanced Analytics Section (Wonderchat-style) */}
      <AdvancedAnalyticsSection />

      {/* Smart Routing Section (Wonderchat-style) */}
      <SmartRoutingSection />

      {/* Integrations Section (GrowBro-style) */}
      <IntegrationsSection />

      {/* Features Overview Section */}
      <section className="section" style={{ background: 'linear-gradient(90deg, #f0fdf4 0%, #fff 100%)' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2.5rem' }}>
          AI Chatbot Solutions for Every Platform
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


      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
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


