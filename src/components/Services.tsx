import { motion } from 'motion/react';
import { Layers, Cpu, Palette, MonitorSmartphone, Server } from 'lucide-react';
import { ServiceItem } from '../types';

export default function Services() {
  const servicesData: ServiceItem[] = [
    {
      id: 'fs',
      title: 'Full Stack Development',
      description: 'End-to-end web development using modern technologies. Robust MERN Stack (MongoDB, Express, React, Node.js) development with focus on scale.',
      icon: 'Layers',
    },
    {
      id: 'ai',
      title: 'AI Web Applications',
      description: 'Building intelligent and smart web applications powered by generative AI, large language models (LLMs), and cloud APIs.',
      icon: 'Cpu',
    },
    {
      id: 'ui',
      title: 'UI/UX Design',
      description: 'Designing clean, modern, high-fidelity user-friendly interfaces with intuitive user flows to elevate brand identity and digital engagement.',
      icon: 'Palette',
    },
    {
      id: 'rd',
      title: 'Responsive Website Development',
      description: 'Creating high-performance, pixel-perfect, and fully fluid websites that look stunning and load fast across all devices, screens, and platforms.',
      icon: 'MonitorSmartphone',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers size={24} />;
      case 'Cpu': return <Cpu size={24} />;
      case 'Palette': return <Palette size={24} />;
      case 'MonitorSmartphone': return <MonitorSmartphone size={24} />;
      default: return <Server size={24} />;
    }
  };

  return (
    <section id="services" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-icon">
            <Server size={28} />
          </div>
          <h2 className="section-title">Services</h2>
        </div>

        {/* Services Card Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className="glass-panel service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
            >
              <div className="service-icon-box">
                {getIcon(service.icon)}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
