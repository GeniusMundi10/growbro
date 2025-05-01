import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useAnimation, useScroll, useTransform, useInView } from 'framer-motion';
import { FaWhatsapp, FaArrowRight, FaChevronDown, FaBookOpen, FaSearch, FaShoppingCart, FaUserFriends } from 'react-icons/fa';

// Import our newly created components
import Phone3D from '../components/ThriftBooks/Phone3D';
import CustomerJourney from '../components/ThriftBooks/CustomerJourney';
import TechStack from '../components/ThriftBooks/TechStack';
import TryItNow from '../components/ThriftBooks/TryItNow';

// Import styles
import '../css/ThriftBooksShowcase.css';

const ThriftBooksShowcase = () => {
  // Refs for sections to trigger animations when in view
  const heroRef = useRef(null);
  const demoRef = useRef(null);
  const impactRef = useRef(null);
  const ctaRef = useRef(null);
  
  // In-view detectors
  const demoInView = useInView(demoRef, { once: true, threshold: 0.2 });
  const impactInView = useInView(impactRef, { once: true, threshold: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.2 });
  
  // Animation controls
  const heroControls = useAnimation();
  const demoControls = useAnimation();
  const impactControls = useAnimation();
  const ctaControls = useAnimation();
  
  // Parallax effects based on scroll position
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const phoneY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const bgParticlesY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  
  // Load animations after page is ready
  useEffect(() => {
    // Trigger hero animation immediately
    heroControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    });
  }, [heroControls]);
  
  // Trigger section animations when in view
  useEffect(() => {
    if (demoInView) {
      demoControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.2 }
      });
    }
    
    if (impactInView) {
      impactControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.2 }
      });
    }
    
    if (ctaInView) {
      ctaControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.2 }
      });
    }
  }, [
    demoInView, impactInView, ctaInView, 
    demoControls, impactControls, ctaControls
  ]);
  
  // Demo conversation data for interactive demo
  const demoConversation = [
    { role: 'ai', message: "Hello! I'm your ThriftBooks AI Sales Assistant. What type of books are you looking for today?" },
    { role: 'user', message: "I'm interested in fantasy novels with strong character development" },
    { role: 'ai', message: "Great choice! Based on your interest, I'd recommend \"The Name of the Wind\" by Patrick Rothfuss, \"The Fifth Season\" by N.K. Jemisin, or \"Circe\" by Madeline Miller. Would you like more details on any of these?" },
    { role: 'user', message: "Tell me more about Circe" },
    { role: 'ai', message: "Circe by Madeline Miller is a captivating retelling of Greek mythology that follows the life of Circe, daughter of the sun god Helios. It features stunning character development as Circe evolves from an awkward nymph to a powerful witch. I have it available for $12.99 in hardcover or $9.49 in paperback. Would you like to purchase it?" },
    { role: 'user', message: "I'll take the paperback version" },
    { role: 'ai', message: "Excellent choice! I've added Circe (paperback) to your cart. Would you like to continue shopping or proceed to checkout?" },
  ];

  // Dynamic background particles for visual appeal
  const BackgroundParticles = () => {
    return (
      <motion.div 
        className="bg-particles"
        style={{ y: bgParticlesY }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, ${Math.random() * 0.4 + 0.1})`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, Math.random() + 0.5, 1],
              transition: {
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </motion.div>
    );
  };

  // Business impact stat component with animated counter
  const ImpactStat = ({ value, label, prefix, suffix, index }) => {
    const statRef = useRef();
    const inView = useInView(statRef, { once: true });
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
      let interval;
      if (inView) {
        let current = 0;
        const target = parseInt(value);
        const step = Math.max(1, Math.floor(target / 30));
        
        interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setDisplayValue(current);
        }, 50);
      }
      
      return () => clearInterval(interval);
    }, [inView, value]);
    
    return (
      <motion.div 
        className="impact-stat"
        ref={statRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={impactControls}
        custom={index}
        whileHover={{ scale: 1.05, y: -10 }}
      >
        <div className="stat-value">
          {prefix && <span className="stat-prefix">{prefix}</span>}
          <motion.span className="counter-value">
            {displayValue}
          </motion.span>
          {suffix && <span className="stat-suffix">{suffix}</span>}
        </div>
        <div className="stat-label">{label}</div>
      </motion.div>
    );
  };

  // Features data for the hero section
  const features = [
    {
      icon: <FaBookOpen />,
      title: "Personalized Recommendations",
      description: "Intelligent book suggestions based on user preferences and reading history"
    },
    {
      icon: <FaSearch />,
      title: "Natural Conversation",
      description: "Chat naturally with an AI that understands complex book queries"
    },
    {
      icon: <FaShoppingCart />,
      title: "Seamless Purchasing",
      description: "Complete transactions without leaving the WhatsApp conversation"
    },
    {
      icon: <FaUserFriends />,
      title: "24/7 Availability",
      description: "Always available to assist customers with their book needs"
    }
  ];

  return (
    <>
      <Helmet>
        <title>ThriftBooks WhatsApp AI Sales Agent | Conversational Commerce Solution</title>
        <meta name="description" content="Experience the future of book shopping with ThriftBooks' WhatsApp AI Sales Agent. Discover, get personalized recommendations and purchase books entirely through WhatsApp." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div className="thriftbooks-showcase">
        {/* Animated background particles */}
        <BackgroundParticles />
        
        {/* Premium Hero Section */}
        <section className="hero-section premium-hero">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="whatsapp-label">
                <FaWhatsapp className="whatsapp-icon" />
                <span>WhatsApp AI Sales Agent</span>
              </div>
              <h1>The Future of Book Shopping is Conversational</h1>
              <p className="hero-subtitle">
                Discover how ThriftBooks transformed customer experience with an AI-powered WhatsApp Sales Agent that makes finding and purchasing books as simple as sending a message
              </p>
              <div className="hero-cta-container">
                <a 
                  href="https://wa.me/15556415118?text=Hi%20ThriftBooks%20AI%2C%20I%27d%20like%20to%20find%20a%20book"
                  className="primary-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try It Now <FaWhatsapp className="icon-right" />
                </a>
                <a href="#demo-section" className="secondary-cta">
                  See How It Works <FaArrowRight className="icon-right" />
                </a>
              </div>
            </div>
            <div className="hero-right">
              <Phone3D scrollY={phoneY} />
            </div>
          </div>
        </section>
        
        {/* Feature Cards Section */}
        <section className="feature-cards-section">
          <div className="feature-cards-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Immersive Demo Section */}
        <motion.section 
          id="demo-section"
          ref={demoRef}
          className="demo-section"
          initial={{ opacity: 0, y: 50 }}
          animate={demoControls}
        >
          <div className="section-header">
            <h2>Experience the AI Sales Agent</h2>
            <p>See how customers discover, explore and purchase books through natural conversation</p>
          </div>
          
          <div className="interactive-demo">
            <div className="demo-phone">
              <div className="demo-chat">
                <div className="chat-header">
                  <div className="chat-avatar">TB</div>
                  <div className="chat-info">
                    <div className="chat-name">ThriftBooks AI Sales Agent</div>
                    <div className="chat-status">Online</div>
                  </div>
                </div>
                
                <div className="interaction-points">
                  {demoConversation.map((message, index) => (
                    <motion.div 
                      key={index}
                      className={`interaction-message ${message.role}`}
                      initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                      animate={demoInView ? { 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.3, 
                          duration: 0.5 
                        } 
                      } : {}}
                    >
                      <div className="message-content">{message.message}</div>
                      {index % 2 === 0 && index < demoConversation.length - 1 && (
                        <motion.div 
                          className="interaction-annotation"
                          initial={{ opacity: 0 }}
                          animate={demoInView ? { 
                            opacity: 1, 
                            transition: { delay: index * 0.3 + 0.2, duration: 0.5 } 
                          } : {}}
                        >
                          {index === 0 && 'AI initiates with friendly greeting'}
                          {index === 2 && 'AI provides personalized recommendations based on preferences'}
                          {index === 4 && 'Detailed information with pricing and purchase options'}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="demo-explanation">
              <div className="demo-steps">
                <h3>How Our WhatsApp AI Sales Agent Works</h3>
                <ul>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={demoInView ? {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.2, duration: 0.5 }
                    } : {}}
                  >
                    <span className="step-highlight">1</span> Personal greeting establishes conversational tone
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={demoInView ? {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.4, duration: 0.5 }
                    } : {}}
                  >
                    <span className="step-highlight">2</span> Understands complex book preferences and reading interests
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={demoInView ? {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.6, duration: 0.5 }
                    } : {}}
                  >
                    <span className="step-highlight">3</span> Provides targeted recommendations from vast catalog
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={demoInView ? {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.8, duration: 0.5 }
                    } : {}}
                  >
                    <span className="step-highlight">4</span> Offers detailed information and pricing options
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={demoInView ? {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 1.0, duration: 0.5 }
                    } : {}}
                  >
                    <span className="step-highlight">5</span> Seamlessly handles purchase within the chat
                  </motion.li>
                </ul>
              </div>
              
              <motion.div 
                className="demo-cta"
                initial={{ opacity: 0 }}
                animate={demoInView ? { 
                  opacity: 1,
                  transition: { delay: 1.2, duration: 0.5 } 
                } : {}}
              >
                <a 
                  href="https://wa.me/15556415118?text=Hi%20ThriftBooks%20AI%2C%20I%27m%20looking%20for%20book%20recommendations"
                  className="demo-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp /> Try It Yourself
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Customer Journey Section */}
        <CustomerJourney />
        
        {/* Technical Capabilities Section */}
        <TechStack />
        
        {/* Business Impact Section */}
        <motion.section 
          id="impact-section"
          ref={impactRef}
          className="impact-section"
          initial={{ opacity: 0, y: 50 }}
          animate={impactControls}
        >
          <div className="section-header">
            <h2>Transformative Business Impact</h2>
            <p>How our WhatsApp AI Sales Agent created measurable results for ThriftBooks</p>
          </div>
          
          <div className="impact-stats">
            <ImpactStat 
              value="37" 
              label="Increase in Conversion Rate" 
              suffix="%" 
              index={0} 
            />
            
            <ImpactStat 
              value="42" 
              label="Growth in Average Order Value" 
              suffix="%" 
              index={1} 
            />
            
            <ImpactStat 
              value="3.2" 
              label="Return on Investment" 
              prefix="" 
              suffix="x" 
              index={2} 
            />
            
            <ImpactStat 
              value="91" 
              label="Customer Satisfaction Score" 
              suffix="%" 
              index={3} 
            />
          </div>
          
          <motion.div 
            className="impact-comparison"
            initial={{ opacity: 0 }}
            animate={impactInView ? { 
              opacity: 1,
              transition: { delay: 0.6, duration: 0.8 } 
            } : {}}
          >
            <div className="before-after">
              <div className="before">
                <h3>Before WhatsApp AI Sales Agent</h3>
                <ul>
                  <li>Limited to traditional website browsing experience</li>
                  <li>Complex search filters for finding specific books</li>
                  <li>High cart abandonment rate due to multi-step checkout</li>
                  <li>Customer support limited to business hours only</li>
                  <li>Impersonal product recommendations</li>
                </ul>
              </div>
              <div className="after">
                <h3>After WhatsApp AI Sales Agent</h3>
                <ul>
                  <li>Conversational shopping experience accessible 24/7</li>
                  <li>Natural language book discovery and recommendations</li>
                  <li>Streamlined one-message checkout process</li>
                  <li>Instant assistance at any time of day</li>
                  <li>Hyper-personalized recommendations that improve over time</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="testimonial"
            initial={{ opacity: 0, y: 30 }}
            animate={impactInView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.8, duration: 0.8 } 
            } : {}}
          >
            <div className="quote-mark">"</div>
            <blockquote>
              The WhatsApp AI Sales Agent has transformed how our customers discover and purchase books. The natural conversation flow and personalized recommendations have significantly increased engagement and sales while reducing customer support costs. It's become our highest-converting sales channel.
            </blockquote>
            <div className="testimonial-author">
              <div className="author-image"></div>
              <div className="author-details">
                <span className="author-name">Sarah Johnson</span>
                <span className="author-title">VP of Digital Experience, ThriftBooks</span>
              </div>
            </div>
          </motion.div>
        </motion.section>
        
        {/* Try It Yourself Section */}
        <TryItNow />
        
        {/* Call To Action for Potential Clients */}
        <motion.section 
          id="contact-section"
          ref={ctaRef}
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          animate={ctaControls}
        >
          <div className="section-header">
            <h2>Transform Your Business with Conversational Commerce</h2>
            <p>Imagine a WhatsApp AI Sales Agent custom-built for your industry</p>
          </div>
          
          <div className="industry-adaptations">
            <motion.div 
              className="industry-card"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaControls}
              custom={0}
              whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="industry-icon retail"></div>
              <h3>Retail</h3>
              <p>Personal shopping assistants that help customers find exactly what they need and complete purchases in seconds.</p>
            </motion.div>
            
            <motion.div 
              className="industry-card"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaControls}
              custom={1}
              whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="industry-icon travel"></div>
              <h3>Travel</h3>
              <p>Conversational booking agents that create perfect travel itineraries and handle reservations through simple chat.</p>
            </motion.div>
            
            <motion.div 
              className="industry-card"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaControls}
              custom={2}
              whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="industry-icon finance"></div>
              <h3>Finance</h3>
              <p>Personal financial advisors that simplify complex decisions and process transactions within WhatsApp.</p>
            </motion.div>
            
            <motion.div 
              className="industry-card"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaControls}
              custom={3}
              whileHover={{ y: -15, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="industry-icon health"></div>
              <h3>Healthcare</h3>
              <p>Care coordinators that guide patients through their healthcare journey with personalized assistance.</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.6, duration: 0.8 } 
            } : {}}
          >
            <h3>Request a Similar WhatsApp AI Sales Agent</h3>
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" placeholder="Company Name" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="you@company.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <select id="industry" name="industry" required>
                  <option value="">Select Your Industry</option>
                  <option value="retail">Retail</option>
                  <option value="travel">Travel & Hospitality</option>
                  <option value="finance">Financial Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell us about your needs</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="What challenges are you looking to solve with a WhatsApp AI Sales Agent?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Request Your Custom AI Sales Agent</button>
            </form>
            
            <div className="alternative-contact">
              <p>Or contact us directly:</p>
              <a 
                href="https://wa.me/15556415118?text=I'm%20interested%20in%20a%20custom%20WhatsApp%20AI%20Sales%20Agent%20for%20my%20business" 
                className="whatsapp-business"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Chat with Us on WhatsApp
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="final-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: 1, duration: 0.8 } 
            } : {}}
          >
            <h3>Experience The Future of Conversational Commerce Today</h3>
            <a 
              href="https://wa.me/15556415118"
              className="whatsapp-final-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> Try the ThriftBooks AI Sales Agent
            </a>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default ThriftBooksShowcase; 