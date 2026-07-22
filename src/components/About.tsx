import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { TimelineItem } from '../types';

export default function About() {
const timelineData: TimelineItem[] = [
  {
    id: '1',
    year: '2023',
    title: 'Started My Engineering Journey',
    description:
      'Started my B.E. Computer Science and Engineering at Akshaya College of Engineering and Technology and built a strong foundation in programming and web technologies.',
  },
  {
    id: '2',
    year: '2024',
    title: 'Frontend Development',
    description:
      'Learned HTML, CSS, JavaScript, React.js, and Tailwind CSS by developing responsive and interactive web applications.',
  },
  {
    id: '3',
    year: '2025',
    title: 'Full Stack Development',
    description:
      'Expanded my skills with Node.js, Express.js, MongoDB, REST APIs, authentication, and deployed full-stack projects using Vercel and Render.',
  },
  {
    id: '4',
    year: '2026',
    title: 'Building Real-World Projects',
    description:
      'Developed projects including an AI Resume Analyzer and Blood Donation Management System while preparing for software engineering opportunities.',
  },
];
  const handleLearnMore = () => {
    const el = document.getElementById('contact');
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
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-icon">
            <User size={28} />
          </div>
          <h2 className="section-title">About Me</h2>
        </div>

        {/* About Glass Card Layout */}
        <motion.div
          className="glass-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="about-grid">
            {/* Left Column: Paragraphs */}
            <div className="about-intro-col">
              <h3 className="about-subtitle text-cyan">Passion-Driven Full Stack Developer</h3>
              <p className="about-p">
                I'm a passionate Full Stack Developer who loves coding, solving complex programmatic challenges, and engineering real-world solutions that make an impact.
              </p>
              <p className="about-p">
                I enjoy turning abstract concepts into beautiful, fluid, and highly interactive functional web experiences. Combining clean architectural design with modern technologies is what drives me.
              </p>
              <button
                id="about-know-more-btn"
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', marginTop: '16px' }}
                onClick={handleLearnMore}
              >
                Know More
              </button>
            </div>

            {/* Right Column: Timeline */}
            <div className="timeline-container">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="timeline-item"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
