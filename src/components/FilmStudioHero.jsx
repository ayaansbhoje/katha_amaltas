import React, { useEffect, useState } from 'react';

const FilmStudioHero = () => {
  const slides = [
    {
      name: 'LISTENING',
      image: '/assets/hero_img1.webp',
      category: 'BEFORE FILMING',
      header: ['We believe', 'stories outlive us.']
    },
    {
      name: 'TRUTH',
      image: 'assets/hero_img2.webp',
      category: 'BEFORE NARRATIVES',
      header: ['We believe', 'artist stories deserve documentaries.']
    },
    {
      name: 'PROCESS',
      image: '/assets/hero_img3.webp',
      category: 'BEFORE POLISH',
      header: ['We believe', 'visual archives are essential to institutions.']
    },
    {
      name: 'RESEARCH',
      image: '/assets/hero_img4.webp',
      category: 'BEFORE FORM',
      header: ['We believe', 'in human stories.']
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Check if images are preloaded and use them, otherwise preload
  useEffect(() => {
    const loadImages = async () => {
      const preloadedImages = window.__preloadedImages || {};
      const allHeroImages = slides.map(s => s.image);
      
      const allPreloaded = allHeroImages.every(img => preloadedImages[img]);
      
      if (allPreloaded) {
        setImagesLoaded(true);
      } else {
        const imagePromises = allHeroImages.map(src => {
          return new Promise((resolve) => {
            if (preloadedImages[src]) {
              resolve();
              return;
            }
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
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

  // Auto-advance every 2 seconds in a continuous loop
  const currentIndexRef = React.useRef(currentIndex);
  const isTransitioningRef = React.useRef(isTransitioning);

  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { isTransitioningRef.current = isTransitioning; }, [isTransitioning]);

  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setInterval(() => {
      if (isTransitioningRef.current) return;
      const next = (currentIndexRef.current + 1) % slides.length;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(next);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }, 2000);
    return () => clearInterval(timer);
  }, [imagesLoaded]);

  const handleSlideChange = (indexOrUpdater) => {
    const nextIndex = typeof indexOrUpdater === 'function'
      ? indexOrUpdater(currentIndex)
      : indexOrUpdater;

    if (nextIndex === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const goToSlide = (index) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

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

          @media (max-width: 767px) {
            .hero-dots {
              bottom: 4rem;
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

          {/* Dynamic Center Header */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div
              className="text-center transition-opacity duration-700"
              style={{ opacity: isTransitioning ? 0 : 0.5 }}
            >
              <p
                className="text-2xl md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {slides[currentIndex].header[0]}
              </p>
              <p
                className="text-2xl md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {slides[currentIndex].header[1]}
              </p>
            </div>
          </div>

          {/* Dot Navigation */}
          <div
            className="hero-dots absolute left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-3"
            style={{ bottom: '8vh' }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: index === currentIndex ? '12px' : '8px',
                  height: index === currentIndex ? '12px' : '8px',
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmStudioHero;