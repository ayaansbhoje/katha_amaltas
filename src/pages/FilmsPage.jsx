import React from 'react';
import Navbar from '../components/Navbar';

const FilmsPage = () => {

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 text-white relative overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/film_sec.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility (optional) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Coming Soon Text */}
      <div className="relative z-10 w-full max-w-7xl flex justify-center items-center">
        <h1 
          className="text-8xl md:text-9xl"
          style={{ 
            fontFamily: "Bebas Neue, sans-serif",
            color: "#FFF6D0"
          }}
        >
          Coming Soon
        </h1>
      </div>
    </section>
  );
};

export default FilmsPage;