import React, { useState, useRef, useEffect } from 'react';

const FilmGallery = () => {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState('drift');
  const containerRef = useRef(null);
  const imageIdCounter = useRef(0);
  const lastSpawnTime = useRef(0);
  const animationFrameId = useRef(null);

  // 🔒 FIXED REFERENCE HEIGHT (measured once)
  const layoutRef = useRef({
    centerY: 0,
  });

  useEffect(() => {
    if (containerRef.current && layoutRef.current.centerY === 0) {
      const rect = containerRef.current.getBoundingClientRect();
      layoutRef.current.centerY = rect.height / 2;
    }
  }, []);

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

    setImages((prev) => [
      ...prev.slice(-20),
      {
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
      },
    ]);
  };

  useEffect(() => {
    if (mode === 'stay' || images.length === 0) return;

    const animate = () => {
      setImages((prev) =>
        prev
          .map((img) => ({
            ...img,
            x: img.x + img.vx * (mode === 'drift' ? 0.5 : 1),
            y: img.y + (mode === 'drift' ? img.vy * 0.5 : img.vy + 0.15),
            vy: mode === 'physics' ? img.vy * 0.99 + 0.15 : img.vy,
            rotation: img.rotation + img.rotationSpeed * (mode === 'drift' ? 0.2 : 1),
            opacity: img.opacity - (mode === 'drift' ? 0.005 : 0.003),
          }))
          .filter((img) => img.opacity > 0)
      );

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [mode, images.length]);

  const centerY = layoutRef.current.centerY;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/filmgallery_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Mode Selector */}
      <div
        className="absolute right-6 z-50 flex gap-2"
        style={{ top: centerY - 420 }}
      >
        {['stay', 'drift', 'physics'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full text-sm ${
              mode === m ? 'bg-white text-black' : 'bg-black/30'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Top Right Text */}
      <div
        className="absolute right-32 z-40 max-w-md"
        style={{ top: centerY - 220 }}
      >
        <h3 className="text-2xl font-bold text-right text-[#8B2020]">
          HOVER OR TAP TO SEE PHOTOGRAPHS FROM OUR ARCHIVE
        </h3>
      </div>

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center cursor-none"
      >
        {/* Left Text */}
        <div
          className="absolute left-16 z-40"
          style={{ top: centerY - 320 }}
        >
          <h2 className="text-8xl font-bold text-[#8B2020]">STORIES</h2>
          <h2 className="text-3xl font-bold text-[#8B2020] mt-1">THAT ARE</h2>
          <h2 className="text-9xl font-bold text-[#8B2020] mt-6">LIVED,</h2>
        </div>

        {/* Center Image */}
        <img
          src="assets/film_gallery_centre.png"
          alt=""
          className="z-30 w-[110rem] pointer-events-none"
        />

        {/* Right Bottom Text */}
        <div
          className="absolute right-16 z-40"
          style={{ top: centerY + 260 }}
        >
          <h2 className="text-9xl font-bold text-[#8B2020]">THEN</h2>
          <h2 className="text-9xl font-bold text-[#8B2020] ml-12">FILMED.</h2>
        </div>

        {/* Image Trail */}
        <div className="absolute inset-0 pointer-events-none">
          {images.map((img) => (
            <div
              key={img.id}
              className="absolute w-48 h-32 overflow-hidden"
              style={{
                left: img.x,
                top: img.y,
                transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.scale})`,
                opacity: img.opacity,
              }}
            >
              <img src={img.src} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilmGallery;
