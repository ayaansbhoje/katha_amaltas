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
  '/assets/hero_img1.webp',
  '/assets/hero_img2.webp',
  '/assets/hero_img3.webp',
  '/assets/hero_img4.webp',
];

// Service section images from ServiceSection
const serviceImages = [
  '/assets/service_1.webp',
  '/assets/service_2.webp',
  '/assets/service_3.webp',
  '/assets/service_4.webp',
  '/assets/service_5.webp',
  '/assets/service_6.webp',
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

    const cleanup = () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
    };

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
        cleanup();
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
      cleanup();
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
  const totalAssets = projectVideos.length + heroImages.length + serviceImages.length;

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
            .then(() => updateProgress())
            .catch(() => updateProgress())
        );

        // Preload hero images
        const heroImagePromises = heroImages.map((image) =>
          preloadImage(image)
            .then(() => updateProgress())
            .catch(() => updateProgress())
        );

        // Preload service section images
        const serviceImagePromises = serviceImages.map((image) =>
          preloadImage(image)
            .then(() => updateProgress())
            .catch(() => updateProgress())
        );

        await Promise.all([
          ...videoPromises,
          ...heroImagePromises,
          ...serviceImagePromises,
        ]);
      } catch (error) {
        console.warn('Some assets failed to preload:', error);
      }
    };

    preloadAllAssets();
  }, [totalAssets]);

  const handleLogoLoad = () => {
    setLogoImageLoaded(true);
  };

  // If logo fails or stalls, don't block the preloader forever
  const handleLogoError = () => {
    console.warn('Logo failed to load, continuing anyway');
    setLogoImageLoaded(true);
  };

  useEffect(() => {
    // Safety timeout in case logo onLoad never fires
    const logoTimeout = setTimeout(() => {
      setLogoImageLoaded(true);
    }, 5000);
    return () => clearTimeout(logoTimeout);
  }, []);

  // Wait for both logo image to load AND all assets to be loaded
  useEffect(() => {
    if (logoImageLoaded && assetsLoaded >= totalAssets) {
      const timer = setTimeout(() => {
        setSlideUp(true);
      }, 300);
      return () => clearTimeout(timer);
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
          src="/assets/katha_main_logo.webp"
          alt="Logo"
          onLoad={handleLogoLoad}
          onError={handleLogoError}
          className="h-24 sm:h-28 md:h-36 lg:h-46 w-auto object-contain"
        />

        {/* Loading Bar */}
        <div className="absolute bottom-32 sm:bottom-36 md:bottom-20 lg:bottom-16 left-1/2 transform -translate-x-1/2 w-64 md:w-80">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white text-xs mt-2 text-center" style={{ fontFamily: 'Avenir, sans-serif' }}>
            Curating our gallery just for you
          </p>
        </div>
      </div>
    </div>
  );
}