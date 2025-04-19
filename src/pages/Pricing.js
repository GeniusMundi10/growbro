import React, { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    price: 2580, // ₹2,580/mo
    description: 'For small businesses getting started with WhatsApp RAG AI.',
    features: [
      'Up to 1,000 conversations/mo',
      '1 WhatsApp number',
      'Basic AI Agent',
      'Basic analytics',
      'Email support',
    ],
    overage: '₹2.70 per conversation',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 7030, // ₹7,030/mo
    description: 'For growing teams needing more power and flexibility.',
    features: [
      'Up to 5,000 conversations/mo',
      '3 WhatsApp numbers',
      'Advanced AI + RAG',
      'Analytics & integrations',
      'Priority email support',
      'Custom knowledge base',
    ],
    overage: '₹2.23 per conversation',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: 13260, // ₹13,260/mo
    description: 'For businesses needing scale, advanced features, and support.',
    features: [
      'Up to 15,000 conversations/mo',
      '10 WhatsApp numbers',
      'Full RAG, API access',
      'Priority support',
      'Advanced integrations',
    ],
    overage: '₹1.78 per conversation',
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited conversations',
      'Unlimited WhatsApp numbers',
      'Dedicated support',
      'Custom AI/RAG & integrations',
      'On-premise/Cloud options',
      'White-label & SLA',
    ],
    overage: 'Custom',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'What counts as a conversation?',
    a: 'A conversation is a 24-hour session with a user, as per WhatsApp’s pricing model.'
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, you can change your plan at any time from your dashboard.'
  },
  {
    q: 'What is RAG?',
    a: 'Retrieval-Augmented Generation (RAG) combines AI with your business data for smarter, more accurate responses.'
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! You can start any plan with a free 14-day trial.'
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const getPrice = (plan) => {
    if (typeof plan.price === 'string') return plan.price;
    if (annual) return `₹${(plan.price * 10).toLocaleString()} /yr`;
    return `₹${plan.price.toLocaleString()} /mo`;
  };

  return (
    <section className="pricing-section">
      <h2 className="pricing-title">Pricing Plans</h2>
      <div className="pricing-toggle">
        <span className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Monthly</span>
        <span className="toggle-slider" onClick={() => setAnnual(a => !a)}></span>
        <span className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>Annual <span className="save-badge">Save 2 months</span></span>
      </div>
      <div className="pricing-table">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`pricing-card${plan.highlight ? ' highlight' : ''}`}
          >
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price">{getPrice(plan)}</div>
            <div className="plan-desc">{plan.description}</div>
            <ul className="plan-features">
              {plan.features.map(feature => (
                <li key={feature}><span className="feature-tick">✔</span> {feature}</li>
              ))}
            </ul>
            <div className="plan-overage">Overage: {plan.overage}</div>
            <button className="plan-cta">
              {plan.name === 'Enterprise' ? 'Contact Us' : 'Start Free Trial'}
            </button>
          </div>
        ))}
      </div>
      <div className="pricing-faq">
        <h4>Frequently Asked Questions</h4>
        {faqs.map(faq => (
          <div key={faq.q} className="faq-item">
            <div className="faq-q">{faq.q}</div>
            <div className="faq-a">{faq.a}</div>
          </div>
        ))}
      </div>
      <div className="pricing-note">
        All plans include secure WhatsApp Business API integration and RAG AI support. Cancel anytime.
      </div>
    </section>
  );
}
