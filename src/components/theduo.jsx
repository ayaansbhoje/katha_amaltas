import { useState, useEffect, useRef } from "react";

// ─── Founder Letter Component ───────────────────────────────────────────────
const FounderLetter = ({ name, role, bio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterSlideUp, setLetterSlideUp] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFlapOpen(true);
      const slideTimer = setTimeout(() => setLetterSlideUp(true), 700);
      const contentTimer = setTimeout(() => setShowContent(true), 1200);
      return () => {
        clearTimeout(slideTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setFlapOpen(false);
      setLetterSlideUp(false);
      setShowContent(false);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center opacity-0 translate-y-12 animate-fadeInUp">
      <div className="flex flex-col items-center">
        {/* Envelope */}
        <div
          className="relative w-64 md:w-80 h-48 md:h-56 cursor-pointer group"
          onClick={() => setIsOpen(!isOpen)}
          style={{ perspective: "1200px" }}
        >
          {/* Envelope base */}
          <div
            className="absolute inset-0 rounded-lg overflow-visible transition-all duration-300 group-hover:scale-[1.02]"
            style={{
              transformStyle: "preserve-3d",
              background:
                "linear-gradient(145deg, #faf6f0 0%, #f0e8dc 50%, #e8dcc8 100%)",
              boxShadow: `
                0 4px 6px -1px rgba(26,54,93,0.1),
                0 2px 4px -1px rgba(26,54,93,0.06),
                inset 0 1px 2px rgba(255,255,255,0.5),
                inset 0 -1px 2px rgba(0,0,0,0.05)
              `,
            }}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,54,93,0.03) 2px, rgba(26,54,93,0.03) 3px),
                  repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(26,54,93,0.03) 2px, rgba(26,54,93,0.03) 3px)
                `,
              }}
            />

            {/* Aged stains */}
            <div className="absolute top-4 right-6 w-12 h-12 rounded-full bg-amber-900/5 blur-md" />
            <div className="absolute bottom-8 left-8 w-16 h-10 rounded-full bg-amber-900/5 blur-lg" />



            {/* Flap */}
            <div
              className="absolute top-0 left-0 right-0 h-24 md:h-28 origin-top transition-all duration-700 ease-out"
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(180deg, #e8dcc8 0%, #f0e8dc 50%, #faf6f0 100%)",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transform: flapOpen
                  ? "rotateX(-180deg) translateZ(10px)"
                  : "rotateX(0deg)",
                boxShadow: flapOpen
                  ? "0 -4px 12px rgba(0,0,0,0.15)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
                filter: flapOpen ? "brightness(1.05)" : "brightness(1)",
                zIndex: flapOpen ? 15 : 5,
              }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(26,54,93,0.15) 50%, transparent 100%)",
                }}
              />
            </div>

            {/* Address lines */}
            <div className="absolute bottom-8 left-8 right-8 space-y-2 opacity-30">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />
              <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent w-4/5 ml-4" />
              <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent w-3/5 ml-8" />
            </div>

            {/* Tap hint */}
            {!isOpen && (
              <div className="absolute bottom-2 md:bottom-3 left-0 right-0 flex justify-center">
                <p
                  className="text-[10px] md:text-xs font-serif italic tracking-wide"
                  style={{ color: "#704d3b", opacity: 0.75 }}
                >
                  Tap to open
                </p>
              </div>
            )}
          </div>

          {/* Letter that slides up */}
          <div
            className="absolute inset-0 rounded-2xl shadow-2xl p-5 overflow-hidden pointer-events-none"
            style={{
              background: "linear-gradient(180deg, #f5f0e8 0%, #faf7f2 100%)",
              transform: letterSlideUp
                ? "translateY(-120px)"
                : "translateY(0)",
              transition:
                "transform 0.7s ease-out, opacity 0.7s ease-out",
              opacity: letterSlideUp ? 1 : 0,
              zIndex: 10,
            }}
          >
            <div
              className="h-full overflow-y-auto pr-1 transition-opacity duration-700 font-work-sans"
              style={{
                opacity: showContent ? 1 : 0,
                transitionDelay: showContent ? "200ms" : "0ms",
              }}
            >
              <p className="text-xs md:text-sm text-[#704d3b] leading-relaxed">
                {bio}
              </p>
            </div>
          </div>
        </div>

        {/* Name & role below envelope */}
        <div className="text-center mt-4">
          <h3
            className="text-2xl md:text-4xl text-white"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {name}
          </h3>
          <p
            className="text-sm md:text-base text-white"
            style={{ fontFamily: "Avenir, sans-serif" }}
          >
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Compact envelope for mobile (side-by-side) ────────────────────────────
const FounderLetterCompact = ({ name, role, bio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterSlideUp, setLetterSlideUp] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFlapOpen(true);
      const s = setTimeout(() => setLetterSlideUp(true), 700);
      const c = setTimeout(() => setShowContent(true), 1200);
      return () => { clearTimeout(s); clearTimeout(c); };
    } else {
      setFlapOpen(false);
      setLetterSlideUp(false);
      setShowContent(false);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center w-full max-w-[260px]" style={{ position: "relative", zIndex: isOpen ? 50 : 10 }}>
      <div
        className="relative w-full h-44 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        style={{ perspective: "800px" }}
      >
        {/* Base */}
        <div
          className="absolute inset-0 rounded-lg overflow-visible transition-all duration-300"
          style={{
            transformStyle: "preserve-3d",
            background: "linear-gradient(145deg, #faf6f0 0%, #f0e8dc 50%, #e8dcc8 100%)",
            boxShadow: "0 2px 8px rgba(26,54,93,0.12), inset 0 1px 2px rgba(255,255,255,0.5)",
          }}
        >
          {/* Flap */}
          <div
            className="absolute top-0 left-0 right-0 h-20 origin-top transition-all duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
              background: "linear-gradient(180deg, #e8dcc8 0%, #f0e8dc 50%, #faf6f0 100%)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transform: flapOpen ? "rotateX(-180deg) translateZ(8px)" : "rotateX(0deg)",
              zIndex: flapOpen ? 15 : 5,
            }}
          />
          {/* Address lines */}
          <div className="absolute bottom-4 left-4 right-4 space-y-1 opacity-30">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />
            <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent w-4/5 ml-2" />
          </div>
          {!isOpen && (
            <div className="absolute bottom-1 left-0 right-0 flex justify-center">
              <p className="text-[9px] font-serif italic" style={{ color: "#704d3b", opacity: 0.75 }}>
                Tap to open
              </p>
            </div>
          )}
        </div>
        {/* Letter slide */}
        <div
          className="absolute inset-0 rounded-xl shadow-xl p-3 overflow-hidden pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #f5f0e8 0%, #faf7f2 100%)",
            transform: letterSlideUp ? "translateY(-110px)" : "translateY(0)",
            transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
            opacity: letterSlideUp ? 1 : 0,
            zIndex: 10,
          }}
        >
          <div
            className="h-full overflow-y-auto transition-opacity duration-700"
            style={{ opacity: showContent ? 1 : 0, transitionDelay: showContent ? "200ms" : "0ms" }}
          >
            <p className="text-xs text-[#704d3b] leading-relaxed">{bio}</p>
          </div>
        </div>
      </div>
      {/* Name & role */}
      <div className="text-center mt-2">
        <h3 className="text-xl text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>{name}</h3>
        <p className="text-sm text-white" style={{ fontFamily: "Avenir, sans-serif" }}>{role}</p>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const TheDuoSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const founders = [
    {
      name: "Gurman Kaur",
      role: "Writer & Filmmaker",
      bio: "Gurman Kaur is a multidisciplinary writer and filmmaker working across artist documentaries, research, and scripting. Her practice centres on shaping ideas into structured, compelling visual narratives. She focuses on culturally rooted stories that are emotionally precise and thoughtfully made.",
    },
    {
      name: "Mukul Kapoor",
      role: "Writer & Filmmaker",
      bio: "Mukul Kapoor is an award-winning independent film director and writer working across documentary, art spaces and narrative cinema. His work is grounded in research and long-term, on-ground engagement, often involving extended documentation across locations. He focuses predominantly on art, culture, and contemporary practices through observational filmmaking and clear storytelling.",
    },
  ];

  return (
    <>
      {/* ── Shell: fixed height only on desktop; mobile grows to fit ── */}
      <div
        ref={sectionRef}
        className="relative w-full min-h-[75vh] md:h-screen md:overflow-hidden"
      >
        {/* Background image */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/1-5.webp"
          alt="Background"
        />

        {/* Decorative blurs */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center px-4 py-10 md:h-full md:justify-center md:-mt-12">

          {/* ── MOBILE layout: envelope1 → header → image → envelope2 ── */}
          <div className="flex flex-col items-center gap-5 w-full md:hidden">
            <FounderLetterCompact {...founders[0]} />

            {/* Header */}
            <div
              className="text-center"
              style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s",
              }}
            >
              <div className="text-4xl text-white uppercase" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                THE DUO
              </div>
              <div className="text-xl text-white mt-1" style={{ fontFamily: "Avenir, sans-serif" }}>
                Two People. One Practice.
              </div>
            </div>

            {/* Center image */}
            <div className="relative z-20">
              <div className="w-36 h-48 overflow-hidden rounded-lg shadow-xl">
                <img
                  src="/assets/the_duo_Center.webp"
                  alt="The Duo"
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "auto" }}
                />
              </div>
            </div>

            <FounderLetterCompact {...founders[1]} />
          </div>

          {/* ── DESKTOP layout: unchanged ── */}
          <div className="hidden md:flex md:flex-col md:items-center w-full">
            {/* Header */}
            <div
              className="text-center mb-14"
              style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s",
              }}
            >
              <div className="text-6xl lg:text-7xl text-white uppercase" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                THE DUO
              </div>
              <div className="text-2xl lg:text-3xl text-white mt-2" style={{ fontFamily: "Avenir, sans-serif" }}>
                Two People. One Practice.
              </div>
            </div>

            {/* Three-column row */}
            <div className="flex flex-row items-center justify-center gap-12 lg:gap-16">
              <FounderLetter {...founders[0]} />

              <div className="relative z-20 group">
                <div className="w-60 h-[22rem] overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-105">
                  <img
                    src="/assets/the_duo_Center.webp"
                    alt="The Duo"
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "auto" }}
                  />
                </div>
              </div>

              <FounderLetter {...founders[1]} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default TheDuoSection;