import React from 'react';

const plans = [
  {
    name: 'Starter',
    price: '$49/mo',
    description: 'For small businesses getting started with WhatsApp RAG AI.',
    features: [
      'Up to 1,000 conversations/mo',
      '1 WhatsApp number',
      'Basic analytics',
      'Email support',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$149/mo',
    description: 'For growing teams needing more power and flexibility.',
    features: [
      'Up to 10,000 conversations/mo',
      '3 WhatsApp numbers',
      'Advanced analytics',
      'Priority email support',
      'Custom knowledge base',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited conversations',
      'Unlimited WhatsApp numbers',
      'Dedicated support',
      'Custom integrations',
      'On-premise/Cloud options',
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Pricing Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 flex flex-col items-center text-center transition-transform hover:scale-105 ${plan.highlight ? 'ring-2 ring-green-500' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">{plan.name}</h3>
            <div className="text-4xl font-bold mb-2">{plan.price}</div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{plan.description}</p>
            <ul className="mb-6 text-gray-700 dark:text-gray-200 text-left list-disc list-inside">
              {plan.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button className="mt-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors">
              {plan.name === 'Enterprise' ? 'Contact Us' : 'Start Free Trial'}
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm">
        All plans include secure WhatsApp Business API integration and RAG AI support.
      </div>
    </section>
  );
}
