import React, { useState, useRef, useEffect } from 'react';

const FilmGallery = () => {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('drift'); // 'stay', 'drift', or 'physics'
  const containerRef = useRef(null);
  const imageIdCounter = useRef(0);
  const lastSpawnTime = useRef(0);
  const animationFrameId = useRef(null);

  // Sample film stills/portfolio images
  const imagePool = [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574267432644-f74ff6e89a6a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551847812-c7c0b0f0b3e7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=300&fit=crop',
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
      className="relative min-h-screen overflow-hidden"
      style={{
        color: '#d3a345',
        backgroundImage: 'url(/assets/gallery_background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mode Selector */}
      <div className="absolute top-6 right-6 z-50 flex gap-2">
        {['stay', 'drift', 'physics'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === m
                ? 'bg-white text-black'
                : 'bg-black/30 text-[#d3a345] hover:bg-black/50'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Section */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center cursor-none"
      >
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
                alt="Gallery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-[#d3a345]/30"></div>
            </div>
          ))}
        </div>

      </section>

      {/* Additional Info */}
      <div className="absolute bottom-6 left-6 z-50 text-sm" style={{ color: '#d3a345', opacity: 0.8 }}>
        <p>Move your cursor to explore</p>
        <p className="text-xs mt-1">Mode: {mode}</p>
      </div>
    </div>
  );
};

export default FilmGallery;