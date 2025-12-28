import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const CARD_HEIGHT = 380;
const CARD_GAP = 24;

const services = [
  {
    id: 1,
    title: "Artist Films",
    description:
      " Intimate film portraits that document an artist's practice, process, and thinking. These films are built through listening, observation, and time — allowing the work to speak without performance or simplification.",
    category: "01",
    image: "assets/artist_docu.jpg",
  },
  {
    id: 2,
    title: "Cultural Documentaries",
    description:
      "Short-form and long-form documentaries focused on culture as it is lived — across people, spaces, traditions, and contemporary practice.",
    category: "02",
    image: "assets/cultural_docu.jpg",
  },
  {
    id: 3,
    title: "Exhibition & Gallery Films",
    description:
      "Films created to accompany exhibitions — including walkthroughs, installation documentation, and contextual films that support how a body of work is experienced in space.",
    category: "03",
    image: "assets/exhibiton_galler.jpg",
  },
  {
    id: 4,
    title: "Short-Form & Vertical Stories",
    description:
      "Digital-first films designed for smaller frames and shorter durations — adapting storytelling to contemporary platforms without losing emotional depth, authorship, or intent.",
    category: "04",
    image: "assets/short_form.jpg",
  },
  {
    id: 5,
    title: "Brand Narratives (Culture-Led)",
    description:
      "Meticulous color grading, editing, and visual effects that transform raw footage into cinematic art.",
    category: "05",
    image: "assets/branded_narrative.jpg",
  },
  {
    id: 6,
    title: "Treatment Notes & Narrative Development",
    description:
      "Narrative and visual treatments developed for commissioned films, including advertising work. These outline tone, structure, and cinematic approach — serving as a bridge between intention and execution.",
    category: "06",
    image: "assets/decks.jpg",
  },
];

/* ---------------- SERVICE CARD ---------------- */

const ServiceCard = ({ service, index, activeIndex, isMobile }) => {
  const distance = index - activeIndex;
  const isActive = Math.abs(distance) < 0.5;
  const cardHeight = isMobile ? 320 : CARD_HEIGHT;
  const cardGap = isMobile ? 16 : CARD_GAP;

  return (
    <motion.div
      className={`absolute left-0 right-0 ${isMobile ? 'px-4' : 'px-6'}`}
      style={{
        height: cardHeight,
        zIndex: 10 - Math.abs(distance),
      }}
      animate={{
        y: distance * (cardHeight + cardGap),
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.5,
        filter: `blur(${Math.abs(distance) * 4}px)`,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-lg mx-auto h-full rounded-lg overflow-hidden backdrop-blur-sm" style={{ backgroundColor: '#D3A345', border: '2px solid #650B0F' }}>
        <div className={`flex h-full ${isMobile ? 'flex-col' : ''}`}>
          <div className={`${isMobile ? 'w-full h-32' : 'w-2/5 h-full'}`}>
            <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
          </div>
          <div className={`flex-1 ${isMobile ? 'p-4' : 'p-5'} flex flex-col justify-center`}>
            <span className={`${isMobile ? 'text-xs' : 'text-xs'} tracking-widest mb-2`} style={{ color: '#650B0F', fontFamily: "'Avenir', sans-serif", fontWeight: 400 }}>
              {service.category}
            </span>
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} mb-2`} style={{ color: '#650B0F', fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}>{service.title}</h3>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'}`} style={{ color: '#f8e6d2', fontFamily: "'Avenir', sans-serif", fontWeight: 400 }}>{service.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- SERVICE SECTION ---------------- */

const ServiceSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 1000
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  /* MATCH PROJECTSECTION HEIGHT LOGIC */
  useEffect(() => {
    const calculateHeight = () => {
      const viewportH = window.innerHeight;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const scrollLength = (services.length + 1) * viewportH * 0.8;
      setContainerHeight(viewportH + scrollLength);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  /* SCROLL → PROGRESS */
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollStart = Math.max(0, -rect.top);
      const scrollEnd = Math.max(1, containerHeight - viewportH);

      const progress = Math.min(1, scrollStart / scrollEnd);
      setScrollProgress(progress);

      const index = Math.floor(Math.min(
        services.length - 1,
        Math.max(0, progress * services.length)
      ));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [containerHeight]);

  const showFixed = scrollProgress > 0 && scrollProgress < 1;

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${containerHeight}px` }}
    >
      {/* FIXED VIEWPORT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: showFixed ? 1 : 0,
          y: showFixed ? 0 : 40,
        }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          pointerEvents: showFixed ? "auto" : "none",
        }}
      >
        {/* Blurred backdrop matching active service */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.img
            key={activeIndex}
            src={services[activeIndex]?.image}
            alt={services[activeIndex]?.title || 'Backdrop'}
            className="w-full h-full object-cover scale-110"
            style={{ filter: 'blur(25px)', opacity: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(101, 11, 15, 0.1)' }} />
        </div>
        
        <div className={`h-full flex relative z-10 ${isMobile ? 'flex-col' : ''}`}>
          {/* LEFT */}
          <div className={`${isMobile ? 'w-full h-auto pt-12 pb-8' : 'w-1/2 h-full'} flex flex-col justify-center ${isMobile ? 'px-6 text-center items-center' : 'px-20'}`}>
            <span className="text-xs tracking-widest mb-6" style={{ color: '#d3a345', fontFamily: "'Avenir', sans-serif", fontWeight: 400 }}>
              Services
            </span>
            <h2 className={`${isMobile ? 'text-4xl' : 'text-6xl'} mb-6`} style={{ 
              color: '#d3a345', 
              fontFamily: "'Bebas Neue', sans-serif", 
              fontWeight: 400,
              fontStyle: 'normal',
              fontStretch: 'normal',
              letterSpacing: 'normal',
              textTransform: 'uppercase'
            }}>
              WHAT <br />
              WE DO
            </h2>
            <p className={`max-w-sm ${isMobile ? 'text-center' : ''}`} style={{ color: '#d3a345', fontFamily: "'Avenir', sans-serif", fontWeight: 400 }}>
              We work across film, documentation, and cultural storytelling — creating work that is research-led, visually grounded, and shaped from inside the worlds it documents.
            </p>
          </div>

          {/* RIGHT */}
          <div className={`${isMobile ? 'w-full flex-1' : 'w-1/2 h-full'} flex items-center justify-center relative`}>
            <div className="relative w-full" style={{ height: isMobile ? 320 : CARD_HEIGHT }}>
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  activeIndex={activeIndex}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceSection;