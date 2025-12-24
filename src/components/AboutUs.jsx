import { useState, useEffect, useRef } from "react";

// Typewriter Text Component
const TypewriterText = ({ text, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={`inline-block ${className}`}>
      {displayedText}
      {showCursor && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// Doodle Components
const CameraDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-400"
    style={{
      ...style,
      transform: isVisible ? 'scale(1)' : 'scale(0)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <rect x="2" y="6" width="20" height="14" rx="2" fill="#1a365d" />
    <circle cx="12" cy="13" r="4" fill="#f5f0e8" />
    <circle cx="12" cy="13" r="2" fill="#1a365d" />
    <rect x="8" y="3" width="8" height="3" rx="1" fill="#1a365d" />
  </svg>
);

const FilmReelDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-500"
    style={{
      ...style,
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <circle cx="12" cy="12" r="10" fill="#d4a574" />
    <circle cx="12" cy="12" r="3" fill="#f5f0e8" />
    <circle cx="12" cy="5" r="1.5" fill="#f5f0e8" />
    <circle cx="12" cy="19" r="1.5" fill="#f5f0e8" />
    <circle cx="5" cy="12" r="1.5" fill="#f5f0e8" />
    <circle cx="19" cy="12" r="1.5" fill="#f5f0e8" />
  </svg>
);

const PaletteDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-400"
    style={{
      ...style,
      transform: isVisible ? 'scale(1)' : 'scale(0)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.15 6.84 9.49.35.12.66-.22.66-.57 0-.35-.01-1.51-.01-2.73 0 0-2.68.57-3.24-1.03 0 0-.43-1.11-1.06-1.4 0 0-.87-.59.07-.58.94.01 1.61.97 1.61.97.85 1.46 2.23 1.04 2.77.79.09-.62.34-1.04.61-1.28-2.13-.24-4.37-1.07-4.37-4.75 0-1.05.37-1.91 1-2.58-.1-.24-.43-1.22.1-2.54 0 0 .8-.26 2.63.99a9.14 9.14 0 014.78 0c1.83-1.25 2.63-.99 2.63-.99.53 1.32.2 2.3.1 2.54.62.67 1 1.53 1 2.58 0 3.69-2.25 4.51-4.39 4.74.35.3.66.89.66 1.8 0 1.3-.01 2.35-.01 2.67 0 .35.31.69.66.57C19.13 20.15 22 16.41 22 12c0-5.52-4.48-10-10-10z"
      fill="#c4704f"
    />
    <circle cx="8" cy="10" r="1.5" fill="#e8a5a5" />
    <circle cx="11" cy="7" r="1.5" fill="#d4a574" />
    <circle cx="15" cy="9" r="1.5" fill="#1a365d" />
  </svg>
);

const BrushDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-400"
    style={{
      ...style,
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(45deg)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <path
      d="M20 4L14 10M14 10L12 12M12 12L7 17C5.5 18.5 4 19 3 20C4 19 4.5 17.5 6 16L11 11M11 11L9 9M9 9L3 3"
      stroke="#1a365d"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M14 10L20 4" stroke="#c4704f" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const StarDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-350"
    style={{
      ...style,
      transform: isVisible ? 'scale(1)' : 'scale(0)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <path
      d="M12 2L14.09 8.26L21 9.27L16.18 13.14L17.18 20.02L12 16.77L6.82 20.02L7.82 13.14L3 9.27L9.91 8.26L12 2Z"
      fill="#d4a574"
    />
  </svg>
);

// Pencil doodle
const PencilDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-400"
    style={{
      ...style,
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-30deg)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <path d="M21 3L18 6L15 3L18 0L21 3Z" fill="#c4704f" />
    <path d="M18 6L6 18L3 21L6 18L18 6Z" fill="#d4a574" />
    <path d="M3 21L4 17L6 18L3 21Z" fill="#1a365d" />
  </svg>
);

// Clapperboard doodle
const ClapboardDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-450"
    style={{
      ...style,
      transform: isVisible ? 'scale(1)' : 'scale(0)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <rect x="3" y="8" width="18" height="13" rx="2" fill="#1a365d" />
    <path d="M3 8L7 3H17L21 8H3Z" fill="#d4a574" />
    <line x1="5" y1="8" x2="8" y2="3" stroke="#1a365d" strokeWidth="1.5" />
    <line x1="10" y1="8" x2="13" y2="3" stroke="#1a365d" strokeWidth="1.5" />
    <line x1="15" y1="8" x2="18" y2="3" stroke="#1a365d" strokeWidth="1.5" />
  </svg>
);

// Aperture doodle
const ApertureDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-500"
    style={{
      ...style,
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <circle cx="12" cy="12" r="10" stroke="#1a365d" strokeWidth="2" fill="none" />
    <path d="M12 2L14 8L12 12L10 8Z" fill="#e8a5a5" />
    <path d="M22 12L16 14L12 12L16 10Z" fill="#e8a5a5" />
    <path d="M12 22L10 16L12 12L14 16Z" fill="#e8a5a5" />
    <path d="M2 12L8 10L12 12L8 14Z" fill="#e8a5a5" />
  </svg>
);

// Heart doodle
const HeartDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-400"
    style={{
      ...style,
      transform: isVisible ? 'scale(1)' : 'scale(0)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e8a5a5" />
  </svg>
);

// Sparkle doodle
const SparkleDoodle = ({ isVisible, delay = 0, style }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute transition-all duration-350"
    style={{
      ...style,
      transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(45deg)',
      opacity: isVisible ? 1 : 0,
      transitionDelay: `${delay}ms`
    }}
  >
    <path d="M12 2L13 9L12 12L11 9L12 2Z" fill="#d4a574" />
    <path d="M12 22L11 15L12 12L13 15L12 22Z" fill="#d4a574" />
    <path d="M2 12L9 11L12 12L9 13L2 12Z" fill="#d4a574" />
    <path d="M22 12L15 13L12 12L15 11L22 12Z" fill="#d4a574" />
  </svg>
);

// Floating Doodles Component
const FloatingDoodles = ({ isHovered }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Top row - evenly spread across the top */}
      <CameraDoodle isVisible={isHovered} delay={0} style={{ top: '10px', left: '12%' }} />
      <SparkleDoodle isVisible={isHovered} delay={40} style={{ top: '8px', left: '22%' }} />
      <StarDoodle isVisible={isHovered} delay={80} style={{ top: '12px', left: '32%' }} />
      <HeartDoodle isVisible={isHovered} delay={120} style={{ top: '6px', left: '42%' }} />
      <PaletteDoodle isVisible={isHovered} delay={50} style={{ top: '10px', left: '52%' }} />
      <ApertureDoodle isVisible={isHovered} delay={90} style={{ top: '8px', left: '62%' }} />
      <FilmReelDoodle isVisible={isHovered} delay={100} style={{ top: '12px', left: '72%' }} />
      <PencilDoodle isVisible={isHovered} delay={60} style={{ top: '10px', left: '82%' }} />
      
      {/* Upper-middle row */}
      <BrushDoodle isVisible={isHovered} delay={110} style={{ top: '28%', left: '8%' }} />
      <ClapboardDoodle isVisible={isHovered} delay={130} style={{ top: '28%', left: '20%' }} />
      <StarDoodle isVisible={isHovered} delay={150} style={{ top: '30%', left: '35%' }} />
      <SparkleDoodle isVisible={isHovered} delay={140} style={{ top: '28%', left: '50%' }} />
      <FilmReelDoodle isVisible={isHovered} delay={160} style={{ top: '30%', left: '65%' }} />
      <HeartDoodle isVisible={isHovered} delay={145} style={{ top: '28%', left: '80%' }} />
      <CameraDoodle isVisible={isHovered} delay={155} style={{ top: '28%', left: '92%' }} />
      
      {/* Middle row - left and right sides */}
      <ApertureDoodle isVisible={isHovered} delay={170} style={{ top: '48%', left: '6%' }} />
      <StarDoodle isVisible={isHovered} delay={180} style={{ top: '50%', left: '16%' }} />
      <PencilDoodle isVisible={isHovered} delay={190} style={{ top: '48%', left: '26%' }} />
      
      <ClapboardDoodle isVisible={isHovered} delay={185} style={{ top: '48%', right: '6%' }} />
      <SparkleDoodle isVisible={isHovered} delay={195} style={{ top: '50%', right: '16%' }} />
      <BrushDoodle isVisible={isHovered} delay={175} style={{ top: '48%', right: '26%' }} />
      
      {/* Lower-middle row */}
      <FilmReelDoodle isVisible={isHovered} delay={200} style={{ top: '68%', left: '10%' }} />
      <HeartDoodle isVisible={isHovered} delay={210} style={{ top: '70%', left: '24%' }} />
      <StarDoodle isVisible={isHovered} delay={220} style={{ top: '68%', left: '38%' }} />
      <CameraDoodle isVisible={isHovered} delay={215} style={{ top: '70%', left: '52%' }} />
      <ApertureDoodle isVisible={isHovered} delay={225} style={{ top: '68%', left: '66%' }} />
      <PaletteDoodle isVisible={isHovered} delay={205} style={{ top: '70%', left: '80%' }} />
      <SparkleDoodle isVisible={isHovered} delay={230} style={{ top: '68%', left: '90%' }} />
      
      {/* Bottom row - evenly spread across the bottom */}
      <PencilDoodle isVisible={isHovered} delay={240} style={{ bottom: '10px', left: '14%' }} />
      <StarDoodle isVisible={isHovered} delay={250} style={{ bottom: '8px', left: '24%' }} />
      <BrushDoodle isVisible={isHovered} delay={260} style={{ bottom: '12px', left: '34%' }} />
      <ClapboardDoodle isVisible={isHovered} delay={270} style={{ bottom: '10px', left: '44%' }} />
      <PaletteDoodle isVisible={isHovered} delay={245} style={{ bottom: '8px', left: '54%' }} />
      <SparkleDoodle isVisible={isHovered} delay={255} style={{ bottom: '12px', left: '64%' }} />
      <FilmReelDoodle isVisible={isHovered} delay={265} style={{ bottom: '10px', left: '74%' }} />
      <CameraDoodle isVisible={isHovered} delay={275} style={{ bottom: '8px', left: '84%' }} />
    </div>
  );
};

// Founder Letter Component
// layout: "image-envelope" | "envelope-image"
const FounderLetter = ({ name, role, bio, quote, imageUrl, layout = "image-envelope" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterSlideUp, setLetterSlideUp] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Step 1: Open the flap first
      setFlapOpen(true);
      
      // Step 2: After flap opens, slide the letter up
      const slideTimer = setTimeout(() => {
        setLetterSlideUp(true);
      }, 700); // Wait for flap animation to complete
      
      // Step 3: Show content after letter slides up
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1200);
      
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

  // Decide ordering based on layout
  const isEnvelopeFirst = layout === "envelope-image";

  // Founder image element
  const imageBlock = (
    <div className="relative group">
      <div className="w-56 h-72 md:w-64 md:h-80 overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-105">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-3xl md:text-4xl text-[#704d3b] font-arapey italic">{name}</h3>
        <p className="text-xl text-[#704d3b] font-work-sans">{role}</p>
      </div>
    </div>
  );

  // Envelope / letter element
  const envelopeBlock = (
    <div 
      className="relative w-72 md:w-80 h-56 cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
      style={{ perspective: '1200px' }}
    >
      {/* Envelope base */}
      <div
        className="absolute inset-0 rounded-lg overflow-visible transition-all duration-300 group-hover:scale-[1.02]"
        style={{ 
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #faf6f0 0%, #f0e8dc 50%, #e8dcc8 100%)",
          boxShadow: `
            0 4px 6px -1px rgba(26, 54, 93, 0.1),
            0 2px 4px -1px rgba(26, 54, 93, 0.06),
            inset 0 1px 2px rgba(255, 255, 255, 0.5),
            inset 0 -1px 2px rgba(0, 0, 0, 0.05)
          `
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26, 54, 93, 0.03) 2px, rgba(26, 54, 93, 0.03) 3px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(26, 54, 93, 0.03) 2px, rgba(26, 54, 93, 0.03) 3px)
            `
          }}
        />
        
        {/* Aged paper stains */}
        <div className="absolute top-4 right-6 w-12 h-12 rounded-full bg-amber-900/5 blur-md" />
        <div className="absolute bottom-8 left-8 w-16 h-10 rounded-full bg-amber-900/5 blur-lg" />
        
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-amber-700/20 rounded-tl" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-amber-700/20 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-amber-700/20 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-amber-700/20 rounded-br" />
        
        {/* Wax seal replaced with branded image */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ top: '55%' }}
        >
          <div className="relative w-16 h-16 transition-transform duration-300 group-hover:rotate-6 drop-shadow-md">
            <img
              src="/assets/waxed_stamp.png"
              alt="Wax seal"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Envelope flap with better shading */}
        <div
          className="absolute top-0 left-0 right-0 h-28 origin-top transition-all duration-700 ease-out"
          style={{ 
            transformStyle: "preserve-3d",
            background: "linear-gradient(180deg, #e8dcc8 0%, #f0e8dc 50%, #faf6f0 100%)",
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            transform: flapOpen ? 'rotateX(-180deg) translateZ(10px)' : 'rotateX(0deg)',
            boxShadow: flapOpen ? '0 -4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
            filter: flapOpen ? 'brightness(1.05)' : 'brightness(1)',
            zIndex: flapOpen ? 15 : 5
          }}
        >
          {/* Flap fold line */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(26, 54, 93, 0.15) 50%, transparent 100%)'
            }}
          />
        </div>

        {/* Address lines */}
        <div className="absolute bottom-8 left-8 right-8 space-y-2 opacity-30">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent" />
          <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent w-4/5 ml-4" />
          <div className="h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent w-3/5 ml-8" />
        </div>

        {/* Stamp in corner */}
        {!isOpen && (
          <div 
            className="absolute top-4 right-4 w-12 h-10 border-2 border-amber-700/30 rounded-sm"
            style={{
              background: 'linear-gradient(135deg, #e8dcc8 0%, #d4a574 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)'
            }}
          >
            <div className="absolute inset-1 border border-dashed border-amber-700/20" />
          </div>
        )}

        {/* Click instruction */}
        {!isOpen && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <p
              className="text-xs font-serif italic tracking-wide"
              style={{ color: "#704d3b", opacity: 0.75 }}
            >
              tap to open
            </p>
          </div>
        )}
      </div>

      {/* Letter content - hidden initially, appears after flap opens */}
      <div
        className="absolute inset-0 rounded-2xl shadow-2xl p-5 overflow-hidden pointer-events-none"
        style={{ 
          background: "linear-gradient(180deg, #f5f0e8 0%, #faf7f2 100%)",
          transform: letterSlideUp ? 'translateY(-120px)' : 'translateY(0)',
          transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
          opacity: letterSlideUp ? 1 : 0,
          zIndex: 10
        }}
      >
        {/* Letter header */}
        <div 
          className="flex items-center justify-center gap-2 mb-3 transition-opacity duration-500"
          style={{ 
            opacity: showContent ? 1 : 0,
            transitionDelay: showContent ? '0ms' : '0ms'
          }}
        >
          <div className="w-8 h-px bg-amber-700/50" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L14.09 8.26L21 9.27L16.18 13.14L17.18 20.02L12 16.77L6.82 20.02L7.82 13.14L3 9.27L9.91 8.26L12 2Z" fill="#c4704f" opacity="0.5"/>
          </svg>
          <div className="w-8 h-px bg-amber-700/50" />
        </div>
        
        {/* Letter content */}
        <div 
          className="h-full overflow-y-auto pr-1 transition-opacity duration-700"
          style={{ 
            opacity: showContent ? 1 : 0,
            transitionDelay: showContent ? '200ms' : '0ms'
          }}
        >
          <p className="text-sm text-[#704d3b] leading-relaxed mb-3">{bio}</p>
          <div className="border-l-2 border-amber-700/30 pl-3 py-1 bg-amber-700/5 rounded-r">
            <p className="text-base text-[#704d3b] italic font-serif">"{quote}"</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center opacity-0 translate-y-12 animate-fadeInUp">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {isEnvelopeFirst && envelopeBlock}
        {imageBlock}
        {!isEnvelopeFirst && envelopeBlock}
      </div>
    </div>
  );
};

// Main About Us Component
const AboutUs = () => {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const founders = [
    {
      name: "gurman kaur",
      role: "designer",
      bio: "Gurman is a passionate designer with an eye for detail and a love for creating beautiful, functional designs. With over 5 years of experience in UI/UX design, she brings creativity and innovation to every project.",
      quote: "Never let the truth get in the way of a good story.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "mukul kapoor",
      role: "designer",
      bio: "Mukul is a creative force with a unique perspective on design. His background in fine arts combined with digital expertise allows him to craft experiences that are both visually stunning and deeply meaningful.",
      quote: "Design is not just what it looks like, design is how it works.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 md:py-24 px-4 md:px-8 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/aboutus_background_4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with typewriter effect and doodles */}
        <div
          className="relative text-center mb-20 md:mb-32"
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <FloatingDoodles isHovered={isHeaderHovered} />
          
          <div
            className="text-4xl md:text-6xl lg:text-7xl text-[#704d3b] relative z-10 cursor-default px-8 py-4 font-aboreto"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s'
            }}
          >
            {hasAnimated && (
              <>
                <div>
                  <TypewriterText text="The Duo" delay={300} />
                </div>
                <div>
                  <TypewriterText text="Two People. One Practice." delay={1500} />
                </div>
              </>
            )}
          </div>

          <p
            className="text-lg md:text-xl text-[#704d3b] mt-6 italic"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transition: 'opacity 0.5s 3.5s'
            }}
          >
            hover to see the magic ✨
          </p>
        </div>

        {/* Founders section */}
        <div className="space-y-24 md:space-y-0 md:flex md:items-center md:justify-center md:gap-10 lg:gap-14">
          <FounderLetter
            key={founders[0].name}
            {...founders[0]}
            layout="envelope-image"
          />
          <FounderLetter
            key={founders[1].name}
            {...founders[1]}
            layout="image-envelope"
          />
        </div>

        {/* Footer decoration */}
        <div className="mt-20 md:mt-32 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-px bg-blue-900/30" />
            <span className="text-2xl text-[#704d3b] font-serif italic">together, we create magic</span>
            <div className="w-12 h-px bg-blue-900/30" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(48px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;