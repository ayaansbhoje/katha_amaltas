import React, { useState } from 'react';
import FilmPortfolioPreloader from '../components/FilmPortfolioPreloader';
import Navbar from '../components/Navbar';
import FilmStudioHero from '../components/FilmStudioHero';
import AboutUs from '../components/AboutUs';
import ProjectSection from '../components/ProjectSection';
import FilmDeck from '../components/FilmDeck';
import CinematicCarousel from '../components/CinematicCarousel';
import ServiceSection from '../components/ServiceSection';
import FilmGallery from '../components/FilmGallery';
import LayeredGallery from '../components/LayeredGallery';
import ContactSection from '../components/ContactSection';
import FilmProcessCycle from '../components/FilmProcessCycle';

const Home = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {loading && <FilmPortfolioPreloader onComplete={handlePreloaderComplete} />}

      {!loading && (
        <>
          <Navbar />
          <FilmStudioHero />
          <AboutUs />
          <ProjectSection />
          <FilmDeck />
          <CinematicCarousel />
          <ServiceSection />
          <FilmGallery />
          <LayeredGallery />
          <FilmProcessCycle />
          <ContactSection />
        </>
      )}
    </div>
  );
};

export default Home;