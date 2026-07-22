import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Linkedin, Github, Instagram, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending message to backend API proxy
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const contactDetails = [
    {
      label: 'Email',
      value: 'markujulial5619@gmail.com',
      href: 'mailto:markujulial5619@gmail.com',
      icon: <Mail size={18} />,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/m-maladhi-4a378b357/',
      href: 'https://linkedin.com/in/m-maladhi-4a378b357/',
      icon: <Linkedin size={18} />,
    },
    {
      label: 'GitHub',
      value: 'https://github.com/Maladhi21',
      href: 'https://github.com/Maladhi21',
      icon: <Github size={18} />,
    },
    {
      label: 'Instagram',
      value: 'instagram.com/maladhi_27',
      href: 'https://instagram.com/maladhi_27',
      icon: <Instagram size={18} />,
    },
  ];

  return (
    <section id="contact" className="section" style={{ paddingBottom: '120px' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-icon">
            <MessageSquare size={28} />
          </div>
          <h2 className="section-title">Contact Me</h2>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info-col">
            <h3 className="about-subtitle text-cyan">Let's Connect</h3>
            <p className="contact-card-sub">
              Have an interesting project, job opportunity, or just want to say hello? Drop me a line, and I will get back to you as soon as possible!
            </p>

            <div className="contact-details-list">
              {contactDetails.map((detail) => (
                <a
                  key={detail.label}
                  id={`contact-detail-${detail.label.toLowerCase()}`}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-detail-item"
                >
                  <div className="contact-detail-icon">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="contact-detail-label">{detail.label}</div>
                    <div className="contact-detail-value">{detail.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Glass Contact Form */}
          <motion.div
            className="glass-panel"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Hey, I'd love to connect for a new opportunity!"
                  required
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {submitSuccess ? (
                <div className="form-success-msg">
                  Message Sent Successfully! I will get back to you shortly.
                </div>
              ) : (
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
