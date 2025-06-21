import React from "react";
import growbroLogo from '../assets/growbro-logo.svg';

// Simple non-animated Growbro logo component
export default function GrowbroLogo({ size = 64, className = "" }) {
  return (
    <img 
      src={growbroLogo} 
      alt="Growbro.ai logo" 
      width={size} 
      height={size}
      className={className}
      style={{ display: "block" }}
    />
  );
}
