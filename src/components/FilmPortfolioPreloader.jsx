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

  // Consistent background style using RGB values for better cross-device consistency
  const backgroundStyle = {
    backgroundColor: 'rgb(119, 13, 17)', // #770D11 in RGB format
    colorSpace: 'srgb',
    WebkitColorSpace: 'srgb',
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
    WebkitFilter: 'opacity(1)', // Forces webkit color rendering
  };

  const whiteLineStyle = {
    backgroundColor: 'rgb(255, 255, 255)',
    colorSpace: 'srgb',
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
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
          onEnded={handleVideoEnd}
          className="h-36 md:h-46 w-auto object-contain"
        />
      </div>
      
      {/* Bottom Half with Line */}
      <div
        style={backgroundStyle}
        className={`absolute bottom-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-start justify-center pt-2 ${
          splitScreen ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-32 h-px" style={whiteLineStyle}></div>
      </div>
    </div>
  );
}