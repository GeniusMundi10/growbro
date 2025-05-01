import React from 'react';

const MockImage = () => {
  return (
    <svg
      width="280"
      height="500"
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    >
      {/* Header */}
      <rect y="0" width="280" height="60" fill="#25D366" />
      <circle cx="30" cy="30" r="20" fill="white" />
      <text x="70" y="30" fill="white" fontFamily="Arial" fontSize="16" fontWeight="bold" dominantBaseline="middle">
        ThriftBooks AI
      </text>
      <text x="70" y="45" fill="white" fontFamily="Arial" fontSize="12" opacity="0.8" dominantBaseline="middle">
        Online
      </text>
      
      {/* Message bubbles */}
      {/* User message 1 */}
      <rect x="90" y="80" width="180" height="40" rx="10" fill="#E5E7EB" />
      <text x="100" y="105" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        Hi, I'm looking for a fantasy book
      </text>
      
      {/* Bot response 1 */}
      <rect x="10" y="130" width="200" height="60" rx="10" fill="#DCF8C6" />
      <text x="20" y="150" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        Hello! 👋 I'd be happy to help you find
      </text>
      <text x="20" y="170" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        a fantasy book. What kind do you enjoy?
      </text>
      
      {/* User message 2 */}
      <rect x="100" y="200" width="170" height="40" rx="10" fill="#E5E7EB" />
      <text x="110" y="225" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        I like epic fantasy like LOTR
      </text>
      
      {/* Bot response 2 */}
      <rect x="10" y="250" width="200" height="80" rx="10" fill="#DCF8C6" />
      <text x="20" y="270" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        Great choice! I recommend "The Way
      </text>
      <text x="20" y="290" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        of Kings" by Brandon Sanderson. It has
      </text>
      <text x="20" y="310" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        an immersive world and epic storyline.
      </text>
      
      {/* User message 3 */}
      <rect x="150" y="340" width="120" height="40" rx="10" fill="#E5E7EB" />
      <text x="160" y="365" fill="#1F2937" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        Show me more details
      </text>
      
      {/* Bot response 3 with book card */}
      <rect x="10" y="390" width="220" height="100" rx="10" fill="#DCF8C6" />
      <rect x="20" y="400" width="200" height="80" rx="5" fill="white" />
      <rect x="30" y="410" width="50" height="60" fill="#F3F4F6" />
      <text x="90" y="425" fill="#1F2937" fontFamily="Arial" fontSize="12" fontWeight="bold" dominantBaseline="middle">
        The Way of Kings
      </text>
      <text x="90" y="445" fill="#4B5563" fontFamily="Arial" fontSize="10" dominantBaseline="middle">
        Brandon Sanderson
      </text>
      <text x="90" y="460" fill="#16A34A" fontFamily="Arial" fontSize="14" fontWeight="bold" dominantBaseline="middle">
        $8.99
      </text>
      
      {/* Chat input field */}
      <rect x="0" y="460" width="280" height="40" fill="white" />
      <rect x="10" y="470" width="210" height="25" rx="12.5" fill="#F3F4F6" />
      <text x="25" y="485" fill="#9CA3AF" fontFamily="Arial" fontSize="12" dominantBaseline="middle">
        Type a message...
      </text>
      <circle cx="250" cy="482" r="15" fill="#25D366" />
    </svg>
  );
};

export default MockImage; 