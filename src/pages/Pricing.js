import React, { useState } from 'react';

// WhatsApp pricing plans (existing)
// WhatsApp pricing plans (fully commented out)
// const whatsappPlans = [
//   {
//     name: 'Starter',
//     price: 29, // ₹2,580/mo
//     description: 'For small businesses getting started with WhatsApp RAG AI.',
//     features: [
//       'Up to 1,000 conversations/mo',
//       '1 WhatsApp number',
//       'Basic AI Agent',
//       'Basic analytics',
//       'Email support',
//     ],
//     overage: '$0.03 per conversation',
//     highlight: false,
//   },
//   {
//     name: 'Pro',
//     price: 79, // ₹7,030/mo
//     description: 'For growing teams needing more power and flexibility.',
//     features: [
//       'Up to 5,000 conversations/mo',
//       '3 WhatsApp numbers',
//       'Advanced AI + RAG',
//       'Analytics & integrations',
//       'Priority email support',
//       'Custom knowledge base',
//     ],
//     overage: '$0.03 per conversation',
//     highlight: true,
//     badge: 'Most Popular',
//   },
//   {
//     name: 'Business',
//     price: 149, // ₹13,260/mo
//     description: 'For businesses needing scale, advanced features, and support.',
//     features: [
//       'Up to 15,000 conversations/mo',
//       '10 WhatsApp numbers',
//       'Full RAG, API access',
//       'Priority support',
//       'Advanced integrations',
//     ],
//     overage: '$0.03 per conversation',
//     highlight: false,
//   },
//   {
//     name: 'Enterprise',
//     price: 'Custom',
//     description: 'For large organizations with custom needs.',
//     features: [
//       'Unlimited conversations',
//       'Unlimited WhatsApp numbers',
//       'Dedicated support',
//       'Custom AI/RAG & integrations',
//       'On-premise/Cloud options',
//       'White-label & SLA',
//     ],
//     overage: 'Custom',
//     highlight: false,
//   },
// ];

// Website pricing plans (from screenshot)
const websitePlans = [
  {
    name: 'Starter',
    price: 29,
    frequency: '/mo',
    description: 'For entrepreneurs.',
    features: [
      '5,000 chat messages',
      '$1 per additional 1,000 messages',
      'Voice not included',
      '1 AI Agent',
      'Unlimited Sales Leads',
      'Customer Chat history',
      'Lead capture & contact export'
    ],
    cta: 'Select',
    highlight: false,
  },
  {
    name: 'Basic',
    price: 49,
    frequency: '/mo',
    description: 'For new startups.',
    features: [
      '20,000 chat messages',
      '$1 per additional 1,000 messages',
      'Voice not included',
      '2 AI Agents',
      'Unlimited Sales Leads',
      'Customer Chat history',
      'Lead capture & contact export'
    ],
    cta: 'Select',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 99,
    frequency: '/mo',
    description: 'For small businesses.',
    features: [
      '50,000 chat messages',
      '$1 per additional 1,000 messages',
      '300 voice messages',
      '$0.5 per additional voice minute',
      '4 AI Agents',
      'Unlimited Sales Leads',
      'Remove Growbro watermark'
    ],
    cta: 'Select',
    highlight: true, // visually highlight this card
  },
  {
    name: 'Growth',
    price: 129,
    frequency: '/mo',
    description: 'For growing businesses.',
    features: [
      '1,00,000 chat messages',
      '$1 per additional 1,000 messages',
      '400 voice messages',
      '$0.5 per additional voice minute',
      '7 AI Agents',
      'Unlimited Sales Leads',
      'Remove Growbro watermark'
    ],
    cta: 'Select',
    highlight: false,
  },
  {
    name: 'Advanced',
    price: 349,
    frequency: '/mo',
    description: 'For scaling teams.',
    features: [
      '2,50,000 chat messages',
      '$1 per additional 1,000 messages',
      '600 voice messages',
      '$0.5 per additional voice minute',
      '10 AI Agents',
      'Unlimited Sales Leads',
      'Remove Growbro watermark'
    ],
    cta: 'Select',
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
  // const [pricingType, setPricingType] = useState('website'); // Default to 'website' for toggle (commented out as WhatsApp toggle is removed)
  const [currency, setCurrency] = useState('USD'); // INR, USD, GBP

  // Currency symbols
  const symbols = {
    INR: '₹',
    USD: '$',
    GBP: '£',
  };

  // Conversion rates (static, can be updated)
  // USD is the base. Adjust rates as needed.
  const rates = {
    USD: 1,
    INR: 83, // 1 USD = 83 INR (update as needed)
    GBP: 0.78, // 1 USD = 0.78 GBP (update as needed)
  };

  // Convert USD to selected currency
  function convert(amountInUSD) {
    return amountInUSD * rates[currency];
  }

  // Format price with symbol and 2 decimals if not INR
  function formatPrice(amount) {
    // Remove decimals for all currencies
    return `${symbols[currency]}${Math.round(amount).toLocaleString()}`;
  }

  // Pricing logic for Website only (WhatsApp removed)
  const getPrice = (plan) => {
    if (typeof plan.price === 'string') return plan.price;
    let price = plan.price;
    let freq = plan.frequency || '/mo';
    // If annual, apply 17% discount to monthly price, show as per month
    if (annual) price = Math.round(price * 0.83);
    let amount = price;
    if (currency !== 'USD') amount = convert(price);
    // Remove decimals for all currencies
    return `${symbols[currency]}${Math.round(amount).toLocaleString()}${freq}`;
  };

  // Overage/feature currency replacement
  function localizeFeatureText(text) {
    // Replace $ with correct symbol and convert number if needed (USD is base)
    let replaced = text;
    replaced = replaced.replace(/\$([0-9,.]+)/g, (m, n) => {
      let num = Number(n);
      if (currency === 'INR') num = num * rates.INR;
      else if (currency === 'GBP') num = num * rates.GBP;
      return formatPrice(num);
    });
    replaced = replaced.replace(/USD/g, symbols.USD);
    replaced = replaced.replace(/INR/g, symbols.INR);
    replaced = replaced.replace(/GBP/g, symbols.GBP);
    return replaced;
  }

  const plans = websitePlans; // Only website plans shown, WhatsApp toggle removed

  return (
    <section className="pricing-section premium-ui">
      {/* Hero Section - Wonderchat Style */}
      <div className="pricing-hero">
        <div className="pricing-hero-label">AI Agent Pricing</div>
        <h1 className="pricing-hero-title">Create your first AI Agent<br />in 5 minutes</h1>
        <div className="pricing-hero-desc highlighted-hero-desc">
        Start your free trial today. No credit card required!
      </div>
      </div>
      {/* <h2 className="pricing-title">Pricing Plans</h2> */}
      {/* WhatsApp/Website toggle removed as per request
      <div className="switch-toggle-row">
        <span
          className={`switch-label${pricingType === 'whatsapp' ? ' active' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => setPricingType('whatsapp')}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setPricingType('whatsapp')}
        >WhatsApp</span>
        <button
          className={`switch-toggle${pricingType === 'website' ? ' right' : ''}`}
          aria-pressed={pricingType === 'website'}
          onClick={() => setPricingType(pricingType === 'whatsapp' ? 'website' : 'whatsapp')}
          tabIndex={0}
          type="button"
        >
          <span className="switch-knob"></span>
        </button>
        <span
          className={`switch-label${pricingType === 'website' ? ' active' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => setPricingType('website')}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setPricingType('website')}
        >Website</span>
      </div>
      */}
      {/* SOTA Minimal Switch Toggle for Monthly/Annual */}
      <div className="annual-toggle-row">
  <label className="annual-label">
    <span>Annual <span className="annual-discount">(17% Discount)</span></span>
  </label>
  <button
    className={`annual-switch${annual ? ' checked' : ''}`}
    aria-pressed={annual}
    onClick={() => setAnnual(a => !a)}
    tabIndex={0}
    type="button"
    style={{marginLeft: '8px'}}
  >
    <span className="annual-knob"></span>
  </button>
</div>
      {/* Currency Selector */}
      <div className="currency-selector-row">
        <span className="currency-label">Currency:</span>
        {['INR', 'USD', 'GBP'].map(cur => (
          <button
            key={cur}
            className={`currency-btn${currency === cur ? ' active' : ''}`}
            onClick={() => setCurrency(cur)}
            type="button"
            aria-pressed={currency === cur}
          >{symbols[cur]} {cur}</button>
        ))}
      </div>

      <div className="pricing-table modern-cards">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`pricing-card modern-card${plan.highlight ? ' highlight' : ''}`}
          >
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price">{getPrice(plan)}</div>
            <div className="plan-desc">{plan.description}</div>
            <ul className="plan-features">
              {plan.features.map(feature => (
                <li key={feature}><span className="feature-tick">★</span> {localizeFeatureText(feature)}</li>
              ))}
            </ul>
            {plan.overage && <div className="plan-overage">Overage: {localizeFeatureText(plan.overage)}</div>}
            <button
              className="plan-cta premium-btn"
              onClick={() => {
                if (plan.name === 'Enterprise') {
                  window.location.href = '/contact';
                } else {
                  window.location.href = 'https://crm.growbro.ai/signup';
                }
              }}
              type="button"
            >
              {plan.cta || (plan.name === 'Enterprise' ? 'Contact Us' : 'Start Free Trial')}
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
        All plans include advanced website AI chat, lead capture, and premium support. Cancel anytime.
      </div>
      {/* SOTA Minimal Switch Toggle CSS */}
      <style>{`
        .annual-toggle-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.2rem;
        }
        .annual-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.09rem;
          font-weight: 600;
          color: #222;
        }
        .annual-discount {
          color: #189c4a;
          font-weight: 700;
          font-size: 1.02rem;
        }
        .annual-switch {
          width: 36px;
          height: 20px;
          border: none;
          background: #e6f9ee;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
          transition: background 0.18s;
        }
        .annual-switch.checked {
          background: #189c4a;
        }
        .annual-knob {
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(36,181,98,0.13);
          transition: transform 0.22s cubic-bezier(.4,0,.2,1);
        }
        .annual-switch:not(.checked) .annual-knob {
          transform: translateX(2px);
        }
        .annual-switch.checked .annual-knob {
          transform: translateX(18px);
        }

        .pricing-hero {
          max-width: 700px;
          margin: 0 auto 2.3rem auto;
          text-align: center;
          padding-top: 1.3rem;
        }
        .pricing-hero-label {
          font-size: 1.08rem;
          font-weight: 700;
          color: #189c4a;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .pricing-hero-title {
          font-size: 2.6rem;
          font-weight: 800;
          color: #1a3c24;
          margin-bottom: 0.7rem;
          line-height: 1.15;
        }
        .pricing-hero-desc {
          font-size: 1.13rem;
          color: #444;
          margin-bottom: 1.2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .highlighted-hero-desc {
          background: #e6f9ee;
          border-radius: 10px;
          padding: 0.7rem 1.2rem;
          color: #189c4a;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 1.4rem;
        }

        .premium-ui { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #f8faff; padding: 32px 0; }
        .pricing-title { text-align: center; font-size: 2.6rem; font-weight: 800; margin-bottom: 2rem; color: #1a3c24; letter-spacing: -1px; }
        /* Minimal Switch Toggle */
        .switch-toggle-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.1rem;
          margin-bottom: 2.1rem;
        }
        .switch-toggle-row.small { margin-bottom: 2.5rem; }
        .switch-label {
          color: #444;
          font-size: 1.07rem;
          font-weight: 600;
          min-width: 62px;
          text-align: center;
          transition: color 0.18s;
          user-select: none;
        }
        .switch-label.active { color: #189c4a; }
        .switch-toggle {
          width: 56px;
          height: 28px;
          border: none;
          background: #25D366;
          border-radius: 16px;
          position: relative;
          cursor: pointer;
          transition: background 0.18s;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
        }
        .switch-toggle.right { justify-content: flex-end; }
        .switch-knob {
          width: 22px;
          height: 22px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(36,181,98,0.13);
          transition: transform 0.28s cubic-bezier(.4,0,.2,1);
        }
        .switch-toggle:not(.right) .switch-knob {
          transform: translateX(4px);
        }
        .switch-toggle.right .switch-knob {
          transform: translateX(calc(100% - 28px)); /* Perfectly inside for 56px pill, 22px knob, 4px padding */
        }
        .switch-toggle:focus-visible {
          outline: 2px solid #189c4a;
          outline-offset: 2px;
        }
        .save-badge {
          background: #e6f9ee;
          color: #189c4a;
          font-size: 0.89em;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 10px;
          margin-left: 6px;
          vertical-align: middle;
        }
        @media (max-width: 600px) {
          .switch-toggle-row {
            gap: 0.7rem;
          }
          .switch-toggle {
            width: 44px;
            height: 22px;
          }
          .switch-knob {
            width: 16px;
            height: 16px;
          }
          .switch-toggle.right .switch-knob {
            transform: translateX(calc(100% - 20px)); /* 44px pill, 16px knob, 4px padding */
          }
          .switch-label {
            font-size: 0.99rem;
            min-width: 44px;
          }
        }
        /* End Minimal Switch Toggle */
        .modern-cards { display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; margin-bottom: 2.5rem; }
        .modern-card { background: #fff; border-radius: 22px; box-shadow: 0 6px 32px rgba(38,60,128,0.07), 0 1.5px 8px rgba(0,0,0,0.04); padding: 2.1rem 2rem 2.4rem 2rem; width: 300px; max-width: 95vw; display: flex; flex-direction: column; align-items: center; border: 2px solid transparent; position: relative; transition: box-shadow 0.22s, border 0.22s; }
        .modern-card:hover { box-shadow: 0 8px 40px rgba(36,181,98,0.14), 0 2px 10px rgba(0,0,0,0.06); border-color: #25D36633; }
        .modern-card.highlight { border-color: #25D366; box-shadow: 0 8px 40px rgba(36,181,98,0.18), 0 2px 10px rgba(0,0,0,0.08); z-index: 2; transform: scale(1.04); }
        .plan-badge { position: absolute; top: -18px; left: 50%; transform: translateX(-50%); background: #25D366; color: #fff; font-size: 0.92rem; padding: 0.3rem 1.1rem; border-radius: 12px; font-weight: 600; letter-spacing: 0.5px; box-shadow: 0 2px 8px rgba(36,181,98,0.12); }
        .plan-name { font-size: 1.35rem; font-weight: 700; margin: 0.5rem 0 0.7rem 0; color: #189c4a; }
        .plan-price { font-size: 2.25rem; font-weight: 800; margin-bottom: 0.2rem; color: #1a3c24; letter-spacing: -1px; }
        .plan-desc { font-size: 1.04rem; color: #555; margin-bottom: 1.1rem; text-align: center; }
        .plan-features { list-style: none; padding: 0; margin: 0 0 1.1rem 0; width: 100%; }
        .plan-features li { font-size: 1.01rem; color: #1a3c24; margin: 0.4rem 0; display: flex; align-items: center; }
        .feature-tick { color: #25D366; font-size: 1.08em; margin-right: 0.7em; }
        .plan-overage { font-size: 0.99rem; color: #888; margin-bottom: 1.2rem; }
        .plan-cta.premium-btn { background: linear-gradient(90deg, #25D366 0%, #189c4a 100%); color: #fff; border: none; border-radius: 30px; padding: 0.75rem 2.2rem; font-size: 1.13rem; font-weight: 700; cursor: pointer; box-shadow: 0 2px 12px rgba(36,181,98,0.14); transition: background 0.18s, box-shadow 0.18s; margin-top: 0.7rem; }
        .plan-cta.premium-btn:hover { background: linear-gradient(90deg, #189c4a 0%, #25D366 100%); box-shadow: 0 6px 24px rgba(36,181,98,0.20); }
        @media (max-width: 900px) { .modern-cards { gap: 1.2rem; } .modern-card { width: 97vw; max-width: 370px; } }
        .pricing-faq { background: #f7fdf9; border-radius: 18px; padding: 2rem 1.5rem; margin: 2.2rem auto 0 auto; max-width: 760px; box-shadow: 0 2px 12px rgba(36,181,98,0.07); }
        .pricing-faq h4 { font-size: 1.22rem; font-weight: 700; margin-bottom: 1.1rem; color: #189c4a; }
        .faq-item { margin-bottom: 1.1rem; }
        .faq-q { font-weight: 600; margin-bottom: 0.2rem; color: #1a1a1a; }
        .faq-a { color: #444; }
        .pricing-note { text-align: center; color: #666; margin-top: 2.2rem; font-size: 1.01rem; }
      .currency-selector-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 1.6rem;
        }
        .currency-label {
          font-weight: 600;
          color: #189c4a;
          font-size: 1.06rem;
        }
        .currency-btn {
          background: #f0f8f3;
          color: #189c4a;
          border: 1.5px solid #e0e9e3;
          border-radius: 8px;
          font-size: 1.09rem;
          font-weight: 700;
          padding: 4px 16px;
          margin: 0 2px;
          cursor: pointer;
          transition: background 0.16s, border 0.16s, color 0.16s;
        }
        .currency-btn.active, .currency-btn:focus-visible {
          background: #25D366;
          color: #fff;
          border-color: #189c4a;
        }
        .currency-btn:hover {
          background: #e6f9ee;
        }

      `}</style>
    </section>
  );
}
