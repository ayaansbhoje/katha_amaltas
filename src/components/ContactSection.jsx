import { useEffect, useRef, useState } from "react";
import { Mail, Instagram, Facebook, Youtube, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);
  const [iconsVisible, setIconsVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const containerRef = useRef(null);
  const iconsRef = useRef(null);

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
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
      ([entry]) => {
        if (entry.isIntersecting) setIconsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (iconsRef.current) observer.observe(iconsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);

    emailjs
      .send(
        "service_s7aweyq",
        "template_syyidau",
        formData,
        "VjQrxIZAjakV8U8-j"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({
            from_name: "",
            from_email: "",
            message: "",
          });
          setIsSending(false);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Please try again.");
          setIsSending(false);
        }
      );
  };

  const generateWavePath = (phase) => {
    const width = 1000;
    const centerY = 120;
    const amplitude = 60;
    let path = `M 0 ${centerY}`;
    for (let x = 0; x <= width; x += 2) {
      const normalizedX = x / width;
      const waveY =
        centerY - Math.cos(normalizedX * Math.PI * 2 + phase) * amplitude;
      path += ` L ${x} ${waveY}`;
    }
    return path;
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 text-white relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="assets/CONTACT_SECTION.mov" type="video/mp4" />
      </video>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* LEFT */}
        <div>
          <div
            ref={containerRef}
            className="w-full flex justify-start items-center mb-6 -ml-12"
          >
            <svg viewBox="0 0 1000 200" className="w-full">
              <defs>
                <path id="wavePath" d={generateWavePath(wavePhase)} />
              </defs>
              <text
                fill="#FFF6D0"
                fontSize="120"
                fontFamily="Bebas Neue, sans-serif"
              >
                <textPath
                  href="#wavePath"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Let's Connect
                </textPath>
              </text>
            </svg>
          </div>

          <div className="flex flex-col gap-6 mb-8">
            <span style={{ color: "#FFF6D0" }}>
              Have a film, exhibition, or cultural project in mind?
            </span>

            <div className="flex gap-3">
              <Mail className="w-5 h-5" style={{ color: "#FFF6D0" }} />
              <span style={{ color: "#FFF6D0" }}>hello@portfolio.com</span>
            </div>

            <div className="flex gap-3">
              <MapPin className="w-5 h-5" style={{ color: "#FFF6D0" }} />
              <span style={{ color: "#FFF6D0" }}>
                Mumbai & Chandigarh, India
              </span>
            </div>
          </div>

          <div ref={iconsRef} className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a key={index} href={social.href} target="_blank">
                  <Icon style={{ color: "#FFF6D0" }} />
                </a>
              );
            })}
          </div>
        </div>

        {/* RIGHT – FORM */}
        <div className="p-6 rounded-2xl backdrop-blur-xl border border-white/30">
          <h2
            className="mb-5 text-2xl"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FFF6D0" }}
          >
            Fill the form. We'll get back within 24 hours.
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              className="w-full p-2 rounded bg-transparent border text-white"
            />

            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleInputChange}
              placeholder="Your email address"
              required
              className="w-full p-2 rounded bg-transparent border text-white"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project..."
              required
              rows={3}
              className="w-full p-2 rounded bg-transparent border text-white"
            />

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2 rounded border transition-all"
              style={{
                backgroundColor: isSending ? "#444" : "#91222c",
                color: "#FFF6D0",
              }}
            >
              {isSending ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
