import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';

const FilmPortfolio = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [selectedStill, setSelectedStill] = useState(null);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  const projects = [
    {
      id: 1,
      title: "Ethereal Dreams",
      description: "A surreal journey through the subconscious mind, exploring the boundaries between reality and imagination. This experimental short film uses practical effects and innovative cinematography to create a dreamlike atmosphere.",
      mainImage: "/assets/first_cover.jpg", // Add your image path here
      externalUrl: "https://example.com/ethereal-dreams",
      stills: [
        { src: "/assets/first_1.jpg", alt: "Still 1" }, // Add your image path here
        { src: "/assets/first_2.jpg", alt: "Still 2" }, // Add your image path here
        { src: "/assets/first_3.jpg", alt: "Still 3" }, // Add your image path here
        { src: "/assets/first_4.jpg", alt: "Still 4" }  // Add your image path here
      ]
    },
    {
      id: 2,
      title: "Urban Pulse",
      description: "A documentary-style exploration of city life at night, capturing the rhythm and energy of metropolitan existence. Shot over six months in various urban landscapes, this film reveals the hidden beauty in everyday moments.",
      mainImage: "/assets/first_cover.jpg", // Add your image path here
      externalUrl: "https://example.com/urban-pulse",
      stills: [
        { src: "", alt: "Still 1" }, // Add your image path here
        { src: "", alt: "Still 2" }, // Add your image path here
        { src: "", alt: "Still 3" }, // Add your image path here
        { src: "", alt: "Still 4" }  // Add your image path here
      ]
    },
    {
      id: 3,
      title: "Silent Horizons",
      description: "An intimate portrayal of solitude and self-discovery set against vast natural landscapes. This meditative piece explores the relationship between human emotion and the environment through minimal dialogue and powerful imagery.",
      mainImage: "", // Add your image path here
      externalUrl: "https://example.com/silent-horizons",
      stills: [
        { src: "", alt: "Still 1" }, // Add your image path here
        { src: "", alt: "Still 2" }, // Add your image path here
        { src: "", alt: "Still 3" }, // Add your image path here
        { src: "", alt: "Still 4" }  // Add your image path here
      ]
    },
    {
      id: 4,
      title: "Neon Noir",
      description: "A neo-noir thriller that blends classic crime aesthetics with modern visual storytelling. Set in a rain-soaked cityscape, this film examines morality through a lens of vibrant colors and deep shadows.",
      mainImage: "", // Add your image path here
      externalUrl: "https://example.com/neon-noir",
      stills: [
        { src: "", alt: "Still 1" }, // Add your image path here
        { src: "", alt: "Still 2" }, // Add your image path here
        { src: "", alt: "Still 3" }, // Add your image path here
        { src: "", alt: "Still 4" }  // Add your image path here
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
        } else if (delta < 0 && activeProject > 0) {
          setActiveProject(prev => prev - 1);
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
        } else if (diff < 0 && activeProject > 0) {
          setActiveProject(prev => prev - 1);
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
              {/* Image Section - Left */}
              <div className="relative w-full lg:w-3/5 h-1/2 lg:h-full overflow-hidden group">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
                
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
            onClick={() => setActiveProject(index)}
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