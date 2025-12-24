import React, { useState, useEffect } from 'react';

export default function FilmPortfolioPreloader({ onComplete }) {
  const [splitScreen, setSplitScreen] = useState(false);

  const handleVideoEnd = () => {
    // Start screen split after video ends
    setSplitScreen(true);
  };

  useEffect(() => {
    // After split animation completes (1000ms), call onComplete callback
    if (splitScreen) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1000); // Match the transition duration

      return () => clearTimeout(timer);
    }
  }, [splitScreen, onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Top Half with Video */}
      <div
        style={{ backgroundColor: '#91222c' }}
        className={`absolute top-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-end justify-center pb-2 ${
          splitScreen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <video 
          src="/assets/AMALTAS_LOGO_ANIMATION_YELLOW - Trim.mp4" 
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="h-24 md:h-32 w-auto object-contain"
        />
      </div>
      
      {/* Bottom Half with Line */}
      <div
        style={{ backgroundColor: '#91222c' }}
        className={`absolute bottom-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-start justify-center pt-2 ${
          splitScreen ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-32 h-px bg-white"></div>
      </div>
    </div>
  );
}