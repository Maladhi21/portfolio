import { useState, useEffect } from 'react';
import ThreeBg from './components/ThreeBg';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

// Import image assets processed by Vite build pipeline
import profileAvatar from './assets/images/profile_avatar_1783573356399.jpg';
import bloodBankImg from './assets/images/blood_bank_project_1783573402233.jpg';
import aiResumeImg from './assets/images/ai_resume_project_1783573417638.jpg';
import agricultureImg from './assets/images/agriculture_project_1783573437126.jpg';
import stockImg from './assets/images/stock_project_1783573453385.jpg';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Apply light/dark theme class to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [darkMode]);

  const projectImages = {
    bloodBank: bloodBankImg,
    aiResume: aiResumeImg,
    agriculture: agricultureImg,
    stock: stockImg,
  };

  return (
    <div className="portfolio-app">
      {/* Three.js interactive 3D particle constellation */}
      <ThreeBg />

      {/* Sticky Glass Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Sections */}
      <main>
        {/* Hero Banner with typing effect */}
        <Hero avatarPath={profileAvatar} />

        {/* Chronological Timeline & Intro */}
        <About />

        {/* 3D auto-rotating cylinder carousel */}
        <Skills />

        {/* Grid of professional services */}
        <Services />

        {/* Project display covers */}
        <Projects projectImages={projectImages} />

        {/* Infinite looping certificates track & fullscreen zoom modals */}
        <Certificates />

        {/* Contact info list and interactive submission form */}
        <Contact />
      </main>
    </div>
  );
}
