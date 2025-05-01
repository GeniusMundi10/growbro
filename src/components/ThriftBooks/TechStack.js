import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaServer, FaDatabase, FaRobot, FaChartLine, FaBrain, FaWhatsapp } from 'react-icons/fa';

const TechStack = () => {
  const techRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(techRef, { once: true, threshold: 0.1 });
  
  // Animation for neural network visualization using canvas
  useEffect(() => {
    if (isInView && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Set up neural network nodes and connections
      const nodes = [];
      const connections = [];
      
      // Create 30 nodes in 3 layers
      for (let i = 0; i < 10; i++) {
        nodes.push({
          x: width * 0.2,
          y: height * 0.2 + (height * 0.6 / 9) * i,
          radius: 4,
          layer: 0
        });
      }
      
      for (let i = 0; i < 8; i++) {
        nodes.push({
          x: width * 0.5,
          y: height * 0.25 + (height * 0.5 / 7) * i,
          radius: 4,
          layer: 1
        });
      }
      
      for (let i = 0; i < 6; i++) {
        nodes.push({
          x: width * 0.8,
          y: height * 0.3 + (height * 0.4 / 5) * i,
          radius: 4,
          layer: 2
        });
      }
      
      // Create connections
      for (let i = 0; i < 10; i++) {
        for (let j = 10; j < 18; j++) {
          connections.push({
            from: i,
            to: j,
            active: false,
            activationTime: Math.random() * 2000
          });
        }
      }
      
      for (let i = 10; i < 18; i++) {
        for (let j = 18; j < 24; j++) {
          connections.push({
            from: i,
            to: j,
            active: false,
            activationTime: Math.random() * 2000
          });
        }
      }
      
      // Animation loop
      let startTime = Date.now();
      
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        const currentTime = Date.now() - startTime;
        
        // Draw connections
        connections.forEach(conn => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          
          // Determine if connection should be active
          conn.active = (currentTime % 3000) > conn.activationTime 
                        && (currentTime % 3000) < (conn.activationTime + 800);
          
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          
          if (conn.active) {
            ctx.strokeStyle = '#16a34a'; // Active connection color
            ctx.lineWidth = 2;
            
            // Draw pulse
            const progress = ((currentTime % 3000) - conn.activationTime) / 800;
            if (progress >= 0 && progress <= 1) {
              const pulseX = from.x + (to.x - from.x) * progress;
              const pulseY = from.y + (to.y - from.y) * progress;
              
              ctx.fillStyle = '#16a34a';
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            ctx.strokeStyle = 'rgba(22, 163, 74, 0.2)'; // Inactive connection
            ctx.lineWidth = 1;
          }
          
          ctx.stroke();
        });
        
        // Draw nodes
        nodes.forEach((node, index) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          
          // Highlight nodes based on layer and timing
          const nodeActiveTime = 500 + node.layer * 1000;
          const nodeActive = (currentTime % 3000) > nodeActiveTime 
                            && (currentTime % 3000) < (nodeActiveTime + 800);
          
          if (nodeActive) {
            ctx.fillStyle = '#16a34a';
            
            // Draw glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#16a34a';
          } else {
            ctx.fillStyle = 'rgba(22, 163, 74, 0.6)';
            ctx.shadowBlur = 0;
          }
          
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => cancelAnimationFrame(animate);
    }
  }, [isInView]);
  
  // Tech capabilities data with icons and descriptions
  const techCapabilities = [
    {
      icon: <FaBrain />,
      title: "Natural Language Understanding",
      description: "Our WhatsApp AI Sales Agent understands complex queries and conversational context to provide human-like interactions and precise book recommendations.",
      delay: 0.1
    },
    {
      icon: <FaDatabase />,
      title: "Real-time Catalog Integration",
      description: "Connected to ThriftBooks' extensive inventory system for up-to-date availability, pricing, and book details to ensure accurate information.",
      delay: 0.3
    },
    {
      icon: <FaServer />,
      title: "Secure Transaction Processing",
      description: "End-to-end encrypted payment processing directly within WhatsApp, protecting customer data while enabling seamless purchases.",
      delay: 0.5
    },
    {
      icon: <FaRobot />,
      title: "Personalization Engine",
      description: "Learns customer preferences over time to deliver increasingly relevant book recommendations and content suggestions.",
      delay: 0.7
    },
    {
      icon: <FaChartLine />,
      title: "Advanced Analytics Dashboard",
      description: "Provides detailed insights on customer interactions, popular genres, and conversion rates to continuously optimize the shopping experience.",
      delay: 0.9
    }
  ];
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  return (
    <section id="tech-section" className="tech-section" ref={techRef}>
      <div className="section-header">
        <h2>Powered by Advanced Technology</h2>
        <p>The cutting-edge technical foundation behind our WhatsApp AI Sales Agent</p>
      </div>
      
      <div className="tech-showcase">
        {/* Neural network visualization */}
        <div className="neural-network-visualization">
          <motion.div
            className="canvas-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <canvas 
              ref={canvasRef} 
              width="600" 
              height="400" 
              className="neural-canvas"
            />
            
            <motion.div 
              className="tech-labels"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="label input-label">Customer Inputs</div>
              <div className="label hidden-label">Processing Layer</div>
              <div className="label output-label">Personalized Results</div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Tech capabilities cards */}
        <motion.div
          className="tech-capabilities"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techCapabilities.map((tech, index) => (
            <motion.div
              key={index}
              className="tech-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <div className="tech-icon-container">
                {tech.icon}
              </div>
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Technology integration diagram */}
      <motion.div 
        className="tech-architecture"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="architecture-title">
          <h3>Seamless Integration Architecture</h3>
        </div>
        <div className="architecture-diagram">
          {/* Architecture diagram with animated connections */}
          <div className="diagram-node whatsapp-node">
            <div className="node-icon"><FaWhatsapp /></div>
            <div className="node-label">WhatsApp Business API</div>
          </div>
          <div className="diagram-connection"></div>
          <div className="diagram-node ai-node">
            <div className="node-icon"><FaBrain /></div>
            <div className="node-label">AI Engine</div>
          </div>
          <div className="diagram-connection"></div>
          <div className="diagram-node catalog-node">
            <div className="node-icon"><FaDatabase /></div>
            <div className="node-label">Book Catalog</div>
          </div>
          <div className="diagram-connection"></div>
          <div className="diagram-node analytics-node">
            <div className="node-icon"><FaChartLine /></div>
            <div className="node-label">Analytics</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack; 