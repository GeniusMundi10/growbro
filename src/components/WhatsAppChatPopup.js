import React, { useState } from 'react';
import AnimatedLogoSprout from './AnimatedLogoSprout';

export default function WhatsAppChatPopup({ isOpen, onClose, phoneNumber = '15556415118' }) {
  const [message, setMessage] = useState('Hi! I would like to know more about growbro.ai.');

  if (!isOpen) return null;

  const handleSend = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="wa-popup-overlay">
      <div className="wa-popup-window">
        <button className="wa-popup-close" onClick={onClose} aria-label="Close chat window">×</button>
        <div className="wa-popup-header">
          <span className="wa-popup-logo"><AnimatedLogoSprout size={40} /></span>
          <div>
            <div className="wa-popup-brand">growbro.ai Support</div>
            <div className="wa-popup-status">Online</div>
          </div>
        </div>
        <div className="wa-popup-greeting">
          <span role="img" aria-label="wave">👋</span> Hi there! How can we help you today?
        </div>
        <textarea
          className="wa-popup-input"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
        />
        <button className="wa-popup-send" onClick={handleSend}>
          Send to WhatsApp
        </button>
      </div>
    </div>
  );
}
