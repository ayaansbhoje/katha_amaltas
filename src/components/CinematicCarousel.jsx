import React, { useEffect, useRef, useState } from "react";

const SimpleCinematicCarousel = () => {
  const sectionRef = useRef(null);

  const fullHeader = "SPACES WE'VE WORKED IN";
  
  // States
  const [inView, setInView] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const [rotation, setRotation] = useState(0);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  // Images - replace the paths with your local GIF paths
  const mediaItems = [
    { src: "assets/client_1.gif", title: "Space 1" },
    { src: "assets/client_2.gif", title: "Space 2" },
    { src: "assets/client_3.gif", title: "Space 3" },
    { src: "assets/client_4.gif", title: "Space 4" },
    { src: "assets/client_5.gif", title: "Space 5" },
    { src: "assets/client_6.gif", title: "Space 6" },
    { src: "assets/client_7.gif", title: "Space 7" },
    { src: "assets/client_8.gif", title: "Space 8" },
    { src: "assets/client_9.gif", title: "Space 9" },
    { src: "assets/client_10.gif", title: "Space 10" },
    { src: "assets/client_11.gif", title: "Space 11" }
  ];

  const radius = 500;
  const theta = 360 / mediaItems.length;

  // Mouse move handler for dynamic gradient
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // OBSERVE SECTION — start rotation on enter/leave
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;

        if (visible) {
          setInView(true);
        } else {
          // Reset everything when leaving
          setInView(false);
          setRotation(0);
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ROTATION — while in view
  useEffect(() => {
    if (!inView) return;

    const speedPerMs = 0.0015 * 3;
    lastRef.current = performance.now();

    const loop = (now) => {
      if (!inView) return;

      const last = lastRef.current || now;
      const dt = now - last;
      lastRef.current = now;

      setRotation((r) => (r + speedPerMs * dt) % 360);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView]);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col items-center overflow-hidden"
      style={{ color: '#d3a345' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/client_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dynamic gradient overlay that follows mouse */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 1200px 1200px at ${mousePos.x}% ${mousePos.y}%, rgba(248, 230, 210, 0.4) 0%, rgba(248, 230, 210, 0.2) 30%, transparent 60%),
            radial-gradient(ellipse 1200px 1200px at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(112, 77, 59, 0.3) 0%, rgba(112, 77, 59, 0.15) 30%, transparent 60%)
          `,
          transition: 'background 0.3s ease-out'
        }}
      />
      
      {/* Subtle vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 z-0" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* HEADER - Centered */}
        <header className="w-full px-6 pt-16 pb-6">
          <h1 className="text-lg sm:text-xl md:text-4xl tracking-tight text-center" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#F8E6D2' }}>
            {fullHeader}
          </h1>
        </header>

        {/* CAROUSEL - No fade animation */}
        <main className="w-full max-w-6xl px-6 mb-16 md:-mt-8">
          <div className="relative w-full h-[40vh] sm:h-[45vh] md:h-[60vh] flex items-center justify-center">
            <div
              className="relative w-full h-full"
              style={{
                perspective: "1500px",
                perspectiveOrigin: "50% 45%",
                transformStyle: "preserve-3d"
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 w-0 h-0"
                style={{
                  transform: `translateX(-50%) translateY(-50%) rotateX(-10deg) rotateY(${rotation}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                {mediaItems.map((item, index) => {
                  const angle = theta * index;
                  const current = ((rotation % 360) + 360) % 360;
                  const diff = Math.abs(((angle - current + 540) % 360) - 180);
                  const depth = 1 - Math.min(1, diff / 180);

                  const opacity = 1;
                  const scale = 1;

                  // Reduced card dimensions (15% smaller)
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  const cardWidth = isMobile ? 102 : 178;
                  const cardHeight = isMobile ? 136 : 238;
                  const mobileRadius = isMobile ? 250 : radius;

                  return (
                    <div
                      key={index}
                      className="absolute rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                        transform: `rotateY(${angle}deg) translateZ(${mobileRadius}px) scale(${scale})`,
                        left: `-${cardWidth / 2}px`,
                        top: `-${cardHeight / 2 + 30}px`,
                        opacity,
                        boxShadow: '0 18px 38px rgba(0,0,0,0.35), 0 0 0 1px rgba(211,163,69,0.2)'
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(211,163,69,0.12), transparent)" }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SimpleCinematicCarousel;