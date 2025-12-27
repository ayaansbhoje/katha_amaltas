import React, { useState, useRef, useEffect } from 'react';

const FilmGallery = () => {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('drift'); // 'stay', 'drift', or 'physics'
  const containerRef = useRef(null);
  const imageIdCounter = useRef(0);
  const lastSpawnTime = useRef(0);
  const animationFrameId = useRef(null);

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
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rotationSpeed: (Math.random() - 0.5) * 3,
      opacity: 1,
    };

    setImages((prev) => [...prev, newImage]);

    if (images.length > 20) {
      setImages((prev) => prev.slice(-20));
    }
  };

  useEffect(() => {
    if (mode === 'stay' || images.length === 0) return;

    const animate = () => {
      setImages((prevImages) =>
        prevImages
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
              const newVy = img.vy + 0.15;
              return {
                ...img,
                x: img.x + img.vx,
                y: img.y + newVy,
                vx: img.vx * 0.99,
                vy: newVy * 0.99,
                rotation: img.rotation + img.rotationSpeed,
                opacity: img.opacity - 0.003,
              };
            }
            return img;
          })
          .filter((img) => img.opacity > 0)
      );

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [mode, images.length]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        color: '#d3a345',
        backgroundImage: 'url(/assets/filmgallery_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mode Selector */}
      <div className="absolute right-6 z-50 flex gap-2" style={{ top: '50%', transform: 'translateY(-420px)' }}>
        {['stay', 'drift', 'physics'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === m ? 'bg-white text-black' : 'bg-black/30 hover:bg-black/50'
            }`}
            style={{ fontFamily: 'Avenir, sans-serif' }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Top Right Header */}
      <div
        className="absolute right-32 z-40 pointer-events-none max-w-md"
        style={{ top: '50%', transform: 'translateY(-220px)' }}
      >
        <h3
          className="text-2xl font-bold text-right"
          style={{
            color: '#8B2020',
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '0.05em',
            lineHeight: '1.2',
          }}
        >
          HOVER OR TAP TO SEE PHOTOGRAPHS FROM OUR ARCHIVE
        </h3>
      </div>

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center cursor-none"
      >
        {/* Left Header Text */}
        <div
          className="absolute left-16 z-40 pointer-events-none"
          style={{ top: '50%', transform: 'translateY(-320px)' }}
        >
          <h2 className="text-8xl font-bold" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif' }}>
            STORIES
          </h2>
          <h2 className="text-3xl font-bold mt-1" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif' }}>
            THAT ARE
          </h2>
          <h2 className="text-9xl font-bold mt-6" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif' }}>
            LIVED,
          </h2>
        </div>

        {/* Center Image */}
        <div className="z-30 pointer-events-none">
          <img
            src="assets/film_gallery_centre.png"
            alt="Stories that are lived, then filmed"
            className="w-[110rem] h-auto object-contain"
          />
        </div>

        {/* Right Bottom Text */}
        <div
          className="absolute right-16 z-40 pointer-events-none"
          style={{ top: '50%', transform: 'translateY(260px)' }}
        >
          <h2 className="text-9xl font-bold" style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif' }}>
            THEN
          </h2>
          <h2
            className="text-9xl font-bold"
            style={{ color: '#8B2020', fontFamily: 'Bebas Neue, sans-serif', marginLeft: '3rem' }}
          >
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
              <img src={img.src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-[#d3a345]/30" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-6 z-50 text-sm opacity-80">
        <p>Move your cursor to explore</p>
        <p className="text-xs mt-1">Mode: {mode}</p>
      </div>
    </div>
  );
};

export default FilmGallery;
