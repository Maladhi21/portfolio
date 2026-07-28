import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Mail, ArrowRight, Download } from 'lucide-react';
import finalresumePdf from '../resume/finalresume.pdf';

interface HeroProps {
  avatarPath: string;
}

export default function Hero({ avatarPath }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ['Full Stack Developer', 'AI Enthusiast', 'MERN Developer'];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1800;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIdx];

    if (!isDeleting) {
      if (typedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        // Pause at full word before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      const offsetPosition = elPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

 

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Col */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-tagline">
              <span>Full Stack Developer</span>
            </div>
            
            <h1 className="hero-title">
              Hi, I'm <span className="text-cyan">Maladhi</span> M
            </h1>

            <div className="hero-subtitle">
              <span>{typedText}</span>
              <span className="typing-cursor" />
            </div>

            <p className="hero-desc">
              I build modern, responsive, and user-friendly web applications with clean code and great user experiences. Specializing in crafting intelligent, cloud-capable software leveraging cutting-edge web technologies.
            </p>

            <div className="hero-cta">
              <button
                id="hero-view-projects-btn"
                className="btn btn-primary"
                onClick={scrollToProjects}
              >
                View Projects <ArrowRight size={16} />
              </button>
              <a
                id="hero-download-resume-btn"
                href={finalresumePdf}
                download="Maladhi_M_Resume.pdf"
                className="btn btn-secondary"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>

            <div className="hero-socials">
              <a
                id="hero-social-github"
                href="https://github.com/Maladhi21"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                id="hero-social-linkedin"
                href="https://www.linkedin.com/in/m-maladhi-4a378b357/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                id="hero-social-instagram"
                href="https://instagram.com/maladhi_27"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                id="hero-social-email"
                href="mailto:markujulial5619@gmail.com"
                className="social-icon-btn"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right Image Col */}
          <motion.div
            className="hero-profile-container"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="hero-avatar-wrapper">
              <div className="hero-avatar-glowing-ring" />
              <div className="hero-avatar-outer-orbit" />
              <img
                src={avatarPath}
                alt="Maladhi M Profile Portrait"
                className="hero-avatar-img"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
