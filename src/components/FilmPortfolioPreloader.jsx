import React, { useState, useEffect } from 'react';

// Asset loading utility
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const loadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.onloadedmetadata = () => resolve(video);
    video.onerror = reject;
    video.src = src;
  });
};

// Critical assets to preload
const criticalAssets = {
  // FilmStudioHero images
  heroImages: [
    '/assets/hero_img1.png',
    '/assets/hero_img.jpg',
    '/assets/hero_img3.png',
    '/assets/hero_img4.png',
    'assets/DISCOVERY_SECTION.gif'
  ],
  // ProjectSection videos
  projectVideos: [
    'assets/French_Embassy_Teaser.mov',
    '/assets/ANKURAN_TRAILER.mov',
    '/assets/CHEMOULD_PRESCOTT_ROAD_TEASER.mov',
    '/assets/ANANT_FINAL_TESER.mov',
    '/assets/JANGARH_FINAL_TESER.mov',
    'assets/V9.mp4'
  ]
};

export default function FilmPortfolioPreloader({ onComplete }) {
  const [splitScreen, setSplitScreen] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

  // Preload all critical assets
  useEffect(() => {
    const preloadAssets = async () => {
      const totalAssets = criticalAssets.heroImages.length + criticalAssets.projectVideos.length;
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / totalAssets) * 100);
      };

      try {
        // Load images
        const imagePromises = criticalAssets.heroImages.map((src) =>
          loadImage(src)
            .then(() => updateProgress())
            .catch(() => updateProgress()) // Continue even if some fail
        );

        // Load videos
        const videoPromises = criticalAssets.projectVideos.map((src) =>
          loadVideo(src)
            .then(() => updateProgress())
            .catch(() => updateProgress()) // Continue even if some fail
        );

        // Wait for all assets to load (or fail gracefully)
        await Promise.all([...imagePromises, ...videoPromises]);
        setAssetsLoaded(true);
      } catch (error) {
        console.warn('Some assets failed to load:', error);
        setAssetsLoaded(true); // Continue anyway
      }
    };

    preloadAssets();
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  // Trigger split when both video ends and assets are loaded
  useEffect(() => {
    if (videoEnded && assetsLoaded && !splitScreen) {
      setSplitScreen(true);
    }
  }, [videoEnded, assetsLoaded, splitScreen]);

  useEffect(() => {
    // After split animation completes (1000ms), call onComplete callback
    if (splitScreen) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1000); // Match the transition duration

      return () => clearTimeout(timer);
    }
  }, [splitScreen, onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Top Half with Video */}
      <div
        style={{ backgroundColor: '#770e11' }}
        className={`absolute top-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-end justify-center pb-2 ${
          splitScreen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <video 
          src="/assets/AMALTAS LOGO ANIMATION YELLOW (1).webm" 
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="h-36 md:h-46 w-auto object-contain"
        />
        {/* Loading progress indicator */}
        {!assetsLoaded && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* Bottom Half with Line */}
      <div
        style={{ backgroundColor: '#770e11' }}
        className={`absolute bottom-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out flex items-start justify-center pt-2 ${
          splitScreen ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-32 h-px bg-white"></div>
      </div>
    </div>
  );
}
