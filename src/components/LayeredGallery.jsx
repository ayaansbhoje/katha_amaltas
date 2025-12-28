import React, { useState, useEffect, useRef } from 'react';

const LayeredGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef(null);

  // Sample gallery items
  const items = [
    {
      id: 1,
      video: 'assets/V1.MP4',
      title: 'techno is dumb',
      description: 'Exploring contemporary design'
    },
    {
      id: 2,
      video: 'assets/V2.MP4',
      title: 'Urban Landscapes',
      description: 'City life in motion'
    },
    {
      id: 3,
      video: 'assets/V4.mp4',
      title: 'Abstract Forms',
      description: 'Geometric patterns and shapes'
    },
    {
      id: 4,
      video: 'assets/V8.MOV',
      title: 'Natural Beauty',
      description: 'Organic textures and colors'
    },
    {
      id: 5,
      video: 'assets/V9.mp4',
      title: 'Creative Space',
      description: 'Innovation and imagination'
    },
    {
      id: 6,
      video: 'assets/V11.mp4',
      title: 'Minimalist Design',
      description: 'Simplicity and elegance'
    },
    {
      id: 7,
      video: 'assets/V13.mp4',
      title: 'Digital Art',
      description: 'Technology meets creativity'
    },
    {
      id: 8,
      video: 'assets/V14.mp4',
      title: 'Architectural Beauty',
      description: 'Structure and design harmony'
    },
    {
      id: 9,
      video: 'assets/V15.mp4',
      title: 'Cinematic Vision',
      description: 'Motion and storytelling'
    }
  ];

  // Circular motion animation
  useEffect(() => {
    const animate = () => {
      if (hoveredIndex === null) {
        setRotation(prev => (prev + 0.2) % 360);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredIndex]);

  // Calculate position for each item in circular arrangement
  const getItemPosition = (index, totalItems) => {
    const angleStep = (2 * Math.PI) / totalItems;
    const currentAngle = (index * angleStep) + (rotation * Math.PI / 180);
    
    const radiusX = 35; // Horizontal radius
    const radiusY = 25; // Vertical radius for elliptical path
    const centerX = 50;
    const centerY = 50;
    
    const x = centerX + Math.cos(currentAngle) * radiusX;
    const y = centerY + Math.sin(currentAngle) * radiusY;
    const z = Math.sin(currentAngle) * 200; // Depth based on position
    const rotationY = (currentAngle * 180 / Math.PI); // Face towards center
    
    return { x, y, z, rotationY };
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Container */}
      <div className="absolute inset-0" style={{ perspective: '1500px' }}>
        <div 
          className="relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-400px)'
          }}
        >
          {items.map((item, index) => {
            const pos = getItemPosition(index, items.length);
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-700 ease-out cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `
                    translate(-50%, -50%)
                    translateZ(${isHovered ? pos.z + 300 : pos.z}px)
                    scale(${isHovered ? 1.3 : 1})
                  `,
                  transformStyle: 'preserve-3d',
                  zIndex: isHovered ? 100 : Math.round(50 + pos.z / 10),
                  filter: isOtherHovered ? 'blur(25px) brightness(0.2)' : 'blur(0px) brightness(1)',
                  opacity: isOtherHovered ? 0.2 : 1,
                  pointerEvents: isOtherHovered ? 'none' : 'auto'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Video Card */}
                <div className="relative w-40 h-[227px] sm:w-56 sm:h-[318px] md:w-72 md:h-[408px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  {/* Video */}
                  <video
                    src={item.video}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500"
                    style={{
                      opacity: isHovered ? 1 : 0.5
                    }}
                  />

                  {/* Content */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-5 transform transition-all duration-500"
                    style={{
                      transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                      opacity: isHovered ? 1 : 0
                    }}
                  >
                    <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-0.5 sm:mb-1 md:mb-1.5 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-[10px] sm:text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Ring Indicator */}
                  <div 
                    className="absolute top-2 right-2 md:top-3 md:right-3 transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0.3
                    }}
                  >
                    <div className="relative w-2 h-2 md:w-3 md:h-3">
                      <div className={`absolute inset-0 bg-white rounded-full transition-all duration-300 ${isHovered ? 'animate-ping' : ''}`} />
                      <div className="absolute inset-0 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2 tracking-tight">Stories in Short Form</h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-px w-8 sm:w-10 md:w-12 bg-white/30" />
          <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">arratives adapted for the digital present,  brief in duration, complete in feeling.</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 flex gap-3 sm:gap-4 md:gap-6">
        <button className="text-white/60 hover:text-white text-[10px] sm:text-xs md:text-sm uppercase tracking-wider transition-colors">
          Studio
        </button>
        <button className="text-white text-[10px] sm:text-xs md:text-sm uppercase tracking-wider">
          Portfolio
        </button>
        <button className="text-white/60 hover:text-white text-[10px] sm:text-xs md:text-sm uppercase tracking-wider transition-colors">
          Exhibition
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-50">
        {items.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              hoveredIndex === index 
                ? 'w-8 sm:w-10 h-1 bg-white' 
                : 'w-1 h-1 bg-gray-600 hover:bg-gray-400 rounded-full'
            }`}
            onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
          />
        ))}
      </div>

      {/* Instruction Text */}
      <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 z-50">
        <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest">
          Hover to explore · Click to focus
        </p>
      </div>
    </div>
  );
};

export default LayeredGallery;