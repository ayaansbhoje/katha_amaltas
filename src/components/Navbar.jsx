import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SECTIONS = [
  { id: 'film-studio-hero',   label: 'Prologue'            },
  { id: 'brand-identity',     label: 'The Name'  },
  { id: 'about-us',           label: 'The Duo '        },
  { id: 'service-section',    label: 'What We Do'        },
  { id: 'film-gallery',       label: 'Visual Notes'    },
  { id: 'layered-gallery',    label: 'Vertical Stories' },
  { id: 'project-section',    label: 'Selected Works'        },
  { id: 'cinematic-carousel', label: 'Worked With'       },
  { id: 'film-process-cycle', label: ' Our Process'    },
  { id: 'contact-section',    label: 'Get in Touch'         },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hinted, setHinted] = useState(false);
  const hoverTimeout = useRef(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 1200);
    const t2 = setTimeout(() => setHinted(false), 3200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const scrollToSection = (id) => {
    setDropdownOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] border-b border-white/20 transition-all duration-300 ${
        isScrolled ? 'bg-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">

        {/* ── Home button with dropdown ── */}
        <div
          className="relative ml-12 md:ml-24"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/"
            className={`group relative inline-flex items-center gap-1.5 font-work-sans text-base md:text-lg font-medium transition-colors duration-300 ${
              isHome ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
            }`}
          >
            Home

            {/* Chevron icon — rotates when open */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 opacity-60 ${
                dropdownOpen ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>

            {/* Animated underline */}
            <span
              className={`
                absolute -bottom-1 left-0 h-px bg-yellow-400
                transition-all duration-300
                ${dropdownOpen ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}
              `}
            />
          </Link>

          {/* Pulse hint dot */}
          <span
            className={`
              absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-yellow-400
              transition-opacity duration-500
              ${hinted && !dropdownOpen ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75" />
          </span>

          {/* Tooltip */}
          <div
            className={`
              absolute top-full left-0 mt-2
              px-2.5 py-1 rounded-md
              bg-black/80 backdrop-blur-sm border border-white/10
              text-[10px] text-white/60 font-work-sans tracking-widest uppercase whitespace-nowrap
              pointer-events-none
              transition-all duration-300
              ${hinted && !dropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
            `}
          >
            hover to explore
          </div>

          {/* ── Dropdown menu ── */}
          <div
            className={`
              absolute top-full left-0 mt-3
              w-52 py-2
              backdrop-blur-2xl
              border border-white/10
              rounded-xl shadow-2xl shadow-black/40
              transition-all duration-200 origin-top-left
              ${dropdownOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
              }
            `}
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.55)' }}
          >
            {/* Arrow tip */}
            <div className="absolute -top-[6px] left-4 w-3 h-3 bg-black/30 border-l border-t border-white/10 rotate-45 backdrop-blur-2xl" />

            <p className="px-4 pt-1 pb-2 text-[10px] tracking-widest uppercase text-white/30 font-work-sans">
              Jump to section
            </p>

            {SECTIONS.map(({ id, label }, i) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="
                  w-full text-left px-4 py-2
                  text-sm text-white/70 hover:text-yellow-400
                  hover:bg-white/5
                  font-work-sans tracking-wide
                  transition-colors duration-150
                  flex items-center gap-2.5
                "
              >
                <span className="text-[10px] text-white/20 font-mono w-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Logo centre ── */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="/assets/katha_main_logo.webp"
            alt="Logo"
            className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
          />
        </Link>

        {/* ── Films link ── */}
        <Link
          to="/film"
          className={`font-work-sans text-base md:text-lg font-medium transition-colors duration-300 mr-12 md:mr-24 ${
            location.pathname === '/film'
              ? 'text-yellow-400'
              : 'text-white hover:text-yellow-400'
          }`}
        >
          Films
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;