import React, { useState } from 'react';
import { Film, Folder, X } from 'lucide-react';

const FilmDeck = () => {
  const [activeDeck, setActiveDeck] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);

  // Background image path
  const backgroundImage = "/assets/deck_background.jpg";

  const decks = [
    {
      id: 1,
      title: 'Japan',
      subtitle: 'Travel 2025',
      category: 'Documentary',
      images: [
        { id: 1, title: 'Cherry Blossoms', bg: 'from-pink-400 to-rose-500' },
        { id: 2, title: 'Mount Fuji', bg: 'from-blue-400 to-indigo-500' },
        { id: 3, title: 'Torii Gate', bg: 'from-orange-500 to-red-600' },
        { id: 4, title: 'Tokyo Tower', bg: 'from-purple-400 to-pink-500' },
        { id: 5, title: 'Temple', bg: 'from-amber-500 to-orange-600' },
      ]
    },
    {
      id: 2,
      title: 'Urban Stories',
      subtitle: 'Short Film 2024',
      category: 'Narrative',
      images: [
        { id: 6, title: 'City Lights', bg: 'from-cyan-400 to-blue-500' },
        { id: 7, title: 'Street Life', bg: 'from-yellow-400 to-orange-500' },
        { id: 8, title: 'Night Scene', bg: 'from-indigo-500 to-purple-600' },
        { id: 9, title: 'Urban Decay', bg: 'from-gray-600 to-gray-800' },
        { id: 10, title: 'Neon Dreams', bg: 'from-pink-500 to-purple-600' },
      ]
    },
    {
      id: 3,
      title: 'Ocean Tales',
      subtitle: 'Documentary 2024',
      category: 'Nature',
      images: [
        { id: 11, title: 'Deep Blue', bg: 'from-blue-600 to-cyan-700' },
        { id: 12, title: 'Coral Reef', bg: 'from-teal-400 to-emerald-500' },
        { id: 13, title: 'Marine Life', bg: 'from-indigo-500 to-blue-600' },
        { id: 14, title: 'Sunset Waves', bg: 'from-orange-400 to-pink-500' },
        { id: 15, title: 'Underwater', bg: 'from-cyan-500 to-blue-600' },
      ]
    },
  ];

  // Dispersal positions for images - Desktop
  const dispersalPositionsDesktop = [
    { x: -200, y: -180, rotate: -8, scale: 0.95 },
    { x: 220, y: -150, rotate: 12, scale: 0.98 },
    { x: -180, y: 120, rotate: -15, scale: 0.96 },
    { x: 240, y: 140, rotate: 10, scale: 0.97 },
    { x: 0, y: -220, rotate: 5, scale: 0.94 },
  ];

  // Dispersal positions for images - Mobile (smaller spread)
  const dispersalPositionsMobile = [
    { x: -120, y: -100, rotate: -8, scale: 0.9 },
    { x: 130, y: -90, rotate: 12, scale: 0.92 },
    { x: -110, y: 70, rotate: -15, scale: 0.91 },
    { x: 140, y: 80, rotate: 10, scale: 0.93 },
    { x: 0, y: -130, rotate: 5, scale: 0.89 },
  ];

  const handleDeckClick = (deckId) => {
    if (activeDeck === deckId) {
      setActiveDeck(null);
      setVisibleImages([]);
    } else {
      setActiveDeck(deckId);
      setVisibleImages([]);
      
      // Pop out images one by one
      const deck = decks.find(d => d.id === deckId);
      deck.images.forEach((image, index) => {
        setTimeout(() => {
          setVisibleImages(prev => [...prev, image.id]);
        }, index * 200);
      });
    }
  };

  return (
    <div 
      className="min-h-screen pt-4 pb-2 px-2 sm:px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-3 md:mb-4 text-center">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 bg-white/90 px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
            <Film className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            <span className="text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider">Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 text-white drop-shadow-2xl px-2">
            Treatment Notes
          </h1>
          <p className="text-white text-sm md:text-lg max-w-2xl mx-auto italic drop-shadow-lg px-4">
            Narrative and visual treatments created for commissioned advertising brand and films
          </p>
        </div>

        {/* Decks Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="relative flex justify-center items-center"
              style={{ minHeight: window.innerWidth < 768 ? '400px' : '600px' }}
            >
              {/* Main Deck/Folder */}
              <div
                onClick={() => handleDeckClick(deck.id)}
                className={`relative cursor-pointer transition-all duration-500 ${
                  activeDeck === deck.id ? 'z-0' : 'z-10 hover:scale-105'
                }`}
              >
                {/* Folder Tab */}
                <div className="absolute -top-2 md:-top-3 left-6 md:left-8 w-24 h-8 md:w-32 md:h-10 rounded-t-lg shadow-lg z-0" style={{ backgroundColor: '#650B0F' }}>
                  <div className="absolute inset-0 bg-black/10 rounded-t-lg"></div>
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <span className="text-white text-xs font-semibold tracking-wide">{deck.category}</span>
                  </div>
                </div>

                {/* Main Folder Body */}
                <div
                  className="w-56 h-80 md:w-72 md:h-96 rounded-xl md:rounded-2xl shadow-2xl flex flex-col items-start justify-between p-6 md:p-8 relative overflow-hidden border border-black/10 transition-all duration-300"
                  style={{ backgroundColor: '#650B0F' }}
                >
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-5" 
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f8e6d3\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Folder className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                      <span className="text-xs text-white/60 uppercase tracking-wider font-medium">
                        {deck.images.length} Files
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{deck.title}</h2>
                    <p className="text-white/70 text-xs md:text-sm">{deck.subtitle}</p>
                  </div>

                  {/* Bottom decoration */}
                  <div className="relative z-10 w-full">
                    <div className="flex items-center justify-between text-white/50 text-xs">
                      <span>Click to expand</span>
                      <div className="w-6 h-0.5 md:w-8 md:h-1 bg-white/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* Light reflection effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
                </div>
              </div>

              {/* Dispersed Images */}
              {activeDeck === deck.id && (
                <>
                  {deck.images.map((image, index) => {
                    const isMobile = window.innerWidth < 768;
                    const pos = isMobile ? dispersalPositionsMobile[index] : dispersalPositionsDesktop[index];
                    const isVisible = visibleImages.includes(image.id);
                    
                    return (
                      <div
                        key={image.id}
                        className="absolute w-36 h-48 md:w-56 md:h-72 rounded-xl md:rounded-2xl shadow-2xl transform cursor-pointer hover:scale-110 hover:z-50 hover:shadow-3xl"
                        style={{
                          transform: isVisible 
                            ? `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`
                            : 'translate(0px, 0px) rotate(0deg) scale(0)',
                          opacity: isVisible ? 1 : 0,
                          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${image.bg} rounded-xl md:rounded-2xl overflow-hidden relative group border-2 md:border-4 border-white shadow-xl`}>
                          {/* Image placeholder with gradient */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white p-4 md:p-6">
                              <Film className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 opacity-70" />
                              <p className="font-semibold text-base md:text-lg">{image.title}</p>
                            </div>
                          </div>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
                          
                          {/* Film grain texture */}
                          <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                            style={{
                              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="max-w-7xl mx-auto mt-2 text-center px-4">
          <p className="text-white text-xs md:text-sm drop-shadow-lg">
            Click on any folder to explore the collection • Hover over images for details
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilmDeck;