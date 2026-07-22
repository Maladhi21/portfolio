import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, HelpCircle, Star, Sparkles, BookOpen, Layers } from 'lucide-react';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaGitAlt 
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { SiExpress, SiMongodb } from 'react-icons/si';

interface SkillDetail {
  name: string;
  level: number;
  description: string;
  topics: string[];
}

export default function Skills() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const startRotation = useRef(0);
  const pointerDownTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const skillsData = [
    { 
      name: 'HTML5', 
      icon: FaHtml5, 
      color: '#E34F26',
      level: 95,
      description: 'Expertise in modern semantic structures, standard structural markup, web accessibility (W3C a11y) standards, meta SEO tagging protocols, and deep integration of rich multimedia components.',
      topics: ['Semantic Elements', 'Web Accessibility (a11y)', 'SEO Metadata Rules', 'Form Controls', 'Canvas API']
    },
    { 
      name: 'CSS3', 
      icon: FaCss3Alt, 
      color: '#1572B6',
      level: 90,
      description: 'Advanced responsive design architectures, highly complex layout generation using Grid & Flexbox, micro-interaction animations, custom property styling, and tailwind theme optimizations.',
      topics: ['Grid & Flexbox Layouts', 'Keyframe Animations', 'Custom Properties', 'Media Queries', 'Glassmorphism Effects']
    },
    { 
      name: 'JavaScript', 
      icon: IoLogoJavascript, 
      color: '#F7DF1E',
      level: 92,
      description: 'Mastery in building client-side dynamic scripts using modern ES6+ paradigms, optimizing asynchronous request architectures (Promises/Async-Await), event cycle mechanics, and DOM structures manipulation.',
      topics: ['Asynchronous Actions', 'Closures & Scopes', 'DOM Operations', 'ES6+ Standards', 'Event-Driven Flows']
    },
    { 
      name: 'React', 
      icon: FaReact, 
      color: '#61DAFB',
      level: 94,
      description: 'Developing declarative, efficient single-page dynamic interfaces. Well versed in context states management, hook lifecycle flow, performance memoization (useMemo, useCallback), and standard state updates.',
      topics: ['Hooks Lifecycle (useEffect)', 'Context State System', 'Custom React Hooks', 'Render Optimizations', 'Component Modularization']
    },
    { 
      name: 'Node.js', 
      icon: FaNodeJs, 
      color: '#339933',
      level: 85,
      description: 'Constructing robust, scalable, and lightweight event-driven servers. Managing process requests, asynchronous filesystem streams, security authentications, and REST API controllers.',
      topics: ['Event Loop Execution', 'FileSystem Streams', 'NPM Architecture', 'Authentication logic', 'Server Scaling']
    },
    { 
      name: 'Express.js', 
      icon: SiExpress, 
      color: '#828282',
      level: 88,
      description: 'Expertise in server-side routing paradigms, customized middleware pipelines, deep database controller integration, endpoint validation schemas, and API request-response structures.',
      topics: ['Route Handlers & MVC', 'Custom Middlewares', 'Error Filter Rules', 'API Routing & Gateways', 'CORS & Security Headers']
    },
    { 
      name: 'MongoDB', 
      icon: SiMongodb, 
      color: '#47A248',
      level: 82,
      description: 'Experience in NoSQL non-relational document model databases. Building validation schemas, performing advanced queries aggregation pipeline operations, indexing properties, and scaling transactions.',
      topics: ['Document Modeling', 'Aggregation Queries', 'Schema Validations', 'Mongoose Integration', 'Index Performance']
    },
    { 
      name: 'Python', 
      icon: FaPython, 
      color: '#3776AB',
      level: 80,
      description: 'Utilizing clean, structured coding structures for custom data operations, file automation scripting, external AI neural model configurations, and backend script processing.',
      topics: ['Data Processing Scripts', 'File Automation APIs', 'NLP Parsing Libraries', 'OOP Structures', 'AI Pipeline Hooks']
    },
    { 
      name: 'Java', 
      icon: FaJava, 
      color: '#007396',
      level: 78,
      description: 'Building strongly typed, highly modular applications leveraging Object Oriented Programming concepts, collections API utilities, concurrent multithreading rules, and file I/O operations.',
      topics: ['Object-Oriented Design', 'Collections Interface', 'Multi-Thread Execution', 'Algorithm Mechanics', 'Data Formats Parsing']
    },
    { 
      name: 'Git', 
      icon: FaGitAlt, 
      color: '#F05032',
      level: 85,
      description: 'Professional experience with distributed version controls. Standardizing commit trees, staging patches, merging branches, rebasing, and resolving tricky conflicts in workflows.',
      topics: ['Branching (GitFlow)', 'Rebase Workflows', 'Commit Management', 'Staging Protocols', 'Merge Conflict Resolution']
    },
  ];

  const [selectedSkill, setSelectedSkill] = useState(skillsData[0]);

  const totalSkills = skillsData.length;
  // Radius of the 3D circle - dynamic based on screen size
  const [radius, setRadius] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setRadius(180);
      } else if (window.innerWidth < 900) {
        setRadius(240);
      } else {
        setRadius(320);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotation loop
  useEffect(() => {
    const updateRotation = () => {
      if (!isHovered && !isDragging) {
        setRotation((prev) => (prev + 0.18) % 360);
      }
      animationFrameId.current = requestAnimationFrame(updateRotation);
    };

    animationFrameId.current = requestAnimationFrame(updateRotation);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovered, isDragging]);

  // Pointer interactions for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    pointerDownTime.current = Date.now();
    startRotation.current = rotation;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    // Map horizontal drag delta to angular rotation (sensitivity)
    const deltaAngle = (deltaX / window.innerWidth) * 180;
    setRotation((startRotation.current + deltaAngle) % 360);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // If click duration was short and movement was minor, treat it as a tap/click selection!
    const clickDuration = Date.now() - pointerDownTime.current;
    const dragDistance = Math.abs(e.clientX - dragStartX.current);

    if (clickDuration < 300 && dragDistance < 8) {
      // Find which card was clicked using pointer target or coordinate detection
      const cardElement = (e.target as HTMLElement).closest('.skills-carousel-card');
      if (cardElement) {
        const skillName = cardElement.getAttribute('data-skill-name');
        const found = skillsData.find(s => s.name === skillName);
        if (found) {
          setSelectedSkill(found);
          
          // Gently auto-align the selected card toward the front of the screen
          const index = skillsData.findIndex(s => s.name === found.name);
          const targetAngle = -((360 / totalSkills) * index);
          // Animate rotation to align nicely
          setRotation(targetAngle);
        }
      }
    }
  };

  const selectSkillDirectly = (skillName: string) => {
    const found = skillsData.find(s => s.name === skillName);
    if (found) {
      setSelectedSkill(found);
      const index = skillsData.findIndex(s => s.name === found.name);
      const targetAngle = -((360 / totalSkills) * index);
      setRotation(targetAngle);
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-icon">
            <Code size={28} />
          </div>
          <h2 className="section-title">My Skills</h2>
        </div>

        {/* 3D Skill Carousel Container */}
        <div 
          className="glass-panel"
          style={{ 
            padding: '50px 24px', 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <div 
            className="skills-carousel-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* The 3D Rotating Stage */}
            <div 
              className="skills-stage"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{
                transform: `rotateY(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}
            >
              {skillsData.map((skill, index) => {
                const angle = (360 / totalSkills) * index;
                // Calculate position around Y-cylinder
                const cardTransform = `rotateY(${angle}deg) translateZ(${radius}px)`;

                const IconComponent = skill.icon;
                const isSelected = selectedSkill.name === skill.name;

                return (
                  <div
                    key={skill.name}
                    className={`skills-carousel-card ${isSelected ? 'active-skill-card' : ''}`}
                    data-skill-name={skill.name}
                    style={{
                      transform: cardTransform,
                      borderColor: isSelected ? skill.color : 'rgba(0, 217, 255, 0.15)',
                      boxShadow: isSelected ? `0 0 35px ${skill.color}80, inset 0 0 15px ${skill.color}30` : '',
                      cursor: 'pointer'
                    }}
                  >
                    <div 
                      className="skill-icon-wrapper" 
                      style={{ 
                        color: skill.color,
                        filter: `drop-shadow(0 0 12px ${skill.color}60)`
                      }}
                    >
                      <IconComponent />
                    </div>
                    <span className="skill-card-name" style={{ color: 'var(--text-primary)' }}>
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="skills-carousel-hint" style={{ marginBottom: '30px' }}>
            <HelpCircle size={16} className="text-cyan" />
            <span>Interactive 3D Stage • Drag to Spin • Click any Card to select it</span>
          </div>

          {/* Quick Tab Select Bar for convenience */}
          <div 
            className="skills-quick-tabs"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '800px',
              padding: '16px',
              borderTop: '1px solid rgba(0, 217, 255, 0.08)',
              marginTop: '10px'
            }}
          >
            {skillsData.map((s) => (
              <button
                key={s.name}
                className="skill-quick-tab-btn"
                style={{
                  background: selectedSkill.name === s.name ? `${s.color}20` : 'rgba(255, 255, 255, 0.02)',
                  color: selectedSkill.name === s.name ? '#ffffff' : 'var(--text-secondary)',
                  border: `1.5px solid ${selectedSkill.name === s.name ? s.color : 'rgba(255, 255, 255, 0.08)'}`,
                  padding: '8px 16px',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedSkill.name === s.name ? `0 0 15px ${s.color}30` : 'none'
                }}
                onClick={() => selectSkillDirectly(s.name)}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Knowledge Details Panel (Appears smoothly below) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                width: '100%',
                maxWidth: '850px',
                marginTop: '40px',
                background: 'var(--glass-bg)',
                border: `1.5px solid ${selectedSkill.color}55`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.15), 0 0 25px ${selectedSkill.color}15`,
                borderRadius: '24px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative accent element */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: selectedSkill.color,
                  boxShadow: `0 0 15px ${selectedSkill.color}`
                }}
              />

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '24px'
                }}
              >
                {/* Core header metadata */}
                <div>
                  <div className="skill-detail-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '2.5rem', color: selectedSkill.color, display: 'flex', alignItems: 'center' }}>
                        {React.createElement(selectedSkill.icon)}
                      </span>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                          {selectedSkill.name}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Sparkles size={12} style={{ color: selectedSkill.color }} /> Full-Stack Ecosystem Expertise
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: selectedSkill.color, textShadow: `0 0 10px ${selectedSkill.color}50` }}>
                        {selectedSkill.level}%
                      </span>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
                        Expertise Level
                      </div>
                    </div>
                  </div>

                  {/* Sleek Dynamic Custom Glowing Progress Bar */}
                  <div 
                    style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(var(--text-secondary-rgb, 128, 128, 128), 0.15)',
                      borderRadius: '10px',
                      marginTop: '20px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${selectedSkill.color}80, ${selectedSkill.color})`,
                        borderRadius: '10px',
                        boxShadow: `0 0 12px ${selectedSkill.color}`
                      }}
                    />
                  </div>
                </div>

                {/* Info Columns: Description & Key Topics */}
                <div 
                  style={{
                    borderTop: '1.5px solid rgba(0, 217, 255, 0.08)',
                    paddingTop: '24px'
                  }}
                  className="skills-details-grid-responsive"
                >
                  {/* Left Desc */}
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 600 }}>
                      <BookOpen size={16} style={{ color: selectedSkill.color }} /> Description
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {selectedSkill.description}
                    </p>
                  </div>

                  {/* Right Core Sub-topics */}
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 600 }}>
                      <Layers size={16} style={{ color: selectedSkill.color }} /> Core Competencies
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedSkill.topics.map((topic, i) => (
                        <div 
                          key={topic} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            background: 'rgba(var(--neon-cyan-rgb), 0.04)',
                            border: '1.5px solid rgba(var(--neon-cyan-rgb), 0.08)',
                            padding: '6px 12px',
                            borderRadius: '10px',
                            fontSize: '0.85rem'
                          }}
                        >
                          <Star size={12} style={{ color: selectedSkill.color, fill: selectedSkill.color }} />
                          <span style={{ color: 'var(--text-secondary)' }}>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
