import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARD_HEIGHT = 380;
const CARD_GAP = 24;

const services = [
  {
    id: 1,
    title: "Artist Films",
    description:
      " Intimate film portraits that document an artist's practice, process, and thinking. These films are built through listening, observation, and time — allowing the work to speak without performance or simplification.",
    category: "01",
    image: "/assets/service_1.webp",
  },
  {
    id: 2,
    title: "Cultural Documentaries",
    description:
      "Short-form and long-form documentaries focused on culture as it is lived — across people, spaces, traditions, and contemporary practice.",
    category: "02",
    image: "/assets/service_2.webp",
  },
  {
    id: 3,
    title: "Exhibition & Gallery Films",
    description:
      "Films created to accompany exhibitions — including walkthroughs, installation documentation, and contextual films that support how a body of work is experienced in space.",
    category: "03",
    image: "/assets/service_3.webp",
  },
  {
    id: 4,
    title: "Short-Form & Vertical Stories",
    description:
      "Digital-first films designed for smaller frames and shorter durations — adapting storytelling to contemporary platforms without losing emotional depth, authorship, or intent.",
    category: "04",
    image: "/assets/service_4.webp",
  },
  {
    id: 5,
    title: "Brand Narratives (Culture-Led)",
    description:
      "Meticulous color grading, editing, and visual effects that transform raw footage into cinematic art.",
    category: "05",
    image: "/assets/service_5.webp",
  },
  {
    id: 6,
    title: "Treatment Notes & Narrative Development",
    description:
      "Narrative and visual treatments developed for commissioned films, including advertising work. These outline tone, structure, and cinematic approach — serving as a bridge between intention and execution.",
    category: "06",
    image: "/assets/service_6.webp",
  },
];

/* ---------------- SERVICE CARD (DESKTOP — UNCHANGED) ---------------- */

const ServiceCard = ({ service, index, activeIndex, isMobile }) => {
  const distance = index - activeIndex;
  const isActive = Math.abs(distance) < 0.5;
  const cardHeight = isMobile ? 320 : CARD_HEIGHT;
  const cardGap = isMobile ? 16 : CARD_GAP;

  return (
    <motion.div
      className={`absolute left-0 right-0 ${isMobile ? "px-4" : "px-6"}`}
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
      <div
        className="w-full max-w-lg mx-auto h-full rounded-lg overflow-hidden backdrop-blur-sm"
        style={{ backgroundColor: "#D3A345" }}
      >
        <div className="flex h-full flex-col ">
          <div className={`w-full ${isMobile ? "h-32" : "h-58"}`}>
            <img
              src={service.image}
              className="w-full h-full object-cover rounded-t-lg"
              alt={service.title}
            />
          </div>
          <div
            className={`flex-1 ${isMobile ? "p-4" : "p-5"} flex flex-col justify-center`}
          >
            <span
              className="text-xs tracking-widest mb-2"
              style={{
                color: "#650B0F",
                fontFamily: "'Avenir', sans-serif",
                fontWeight: 400,
              }}
            >
              {service.category}
            </span>
            <h3
              className={`${isMobile ? "text-lg" : "text-xl"} mb-2`}
              style={{
                color: "#650B0F",
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
              }}
            >
              {service.title}
            </h3>
            <p
              className={`${isMobile ? "text-xs" : "text-sm"}`}
              style={{
                color: "#f8e6d2",
                fontFamily: "'Avenir', sans-serif",
                fontWeight: 400,
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- DESKTOP SERVICE SECTION (UNCHANGED) ---------------- */

const DesktopServiceSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 1000
  );

  useEffect(() => {
    const calculateHeight = () => {
      const viewportH = window.innerHeight;
      const scrollLength = (services.length + 1) * viewportH * 0.8;
      setContainerHeight(viewportH + scrollLength);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollStart = Math.max(0, -rect.top);
      const scrollEnd = Math.max(1, containerHeight - viewportH);

      const progress = Math.min(1, scrollStart / scrollEnd);
      setScrollProgress(progress);

      const index = Math.floor(
        Math.min(services.length - 1, Math.max(0, progress * services.length))
      );
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
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.img
            key={activeIndex}
            src={services[activeIndex]?.image}
            alt={services[activeIndex]?.title || "Backdrop"}
            className="w-full h-full object-cover scale-110"
            style={{ filter: "blur(12px)", opacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="h-full flex relative z-10">
          <div className="w-1/2 h-full flex flex-col justify-center px-20">
            <span
              className="text-xs tracking-widest mb-6"
              style={{
                color: "#d3a345",
                fontFamily: "'Avenir', sans-serif",
                fontWeight: 400,
              }}
            >
              Services
            </span>
            <h2
              className="text-6xl mb-6"
              style={{
                color: "#d3a345",
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontStretch: "normal",
                letterSpacing: "normal",
                textTransform: "uppercase",
              }}
            >
              WHAT <br />
              WE DO
            </h2>
            <p
              className="max-w-sm"
              style={{
                color: "#d3a345",
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: 400,
              }}
            >
              We work across film, documentation, and cultural storytelling —
              creating work that is research-led, visually grounded, and shaped
              from inside the worlds it documents.
            </p>
          </div>

          <div className="w-1/2 h-full flex items-center justify-center relative">
            <div
              className="relative w-full"
              style={{ height: CARD_HEIGHT }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  activeIndex={activeIndex}
                  isMobile={false}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- MOBILE SERVICE SECTION (NEW — STILL CAROUSEL) ---------------- */

const MobileServiceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((p) => (p === 0 ? services.length - 1 : p - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((p) => (p === services.length - 1 ? 0 : p + 1));
  };

  const activeService = services[activeIndex];

  return (
    <section className="relative bg-black py-12 overflow-hidden">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          key={`bg-${activeIndex}`}
          src={activeService.image}
          alt=""
          className="w-full h-full object-cover scale-110"
          style={{ filter: "blur(12px)", opacity: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span
          className="text-[10px] tracking-widest mb-3"
          style={{
            color: "#d3a345",
            fontFamily: "'Avenir', sans-serif",
            fontWeight: 400,
          }}
        >
          Services
        </span>
        <h2
          className="text-3xl mb-3"
          style={{
            color: "#d3a345",
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          WHAT WE DO
        </h2>
        <p
          className="max-w-xs text-[11px] mb-8 leading-relaxed"
          style={{
            color: "#d3a345",
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          We work across film, documentation, and cultural storytelling —
          creating work that is research-led, visually grounded, and shaped from
          inside the worlds it documents.
        </p>

        {/* Carousel */}
        <div className="relative w-full flex items-center justify-center min-h-[280px]">
          <button
            onClick={handlePrev}
            className="absolute left-1 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md"
            style={{ backgroundColor: "#D3A345", color: "#650B0F" }}
            aria-label="Previous service"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="w-full max-w-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: "#D3A345" }}
              >
                <div className="w-full h-28">
                  <img
                    src={activeService.image}
                    className="w-full h-full object-cover"
                    alt={activeService.title}
                  />
                </div>
                <div className="p-3 flex flex-col text-left">
                  <span
                    className="text-[9px] tracking-widest mb-1"
                    style={{
                      color: "#650B0F",
                      fontFamily: "'Avenir', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {activeService.category}
                  </span>
                  <h3
                    className="text-sm mb-1.5 leading-tight"
                    style={{
                      color: "#650B0F",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {activeService.title}
                  </h3>
                  <p
                    className="text-[10px] leading-snug"
                    style={{
                      color: "#f8e6d2",
                      fontFamily: "'Avenir', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {activeService.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-1 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md"
            style={{ backgroundColor: "#D3A345", color: "#650B0F" }}
            aria-label="Next service"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-1.5 mt-6 items-center">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  idx === activeIndex ? "#d3a345" : "rgba(211, 163, 69, 0.3)",
                width: idx === activeIndex ? "18px" : "6px",
                height: "6px",
              }}
              aria-label={`Go to service ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- MAIN EXPORT (BRANCHES BY VIEWPORT) ---------------- */

const ServiceSection = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileServiceSection /> : <DesktopServiceSection />;
};

export default ServiceSection;