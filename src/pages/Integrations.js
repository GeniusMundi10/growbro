import React, { useEffect } from 'react';
import '../styles/Integrations.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function Integrations() {
  useEffect(() => {
    // Import animation script dynamically
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + '/scripts/animateIntegrations.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Integration cards data
  const integrations = [
    {
      id: 1,
      name: 'Discord',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968759.png',
      description: 'Connect Growbro to your Discord server to automate replies in your channels. Easy setup — ideal for support and community engagement.',
      tags: ['Channel Integration']
    },
    {
      id: 2,
      name: 'Facebook Messenger',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/512px-Facebook_Messenger_logo_2020.svg.png',
      description: 'Connect Growbro to Facebook Messenger to automate replies on your Facebook Page. Easy setup and seamless customer engagement.',
      tags: ['Channel Integration']
    },
    {
      id: 3,
      name: 'Microsoft Sharepoint',
      icon: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      description: 'Connect Microsoft SharePoint to Growbro to train your chatbot on business documents, with secure access and seamless setup.',
      tags: ['Document Management']
    },
    {
      id: 4,
      name: 'Zendesk',
      icon: 'https://cdn-icons-png.flaticon.com/512/5969/5969044.png',
      description: 'Integrate Growbro with Zendesk to automatically create support tickets from chatbot queries and streamline customer service operations.',
      tags: ['Helpdesk']
    },
    {
      id: 5,
      name: 'WhatsApp',
      icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png',
      description: 'Integrate Growbro with WhatsApp to automate customer support through your WhatsApp Business account. Set up your bot in minutes.',
      tags: ['Channel Integration']
    },
    {
      id: 6,
      name: 'Zapier',
      icon: process.env.PUBLIC_URL + '/images/integrations/zapier-logo.svg',
      description: 'Connect Growbro to thousands of apps with Zapier. Automate customer support workflows, lead management, and notifications—no coding needed.',
      tags: ['CRM']
    },
    {
      id: 7,
      name: 'Twilio',
      icon: process.env.PUBLIC_URL + '/images/integrations/twilio-logo.svg',
      description: 'Set up SMS alerts by integrating Growbro with Twilio via Zapier. Receive instant notifications of new live chat requests to your phone for faster response.',
      tags: ['Channel Integration', 'Phone Call']
    },
    {
      id: 8,
      name: 'Freshdesk',
      icon: process.env.PUBLIC_URL + '/images/integrations/freshdesk-logo.svg',
      description: 'Connect Growbro to Freshdesk to automatically create support tickets when chatbot queries are escalated. Streamline human support.',
      tags: ['Helpdesk']
    },
    {
      id: 9,
      name: 'Active Campaign',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968861.png',
      description: 'Learn how to integrate Growbro with ActiveCampaign in minutes. Automatically sync chatbot leads directly to your ActiveCampaign contact list.',
      tags: ['CRM']
    },
    {
      id: 10,
      name: 'Hubspot',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968872.png',
      description: 'Connect Growbro to HubSpot and automatically sync chatbot leads to your CRM. Simplify contact creation and streamline lead management.',
      tags: ['CRM']
    },
    {
      id: 11,
      name: 'Google Drive',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968523.png',
      description: 'Integrate Google Drive with Growbro to train your AI chatbot on your Drive documents, with automated syncing and secure access.',
      tags: ['Document Management']
    },
    {
      id: 12,
      name: 'Shopify',
      icon: 'https://cdn-icons-png.flaticon.com/512/825/825500.png',
      description: 'Integrate Growbro with Shopify to enhance customer support and engagement. Easily install the chatbot app for seamless 24/7 shopping assistance.',
      tags: ['Channel Integration', 'E-Commerce']
    },
    {
      id: 13,
      name: 'Slack',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/512px-Slack_icon_2019.svg.png',
      description: 'Integrate Growbro with Slack to automate chatbot interactions and enhance team communication. Connect your chatbot to Slack.',
      tags: ['Channel Integration']
    }
  ];

  // Group integrations by first letter for the integration index
  const groupedByFirstLetter = integrations.reduce((acc, integration) => {
    const firstLetter = integration.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(integration);
    return acc;
  }, {});

  // Sort letters alphabetically
  const sortedLetters = Object.keys(groupedByFirstLetter).sort();

  return (
    <div className="integrations-page">
      <Helmet>
        <title>Integrations | Growbro.ai</title>
        <meta name="description" content="Connect your AI agent to any tool. Growbro works with almost any app to help your company deliver personalized help in every language, on every channel." />
      </Helmet>
      
      <div className="integrations-header">
        <span className="integrations-label">Integrations</span>
        <h1 className="integrations-page-title">All the apps that work <br />with Growbro</h1>
        <p className="integrations-page-subtitle">
          Connect your AI agent to any tool. Growbro works with almost any app to help your company deliver personalized help in every language, on every channel.
        </p>
      </div>

      <div className="integrations-grid-container">
        {integrations.slice(0, 6).map((integration) => (
          <div className="integration-card" key={integration.id}>
            <div className="integration-icon-wrapper" style={{ backgroundColor: getBackgroundColor(integration.id) }}>
              <img src={integration.icon} alt={integration.name} className="integration-icon" />
            </div>
            <h3 className="integration-title">{integration.name}</h3>
            <p className="integration-description">{integration.description}</p>
            <div className="integration-tags">
              {integration.tags.map((tag, index) => (
                <span className="integration-tag" key={index}>{tag}</span>
              ))}
            </div>
            <a href="#" className="integration-cta">Learn more</a>
          </div>
        ))}
      </div>

      <div className="integrations-grid-container">
        {integrations.slice(6, 13).map((integration) => (
          <div className="integration-card" key={integration.id}>
            <div className="integration-icon-wrapper" style={{ backgroundColor: getBackgroundColor(integration.id) }}>
              <img src={integration.icon} alt={integration.name} className="integration-icon" />
            </div>
            <h3 className="integration-title">{integration.name}</h3>
            <p className="integration-description">{integration.description}</p>
            <div className="integration-tags">
              {integration.tags.map((tag, index) => (
                <span className="integration-tag" key={index}>{tag}</span>
              ))}
            </div>
            <a href="#" className="integration-cta">Learn more</a>
          </div>
        ))}
      </div>

      <div className="integration-index">
        <h2 className="index-title">Integration Index</h2>
        <div className="index-container">
          {sortedLetters.map(letter => (
            <div className="index-group" key={letter}>
              <h3 className="index-letter">{letter}</h3>
              <ul className="index-list">
                {groupedByFirstLetter[letter].map(integration => (
                  <li key={integration.id} className="index-item">{integration.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="integration-cta-section">
        <h2 className="cta-title">Don't see what you need?</h2>
        <p className="cta-description">We're constantly adding new integrations. If you don't see what you're looking for, contact us and we'll help you connect your AI assistant to the tools you use.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button primary">Contact Us</Link>
          <Link to="/signup" className="cta-button secondary">Start Free Trial</Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate background colors for icon wrappers
function getBackgroundColor(id) {
  const colors = [
    '#e9f0fe', // Light blue
    '#fff4ea', // Light orange
    '#eafcf6', // Light teal
    '#f9f0ff', // Light purple
    '#fff1f0', // Light red
    '#f0fff4', // Light green
  ];
  
  return colors[(id - 1) % colors.length];
}

export default Integrations;
