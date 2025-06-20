import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FAQSection.css';

export default function FAQSection() {
  // FAQ data with question and answer pairs
  const faqItems = [
    {
      question: 'What is Growbro?',
      answer: 'Growbro is an AI chatbot builder. It allows you to create your own custom GPT chatbot by uploading your website. The chatbot will answer any question related to the website.'
    },
    {
      question: 'Does it support all languages?',
      answer: 'Yes. The chatbot you create will answer questions in the language which the question is asked. This is the case even if the language used in your website or PDF is different from the language asked by the user.'
    },
    {
      question: 'Do I need to know code to use Growbro?',
      answer: 'No. Growbro is a no-code AI chatbot builder. You can build your own chatbot in under 2 minutes and add the chatbot to your site afterwards.'
    },
    {
      question: 'Will I be able to embed the chatbot into my website?',
      answer: 'Yes. You can embed the chatbot into any website by inserting a simple script into the HTML code of any website. Our chat widgets have been easily deployed across sites such as Notion, Wordpress, Webflow, Bubble, Carrd, Framer, Squarespace and more.'
    },
    {
      question: 'Can multiple team members in my organization manage my chatbots?',
      answer: 'Yes, you can. All our paid plans allow for unlimited team members to be added into your team to help you manage your chatbots.'
    },
    {
      question: 'What websites can I embed my chat widget on?',
      answer: 'You can embed Growbro widgets on Wordpress, Framer, Wix, Shopify, Squarespace, Webflow, Notion and Bubble. If you are interested to embed Growbro on a website not listed here, you can email us at support@growbro.ai to ask us if it\'s do-able. Most of the time, it is as long as your site allows you to make edits to your HTML code.'
    },
    {
      question: 'Can you build an integration for me to use this tool for my business?',
      answer: 'We offer custom solutions in our enterprise plan. Kindly write to us at support@growbro.ai for enquiries and custom projects.'
    },
    {
      question: 'What is a message?',
      answer: 'One message is defined as a message asked and replied to by our chatbot. So one question from you and a reply from your Growbro bot makes up 1 message.'
    },
    {
      question: 'Can your chatbot read multiple website links?',
      answer: 'Yes, once you upgrade to the LITE plan and above, your chatbot will be able to read multiple website links from any number of websites you desire.'
    },
    {
      question: 'What file formats can your chatbot read?',
      answer: 'You can upload file formats such as pdf, txt, csv, docx, pptx and json files as a data source for Growbro. Soon, we will also be allowing you to upload videos as a source of knowledge.'
    },
    {
      question: 'Which LLM model is Growbro based on?',
      answer: 'Growbro supports a wide range of models. We allow you to pick between the latest LLM models.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes. Every user who signs up will get 14 days of free trial. They can create a chatbot with any website link or PDF of their choice and start using for 14 days to chat with their chatbot.'
    }
  ];

  // State to track which FAQ item is currently open
  const [openItem, setOpenItem] = useState(null);

  // Function to toggle FAQ item open/close
  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <motion.h2 
          className="faq-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          FAQ
        </motion.h2>
        
        <div className="faq-items">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
            >
              <div 
                className={`faq-question ${openItem === index ? 'active' : ''}`}
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{openItem === index ? '×' : '+'}</span>
              </div>
              
              {openItem === index && (
                <motion.div 
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>


    </section>
  );
}
