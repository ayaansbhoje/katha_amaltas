import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Project videos - replace with your actual video paths from assets
const projects = [
  {
    id: 1,
    title: "French Embassy in India, Villa Swagatam",
    year: "Promotional documentary",
    description: "A multi-location documentary tracing artistic exchange between French residents and India's cultural ecosystems. ",
    video: 'assets/French_Embassy_Teaser.mov',
  },
  {
    id: 2,
    title: "Ankuran, The Art of Idol Making",
    year: "Award-winning independent documentary",
    description: "An intimate film on idol-making and devotion. We follow the hands that create gods, and what it means to let them go.",
    video: '/assets/ANKURAN_TRAILER.mov',
  },
  {
    id: 3,
    title: "Chemould Prescott Road, 60 Years of Chemould",
    year: "Three-part documentary series",
    description: "A documentary series reflecting on six decades of Chemould's role in shaping Indian contemporary art. We sat with the archive, moving between past and present, memory and practice.",
    video: '/assets/CHEMOULD_PRESCOTT_ROAD_TEASER.mov',
  },
  {
    id: 4,
    title: "Anant Joshi, Raised Eyebrow",
    year: "Exhibition film & documentation | Gallery Chemould",
    description: "An exhibition film shaped by the metaphor of the Blind King Dhritarashtra's raised eyebrow, inner unrest and silent resistance. Our goal was to capture scale & detail simultaneously, allowing questions of power and identity to unfold.",
    video: '/assets/ANANT_FINAL_TESER.mov',
  },
  {
    id: 5,
    title: "Jangarh Singh Shyam",
    year: "Exhibition film & visual archive",
    description: "A film shaped by Jangarh Singh Shyam's visual language. Where myth, nature, and memory come together.",
    video: '/assets/JANGARH_FINAL_TESER.mov',
  },
];

/* ---------------- FLYING POSTER (DESKTOP — UNCHANGED) ---------------- */

const FlyingPoster = ({ project, index, scrollProgress, isActive, isMobile, activeProject }) => {
  const videoRef = useRef(null);
  const posterSpacing = 55;
  const totalWidth = projects.length * posterSpacing;
  const startPosition = 25;

  let xPosition;
  if (isMobile) {
    const offset = (index - activeProject) * 100;
    xPosition = offset;
  } else {
    xPosition = startPosition + (index * posterSpacing) - (scrollProgress * totalWidth);
  }

  const distanceFromCenter = Math.abs(xPosition);
  const zPosition = isActive ? 100 : -80 - distanceFromCenter * 1.2;
  const rotateY = isMobile ? 0 : xPosition * 0.06;
  const rotateX = isMobile ? 0 : Math.sin(scrollProgress * Math.PI * 2 + index) * 2;
  const skewY = isMobile ? 0 : xPosition * 0.012;

  const scale = isActive ? 1 : 0.8;
  const opacity = isActive ? 1 : Math.max(0.25, 1 - distanceFromCenter * 0.012);

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
      className="absolute top-1/2 left-1/2 pointer-events-none"
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
      transition={{ type: "spring", stiffness: 70, damping: 22, mass: 0.9 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative overflow-hidden rounded aspect-[16/9]"
        style={{
          width: isMobile ? 'clamp(280px, 70vw, 500px)' : 'clamp(400px, 80vw, 700px)',
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

/* ---------------- DESKTOP CINEMATIC GALLERY (UNCHANGED) ---------------- */

const DesktopCinematicGallery = () => {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1000);
  const videoPreloadRefs = useRef({});

  const posterSpacing = 55;
  const totalWidthVW = projects.length * posterSpacing;

  useEffect(() => {
    const calculateHeights = () => {
      const vwToPx = (vw) => (vw / 100) * window.innerWidth;
      const horizontalPx = vwToPx(totalWidthVW);
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
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
        const projectIndex = Math.min(Math.floor(progress * projects.length), projects.length - 1);
        setActiveProject(Math.max(0, projectIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerHeight]);

  useEffect(() => {
    const preloadVideo = (index) => {
      if (!projects[index]?.video || videoPreloadRefs.current[index]) return;
      const preloadedVideo = window.__preloadedVideos?.[projects[index].video];
      if (preloadedVideo) {
        videoPreloadRefs.current[index] = preloadedVideo;
        if (preloadedVideo.readyState < 3) {
          preloadedVideo.load();
        }
      } else {
        const video = document.createElement('video');
        video.src = projects[index].video;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.load();
        video.play().catch(() => {});
        videoPreloadRefs.current[index] = video;
      }
    };

    projects.forEach((_, index) => preloadVideo(index));
    const prevIndex = activeProject > 0 ? activeProject - 1 : projects.length - 1;
    const nextIndex = activeProject < projects.length - 1 ? activeProject + 1 : 0;
    const nextNextIndex = nextIndex < projects.length - 1 ? nextIndex + 1 : 0;
    preloadVideo(activeProject);
    preloadVideo(prevIndex);
    preloadVideo(nextIndex);
    preloadVideo(nextNextIndex);
  }, [activeProject]);

  const showFixedViewport = scrollProgress > 0 && scrollProgress < 1;

  return (
    <div ref={containerRef} className="relative bg-zinc-900" style={{ height: `${containerHeight}px` }}>
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
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <video
              src={projects[activeProject]?.video}
              className="w-full h-full object-cover scale-110"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ filter: 'blur(12px)', opacity: 0.5 }}
            />
          </div>

          <motion.div
            className="absolute top-16 md:top-24 left-6 md:left-14 z-30"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ pointerEvents: 'none' }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-100 uppercase" style={{ fontFamily: 'Bebas Neue, sans-serif', textShadow: '0 0 50px rgba(217, 119, 6, 0.25)' }}>
              Extended <span style={{ color: '#d3a345' }}>Narratives</span>
            </h2>
            <p className="text-white text-xs tracking-[0.3em]  mt-2" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>Films made for horizontal spaces,<br />where duration and composition <br />carry the story.</p>
          </motion.div>

          <div className="absolute inset-0" style={{ perspective: '1400px', perspectiveOrigin: '50% 50%', transformStyle: 'preserve-3d', zIndex: 5 }}>
            {projects.map((project, index) => (
              <FlyingPoster
                key={project.id}
                project={project}
                index={index}
                scrollProgress={scrollProgress}
                isActive={activeProject === index}
                isMobile={false}
                activeProject={activeProject}
              />
            ))}
          </div>

          <motion.div className="absolute bottom-8 md:bottom-14 right-6 md:right-14 w-72 md:w-96 z-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ pointerEvents: 'none' }}>
            <motion.div key={activeProject} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-right">
              <h4 className="text-lg md:text-xl mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d3a345' }}>{projects[activeProject]?.title}</h4>
              <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium text-white" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>{projects[activeProject]?.year}</p>
              <p className="text-white text-xs md:text-sm leading-relaxed" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>{projects[activeProject]?.description}</p>

              <div className="flex justify-end gap-1.5 mt-6">
                {projects.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-full h-0.5"
                    animate={{
                      width: idx === activeProject ? 20 : 6,
                      backgroundColor: idx === activeProject ? '#d3a345' : 'rgb(63, 63, 70)',
                    }}
                    transition={{ duration: 0.25 }}
                  />
                ))}
              </div>

              <div className="mt-4 text-xs" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}>
                <span className="text-base" style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif', color: '#d3a345' }}>{String(activeProject + 1).padStart(2, '0')}</span>
                <span className="mx-1.5 opacity-40 text-white">/</span>
                <span className="text-white opacity-60">{String(projects.length).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- MOBILE PROJECT SECTION (NEW — STILL CAROUSEL) ---------------- */

const MobileProjectSection = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef(null);

  const handlePrev = () => {
    setDirection(-1);
    setActiveProject((p) => (p === 0 ? projects.length - 1 : p - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveProject((p) => (p === projects.length - 1 ? 0 : p + 1));
  };

  // Restart video when active project changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeProject]);

  const active = projects[activeProject];

  return (
    <section className="relative bg-zinc-900 py-12 overflow-hidden">
      {/* Blurred backdrop matching active project */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.video
          key={`bg-${activeProject}`}
          src={active.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'blur(14px)', opacity: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-zinc-900/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-5">
        {/* Header */}
        <h2
          className="text-3xl font-light text-zinc-100 uppercase mb-2"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            textShadow: '0 0 50px rgba(217, 119, 6, 0.25)',
          }}
        >
          Extended <span style={{ color: '#d3a345' }}>Narratives</span>
        </h2>
        <p
          className="text-white text-[10px] tracking-[0.25em] mb-8 max-w-[260px]"
          style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}
        >
          Films made for horizontal spaces, where duration and composition carry the story.
        </p>

        {/* Carousel */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 w-9 h-9 rounded-full bg-zinc-800/80 backdrop-blur-md border border-amber-600/40 flex items-center justify-center active:scale-90 transition-transform shadow-lg"
            aria-label="Previous project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
              style={{ color: '#d3a345' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Card */}
          <div className="w-full max-w-[260px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeProject}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded overflow-hidden aspect-[16/9]"
                style={{
                  boxShadow:
                    '0 20px 60px -15px rgba(0,0,0,0.8), 0 0 50px rgba(182, 155, 100, 0.12)',
                }}
              >
                <video
                  ref={videoRef}
                  src={active.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-transparent to-zinc-900/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 w-9 h-9 rounded-full bg-zinc-800/80 backdrop-blur-md border border-amber-600/40 flex items-center justify-center active:scale-90 transition-transform shadow-lg"
            aria-label="Next project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
              style={{ color: '#d3a345' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Project info */}
        <motion.div
          key={`info-${activeProject}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-6 max-w-[280px]"
        >
          <h4
            className="text-base mb-1.5 leading-tight"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d3a345' }}
          >
            {active.title}
          </h4>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-2 font-medium text-white"
            style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}
          >
            {active.year}
          </p>
          <p
            className="text-white/80 text-[11px] leading-relaxed"
            style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}
          >
            {active.description}
          </p>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex gap-1.5 mt-6 items-center">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeProject ? 1 : -1);
                setActiveProject(idx);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  idx === activeProject ? '#d3a345' : 'rgba(63, 63, 70, 1)',
                width: idx === activeProject ? '18px' : '6px',
                height: '2px',
              }}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div
          className="mt-3 text-[10px]"
          style={{ fontFamily: 'Avenir-Regular, Avenir, sans-serif' }}
        >
          <span className="text-sm" style={{ color: '#d3a345' }}>
            {String(activeProject + 1).padStart(2, '0')}
          </span>
          <span className="mx-1.5 opacity-40 text-white">/</span>
          <span className="text-white opacity-60">
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
};

/* ---------------- MAIN EXPORT (BRANCHES BY VIEWPORT) ---------------- */

const ProjectSection = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileProjectSection /> : <DesktopCinematicGallery />;
};

export default ProjectSection;