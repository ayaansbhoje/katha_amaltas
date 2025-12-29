import React, { useState, useEffect } from 'react';

// Project videos from ProjectSection
const projectVideos = [
  'assets/French_Embassy_Teaser.mov',
  '/assets/ANKURAN_TRAILER.mov',
  '/assets/CHEMOULD_PRESCOTT_ROAD_TEASER.mov',
  '/assets/ANANT_FINAL_TESER.mov',
  '/assets/JANGARH_FINAL_TESER.mov',
  'assets/V9.mp4',
  '/assets/brand_identity2.mov'
];

// Hero section images from FilmStudioHero
const heroImages = [
  '/assets/hero_img1.png',
  '/assets/hero_img.jpg',
  '/assets/hero_img3.png',
  '/assets/hero_img4.png',
  'assets/DISCOVERY_SECTION.gif'
];

// Preload video function
const preloadVideo = (src) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('preload', 'auto');
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
    
    let resolved = false;
    
    const handleCanPlay = () => {
      if (resolved) return;
      
      const buffered = video.buffered;
      let hasEnoughData = false;
      
      if (buffered.length > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        const duration = video.duration || Infinity;
        hasEnoughData = bufferedEnd >= 3 || (duration > 0 && bufferedEnd >= duration * 0.5);
      }
      
      if (hasEnoughData || video.readyState >= 4) {
        resolved = true;
        video.removeEventListener('canplaythrough', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('error', handleError);
        window.__preloadedVideos = window.__preloadedVideos || {};
        window.__preloadedVideos[src] = video;
        resolve(video);
      }
    };
    
    const handleLoadedData = () => {
      if (!resolved && video.readyState >= 3) {
        setTimeout(() => {
          if (!resolved) {
            handleCanPlay();
          }
        }, 500);
      }
    };
    
    const handleProgress = () => {
      if (!resolved) {
        const buffered = video.buffered;
        if (buffered.length > 0) {
          const bufferedEnd = buffered.end(buffered.length - 1);
          const duration = video.duration || Infinity;
          if (bufferedEnd >= 3 || (duration > 0 && bufferedEnd >= duration * 0.5)) {
            handleCanPlay();
          }
        }
      }
    };
    
    const handleTimeUpdate = () => {
      if (!resolved && video.readyState >= 3) {
        handleProgress();
      }
    };
    
    const handleError = () => {
      if (resolved) return;
      resolved = true;
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('error', handleError);
      resolve(null);
    };
    
    video.addEventListener('canplaythrough', handleCanPlay, { once: true });
    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    video.addEventListener('progress', handleProgress);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError, { once: true });
    video.src = src;
    video.load();
    
    const playPromise = video.play().catch(() => {});
    
    if (playPromise) {
      playPromise.then(() => {
        if (!resolved) {
          const checkBuffer = setInterval(() => {
            if (resolved) {
              clearInterval(checkBuffer);
              return;
            }
            handleProgress();
            const buffered = video.buffered;
            if (buffered.length > 0) {
              const bufferedEnd = buffered.end(buffered.length - 1);
              const duration = video.duration || Infinity;
              if (bufferedEnd >= 3 || (duration > 0 && bufferedEnd >= duration * 0.5)) {
                clearInterval(checkBuffer);
              }
            }
          }, 200);
          
          setTimeout(() => {
            clearInterval(checkBuffer);
            if (!resolved) {
              handleCanPlay();
            }
          }, 15000);
        }
      });
    }
    
    setTimeout(() => {
      if (!resolved) {
        handleCanPlay();
      }
    }, 12000);
  });
};

// Preload image function
const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
    
    let resolved = false;
    
    const handleLoad = () => {
      if (resolved) return;
      resolved = true;
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      window.__preloadedImages = window.__preloadedImages || {};
      window.__preloadedImages[src] = img;
      resolve(img);
    };
    
    const handleError = () => {
      if (resolved) return;
      resolved = true;
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      resolve(null);
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;
    
    // Timeout fallback
    setTimeout(() => {
      if (!resolved) {
        handleLoad();
      }
    }, 8000);
  });
};

export default function FilmPortfolioPreloader({ onComplete }) {
  const [slideUp, setSlideUp] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [logoImageLoaded, setLogoImageLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const totalAssets = projectVideos.length + heroImages.length;

  // Preload all videos and images in background with progress tracking
  useEffect(() => {
    const preloadAllAssets = async () => {
      let loadedCount = 0;
      
      const updateProgress = () => {
        loadedCount++;
        setAssetsLoaded(loadedCount);
        const progress = (loadedCount / totalAssets) * 100;
        setLoadingProgress(progress);
      };

      try {
        // Preload videos
        const videoPromises = projectVideos.map((video) => 
          preloadVideo(video)
            .then(() => {
              updateProgress();
            })
            .catch(() => {
              updateProgress();
            })
        );
        
        // Preload hero images
        const imagePromises = heroImages.map((image) => 
          preloadImage(image)
            .then(() => {
              updateProgress();
            })
            .catch(() => {
              updateProgress();
            })
        );
        
        await Promise.all([...videoPromises, ...imagePromises]);
      } catch (error) {
        console.warn('Some assets failed to preload:', error);
      }
    };

    preloadAllAssets();
  }, []);

  const handleImageLoad = () => {
    setLogoImageLoaded(true);
  };

  // Wait for both logo image to load AND all assets to be loaded
  useEffect(() => {
    if (logoImageLoaded && assetsLoaded >= totalAssets) {
      setTimeout(() => {
        setSlideUp(true);
      }, 300);
    }
  }, [logoImageLoaded, assetsLoaded, totalAssets]);

  useEffect(() => {
    if (slideUp) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [slideUp, onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Single Slider */}
      <div
        style={{ backgroundColor: '#770e11' }}
        className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out flex flex-col items-center justify-center ${
          slideUp ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <img 
          src="/assets/Asset 5@4x (1).png" 
          alt="Logo"
          onLoad={handleImageLoad}
          className="h-36 md:h-46 w-auto object-contain"
        />
        
        {/* Loading Bar */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 md:w-80">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white text-xs mt-2 text-center" style={{ fontFamily: 'Avenir, sans-serif' }}>
            curating our gallery just for you
          </p>
        </div>
      </div>
    </div>
  );
}