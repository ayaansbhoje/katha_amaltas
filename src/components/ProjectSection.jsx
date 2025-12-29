import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Project videos - replace with your actual video paths from assets
const projects = [
  {
    id: 1,
    title: "French Embassy in India|Villa Swagatam",
    year: "Promotional documentary",
    description: "A multi-location documentary tracing artistic exchange between French residents and India's cultural ecosystems.",
    video: 'assets/French_Embassy_Teaser.mov',
    youtubeUrl: 'https://youtu.be/IVeaqCk0IE8?si=0TnQmwnpQZMAPo9T',
  },
  {
    id: 2,
    title: "Ankuran",
    year: "Award-winning independent documentary",
    description: "An intimate film on idol-making and devotion. We follow the hands that create gods, and what it means to let them go.",
    video: '/assets/ANKURAN_TRAILER.mov',
    youtubeUrl: '',
  },
  {
    id: 3,
    title: "Chemould Prescott Road|60 Years of Chemould",
    year: "Three-part documentary series",
    description: "A documentary series reflecting on six decades of Chemould's role in shaping Indian contemporary art. We sat with the archive, moving between past and present, memory and practice.",
    video: '/assets/CHEMOULD_PRESCOTT_ROAD_TEASER.mov',
    youtubeUrl: '',
  },
  {
    id: 4,
    title: "Anant Joshi|Raised Eyebrow",
    year: "Exhibition film & documentation | Gallery Chemould",
    description: "An exhibition film shaped by the metaphor of the Blind King Dhritarashtra's raised eyebrow, inner unrest and silent resistance. Our goal was to capture scale & detail simultaneously, allowing questions of power and identity to unfold.",
    video: '/assets/ANANT_FINAL_TESER.mov',
    youtubeUrl: '',
  },
  {
    id: 5,
    title: "Jangarh Singh Shyam|Exhibition Documentation",
    year: "Jangarh Singh Shyam| Exhibition Documentation",
    description: "A film shaped by Jangarh Singh Shyam's visual language. Where myth, nature, and memory come together.",
    video: '/assets/JANGARH_FINAL_TESER.mov',
    youtubeUrl: '',
  },
  
];

// Flying Poster Component
const FlyingPoster = ({ project, index, scrollProgress, isActive, isMobile, activeProject }) => {
  const videoRef = useRef(null);
  const posterSpacing = 55; // vw
  const totalWidth = projects.length * posterSpacing; // vw
  const startPosition = 25; // vw

  // For mobile, calculate position based on active project to center it
  let xPosition;
  if (isMobile) {
    // Center the active project, offset others
    const offset = (index - activeProject) * 100; // 100vw per project
    xPosition = offset;
  } else {
    // Desktop: original scroll-based positioning
    xPosition = startPosition + (index * posterSpacing) - (scrollProgress * totalWidth);
  }

  const distanceFromCenter = Math.abs(xPosition);
  const zPosition = isActive ? 100 : -80 - distanceFromCenter * 1.2;
  const rotateY = isMobile ? 0 : xPosition * 0.06; // No rotation on mobile for cleaner look
  const rotateX = isMobile ? 0 : Math.sin(scrollProgress * Math.PI * 2 + index) * 2;
  const skewY = isMobile ? 0 : xPosition * 0.012;

  const scale = isActive ? 1 : 0.8;
  const opacity = isActive ? 1 : Math.max(0.25, 1 - distanceFromCenter * 0.012);

  // Control video playback based on isActive
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => {
          console.warn('Video play failed:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-auto cursor-pointer"
      animate={{
        x: `calc(-50% + ${xPosition}vw)`,
        y: '-50%',
        z: zPosition,
        rotateY: rotateY,
        rotateX: rotateX,
        skewY: skewY,
        scale: scale,
        opacity: opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 22,
        mass: 0.9,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={() => {
        if (project.youtubeUrl) {
          window.open(project.youtubeUrl, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <div
        className="relative overflow-hidden aspect-[16/9] rounded-sm transition-transform hover:scale-105"
        style={{
          width: isMobile ? 'clamp(280px, 70vw, 500px)' : 'clamp(400px, 80vw, 700px)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isActive
            ? '0 30px 100px -25px rgba(0,0,0,0.9), 0 0 80px rgba(182, 155, 100, 0.15)'
            : '0 20px 60px -15px rgba(0,0,0,0.7)',
        }}
      >
        <motion.div
          animate={{
            scale: 1 + Math.abs(rotateY) * 0.008,
            filter: isActive ? 'brightness(1) saturate(1.1)' : 'brightness(0.55) saturate(0.7)',
          }}
          transition={{ duration: 0.4 }}
        >
          <video
            ref={videoRef}
            src={project.video}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/25 via-transparent to-zinc-900/25" />
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-amber-600/10 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Cinematic Gallery Component (fixed viewport with fade/slide)
const CinematicGallery = () => {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1000);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const videoPreloadRefs = useRef({}); // Store video elements for preloading

  // Keep these in sync with FlyingPoster if you edit spacing
  const posterSpacing = 55; // vw per poster
  const totalWidthVW = projects.length * posterSpacing; // vw total horizontal extent

  useEffect(() => {
    const calculateHeights = () => {
      const vwToPx = (vw) => (vw / 100) * window.innerWidth;
      const horizontalPx = vwToPx(totalWidthVW);

      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;

      // Check if mobile
      setIsMobile(viewportW < 768);

      // little buffer for nicer entry/exit
      const buffer = Math.round(viewportH * 0.06);
      const newContainerHeight = Math.max(viewportH, Math.ceil(viewportH + horizontalPx - viewportW + buffer));

      setContainerHeight(newContainerHeight);
    };

    calculateHeights();
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, [totalWidthVW]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const containerH = containerHeight;

      const scrollStart = Math.max(0, -rect.top);
      const scrollEnd = Math.max(1, containerH - viewportHeight);

      if (scrollStart <= 0) {
        setScrollProgress(0);
        setActiveProject(0);
      } else if (scrollStart >= scrollEnd) {
        setScrollProgress(1);
        setActiveProject(projects.length - 1);
      } else {
        const progress = scrollStart / scrollEnd;
        setScrollProgress(progress);
        // On mobile, don't auto-change active project based on scroll
        if (!isMobile) {
          const projectIndex = Math.min(Math.floor(progress * projects.length), projects.length - 1);
          setActiveProject(Math.max(0, projectIndex));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerHeight, isMobile]);

  // Preload videos in background - doesn't affect visibility
  useEffect(() => {
    const preloadVideo = (index) => {
      if (!projects[index]?.video || videoPreloadRefs.current[index]) return;
      
      // Check if video was preloaded in preloader
      const preloadedVideo = window.__preloadedVideos?.[projects[index].video];
      
      if (preloadedVideo) {
        // Use the preloaded video element
        videoPreloadRefs.current[index] = preloadedVideo;
        // Ensure it's ready to play
        if (preloadedVideo.readyState < 3) {
          preloadedVideo.load();
        }
      } else {
        // Create new video element if not preloaded
        const video = document.createElement('video');
        video.src = projects[index].video;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.load();
        
        // Try to play to force loading
        video.play().catch(() => {
          // Ignore play errors
        });
        
        videoPreloadRefs.current[index] = video;
      }
    };

    // Preload all videos immediately on mount (they should already be cached from preloader)
    projects.forEach((_, index) => {
      preloadVideo(index);
    });
    
    // Also preload adjacent videos when active project changes
    const prevIndex = activeProject > 0 ? activeProject - 1 : projects.length - 1;
    const nextIndex = activeProject < projects.length - 1 ? activeProject + 1 : 0;
    const nextNextIndex = nextIndex < projects.length - 1 ? nextIndex + 1 : 0;
    
    preloadVideo(activeProject);
    preloadVideo(prevIndex);
    preloadVideo(nextIndex);
    preloadVideo(nextNextIndex);
  }, [activeProject]);

  // show the fixed viewport when scrollProgress is between 0 and 1
  const showFixedViewport = scrollProgress > 0 && scrollProgress < 1;

  // Mobile navigation handlers
  const handlePrevProject = () => {
    if (isMobile) {
      setActiveProject((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    }
  };

  const handleNextProject = () => {
    if (isMobile) {
      setActiveProject((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div ref={containerRef} className="relative bg-zinc-900" style={{ height: `${containerHeight}px` }}>
      {/* Fixed viewport — always rendered but animated in/out for smoothness */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: showFixedViewport ? 1 : 0, y: showFixedViewport ? 0 : 40 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 80,
          pointerEvents: showFixedViewport ? 'auto' : 'none',
          overflow: 'hidden'
        }}
      >
        {/* 3D stage */}
        <div className="absolute inset-0">
          {/* Blurred backdrop matching active poster - BLUR REDUCED FROM 8px to 4px */}
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <video
              src={projects[activeProject]?.video}
              className="w-full h-full object-cover scale-110"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ filter: 'blur(4px)', opacity: 0.4 }}
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          {/* Header */}
          <motion.div
            className="absolute top-16 md:top-24 left-6 md:left-14 z-30"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ pointerEvents: 'none' }}
          >
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-100 uppercase inline-block mr-3" style={{ fontFamily: 'Bebas neue, Avenir, sans-serif', textShadow: '0 0 50px rgba(217, 119, 6, 0.25)' }}>
              Extended
            </h2>
            <h3 className="text-2xl md:text-4xl lg:text-5xl uppercase inline-block" style={{ fontFamily: 'Bebas neue, sans-serif', color: '#d3a345' }}>Narratives</h3>
            <p className="text-zinc-100 text-xs tracking-[0.3em]  mt-2" style={{ fontFamily: 'Avenir, sans-serif' }}>Films made for horizontal spaces,<br />where duration and composition <br />carry the story.</p>
          </motion.div>

          {/* Flying posters */}
          <div className="absolute inset-0" style={{ perspective: '1400px', perspectiveOrigin: '50% 50%', transformStyle: 'preserve-3d', zIndex: 5 }}>
            {projects.map((project, index) => (
              <FlyingPoster
                key={project.id}
                project={project}
                index={index}
                scrollProgress={scrollProgress}
                isActive={activeProject === index}
                isMobile={isMobile}
                activeProject={activeProject}
              />
            ))}
          </div>

          {/* Project info */}
          <motion.div className="absolute bottom-8 md:bottom-14 right-6 md:right-14 w-96 md:w-[500px] z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ pointerEvents: 'none' }}>
            <motion.div key={activeProject} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-right">
              <h4 className="text-lg md:text-xl mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#D3A345' }}>{projects[activeProject]?.title}</h4>
              <p className="text-zinc-100 text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>{projects[activeProject]?.year}</p>
              <p className="text-zinc-100 text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>{projects[activeProject]?.description}</p>

              <div className="flex justify-end gap-1.5 mt-6">
                {projects.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-full h-0.5"
                    animate={{
                      width: idx === activeProject ? 20 : 6,
                      backgroundColor: idx === activeProject ? '#D3A345' : 'rgb(255, 255, 255)',
                    }}
                    transition={{ duration: 0.25 }}
                  />
                ))}
              </div>

              <div className="mt-4 text-zinc-100 text-xs" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>
                <span className="text-base" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif', color: '#D3A345' }}>{String(activeProject + 1).padStart(2, '0')}</span>
                <span className="mx-1.5 opacity-40">/</span>
                <span className="opacity-60">{String(projects.length).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Navigation Arrows */}
          {isMobile && showFixedViewport && (
            <>
              {/* Left Arrow */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={handlePrevProject}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-md border border-amber-600/40 flex items-center justify-center active:scale-95 transition-transform shadow-xl"
                aria-label="Previous project"
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-amber-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </motion.button>

              {/* Right Arrow */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={handleNextProject}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-md border border-amber-600/40 flex items-center justify-center active:scale-95 transition-transform shadow-xl"
                aria-label="Next project"
                style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-amber-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Main Hero Section Component
const ProjectSection = () => {
  return (
    <>
      {/* Cinematic Gallery Section */}
      <CinematicGallery />
    </>
  );
};

export default ProjectSection;