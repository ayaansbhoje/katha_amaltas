import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import Navbar from '../components/Navbar';

const FilmPortfolio = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [selectedStill, setSelectedStill] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  const projects = [
    {
      id: 1,
      title: "Ethereal Dreams",
      description: "A surreal journey through the subconscious mind, exploring the boundaries between reality and imagination. This experimental short film uses practical effects and innovative cinematography to create a dreamlike atmosphere.",
      mainImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      externalUrl: "https://example.com/ethereal-dreams",
      stills: [
        { src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop", alt: "Still 1" },
        { src: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop", alt: "Still 2" },
        { src: "https://images.unsplash.com/photo-1574267432644-f74e7d95c3b8?w=800&h=600&fit=crop", alt: "Still 3" },
        { src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop", alt: "Still 4" }
      ]
    },
    {
      id: 2,
      title: "Urban Pulse",
      description: "A documentary-style exploration of city life at night, capturing the rhythm and energy of metropolitan existence. Shot over six months in various urban landscapes, this film reveals the hidden beauty in everyday moments.",
      mainImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      externalUrl: "https://example.com/urban-pulse",
      stills: [
        { src: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&h=600&fit=crop", alt: "Still 1" },
        { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop", alt: "Still 2" },
        { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop", alt: "Still 3" },
        { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop", alt: "Still 4" }
      ]
    },
    {
      id: 3,
      title: "Silent Horizons",
      description: "An intimate portrayal of solitude and self-discovery set against vast natural landscapes. This meditative piece explores the relationship between human emotion and the environment through minimal dialogue and powerful imagery.",
      mainImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      externalUrl: "https://example.com/silent-horizons",
      stills: [
        { src: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop", alt: "Still 1" },
        { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop", alt: "Still 2" },
        { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop", alt: "Still 3" },
        { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", alt: "Still 4" }
      ]
    },
    {
      id: 4,
      title: "Neon Noir",
      description: "A neo-noir thriller that blends classic crime aesthetics with modern visual storytelling. Set in a rain-soaked cityscape, this film examines morality through a lens of vibrant colors and deep shadows.",
      mainImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      externalUrl: "https://example.com/neon-noir",
      stills: [
        { src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop", alt: "Still 1" },
        { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop", alt: "Still 2" },
        { src: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=600&fit=crop", alt: "Still 3" },
        { src: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop", alt: "Still 4" }
      ]
    }
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling.current) return;
      
      const delta = e.deltaY;
      const threshold = 50;
      
      if (Math.abs(delta) > threshold) {
        isScrolling.current = true;
        
        if (delta > 0 && activeProject < projects.length - 1) {
          setActiveProject(prev => prev + 1);
          setIsPlaying({});
        } else if (delta < 0 && activeProject > 0) {
          setActiveProject(prev => prev - 1);
          setIsPlaying({});
        }
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling.current) return;
      
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      const threshold = 50;
      
      if (Math.abs(diff) > threshold) {
        isScrolling.current = true;
        
        if (diff > 0 && activeProject < projects.length - 1) {
          setActiveProject(prev => prev + 1);
          setIsPlaying({});
        } else if (diff < 0 && activeProject > 0) {
          setActiveProject(prev => prev - 1);
          setIsPlaying({});
        }
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeProject, projects.length]);

  const handlePlayVideo = (projectId) => {
    setIsPlaying({ [projectId]: true });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <Navbar />
      {projects.map((project, index) => {
        const isActive = index === activeProject;
        const isPast = index < activeProject;
        const isFuture = index > activeProject;
        
        return (
          <section
            key={project.id}
            className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
            style={{
              transform: isPast 
                ? 'translateY(-100%)' 
                : isFuture 
                ? 'translateY(100%)' 
                : 'translateY(0)',
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none'
            }}
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Video/Image Section - Left */}
              <div className="relative w-full lg:w-3/5 h-1/2 lg:h-full overflow-hidden group">
                {isPlaying[project.id] ? (
                  <iframe
                    src={project.videoUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 flex items-center justify-center">
                      <button
                        onClick={() => handlePlayVideo(project.id)}
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20 group/play"
                      >
                        <Play className="w-8 h-8 text-white fill-white/50 ml-1 transition-transform group-hover/play:scale-110" />
                      </button>
                    </div>
                  </>
                )}
                
                {/* Film number overlay */}
                <div className="absolute bottom-8 left-8 text-white/10 text-9xl font-bold leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Info Section - Right */}
              <div className="w-full lg:w-2/5 h-1/2 lg:h-full bg-zinc-900 flex flex-col p-6 lg:p-12 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-gray-500 text-sm tracking-widest uppercase mb-4 block font-mono">
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium group"
                  >
                    <span className="relative">
                      Watch Full Film
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                {/* Stills Gallery */}
                <div className="mt-auto">
                  <h3 className="text-gray-500 text-xs tracking-widest uppercase mb-4 font-mono">
                    Film Stills
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {project.stills.map((still, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedStill({ ...still, projectTitle: project.title })}
                        className="relative aspect-video overflow-hidden rounded-sm group/still ring-1 ring-zinc-800 hover:ring-blue-400 transition-all duration-300"
                      >
                        <img
                          src={still.src}
                          alt={still.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/still:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/still:bg-black/20 transition-colors duration-300" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Still Lightbox */}
      {selectedStill && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedStill(null)}
        >
          <button
            onClick={() => setSelectedStill(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedStill.src}
            alt={selectedStill.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-sm text-gray-400">From {selectedStill.projectTitle}</p>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveProject(index);
              setIsPlaying({});
            }}
            className={`w-2 rounded-full transition-all duration-300 ${
              index === activeProject
                ? 'bg-white h-8'
                : 'bg-white/30 hover:bg-white/50 h-2'
            }`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="fixed bottom-8 left-8 text-white z-20">
        <span className="text-4xl font-bold">{String(activeProject + 1).padStart(2, '0')}</span>
        <span className="text-gray-400 text-xl"> / {String(projects.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default FilmPortfolio;