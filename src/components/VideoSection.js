import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './VideoSection.css'; // legacy
import './VideoSectionModern.css'; // new modern styles

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="video-section-modern">
      <img src="/images/video-bg-abstract.svg" alt="background art" className="video-bg-abstract" aria-hidden="true" />
      <div className="container">
        <div className="video-content-modern">
          <motion.h2 
            className="video-title-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Live Product Demo
          </motion.h2>
          <motion.p 
            className="video-subtitle-modern"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch our live product demo to discover how you can effortlessly build AI Agents trained on your data, no coding required.
          </motion.p>
          <motion.div 
            className="video-card-modern glassmorphic"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {!isPlaying ? (
              <div className="video-overlay-modern" onClick={handlePlayClick} aria-label="Play Growbro Demo Video" tabIndex={0} role="button" onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && handlePlayClick()}>
                <div className="video-overlay-button glassmorphic">
                  <div className="play-icon-crisp">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="18" cy="18" r="18" fill="#0F9D58"/>
                      <polygon points="14,11 26,18 14,25" fill="white"/>
                    </svg>
                  </div>
                  <div className="overlay-button-content-crisp">
                    <span className="overlay-button-text-crisp">Discover Growbro</span>
                    <span className="overlay-button-duration-crisp">Video, 2 mins</span>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={`video-player-modern ${isPlaying ? 'active' : ''}`}>
              {isPlaying ? (
                <iframe
                  src="https://player.vimeo.com/video/1105124567?autoplay=1&title=0&byline=0&portrait=0"
                  title="Growbro AI Demo Video"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="video-iframe-modern"
                ></iframe>
              ) : (
                <div className="video-placeholder-modern">
                  <img 
                    src="/images/video_thumbnail.png" 
                    alt="Growbro AI Demo Video Thumbnail" 
                    className="thumbnail-img-modern"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/video-fallback.jpg";
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
