import { useEffect, useState } from "react";

const ParallaxStory = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set([0]));

  // Sample data - replace with your own content
  const sections = [
    {
      title: "The Journey Begins",
      images: [
        { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", alt: "Mountain landscape" },
        { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", alt: "Forest path" }
      ]
    },
    {
      title: "Discovery and Wonder",
      images: [
        { src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop", alt: "Ocean waves" }
      ]
    },
    {
      title: "The Final Chapter",
      images: [
        { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop", alt: "Sunset" },
        { src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop", alt: "Night sky" }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    sections.forEach((_, index) => {
      const sectionStart = index * windowHeight * 1.5;
      if (scrollY > sectionStart - windowHeight * 0.5) {
        setVisibleSections(prev => new Set([...prev, index]));
      }
    });
  }, [scrollY, sections]);

  return (
    <>
      <style>
        {`
          .story-container {
            background: linear-gradient(180deg, hsl(220, 20%, 4%) 0%, hsl(240, 25%, 8%) 100%);
            min-height: 100vh;
          }
          
          .story-title {
            font-family: var(--font-aboreto, 'Aboreto', serif) !important;
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 400 !important;
            line-height: 1.1;
            color: hsl(60, 10%, 95%);
          }
          
          .story-title *,
          .story-word {
            font-family: var(--font-aboreto, 'Aboreto', serif) !important;
            font-weight: 400 !important;
            text-shadow: 0 0 80px hsl(45, 100%, 50%, 0.3);
          }
          
          .story-image {
            box-shadow: 0 25px 50px -12px hsl(220, 20%, 4%, 0.8), 0 0 100px hsl(45, 100%, 50%, 0.15);
          }
          
          .story-image-glow {
            background: radial-gradient(ellipse at center, hsl(45, 100%, 50%, 0.2) 0%, transparent 70%);
          }
        `}
      </style>

      <div className="story-container">
        {sections.map((section, sectionIndex) => {
          const sectionHeight = window.innerHeight * 1.5;
          const sectionStart = sectionIndex * sectionHeight;
          const localScroll = Math.max(0, scrollY - sectionStart);
          const progress = Math.min(1, localScroll / (sectionHeight * 0.8));
          
          const headerParallax = progress * 0.8;
          const blurAmount = Math.min(progress * 12, 12);
          const isVisible = visibleSections.has(sectionIndex);
          const isSingleImage = section.images.length === 1;

          return (
            <section
              key={sectionIndex}
              className="story-section relative"
              style={{ height: `${sectionHeight}px` }}
            >
              {/* Header Layer - 80% speed */}
              <div
                className="sticky top-0 flex h-screen items-center justify-center px-4"
                style={{
                  transform: `translateY(${headerParallax * -100}px) scale(${1 - progress * 0.15})`,
                  filter: `blur(${blurAmount}px)`,
                  opacity: Math.max(0, 1 - progress * 1.2),
                  zIndex: 10,
                }}
              >
                <h1 
                  className="story-title max-w-5xl text-center"
                  style={{ fontFamily: "var(--font-aboreto, 'Aboreto', serif)", fontWeight: 400 }}
                >
                  {section.title.split(" ").map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className={`story-word inline-block transition-all duration-700 ease-out ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{
                        transitionDelay: `${wordIndex * 100 + 200}ms`,
                        fontFamily: "var(--font-aboreto, 'Aboreto', serif)",
                        fontWeight: 400,
                      }}
                    >
                      {word}
                      {wordIndex < section.title.split(" ").length - 1 && "\u00A0"}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Image Layer - 110% speed */}
              <div
                className="sticky top-0 flex h-screen items-center justify-center pointer-events-none"
                style={{
                  transform: `translateY(${(1 - progress * 1.1) * 80}vh)`,
                  opacity: Math.min(1, progress * 2),
                  zIndex: 20,
                }}
              >
                <div className={`flex items-center justify-center gap-4 md:gap-8 px-4 w-full ${
                  isSingleImage ? "max-w-4xl" : "max-w-6xl"
                }`}>
                  {section.images.map((image, imageIndex) => {
                    const imageOffset = isSingleImage ? 0 : (imageIndex === 0 ? -20 : 20);
                    const imageDelay = imageIndex * 0.1;
                    
                    return (
                      <div
                        key={imageIndex}
                        className={`story-image-wrapper relative ${
                          isSingleImage ? "w-full" : "w-1/2"
                        }`}
                        style={{
                          transform: `translateX(${imageOffset * progress}px) translateY(${imageDelay * (1 - progress) * 50}px)`,
                        }}
                      >
                        <div className="story-image-glow absolute inset-0 scale-110 blur-3xl opacity-40" />
                        <img
                          src={image.src}
                          alt={image.alt || "Story image"}
                          className="story-image relative w-full rounded-xl md:rounded-2xl object-cover shadow-2xl aspect-[4/3]"
                          style={{
                            transform: `scale(${0.85 + progress * 0.15})`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default ParallaxStory;