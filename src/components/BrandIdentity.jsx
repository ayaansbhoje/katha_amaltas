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
      <div className="relative w-full h-[75vh] md:h-screen overflow-hidden">
        
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/1-5.webp"
          alt="Background"
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-12 lg:p-16 pb-12 md:pb-24">
          
          {/* Top Left Section - Logo and Header */}
          <div className="flex flex-col max-w-xl">
            {/* Logo */}
            <div className="w-36 md:w-60 lg:w-48 mb-4 md:mb-8 ml-0 md:ml-4 lg:ml-6">
              <img 
                src="/assets/katha_1.png" 
                alt="Logo" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Main Header with Animated Word */}
            <h1 
              className="text-base md:text-xl lg:text-4xl font-bold  uppercase tracking-wide leading-tight ml-0 md:ml-4 lg:ml-6"
              style={{ fontFamily: 'var(--font-bebas-neue)', color: '#F5BF38' }}
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
          <div className="flex flex-row justify-between items-end mt-auto mb-6 md:mb-16">
            
            {/* Bottom Left Section - Secondary Header */}
            <div className="max-w-xs md:max-w-xl">
              <p 
                className="text-sm md:text-xl lg:text-2xl italic leading-relaxed"
                style={{ fontFamily: 'var(--font-avenir)', color: '#F5BF38' }}
              >
                And our studio follows <br /> this tradition, we allow <br /> stories to emerge <br /> naturally.
              </p>
            </div>

            {/* Bottom Right Section - Amaltas Logo + Why Amaltas text */}
            <div className="flex flex-col items-end text-right">
              {/* Amaltas Logo */}
              <div className="w-28 md:w-56 lg:w-64 mb-2 md:mb-4">
                <img 
                  src="/assets/amaltas.png" 
                  alt="Amaltas Logo" 
                  className="w-full h-auto"
                />
              </div>

              {/* Why Amaltas Header */}
              <p 
                className="text-lg md:text-3xl lg:text-4xl uppercase tracking-wide mb-1 md:mb-2"
                style={{ fontFamily: 'var(--font-bebas-neue)', color: '#8B2020' }}
              >
                Why Amaltas, you wonder?
              </p>

              {/* Subtext */}
              <p 
                className="text-sm md:text-xl lg:text-2xl italic leading-relaxed"
                style={{ fontFamily: 'var(--font-avenir)', color: '#8B2020' }}
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