import React, { useState, useRef, useEffect } from 'react';

const FilmGallery = () => {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('stay'); // 'stay', 'drift', or 'physics'
  const containerRef = useRef(null);
  const imageIdCounter = useRef(0);
  const lastSpawnTime = useRef(0);
  const animationFrameId = useRef(null);

  // Sample film stills/portfolio images
  const imagePool = [
    'assets/gallery_img3.jpg',
    'assets/gallery_img4.jpg',
    'assets/gallery_img5.jpg',
    'assets/gallery_img6.jpg',
    'assets/gallery_img7.jpg',
    'assets/gallery_img8.jpg',
    'assets/gallery_img9.jpg',
    'assets/gallery_img10.jpg',
  ];

  const handleMouseMove = (e) => {
    const now = Date.now();
    // Spawn new image every 100ms
    if (now - lastSpawnTime.current < 100) return;
    lastSpawnTime.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newImage = {
      id: imageIdCounter.current++,
      src: imagePool[Math.floor(Math.random() * imagePool.length)],
      x,
      y,
      rotation: Math.random() * 40 - 20,
      scale: 0.7 + Math.random() * 0.3,
      // Physics properties
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: 1,
    };

    setImages((prev) => [...prev, newImage]);

    // Remove old images to prevent memory issues
    if (images.length > 20) {
      setImages((prev) => prev.slice(-20));
    }
  };

  // Animation loop for drift and physics modes
  useEffect(() => {
    if (mode === 'stay' || images.length === 0) return;

    const animate = () => {
      setImages((prevImages) => {
        return prevImages
          .map((img) => {
            if (mode === 'drift') {
              return {
                ...img,
                x: img.x + img.vx * 0.5,
                y: img.y + img.vy * 0.5,
                rotation: img.rotation + img.rotationSpeed * 0.2,
                opacity: img.opacity - 0.005,
              };
            } else if (mode === 'physics') {
              const newVy = img.vy + 0.15; // gravity
              const newX = img.x + img.vx;
              const newY = img.y + newVy;
              
              return {
                ...img,
                x: newX,
                y: newY,
                vx: img.vx * 0.99,
                vy: newVy * 0.99,
                rotation: img.rotation + img.rotationSpeed,
                opacity: img.opacity - 0.003,
              };
            }
            return img;
          })
          .filter((img) => img.opacity > 0);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mode, images.length]);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: '85vh',
        color: '#d3a345',
        backgroundImage: 'url(/assets/filmgallery_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mode Selector */}
      <div className="absolute bottom-6 left-6 z-50 flex gap-2">
        {['stay', 'drift', 'physics'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === m
                ? 'bg-white text-black'
                : 'bg-black/30 hover:bg-black/50'
            }`}
            style={{ 
              color: mode === m ? '#000' : '#f8e6d2',
              fontFamily: 'Avenir, sans-serif'
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Top Right Header */}
      <div className="absolute top-46 right-32 z-40 pointer-events-none max-w-md">
        <h3 className="text-2xl font-bold text-right" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em', lineHeight: '1.2' }}>
          HOVER OR TAP TO SEE PHOTOGRAPHS FROM OUR ARCHIVE
        </h3>
      </div>

      {/* Gallery Section */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex items-center justify-center cursor-none"
        style={{ height: '85vh' }}
      >
        {/* Left Header Text */}
        <div className="absolute left-16 top-1/4 z-40 pointer-events-none">
          <h2 className="text-8xl font-bold" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            STORIES
          </h2>
          <h2 className="text-3xl font-bold mt-1" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            THAT ARE
          </h2>
          <h2 className="text-9xl font-bold mt-6" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            LIVED,
          </h2>
        </div>

        {/* Center Image */}
        <div className="z-30 pointer-events-none" style={{ marginTop: '8vh' }}>
          <img 
            src="/assets/StudioVirtualBackground.png" 
            alt="Stories that are lived, then filmed" 
            className="w-[110rem] h-auto object-contain"
          />
        </div>

        {/* Right Bottom Text */}
        <div className="absolute right-8 bottom-1/4 z-40 pointer-events-none">
          <h2 className="text-9xl font-bold" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            THEN
          </h2>
          <h2 className="text-9xl font-bold" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em', marginLeft: '3rem' }}>
            FILMED.
          </h2>
        </div>

        {/* Image Trail */}
        <div className="absolute inset-0 pointer-events-none">
          {images.map((img) => (
            <div
              key={img.id}
              className="absolute w-48 h-32 rounded-lg overflow-hidden shadow-2xl transition-opacity"
              style={{
                left: `${img.x}px`,
                top: `${img.y}px`,
                transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.scale})`,
                opacity: img.opacity,
              }}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                style={{
                  imageRendering: 'auto',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              />
              <div className="absolute inset-0 border-2 border-[#d3a345]/30"></div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default FilmGallery;