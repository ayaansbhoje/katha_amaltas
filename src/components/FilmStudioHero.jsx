import React, { useEffect, useState } from 'react';

const FilmStudioHero = () => {
  const slides = [
    {
      name: 'LISTENING',
      image: '/assets/hero_img1.png',
      category: 'BEFORE FILMING',
      header: 'OUR STARTING POINT'
    },
    {
      name: 'TRUTH',
      image: '/assets/hero_img.jpg',
      category: 'BEFORE NARRATIVES',
      header: 'OUR APPROACH'
    },
    {
      name: 'PROCESS',
      image: '/assets/hero_img3.png',
      category: 'BEFORE POLISH',
      header: 'HOW WE WORK'
    },
    {
      name: 'RESEARCH',
      image: '/assets/hero_img4.png',
      category: 'BEFORE FORM',
      header: 'GROUNDING '
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Check if images are preloaded and use them, otherwise preload
  useEffect(() => {
    const loadImages = async () => {
      // Check if preloader already loaded the images
      const preloadedImages = window.__preloadedImages || {};
      const allHeroImages = slides.map(s => s.image);
      
      // Check if all images are already preloaded
      const allPreloaded = allHeroImages.every(img => preloadedImages[img]);
      
      if (allPreloaded) {
        // All images already preloaded by preloader
        setImagesLoaded(true);
      } else {
        // Fallback: preload images if not already done
        const imagePromises = allHeroImages.map(src => {
          return new Promise((resolve) => {
            if (preloadedImages[src]) {
              resolve();
              return;
            }
            
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if image fails
            img.src = src;
          });
        });
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      }
    };
    
    loadImages();
  }, []);

  // Preload next slide image when currentIndex changes
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    if (slides[nextIndex]?.image) {
      const preloadedImages = window.__preloadedImages || {};
      if (!preloadedImages[slides[nextIndex].image]) {
        const img = new Image();
        img.src = slides[nextIndex].image;
      }
    }
  }, [currentIndex]);

  const handleSlideChange = (index) => {
    if (index === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  // Show a loading state if images aren't ready yet
  if (!imagesLoaded) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

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
        <div className="relative w-screen h-[80vh] md:h-screen overflow-hidden" style={{ zIndex: 100 }}>
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
          <div className="hero-nav-left absolute top-0 h-full flex flex-col justify-center items-start p-4 md:p-8 space-y-4 md:space-y-6 z-30">
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
          <div className="hero-nav-right absolute top-0 h-full flex flex-col justify-center items-end p-4 md:p-8 space-y-4 md:space-y-6 z-30">
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

          {/* Dynamic Center Header */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <h2 
              className="text-2xl md:text-3xl font-bold text-white transition-opacity duration-700"
              style={{ 
                fontFamily: 'Bebas Neue, sans-serif',
                opacity: isTransitioning ? 0 : 0.5
              }}
            >
              {slides[currentIndex].header}
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="hero-progress absolute left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
            <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>1</span>
            <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-700 ease-out"
                style={{ width: `${((currentIndex) / (slides.length - 1)) * 100}%` }}
              />
            </div>
            <span className="text-white font-semibold text-lg" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>{slides.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmStudioHero;