import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-800 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src="/assets/Asset 5@4x (1).png" 
            alt="Logo" 
            className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
          />
        </Link>

        {/* Navigation buttons in the center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-work-sans text-base md:text-lg font-medium transition-colors duration-300 ${
              location.pathname === '/' 
                ? 'text-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/film" 
            className={`font-work-sans text-base md:text-lg font-medium transition-colors duration-300 ${
              location.pathname === '/film' 
                ? 'text-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            Film
          </Link>
        </div>

        {/* Spacer to balance the layout */}
        <div className="flex-shrink-0 w-32 md:w-40"></div>
      </div>
    </nav>
  );
};

export default Navbar;