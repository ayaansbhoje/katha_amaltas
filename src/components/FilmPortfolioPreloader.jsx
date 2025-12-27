import React, { useState, useEffect } from 'react';

export default function FilmPortfolioPreloader({ onComplete }) {
  const [splitScreen, setSplitScreen] = useState(false);

  const handleVideoEnd = () => {
    // Start screen split after video ends
    setSplitScreen(true);
  };

  useEffect(() => {
    // Force iOS to use exact colors by adding meta tag
    const metaTag = document.querySelector('meta[name="color-scheme"]');
    if (!metaTag) {
      const meta = document.createElement('meta');
      meta.name = 'color-scheme';
      meta.content = 'light dark';
      document.head.appendChild(meta);
    }

    // Disable iOS color adjustments
    document.documentElement.style.webkitTapHighlightColor = 'transparent';
    
    // After split animation completes (1000ms), call onComplete callback
    if (splitScreen) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [splitScreen, onComplete]);

  // iOS-optimized background style using important flags
  const backgroundStyle = {
    backgroundColor: '#770D11',
    background: '#770D11',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    willChange: 'transform',
    WebkitFontSmoothing: 'antialiased',
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      style={{ 
        backgroundColor: '#000000',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Top Half with Video */}
      <div
        style={backgroundStyle}
        className={`absolute top-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-end justify-center pb-2 ${
          splitScreen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <video 
          src="assets/AMALTAS_LOGO_ANIMATION - Trim.mp4" 
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          onEnded={handleVideoEnd}
          className="h-36 md:h-46 w-auto object-contain"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
      
      {/* Bottom Half with Line */}
      <div
        style={backgroundStyle}
        className={`absolute bottom-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-start justify-center pt-2 ${
          splitScreen ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div 
          className="w-32 h-px" 
          style={{ 
            backgroundColor: '#FFFFFF',
            background: '#FFFFFF'
          }}
        ></div>
      </div>
    </div>
  );
}