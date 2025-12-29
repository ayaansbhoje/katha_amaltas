import React, { useState, useEffect, useRef } from 'react';

const LayeredGallery = () => {
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

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

  // ROTATION — continuous rotation (same logic as CinematicCarousel)
  useEffect(() => {
    let isRunning = true;
    const speedPerMs = 0.0015 * 3;
    lastRef.current = performance.now();

    const loop = (now) => {
      if (!isRunning) return;
      
      const last = lastRef.current || now;
      const dt = Math.max(0, now - last);
      lastRef.current = now;

      setRotation((r) => {
        const newRotation = (r + speedPerMs * dt) % 360;
        return newRotation;
      });
      
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    
    return () => {
      isRunning = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Calculate position for each item in circular arrangement
  const getItemPosition = (index, totalItems) => {
    const angleStep = (2 * Math.PI) / totalItems;
    const currentAngle = (index * angleStep) + (rotation * Math.PI / 180);
    
    const radiusX = 35; // Horizontal radius
    const radiusY = 30; // Vertical radius for elliptical path
    const centerX = 50;
    const centerY = 48; // Adjusted center position
    
    const x = centerX + Math.cos(currentAngle) * radiusX;
    const y = centerY + Math.sin(currentAngle) * radiusY;
    const z = Math.sin(currentAngle) * 200; // Depth based on position
    const rotationY = (currentAngle * 180 / Math.PI); // Face towards center
    
    return { x, y, z, rotationY };
  };

  return (
    <div className="relative w-full min-h-screen h-[140vh] overflow-hidden">
      {/* Background Image */}
      <img 
        src="/assets/filmgallery_bg.jpg" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
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

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `
                    translate(-50%, -50%)
                    translateZ(${pos.z}px)
                    scale(1)
                  `,
                  transformStyle: 'preserve-3d',
                  zIndex: Math.round(50 + pos.z / 10),
                  filter: 'blur(0px) brightness(1)',
                  opacity: 1,
                  willChange: 'transform'
                }}
              >
                {/* Video Card */}
                <div className="relative w-40 h-[200px] sm:w-56 sm:h-[280px] md:w-72 md:h-[360px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  {/* Video */}
                  <video
                    src={item.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UI Overlay - Centered */}
      <div className="absolute top-8 left-0 right-0 sm:top-12 md:top-14 z-50 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 md:mb-2 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, color: '#91222C' }}>Stories in Short Form</h1>
        <p className="text-white text-[10px] sm:text-xs md:text-sm  tracking-widest" style={{ fontFamily: "'Avenir', sans-serif", fontWeight: 400,color: '#91222C' }}>
          Narratives adapted for the digital present,<br />
          brief in duration, complete in feeling.
        </p>
      </div>

    </div>
  );
};

export default LayeredGallery;