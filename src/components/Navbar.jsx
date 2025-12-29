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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/20 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        {/* Home button on the left - moved more towards right */}
        <Link 
          to="/" 
          className={`font-work-sans text-base md:text-lg font-medium transition-colors duration-300 ml-12 md:ml-24 ${
            location.pathname === '/' 
              ? 'text-yellow-400' 
              : 'text-white hover:text-yellow-400'
          }`}
        >
          Home
        </Link>

        {/* Logo in the center */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/assets/Asset 5@4x (1).png" 
            alt="Logo" 
            className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
          />
        </Link>

        {/* Film button on the right - moved more towards left */}
        <Link 
          to="/film" 
          className={`font-work-sans text-base md:text-lg font-medium transition-colors duration-300 mr-12 md:mr-24 ${
            location.pathname === '/film' 
              ? 'text-yellow-400' 
              : 'text-white hover:text-yellow-400'
          }`}
        >
          Film
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;