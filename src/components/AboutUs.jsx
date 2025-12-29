import { useState, useEffect, useRef } from "react";

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
  const isEnvelopeOnly = layout === "envelope-only";

  // Founder image element
  const imageBlock = !isEnvelopeOnly && (
    <div className="relative group">
      <div className="w-48 h-60 md:w-64 md:h-80 overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-105">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-2xl md:text-4xl text-[#704d3b]" style={{ fontFamily: 'Avenir, sans-serif' }}>{name}</h3>
        <p className="text-lg md:text-xl text-[#704d3b] font-work-sans">{role}</p>
      </div>
    </div>
  );

  // Envelope / letter element
  const envelopeBlock = (
    <div 
      className="relative w-64 md:w-80 h-48 md:h-56 cursor-pointer group"
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
          <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:rotate-6 drop-shadow-md">
            <img
              src="/assets/waxed_stamp.png"
              alt="Wax seal"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Envelope flap with better shading */}
        <div
          className="absolute top-0 left-0 right-0 h-24 md:h-28 origin-top transition-all duration-700 ease-out"
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
          <div className="absolute bottom-2 md:bottom-3 left-0 right-0 flex justify-center">
            <p
              className="text-[10px] md:text-xs font-serif italic tracking-wide"
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
          className="h-full overflow-y-auto pr-1 transition-opacity duration-700 font-work-sans"
          style={{ 
            opacity: showContent ? 1 : 0,
            transitionDelay: showContent ? '200ms' : '0ms'
          }}
        >
          <p className="text-xs md:text-sm text-[#704d3b] leading-relaxed mb-3">{bio}</p>
          <div className="border-l-2 border-amber-700/30 pl-3 py-1 bg-amber-700/5 rounded-r">
            <p className="text-sm md:text-base text-[#704d3b] italic font-serif">"{quote}"</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center opacity-0 translate-y-12 animate-fadeInUp">
      {isEnvelopeOnly ? (
        envelopeBlock
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {layout === "envelope-image" && envelopeBlock}
          {imageBlock}
          {layout === "image-envelope" && envelopeBlock}
        </div>
      )}
    </div>
  );
};

// Main About Us Component
const AboutUs = () => {
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
      name: "Gurman Kaur",
      role: "Designer",
      bio: "Gurman is a passionate designer with an eye for detail and a love for creating beautiful, functional designs. With over 5 years of experience in UI/UX design, she brings creativity and innovation to every project.",
      quote: "Never let the truth get in the way of a good story.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "Mukul Kapoor",
      role: "Designer",
      bio: "Mukul is a creative force with a unique perspective on design. His background in fine arts combined with digital expertise allows him to craft experiences that are both visually stunning and deeply meaningful.",
      quote: "Design is not just what it looks like, design is how it works.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative overflow-hidden w-screen"
      style={{
        backgroundImage: "url('/assets/aboutus_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full relative z-10">
        {/* Header without typewriter effect */}
        <div className="relative text-center mb-12 md:mb-16">
          <div
            className="relative z-10 cursor-default px-8 py-4"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s'
            }}
          >
            <div 
              className="text-4xl md:text-6xl lg:text-7xl text-white uppercase"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              THE DUO
            </div>
            <div 
              className="text-xl md:text-2xl lg:text-3xl text-white mt-2"
              style={{ fontFamily: 'Avenir, sans-serif' }}
            >
              Two People. One Practice.
            </div>
          </div>
        </div>

        {/* Founders section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Envelope */}
          <FounderLetter
            key={founders[0].name}
            {...founders[0]}
            layout="envelope-only"
          />
          
          {/* Center Image */}
          <div className="relative group">
            <div className="w-48 h-60 md:w-64 md:h-80 overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-105">
              <img
                src="/assets/g&k.jpg"
                alt="The Duo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right Envelope */}
          <FounderLetter
            key={founders[1].name}
            {...founders[1]}
            layout="envelope-only"
          />
        </div>

        {/* Footer decoration */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex items-center gap-3 md:gap-4">
            <div className="w-8 md:w-12 h-px bg-blue-900/30" />
            <span className="text-lg md:text-2xl text-[#704d3b] font-serif italic">together, we create magic</span>
            <div className="w-8 md:w-12 h-px bg-blue-900/30" />
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