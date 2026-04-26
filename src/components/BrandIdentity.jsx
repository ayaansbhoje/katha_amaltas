import React, { useState, useEffect } from 'react';

const BrandIdentity = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const words = ['TRADITION', 'PASSION', 'EXCELLENCE'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* First Section - Image Background */}
      <div className="relative w-full h-screen overflow-hidden">
        
        {/* Background Image — same pattern as SimpleCinematicCarousel */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/1-5.png"
          alt="Background"
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16 pb-24">
          {/* Top Left Section - Logo and Header */}
          <div className="flex flex-col max-w-xl">
            {/* Logo */}
            <div className="w-72 md:w-60 lg:w-48 mb-8 ml-0 md:ml-4 lg:ml-6">
              <img 
                src="/assets/katha_1.png" 
                alt="Logo" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Main Header with Animated Word */}
            <h1 
              className="text-white text-xl md:text-xl lg:text-4xl font-bold uppercase tracking-wide leading-tight ml-0 md:ml-4 lg:ml-6"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              IS A STORY, CARRIED FORWARD <br /> THROUGH{' '}
              <span 
                className="inline-block transition-opacity duration-500"
                style={{ opacity: isVisible ? 1 : 0 }}
              >
                {words[currentWordIndex]}
              </span>
            </h1>
          </div>
          
          {/* Bottom Row - Left text + Right Amaltas block */}
          <div className="flex flex-row justify-between items-end mt-auto mb-16">
            {/* Bottom Left Section - Secondary Header */}
            <div className="max-w-xl ml-0 md:ml-0 lg:ml-0">
              <p 
                className="text-white text-lg md:text-xl lg:text-2xl italic leading-relaxed"
                style={{ fontFamily: 'var(--font-avenir)' }}
              >
                And our studio follows <br /> this tradition, we allow <br /> stories to emerge <br /> naturally.
              </p>
            </div>

            {/* Bottom Right Section - Amaltas Logo + Why Amaltas text */}
            <div className="flex flex-col items-end mr-0 md:mr-0 lg:mr-0 text-right">
              {/* Amaltas Logo */}
              <div className="w-48 md:w-56 lg:w-64 mb-4">
                <img 
                  src="/assets/amaltas.png" 
                  alt="Amaltas Logo" 
                  className="w-full h-auto"
                />
              </div>

              {/* Why Amaltas Header */}
              <p 
                className="text-white text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-2"
                style={{ fontFamily: 'var(--font-bebas-neue)' }}
              >
                Why Amaltas, you wonder?
              </p>

              {/* Subtext */}
              <p 
                className="text-white text-lg md:text-xl lg:text-2xl italic leading-relaxed"
                style={{ fontFamily: 'var(--font-avenir)' }}
              >
                Because stories, just like trees, <br /> grow from the ground they stand on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandIdentity;