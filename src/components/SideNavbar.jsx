import { useState, useEffect } from "react";

/**
 * SideNavbar.jsx
 *
 * Left-side section navigator for the Home page.
 * Always visible. Active section is fully bright, others are dimmed.
 *
 * Matching id wrappers in Home.jsx:
 *   id="film-studio-hero"   → <FilmStudioHero />
 *   id="brand-identity"     → <BrandIdentity />
 *   id="about-us"           → <AboutUs />
 *   id="service-section"    → <ServiceSection />
 *   id="film-gallery"       → <FilmGallery />
 *   id="layered-gallery"    → <LayeredGallery />
 *   id="project-section"    → <ProjectSection />
 *   id="cinematic-carousel" → <CinematicCarousel />
 *   id="film-process-cycle" → <FilmProcessCycle />
 *   id="contact-section"    → <ContactSection />
 */

const SECTIONS = [
  { id: "film-studio-hero",   label: "Hero"            },
  { id: "brand-identity",     label: "Brand Identity"  },
  { id: "about-us",           label: "About Us"        },
  { id: "service-section",    label: "Services"        },
  { id: "film-gallery",       label: "Film Gallery"    },
  { id: "layered-gallery",    label: "Layered Gallery" },
  { id: "project-section",    label: "Projects"        },
  { id: "cinematic-carousel", label: "Cinematic"       },
  { id: "film-process-cycle", label: "Film Process"    },
  { id: "contact-section",    label: "Contact"         },
];

export default function SideNavbar() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Highlight whichever section is currently in the viewport
  useEffect(() => {
    const observers = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Track page scroll progress for the side progress line
  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      const progress = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    // z-[9999] ensures it always sits above any section overlay (ServiceSection uses z-60)
    <aside
      className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col items-start py-5 pl-5 pr-4 gap-0.5"
      style={{ zIndex: 9999 }}
    >
      {/* Vertical scroll progress track */}
      <div className="absolute left-2 top-0 w-px h-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="w-full bg-white/50 rounded-full transition-all duration-200"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{ background: "none", border: "none", zIndex: 9999 }}
            className={`
              flex items-center gap-2.5 w-full text-left
              py-1 px-0 cursor-pointer
              transition-all duration-300
              ${isActive ? "opacity-100" : "opacity-25"}
            `}
          >
            {/* Indicator dot — larger when active */}
            <span
              className={`
                shrink-0 rounded-full bg-white transition-all duration-300
                ${isActive ? "w-1.5 h-1.5" : "w-1 h-1"}
              `}
            />

            {/* Section label */}
            <span
              className={`
                text-white text-xs tracking-widest uppercase transition-all duration-300
                ${isActive ? "font-semibold" : "font-normal"}
              `}
            >
              {label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}