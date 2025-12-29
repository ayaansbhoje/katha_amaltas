import React, { useState, useEffect } from 'react';

// Project videos from ProjectSection
const projectVideos = [
  'assets/French_Embassy_Teaser.mov',
  '/assets/ANKURAN_TRAILER.mov',
  '/assets/CHEMOULD_PRESCOTT_ROAD_TEASER.mov',
  '/assets/ANANT_FINAL_TESER.mov',
  '/assets/JANGARH_FINAL_TESER.mov',
  'assets/V9.mp4'
];

// Preload video function - more aggressive loading
const preloadVideo = (src) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('preload', 'auto');
    
    // Create link element for browser preloading
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
    
    let resolved = false;
    
    // Wait for enough data to be buffered for smooth playback
    const handleCanPlay = () => {
      if (resolved) return;
      
      // Check if we have enough buffered data (at least 3 seconds or 50% of video)
      const buffered = video.buffered;
      let hasEnoughData = false;
      
      if (buffered.length > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        const duration = video.duration || Infinity;
        // Have at least 3 seconds buffered OR 50% of video
        hasEnoughData = bufferedEnd >= 3 || (duration > 0 && bufferedEnd >= duration * 0.5);
      }
      
      if (hasEnoughData || video.readyState >= 4) {
        resolved = true;
        video.removeEventListener('canplaythrough', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('progress', handleProgress);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('error', handleError);
        // Keep video in memory by storing reference
        window.__preloadedVideos = window.__preloadedVideos || {};
        window.__preloadedVideos[src] = video;
        resolve(video);
      }
    };
    
    const handleLoadedData = () => {
      // If canplaythrough doesn't fire, use loadeddata as fallback
      if (!resolved && video.readyState >= 3) {
        setTimeout(() => {
          if (!resolved) {
            handleCanPlay();
          }
        }, 500);
      }
    };
    
    const handleProgress = () => {
      // Check progress and ensure video keeps loading
      if (!resolved) {
        const buffered = video.buffered;
        if (buffered.length > 0) {
          const bufferedEnd = buffered.end(buffered.length - 1);
          const duration = video.duration || Infinity;
          // If we have at least 3 seconds or 50% buffered, consider ready
          if (bufferedEnd >= 3 || (duration > 0 && bufferedEnd >= duration * 0.5)) {
            handleCanPlay();
          }
        }
      }
    };
    
    const handleTimeUpdate = () => {
      // Ensure video continues loading while playing
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
      resolve(null); // Continue even if video fails
    };
    
    video.addEventListener('canplaythrough', handleCanPlay, { once: true });
    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    video.addEventListener('progress', handleProgress);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError, { once: true });
    video.src = src;
    video.load();
    
    // Force play to trigger loading and buffering (will be muted)
    const playPromise = video.play().catch(() => {
      // Ignore play errors, just want to trigger loading
    });
    
    // Ensure video continues loading
    if (playPromise) {
      playPromise.then(() => {
        // Video is playing, ensure it keeps buffering
        if (!resolved) {
          const checkBuffer = setInterval(() => {
            if (resolved) {
              clearInterval(checkBuffer);
              return;
            }
            handleProgress();
            // If we have enough data, stop checking
            const buffered = video.buffered;
            if (buffered.length > 0) {
              const bufferedEnd = buffered.end(buffered.length - 1);
              const duration = video.duration || Infinity;
              if (bufferedEnd >= 3 || (duration > 0 && bufferedEnd >= duration * 0.5)) {
                clearInterval(checkBuffer);
              }
            }
          }, 200);
          
          // Cleanup after 15 seconds
          setTimeout(() => {
            clearInterval(checkBuffer);
            if (!resolved) {
              handleCanPlay();
            }
          }, 15000);
        }
      });
    }
    
    // Timeout fallback - don't wait forever
    setTimeout(() => {
      if (!resolved) {
        handleCanPlay();
      }
    }, 12000); // 12 second timeout
  });
};

export default function FilmPortfolioPreloader({ onComplete }) {
  const [splitScreen, setSplitScreen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [logoVideoEnded, setLogoVideoEnded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(0);
  const totalVideos = projectVideos.length;

  // Preload all project videos in background with progress tracking
  useEffect(() => {
    const preloadAllVideos = async () => {
      let loadedCount = 0;
      
      const updateProgress = () => {
        loadedCount++;
        setVideosLoaded(loadedCount);
        const progress = (loadedCount / totalVideos) * 100;
        setLoadingProgress(progress);
      };

      try {
        // Start preloading all videos in parallel
        const preloadPromises = projectVideos.map((video, index) => 
          preloadVideo(video)
            .then(() => {
              updateProgress();
            })
            .catch(() => {
              updateProgress(); // Count as loaded even if failed
            })
        );
        
        await Promise.all(preloadPromises);
      } catch (error) {
        console.warn('Some videos failed to preload:', error);
      }
    };

    preloadAllVideos();
  }, []);

  const handleVideoEnd = () => {
    setLogoVideoEnded(true);
  };

  // Wait for both logo video to end AND all videos to be loaded
  useEffect(() => {
    if (logoVideoEnded && videosLoaded >= totalVideos) {
      // Small delay to ensure videos are fully ready
      setTimeout(() => {
        setSplitScreen(true);
      }, 300);
    }
  }, [logoVideoEnded, videosLoaded, totalVideos]);

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
        
        {/* Loading Bar */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 md:w-80">
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white text-xs mt-2 text-center" style={{ fontFamily: 'Avenir, sans-serif' }}>
            Loading videos... {Math.round(loadingProgress)}%
          </p>
        </div>
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
