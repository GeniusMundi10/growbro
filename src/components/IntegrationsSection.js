import React from 'react';
import { motion } from 'framer-motion';
import './IntegrationsSection.css';

export default function IntegrationsSection() {
  // Collection of integration logos
  const logos = [
    // Row 1
    {
      src: "https://cdn-icons-png.flaticon.com/512/5968/5968866.png",
      alt: "Slack",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/4494/4494479.png",
      alt: "Zoom",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/220/220236.png",
      alt: "WhatsApp",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/2111/2111432.png",
      alt: "GitHub",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/5968/5968771.png",
      alt: "Jira",
      className: "integration-logo"
    },
    // Row 2
    {
      src: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
      alt: "Hubspot",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/2702/2702602.png",
      alt: "Salesforce",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/9069/9069049.png",
      alt: "Linear",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/5968/5968853.png",
      alt: "Shopify",
      className: "integration-logo"
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/2991/2991147.png",
      alt: "Google Drive",
      className: "integration-logo"
    }
  ];

  return (
    <section className="integrations-section">
      <div className="integrations-container">
        <div className="integrations-content">
          <motion.div 
            className="integrations-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="integrations-label">Integrations</span>
            <motion.h2 
              className="integrations-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              GrowBro works with all your apps
            </motion.h2>
            <motion.p 
              className="integrations-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              GrowBro integrates with all the apps in your workflow, with minimal setup.
            </motion.p>
            <motion.div 
              className="integrations-button-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a href="/integrations" className="integrations-button">View Integrations</a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="integrations-grid"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {logos.map((logo, index) => (
              <motion.div 
                key={logo.alt} 
                className="logo-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index % 5), duration: 0.5 }}
              >
                <img src={logo.src} alt={logo.alt} className={logo.className} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
