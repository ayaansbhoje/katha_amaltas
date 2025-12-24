import React, { useEffect, useRef, useState } from "react";

const SimpleCinematicCarousel = () => {
  const sectionRef = useRef(null);

  const fullHeader = "Spaces We've Worked In";
  
  // States
  const [typed, setTyped] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [inView, setInView] = useState(false);

  const [rotation, setRotation] = useState(0);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  // Images
  const mediaItems = [
    { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", title: "Mountain" },
    { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80", title: "Forest" },
    { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80", title: "Desert" },
    { src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&q=80", title: "Ocean" },
    { src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&q=80", title: "Autumn" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80", title: "Night" }
  ];

  const radius = 500;
  const theta = 360 / mediaItems.length;

  // OBSERVE SECTION — start + reset animations on enter/leave
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;

        if (visible) {
          setInView(true);
          setTyped("");
          setStartTyping(true);
          setTypingDone(false);
        } else {
          // Reset everything when leaving
          setInView(false);
          setStartTyping(false);
          setTyped("");
          setTypingDone(false);
          setRotation(0);
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // TYPING EFFECT
  useEffect(() => {
    if (!startTyping || !inView) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullHeader.slice(0, i));

      if (i >= fullHeader.length) {
        clearInterval(interval);
        setTimeout(() => setTypingDone(true), 300);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTyping, inView]);

  // ROTATION — ONLY while in view AND after typing
  useEffect(() => {
    if (!typingDone || !inView) return;

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
  }, [typingDone, inView]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col items-center overflow-hidden animated-carousel-bg"
      style={{ color: '#d3a345' }}
    >
      <style>{`
        @keyframes figureEightCarousel {
          0% { background-position: 0% 0%, 100% 100%, 50% 50%, 50% 50%; }
          25% { background-position: 50% 25%, 50% 75%, 75% 50%, 60% 40%; }
          50% { background-position: 100% 100%, 0% 0%, 50% 50%, 40% 60%; }
          75% { background-position: 50% 75%, 50% 25%, 25% 50%, 55% 45%; }
          100% { background-position: 0% 0%, 100% 100%, 50% 50%, 50% 50%; }
        }
        .animated-carousel-bg {
          background:
            radial-gradient(ellipse 2000px 2000px at 20% 30%, rgba(248, 230, 210, 0.75) 0%, rgba(248, 230, 210, 0.45) 30%, transparent 60%),
            radial-gradient(ellipse 2000px 2000px at 80% 70%, rgba(112, 77, 59, 0.55) 0%, rgba(112, 77, 59, 0.3) 30%, transparent 60%),
            radial-gradient(ellipse 1800px 1800px at 50% 50%, rgba(211, 163, 69, 0.5) 0%, rgba(211, 163, 69, 0.25) 35%, transparent 65%),
            linear-gradient(135deg, #f8e6d2 0%, #704d3b 50%, #d3a345 100%);
          background-size: 300% 300%, 300% 300%, 300% 300%, 100% 100%;
          animation: figureEightCarousel 18s ease-in-out infinite;
        }
      `}</style>
      {/* Subtle vignette overlay (behind content) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 z-0" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* HEADER */}
        <header className="w-full px-6 pt-16 pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-aboreto tracking-tight text-center md:text-left ml-0 md:ml-8">
            <span style={{ color: '#d3a345' }}>{typed}</span>
            {startTyping && inView && (
              <span className="inline-block ml-1 h-5 md:h-8 w-1 animate-blink" style={{ backgroundColor: '#d3a345' }}></span>
            )}
          </h1>
        </header>

        {/* CAROUSEL FADE + SLIDE IN */}
        <main
          className={`
            w-full max-w-6xl px-6 mb-16 md:-mt-8
            transition-all duration-[1100ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]
            ${typingDone && inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
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

                  const opacity = 0.35 + depth * 0.65;
                  const scale = 0.85 + depth * 0.18;

                  // Mobile-specific dimensions
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                  const cardWidth = isMobile ? 120 : 210;
                  const cardHeight = isMobile ? 160 : 280;
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
                      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3" style={{ color: '#d3a345', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
                        <h3 className="font-arapey italic text-xs md:text-sm">{item.title}</h3>
                      </div>
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

      {/* BOTTOM RIGHT HEADER */}
      <div className="absolute bottom-8 md:bottom-22 left-6 right-6 md:left-auto md:right-6 z-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-aboreto tracking-tight text-center md:text-right leading-tight" style={{ color: '#d3a345' }}>
          Where vision meets<br />cinematic precision
        </h2>
      </div>

      <style>{`
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SimpleCinematicCarousel;