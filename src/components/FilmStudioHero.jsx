import React, { useEffect, useState } from 'react';

const FilmStudioHero = () => {
  const slides = [
    {
      name: 'LISTENING',
      image: '/assets/hero_sec1.jpg',
      category: 'BEFORE FILMING',
      header: 'OUR WORK BEGINS WITH RELATIONSHIPS'
    },
    {
      name: 'TRUTH',
      image: '/assets/hero_sec2.jpg',
      category: 'BEFORE NARRATIVES',
      header: 'AUTHENTIC STORIES'
    },
    {
      name: 'PROCESS',
      image: '/assets/hero_sec3.jpg',
      category: 'BEFORE POLISH',
      header: 'CREATIVE JOURNEY'
    },
    {
      name: 'RESEARCH',
      image: '/assets/hero_sec4.jpg',
      category: 'BEFORE FORM',
      header: 'DEEP DIVE'
    }
  ];

  const storySections = [
    {
      title: "THE JOURNEY BEGINS",
      paragraph: "Every great story starts with a single step. This is where our adventure unfolds, where dreams take shape and possibilities become reality.",
      images: [
        { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Mountain landscape" },
        { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", alt: "Forest path" }
      ]
    },
    {
      title: "Discovery and Wonder",
      paragraph: "In the moments of exploration, we find ourselves. Each discovery opens new doors, revealing the beauty that lies in the journey itself.",
      images: [
        { src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop", alt: "Ocean waves" }
      ]
    },
    {
      title: "The Final Chapter",
      paragraph: "As we reach the culmination of our story, we reflect on the path taken and the memories created along the way.",
      images: []
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const sectionMultiplier = isMobile ? 1.0 : 1.5;
    const newVisible = new Set(visibleSections);

    storySections.forEach((_, index) => {
      const sectionStart = windowHeight + index * windowHeight * sectionMultiplier;
      if (scrollY > sectionStart - windowHeight * 0.5) {
        newVisible.add(index);
      }
    });

    if (newVisible.size !== visibleSections.size) {
      setVisibleSections(newVisible);
    }
  }, [scrollY, visibleSections, storySections]);

  const handleSlideChange = (index) => {
    if (index === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .story-container {
            min-height: 100vh;
          }
          
          .story-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 600;
            line-height: 1.1;
            color: #8B0000;
          }
          
          .story-word {
            text-shadow: 0 0 80px rgba(217,119,6,0.15);
          }
          
          .story-image {
            box-shadow: 0 25px 50px -12px rgba(10,10,20,0.9), 0 0 100px rgba(245,158,11,0.08);
          }
          
          .story-image-glow {
            background: radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, transparent 70%);
          }

          .hero-logo {
            width: 200px;
            height: auto;
          }

          @media (min-width: 768px) {
            .hero-logo {
              width: 30vw;
              max-width: 500px;
              min-width: 350px;
            }
          }

          .hero-nav-left {
            left: 2vw;
          }

          .hero-nav-right {
            right: 2vw;
          }

          .hero-progress {
            bottom: 8vh;
            width: 25vw;
            min-width: 300px;
            max-width: 400px;
          }

          @media (max-width: 767px) {
            .hero-nav-left {
              left: 0.5rem;
            }
            .hero-nav-right {
              right: 0.5rem;
            }
            .hero-progress {
              bottom: 6.5rem;
              width: 24rem;
            }
          }
        `}
      </style>

      <div>
        {/* Hero Section */}
        <div className="relative w-screen h-[80vh] md:h-screen overflow-hidden">
          {/* Background Image with Fade Transition */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: isTransitioning ? 0 : 1,
              zIndex: 1
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Left Navigation */}
          <div className="hero-nav-left absolute top-0 h-full flex flex-col justify-center items-start p-8 space-y-6 z-30 -translate-y-24 md:translate-y-0">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`text-white text-left transition-all duration-300 hover:scale-105 ${
                  index === currentIndex ? 'font-bold text-sm md:text-lg' : 'font-normal text-xs md:text-base opacity-70'
                }`}
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                • {slide.name}
              </button>
            ))}
          </div>

          {/* Right Categories */}
          <div className="hero-nav-right absolute top-0 h-full flex flex-col justify-center items-end p-8 space-y-6 z-30 -translate-y-24 md:translate-y-0">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`text-white text-right transition-all duration-300 hover:scale-105 ${
                  index === currentIndex ? 'font-bold text-sm md:text-lg' : 'font-normal text-xs md:text-base opacity-70'
                }`}
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {slide.category} •
              </button>
            ))}
          </div>

          {/* Center Logo */}
          <div 
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              marginTop: '20vh',
              zIndex: 30
            }}
          >
            <img 
              src="/assets/Asset 5@4x (1).png" 
              alt="Muks & G Studios Logo" 
              className="hero-logo"
            />
          </div>

          {/* Dynamic Center Header */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <h2 
              className="text-2xl md:text-4xl font-bold text-white transition-opacity duration-700"
              style={{ 
                fontFamily: 'Bebas Neue, sans-serif',
                opacity: isTransitioning ? 0 : 1
              }}
            >
              {slides[currentIndex].header}
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="hero-progress absolute left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
            <span className="text-white font-semibold text-lg">1</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-700 ease-out"
                style={{ width: `${((currentIndex) / (slides.length - 1)) * 100}%` }}
              />
            </div>
            <span className="text-white font-semibold text-lg">{slides.length}</span>
          </div>
        </div>

        {/* Story Section */}
        <div className="story-container relative">
          {/* Background GIF for story section only */}
          <div className="absolute inset-0 z-0">
            <img 
              src="assets/DISCOVERY_SECTION.gif" 
              alt="Story background" 
              className="w-full h-full object-contain"
            />
          </div>
          {storySections.map((section, sectionIndex) => {
            const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
            const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
            const sectionMultiplier = isMobile ? 1.0 : 1.5;
            const sectionHeight = typeof window !== 'undefined' ? window.innerHeight * sectionMultiplier : (isMobile ? 1000 : 1500);
            const heroHeight = typeof window !== 'undefined' ? (isMobile ? window.innerHeight * 0.8 : window.innerHeight) : 1000;
            const sectionStart = heroHeight + sectionIndex * sectionHeight;
            const localScroll = Math.max(0, scrollY - sectionStart);
            const progress = Math.min(1, localScroll / (sectionHeight * 0.8));
            
            let headerParallax = progress * 0.8;
            let blurAmount = Math.min(progress * 12, 12);
            let headerOpacity = Math.max(0, 1 - progress * 1.2);

            const isVisible = visibleSections.has(sectionIndex);
            const isSingleImage = section.images.length === 1;

            let imageStartOffset = isMobile ? 10 : 80;
            if (sectionIndex === 0) {
              imageStartOffset = isMobile ? 5 : 65;
            }

            return (
              <section
                key={sectionIndex}
                className="story-section relative"
                style={{ height: `${sectionHeight}px` }}
              >
                {/* Header Layer */}
                <div
                  className="sticky top-0 flex h-screen items-center justify-center px-4"
                  style={{
                    transform: `translateY(${headerParallax * -100}px) scale(${1 - progress * 0.15})`,
                    filter: `blur(${blurAmount}px)`,
                    opacity: headerOpacity,
                    zIndex: 10,
                  }}
                >
                  <div className="max-w-5xl text-center">
                    <h1 className="story-title">
                      {section.title.split(" ").map((word, wordIndex, arr) => {
                        const wordDelayMs = wordIndex * 120;
                        return (
                          <span
                            key={wordIndex}
                            className="story-word inline-block"
                            style={{
                              display: 'inline-block',
                              opacity: isVisible ? 1 : 0,
                              transform: isVisible ? 'translateY(0px)' : 'translateY(12px)',
                              transition: 'opacity 700ms cubic-bezier(0.22,0.61,0.36,1), transform 700ms cubic-bezier(0.22,0.61,0.36,1)',
                              transitionDelay: `${wordDelayMs}ms`,
                            }}
                          >
                            {word}
                            {wordIndex < arr.length - 1 && '\u00A0'}
                          </span>
                        );
                      })}
                    </h1>
                    <p 
                      className="mt-6 md:mt-8 text-sm md:text-base max-w-3xl mx-auto leading-relaxed px-4"
                      style={{
                        fontFamily: 'Avenir, sans-serif',
                        color: '#8B0000',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0px)' : 'translateY(12px)',
                        transition: 'opacity 700ms cubic-bezier(0.22,0.61,0.36,1), transform 700ms cubic-bezier(0.22,0.61,0.36,1)',
                        transitionDelay: `${section.title.split(" ").length * 120 + 200}ms`,
                      }}
                    >
                      {section.paragraph}
                    </p>
                  </div>
                </div>

                {/* IMAGE LAYER */}
                {section.images.length > 0 && (
                  <div
                    className="sticky top-0 flex h-screen items-center justify-center pointer-events-none"
                    style={{
                      transform: `translateY(${(1 - progress * 1.1) * imageStartOffset + (isMobile ? -40 : 0)}vh)`,
                      opacity: Math.min(1, progress * 2),
                      zIndex: 20,
                    }}
                  >
                    <div className={`flex items-center justify-center gap-1 md:gap-8 px-4 w-full ${isSingleImage ? "max-w-xl md:max-w-4xl" : "max-w-2xl md:max-w-6xl"}`}>
                      {section.images.map((image, imageIndex) => {
                        const imageOffset = isSingleImage ? 0 : (imageIndex === 0 ? -20 : 20);
                        const imageDelay = imageIndex * 0.1;
                        
                        const mobileScale = isMobile ? 0.85 : 1;
                        return (
                          <div
                            key={imageIndex}
                            className={`story-image-wrapper relative ${isSingleImage ? "w-full" : "w-1/2 md:w-1/2"}`}
                            style={{
                              transform: `translateX(${imageOffset * progress}px) translateY(${imageDelay * (1 - progress) * 50}px) scale(${mobileScale})`,
                            }}
                          >
                            <div className="story-image-glow absolute inset-0 scale-110 blur-3xl opacity-40" />
                            <img
                              src={image.src}
                              alt={image.alt || "Story image"}
                              className="story-image relative w-full rounded-xl md:rounded-2xl object-cover shadow-2xl aspect-[4/3]"
                              style={{
                                transform: `scale(${0.85 + progress * 0.15})`,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FilmStudioHero;