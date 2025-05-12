import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import * as THREE from "three";

const NextGenAIHero = () => {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(heroRef, { once: false, threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle mouse movement for particle effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Check for mobile devices
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);
  
  // Initialize 3D Neural Network visualization
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create Neural Network Nodes
    const nodes = [];
    const nodeCount = isMobile ? 40 : 100; // Reduced node count for better performance and less visual clutter
    const connections = [];
    
    // Material for nodes - reduced opacity
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x16a34a,
      transparent: true,
      opacity: 0.5 // Reduced opacity
    });
    
    const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Position nodes in a brain-like shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = 2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.sin(phi) * Math.sin(theta);
      const z = 2 * Math.cos(phi);
      
      mesh.position.set(x, y, z);
      
      nodes.push({
        mesh,
        initialPosition: { x, y, z },
        velocity: {
          x: (Math.random() - 0.5) * 0.004, // Reduced velocity
          y: (Math.random() - 0.5) * 0.004,
          z: (Math.random() - 0.5) * 0.004
        }
      });
      
      scene.add(mesh);
    }
    
    // Create connections between nodes - reduced opacity
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x16a34a,
      transparent: true,
      opacity: 0.15 // Reduced opacity
    });
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.996) { // Fewer connections
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].mesh.position,
            nodes[j].mesh.position
          ]);
          
          const line = new THREE.Line(geometry, lineMaterial);
          connections.push({
            line,
            node1: i,
            node2: j
          });
          
          scene.add(line);
        }
      }
    }
    
    // Camera position - moved back for better perspective
    camera.position.z = 6;
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update node positions
      nodes.forEach(node => {
        node.mesh.position.x += node.velocity.x;
        node.mesh.position.y += node.velocity.y;
        node.mesh.position.z += node.velocity.z;
        
        // Apply mouse influence - reduced
        const mouseInfluence = 0.0003;
        node.mesh.position.x += mousePosition.x * mouseInfluence;
        node.mesh.position.y += mousePosition.y * mouseInfluence;
        
        // Return towards original position
        node.mesh.position.x += (node.initialPosition.x - node.mesh.position.x) * 0.01;
        node.mesh.position.y += (node.initialPosition.y - node.mesh.position.y) * 0.01;
        node.mesh.position.z += (node.initialPosition.z - node.mesh.position.z) * 0.01;
      });
      
      // Update connections
      connections.forEach(connection => {
        connection.line.geometry.setFromPoints([
          nodes[connection.node1].mesh.position,
          nodes[connection.node2].mesh.position
        ]);
        connection.line.geometry.attributes.position.needsUpdate = true;
      });
      
      // Rotate the entire network - slower rotation
      scene.rotation.y += 0.0006;
      scene.rotation.x += 0.0003;
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      
      // Clean up Three.js resources
      scene.clear();
      renderer.dispose();
      nodes.forEach(node => {
        node.mesh.geometry.dispose();
        node.mesh.material.dispose();
      });
      connections.forEach(connection => {
        connection.line.geometry.dispose();
        connection.line.material.dispose();
      });
    };
  }, [mousePosition, isMobile]);
  
  // Create particle animation effect
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particles = [];
    const particleCount = isMobile ? 20 : 50; // Reduced particle count
    const particlesContainer = particlesRef.current; // Store ref value in a variable
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        element: document.createElement("div"),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.4 + 0.1 // Reduced opacity
      });
    }
    
    particles.forEach(particle => {
      const element = particle.element;
      element.className = "ai-particle";
      element.style.position = "absolute";
      element.style.width = `${particle.size}px`;
      element.style.height = `${particle.size}px`;
      element.style.background = "rgba(22, 163, 74, 0.5)";
      element.style.borderRadius = "50%";
      element.style.top = `${particle.y}%`;
      element.style.left = `${particle.x}%`;
      element.style.opacity = particle.opacity;
      element.style.filter = `blur(${particle.size <= 3 ? 1 : 0}px)`;
      
      particlesContainer.appendChild(element);
    });
    
    const animateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Apply a slight attraction to mouse position
        if (mousePosition.x !== 0 && mousePosition.y !== 0) {
          const mouseXPercent = (mousePosition.x + 1) * 50;
          const mouseYPercent = (mousePosition.y + 1) * 50;
          
          particle.x += (mouseXPercent - particle.x) * 0.001; // Reduced influence
          particle.y += (mouseYPercent - particle.y) * 0.001;
        }
        
        // Boundary check
        if (particle.x < 0) particle.x = 100;
        if (particle.x > 100) particle.x = 0;
        if (particle.y < 0) particle.y = 100;
        if (particle.y > 100) particle.y = 0;
        
        // Update position
        particle.element.style.top = `${particle.y}%`;
        particle.element.style.left = `${particle.x}%`;
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      particles.forEach(particle => {
        if (particlesContainer && particle.element && particlesContainer.contains(particle.element)) {
          particlesContainer.removeChild(particle.element);
        }
      });
    };
  }, [mousePosition, isMobile]);
  
  // Animate in elements when they come into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Text animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.12, 0.24, 0.29, 1]
      }
    }
  };
  
  // Staggered children animation
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  // Updated floating code blocks with chatbot-specific code
  const codeBlocks = [
    { id: 1, color: "rgba(22, 163, 74, 0.9)", top: "20%", left: "8%", delay: 0 },
    { id: 2, color: "rgba(22, 163, 74, 0.7)", top: "35%", right: "10%", delay: 0.4 },
    { id: 3, color: "rgba(22, 163, 74, 0.8)", bottom: "25%", left: "15%", delay: 0.7 }
  ];
  
  return (
    <section className="next-gen-hero" ref={heroRef}>
      {/* 3D Neural Network Canvas */}
      <canvas ref={canvasRef} className="neural-network-canvas"></canvas>
      
      {/* Particle Effect Container */}
      <div ref={particlesRef} className="particles-container"></div>
      
      {/* Gradient Overlay */}
      <div className="hero-gradient-overlay"></div>
      
      {/* Floating Code Blocks - Updated with chatbot-specific code */}
      {codeBlocks.map(block => (
        <motion.div
          key={block.id}
          className="floating-code-block"
          style={{
            background: block.color,
            top: block.top || "auto",
            left: block.left || "auto",
            right: block.right || "auto",
            bottom: block.bottom || "auto"
          }}
          initial={{ opacity: 0, scale: 0.8, x: block.left ? -50 : 50 }}
          animate={{ 
            opacity: 0.9, 
            scale: 1, 
            x: 0,
            y: [0, -15, 0],
            rotate: [0, block.id % 2 === 0 ? 3 : -3, 0]
          }}
          transition={{ 
            delay: block.delay,
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="code-content">
            {block.id === 1 && (
              <>
                <span className="code-comment">{'// WhatsApp Chatbot Setup'}</span>
                <span className="code-keyword">const</span> whatsappBot = <span className="code-function">createChatbot</span>({`{`}
                <span className="code-property">  provider: "whatsapp",</span>
                <span className="code-property">  aiModel: "gpt-4",</span>
                <span className="code-property">  businessProfile: true</span>
                {`}`})
              </>
            )}
            {block.id === 2 && (
              <>
                <span className="code-comment">{'// Message Handler'}</span>
                <span className="code-keyword">async</span> <span className="code-function">function</span> <span className="code-function">handleCustomerQuery</span>(message) {`{`}
                <span className="code-property">  const intent = await detectIntent(message);</span>
                <span className="code-property">  return generateResponse(intent, context);</span>
                {`}`}
              </>
            )}
            {block.id === 3 && (
              <>
                <span className="code-comment">{'// Website Widget Config'}</span>
                <span className="code-property">chatWidget.initialize({`{`}</span>
                <span className="code-property">  brandColor: "#16a34a",</span>
                <span className="code-property">  welcomeMessage: "Hi there!"</span>
                {`}`})
              </>
            )}
          </div>
        </motion.div>
      ))}
      
      {/* Main Content */}
      <div className="next-gen-content">
        <motion.div
          className="hero-text-container"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="hero-badge" variants={textVariants}>
            <span className="pulse-dot"></span>
            AI Chatbot Solutions
          </motion.div>
          
          <motion.h1 className="hero-title" variants={textVariants}>
            Intelligent Chatbots for
            <span className="gradient-text"> WhatsApp & Web</span>
          </motion.h1>
          
          <motion.p className="hero-description" variants={textVariants}>
            Deploy AI-powered chatbots that transform customer conversations across WhatsApp and your website. Our premium solutions deliver human-like interactions that boost engagement and drive sales.
          </motion.p>
          
          <motion.div className="hero-cta-container" variants={textVariants}>
            <button className="cta-primary">
              <span className="btn-text">Get Started</span>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            
            <button className="cta-secondary">
              <span className="btn-text">View Solutions</span>
            </button>
          </motion.div>
          
          <motion.div className="hero-features" variants={textVariants}>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H16M12 22C6.47715 22 2 17.5228 2 12M12 22C14.5 19.5 16 16 16 12M12 22C9.5 19.5 8 16 8 12M2 12C2 6.47715 6.47715 2 12 2M2 12H8M12 2C9.5 4.5 8 8 8 12M12 2C14.5 4.5 16 8 16 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>WhatsApp Business API</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Omnichannel Support</span>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27002 6.96002L12 12.01L20.73 6.96002" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22.08V12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Custom AI Models</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Chatbot Device Visualization */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="chatbot-showcase">
            <div className="phone-device">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="whatsapp-header">
                  <div className="wa-profile">
                    <div className="wa-avatar">
                      <div className="wa-avatar-img"></div>
                    </div>
                    <div className="wa-info">
                      <div className="wa-name">GrowBro AI</div>
                      <div className="wa-status">Online</div>
                    </div>
                  </div>
                  <div className="wa-actions">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="whatsapp-chat">
                  <div className="message-container">
                    <div className="message-received">
                      <div className="message-text">Hello! I'm your AI assistant. How can I help you today?</div>
                      <div className="message-time">10:24 AM</div>
                    </div>
                    <div className="message-sent">
                      <div className="message-text">Hi! I need information about your premium plan</div>
                      <div className="message-time">10:25 AM</div>
                    </div>
                    <div className="message-received">
                      <div className="message-text">Our Premium Plan includes 24/7 support, unlimited conversations, and access to all AI features. Would you like a detailed brochure?</div>
                      <div className="message-time">10:25 AM</div>
                    </div>
                    <div className="message-buttons">
                      <button>Yes, send brochure</button>
                      <button>Schedule a demo</button>
                    </div>
                  </div>
                </div>
                <div className="whatsapp-input">
                  <div className="wa-input-field">Type a message</div>
                  <div className="wa-send-button"></div>
                </div>
              </div>
              <div className="phone-reflection"></div>
            </div>
            
            <div className="website-widget">
              <div className="widget-header">
                <div className="widget-avatar"></div>
                <div className="widget-info">
                  <div className="widget-title">Chat with us</div>
                  <div className="widget-subtitle">We typically reply within minutes</div>
                </div>
              </div>
              <div className="widget-messages">
                <div className="widget-msg-bot">
                  <div className="widget-msg-content">Welcome to GrowBro AI! How can I assist you today?</div>
                  <div className="widget-msg-time">Just now</div>
                </div>
                <div className="widget-quick-replies">
                  <button>Pricing</button>
                  <button>Features</button>
                  <button>Demo</button>
                </div>
              </div>
              <div className="widget-input">
                <input type="text" placeholder="Type your message..." />
                <button className="widget-send"></button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        className="hero-stats-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div className="stat">
          <div className="stat-value">90%</div>
          <div className="stat-label">Response Rate</div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat">
          <div className="stat-value">24/7</div>
          <div className="stat-label">Customer Support</div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat">
          <div className="stat-value">70%</div>
          <div className="stat-label">Cost Reduction</div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat">
          <div className="stat-value">3.2x</div>
          <div className="stat-label">Engagement Boost</div>
        </div>
      </motion.div>
    </section>
  );
};

export default NextGenAIHero; 