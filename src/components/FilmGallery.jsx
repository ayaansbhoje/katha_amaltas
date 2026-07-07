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
    'assets/gallery_img3.webp',
    'assets/gallery_img4.webp',
    'assets/gallery_img5.webp',
    'assets/gallery_img6.webp',
    'assets/gallery_img7.webp',
    'assets/gallery_img8.webp',
    'assets/gallery_img9.webp',
    'assets/gallery_img10.webp',
  ];

  // Shared spawn logic for both mouse + touch
  const spawnImage = (clientX, clientY) => {
    const now = Date.now();
    if (now - lastSpawnTime.current < 100) return;
    lastSpawnTime.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newImage = {
      id: imageIdCounter.current++,
      src: imagePool[Math.floor(Math.random() * imagePool.length)],
      x,
      y,
      rotation: Math.random() * 40 - 20,
      scale: 0.7 + Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: 1,
    };

    setImages((prev) => {
      const next = [...prev, newImage];
      return next.length > 20 ? next.slice(-20) : next;
    });
  };

  const handleMouseMove = (e) => {
    spawnImage(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches[0]) {
      spawnImage(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      spawnImage(e.touches[0].clientX, e.touches[0].clientY);
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
      className="relative overflow-hidden min-h-[85vh] lg:h-[85vh]"
      style={{
        color: '#d3a345',
        backgroundImage: 'url(/assets/filmgallery_bg.webp)',
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
            className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
              mode === m
                ? 'bg-white text-black'
                : 'bg-black/30 hover:bg-black/50'
            }`}
            style={{
              color: mode === m ? '#000' : '#f8e6d2',
              fontFamily: 'Avenir, sans-serif',
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Section */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="relative flex items-center justify-center cursor-none min-h-[85vh] lg:h-[85vh]"
      >
        {/* Desktop Layout — UNCHANGED */}
        <div className="hidden lg:block w-full h-full">
          {/* Center Image */}
          <div className="z-30 pointer-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ marginTop: '8vh' }}>
            <img
              src="/assets/StudioVirtualBackground.png"
              alt="Stories that are lived, then filmed"
              className="w-[140rem] h-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full px-6 py-10">
          {/* Center image */}
          <div className="z-30 pointer-events-none my-3">
            <img
              src="/assets/StudioVirtualBackground.png"
              alt="Stories that are lived, then filmed"
              className="w-full max-w-[260px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Image Trail — smaller on mobile */}
        <div className="absolute inset-0 pointer-events-none">
          {images.map((img) => (
            <div
              key={img.id}
              className="absolute w-24 h-32 lg:w-48 lg:h-64 rounded-lg overflow-hidden shadow-2xl transition-opacity"
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