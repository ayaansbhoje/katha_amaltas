import React, { useState, useEffect } from 'react';

const FilmProcessCycle = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const processes = [
    {
      title: "LISTENING",
      subtitle: "We begin by listening — to people, practices, spaces, and intentions. This may happen through conversation, observation, or time spent with the work before anything is defined."
    },
    {
      title: "CONTEXT",
      subtitle: "Understanding the cultural, historical, and practical worlds the project belongs to. This may involve research, archives, references, or learning how the work already lives."
    },
    {
      title: "FRAMING",
      subtitle: "Deciding how the project should take shape. Together, we determine what form the work needs — a single film, a series, exhibition documentation, or a longer-term collaboration — and what level of presence it requires."
    },
    {
      title: "DIRECTION",
      subtitle: "Clarifying the film's point of view and approach. This may be expressed through written notes, conversations, or treatment material — always shaped by the context established earlier."
    },
    {
      title: "MAKING",
      subtitle: "Filming or documenting. We let the space set the terms. Production remains flexible — present without intrusion & structured without excess."
    },
    {
      title: "FINAL FORM",
      subtitle: "Post-production focuses on how the work comes together — editing, sound design, colour, pacing, and length — ensuring the film is coherent and context-ready, while final placement remains a shared decision."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % processes.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 lg:p-8 overflow-hidden">
      {/* Background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/proj_bg.png"
        alt="Background"
      />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
        
        {/* Film Projector Section */}
        <div className="flex-shrink-0 relative lg:rotate-0 rotate-90">
          {/* Projector Body */}
          <div className="relative scale-75 lg:scale-100">
            {/* Main projector box */}
            <div className="w-64 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl relative border-4 border-gray-700">
              {/* Lens */}
              <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shadow-xl border-4 border-gray-600">
                <div className="absolute inset-3 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute inset-5 bg-white rounded-full opacity-40"></div>
              </div>
              
              {/* Ventilation slots */}
              <div className="absolute left-4 top-4 space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-8 h-1 bg-gray-600 rounded"></div>
                ))}
              </div>
              
              {/* Control buttons */}
              <div className="absolute right-4 bottom-4 flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
              </div>
            </div>

            {/* Top Film Reel */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-8 border-gray-800 shadow-2xl animate-spin" style={{ animationDuration: '4s' }}>
                  {/* Film reel spokes */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-12 bg-gray-600 origin-bottom"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${i * 60}deg)`
                      }}
                    ></div>
                  ))}
                  {/* Center hub */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                  </div>
                </div>
                {/* Film strip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-amber-600 to-amber-800 opacity-60"></div>
              </div>
            </div>

            {/* Bottom Film Reel */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-8 border-gray-800 shadow-2xl animate-spin" style={{ animationDuration: '4s' }}>
                  {/* Film reel spokes */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-12 bg-gray-600 origin-bottom"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${i * 60}deg)`
                      }}
                    ></div>
                  ))}
                  {/* Center hub */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                  </div>
                </div>
                {/* Film strip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-amber-800 to-amber-600 opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Light beam from projector - Desktop */}
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-1 bg-gradient-to-r from-cyan-400/60 via-cyan-300/30 to-transparent animate-pulse pointer-events-none lg:block hidden"></div>
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-to-r from-cyan-400/20 via-cyan-300/10 to-transparent blur-xl animate-pulse pointer-events-none lg:block hidden" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }}></div>
          
          {/* Mobile Light beam (downward) */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-32 h-40 w-1 bg-gradient-to-b from-cyan-400/60 via-cyan-300/30 to-transparent animate-pulse pointer-events-none lg:hidden"></div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-32 h-40 w-32 bg-gradient-to-b from-cyan-400/20 via-cyan-300/10 to-transparent blur-xl animate-pulse pointer-events-none lg:hidden" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}></div>
        </div>

        {/* Projection Screen Section */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-[350px] lg:max-w-3xl w-full lg:w-auto flex items-center justify-center mt-24 lg:mt-0">
          {/* Screen frame - solid color */}
          <div className="absolute inset-0 rounded-2xl shadow-2xl border border-white/20" style={{ backgroundColor: '#f8e6d2' }}></div>
          
          {/* Screen content area */}
          <div className="relative z-10 w-full h-full p-6 lg:p-12 flex flex-col items-center justify-center">
            {/* Content */}
            <div className={`text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
              {/* Step indicator */}
              <div className="mb-4 lg:mb-6 flex items-center justify-center gap-2">
                <div className="w-12 lg:w-16 h-1 rounded-full" style={{ backgroundColor: '#91222c' }}></div>
                <span className="text-gray-800 text-xs lg:text-sm font-mono">
                  {String(currentStep + 1).padStart(2, '0')} / {String(processes.length).padStart(2, '0')}
                </span>
                <div className="w-12 lg:w-16 h-1 rounded-full" style={{ backgroundColor: '#91222c' }}></div>
              </div>

              {/* Title */}
              <h2 className="text-4xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-clip-text text-transparent tracking-tight" style={{ fontFamily: 'Bebas Neue', color: '#91222c' }}>
                {processes[currentStep].title}
              </h2>

              {/* Subtitle */}
              <p className="text-base lg:text-2xl italic tracking-wide max-w-sm lg:max-w-lg mx-auto px-4" style={{ fontFamily: 'Avenir', color: '#91222c' }}>
                {processes[currentStep].subtitle}
              </p>

              {/* Decorative elements */}
              <div className="mt-6 lg:mt-8 flex items-center justify-center gap-2 lg:gap-3">
                {processes.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentStep 
                        ? 'w-8 lg:w-12' 
                        : 'w-4 lg:w-6 bg-gray-400'
                    }`}
                    style={index === currentStep ? { backgroundColor: '#91222c' } : {}}
                  ></div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmProcessCycle;