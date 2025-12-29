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
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/about_bg1.jpg')`,
            backgroundColor: '#8B2E1F'
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16 pb-24">
          {/* Top Left Section - Logo and Header */}
          <div className="flex flex-col max-w-xl">
            {/* Logo */}
            <div className="w-72 md:w-60 lg:w-48 mb-8 ml-8 md:ml-16 lg:ml-24">
              <img 
                src="/assets/katha_1.png" 
                alt="Logo" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Main Header with Animated Word */}
            <h1 
              className="text-white text-xl md:text-xl lg:text-4xl font-bold uppercase tracking-wide leading-tight ml-8 md:ml-16 lg:ml-24"
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
          
          {/* Bottom Left Section - Secondary Header */}
          <div className="max-w-xl mt-auto mb-16 ml-8 md:ml-8 lg:ml-8">
            <p 
              className="text-white text-lg md:text-xl lg:text-2xl italic leading-relaxed"
              style={{ fontFamily: 'var(--font-avenir)' }}
            >
              And our studio follows <br /> this tradition, we allow <br /> stories to emerge  <br /> naturally.
            </p>
          </div>
        </div>
      </div>

      {/* Second Section - Video Background */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000
          }}
        >
          <source src="/assets/brand_identity2.mov" type="video/mp4" />
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-16">
          {/* Center Content */}
          <div className="max-w-4xl text-center">
            {/* Logo */}
            <div className="w-64 md:w-72 lg:w-80 mx-auto mb-6">
              <img 
                src="/assets/amaltas.png" 
                alt="Amaltas Logo" 
                className="w-full h-auto"
              />
            </div>
            
            {/* First Text - Bebas Neue */}
            <p 
              className="text-white text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-4"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              Why Amaltas, you wonder?
            </p>
            
            {/* Second Text - Avenir */}
            <p 
              className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-12"
              style={{ fontFamily: 'var(--font-avenir)' }}
            >
              Because stories, just like trees, grow from the ground they stand on.
            </p>
            
            {/* Header - Bebas Neue */}
            <h2 
              className="text-white text-3xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              OUR FILMS RESIDE AT THE INTERSECTION OF ART AND SOCIETY
            </h2>
            
            {/* Description - Avenir */}
            <p 
              className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed"
              style={{ fontFamily: 'var(--font-avenir)' }}
            >
              reflecting one another in a continuous exchange.
            </p>
          </div>
        </div>
      </div>

      {/* Third Section - Safe Space */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/3_aboutbg.jpg')`,
            backgroundColor: '#D4A056'
          }}
        />
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-[1]" />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-16">
          <div className="text-center">
            {/* Header */}
            <h2 
              className="text-white text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest mb-8"
              style={{ fontFamily: 'Bebas Neue, var(--font-bebas-neue)' }}
            >
              WELCOME TO OUR SAFE SPACE, NOW YOURS
            </h2>
            
            {/* Logo */}
            <div className="w-96 md:w-[500px] lg:w-[600px] mx-auto">
              <img 
                src="/assets/3_logo.png" 
                alt="Katha Amaltas Logo" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandIdentity;