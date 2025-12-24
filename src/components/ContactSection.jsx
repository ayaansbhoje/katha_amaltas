import { useEffect, useRef, useState } from 'react';
import { Mail, Instagram, Facebook, Youtube, MapPin } from 'lucide-react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);
  const [iconsVisible, setIconsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const containerRef = useRef(null);
  const iconsRef = useRef(null);
  const formRef = useRef(null);

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  // Wavy text animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setWavePhase((prev) => (prev + 0.015) % (Math.PI * 2));
    }, 16);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Icons animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIconsVisible(true); },
      { threshold: 0.3 }
    );
    if (iconsRef.current) observer.observe(iconsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const generateWavePath = (phase) => {
    const width = 1000;
    const centerY = 120;
    const amplitude = 60;
    let path = `M 0 ${centerY}`;
    for (let x = 0; x <= width; x += 2) {
      const normalizedX = x / width;
      const waveY = centerY - Math.cos(normalizedX * Math.PI * 2 + phase) * amplitude;
      path += ` L ${x} ${waveY}`;
    }
    return path;
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 text-white font-sans" style={{ backgroundColor: '#650B0F' }}>
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative">
        {/* Divider Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2"></div>
        
        {/* Left Side - Header, Subtext, Email, Icons */}
        <div className="flex flex-col">
          {/* Wavy Gradient Title */}
          <div ref={containerRef} className="w-full flex justify-start items-center overflow-visible mb-6" style={{ minHeight: '200px' }}>
            <svg viewBox="0 0 1000 200" className="w-full" preserveAspectRatio="xMidYMid meet"
              style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-out', overflow: 'visible' }}>
              <defs>
                <path id="wavePath" d={generateWavePath(wavePhase)} fill="none" />
              </defs>
              <text fill="#FFF6D0" fontSize="120" fontWeight="400" fontFamily="Aboreto, serif" letterSpacing="-0.03em">
                <textPath href="#wavePath" startOffset="50%" textAnchor="middle"> Let's Connect </textPath>
              </text>
            </svg>
          </div>

          {/* Email Section */}
          <div className="flex flex-col gap-4 mb-6">
            <span className="text-lg md:text-xl font-medium" style={{ color: '#FFF6D0' }}>Have a film, exhibition, or cultural project in mind?</span>
            <a href="mailto:hello@portfolio.com"
              className="flex items-center gap-3 px-6 py-3 transition-all duration-300 group w-fit">
              <Mail className="w-5 h-5" style={{ color: '#FFF6D0', filter: 'drop-shadow(0 0 1px rgba(145, 34, 44, 0.3))', animation: 'float 3s ease-in-out infinite' }} />
              <span className="font-medium" style={{ color: '#FFF6D0' }}>hello@portfolio.com</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#FFF6D0' }} />
              <div className="flex flex-col">
                <span className="text-lg" style={{ color: '#FFF6D0' }}>Based in Mumbai & Chandigarh,</span>
                <span className="text-lg" style={{ color: '#FFF6D0' }}>working across India & beyond</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div ref={iconsRef} className="flex flex-wrap gap-3 md:gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 social-icon-link"
                  style={{
                    opacity: iconsVisible ? 1 : 0,
                    transform: iconsVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.5)',
                    animation: iconsVisible ? `bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 150}ms forwards` : 'none',
                    borderColor: '#FFF6D0',
                    backgroundColor: '#FFF6D0',
                    transition: 'border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#FFF6D0';
                    e.currentTarget.style.borderColor = '#91222c';
                    e.currentTarget.style.backgroundColor = '#91222c';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(145, 34, 44, 0.5), 0 0 20px rgba(145, 34, 44, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#91222c';
                    e.currentTarget.style.borderColor = '#FFF6D0';
                    e.currentTarget.style.backgroundColor = '#FFF6D0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#91222c', transition: 'color 0.3s ease' }} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side - Cinematic Form */}
        <div ref={formRef} className="relative">
          <div className="relative p-5 md:p-6 rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: '#FFF6D0',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderColor: 'rgba(255, 246, 208, 0.5)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}>
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <h2 className="text-xl md:text-2xl font-medium mb-2 mb-5" style={{ fontFamily: 'Aboreto, serif', color: '#91222c' }}>
                fill the form. We'll get back within 24 hours.
              </h2>
              
              <div className="space-y-3.5">
                {/* Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-xs font-medium mb-1.5" style={{ color: '#91222c' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 border-2 rounded-lg placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 text-sm"
                    style={{ color: '#91222c', backgroundColor: '#FFF6D0', borderColor: '#D4C89A' }}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email ID Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-xs font-medium mb-1.5" style={{ color: '#91222c' }}>
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 border-2 rounded-lg placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 text-sm"
                    style={{ color: '#91222c', backgroundColor: '#FFF6D0', borderColor: '#D4C89A' }}
                    placeholder="Your email address"
                    required
                  />
                </div>

                {/* Query Field */}
                <div className="relative">
                  <label htmlFor="query" className="block text-xs font-medium mb-1.5" style={{ color: '#91222c' }}>
                    Query
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3.5 py-2 border-2 rounded-lg placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300 resize-none text-sm"
                    style={{ color: '#91222c', backgroundColor: '#FFF6D0', borderColor: '#D4C89A' }}
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-5 py-2.5 rounded-lg border-2 font-medium transition-all duration-300 relative overflow-hidden group text-sm"
                  style={{ 
                    color: '#91222c', 
                    backgroundColor: '#FFF6D0',
                    borderColor: '#D4C89A',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5A0A0D';
                    e.currentTarget.style.color = '#FFF6D0';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(90, 10, 13, 0.5), 0 0 20px rgba(90, 10, 13, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFF6D0';
                    e.currentTarget.style.color = '#91222c';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span className="relative z-10">Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright Text - Centered below divider */}
        <div className="col-span-1 lg:col-span-2 flex justify-center mt-12">
          <p className="text-sm" style={{ color: '#FFF6D0' }}>©2025kathaamaltas</p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateY(60px) scale(0.5); }
          60% { opacity: 1; transform: translateY(-15px) scale(1.1); }
          80% { transform: translateY(8px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        body {
          font-family: 'Syne', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;