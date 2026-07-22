import React, { useState, useRef, useEffect } from 'react';
import { Award, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { CertificateItem } from '../types';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag to scroll states
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const nptelJavaImg = '/src/assets/images/nptel.jpeg';
  const prayaLabsImg = '/src/assets/images/certify1 (2).jpeg';
  const convergenceImg = '/src/assets/images/nehru.jpeg';
  const niceQuizImg = '/src/assets/images/quiz.jpeg';

  const certificatesData: CertificateItem[] = [
    {
      id: 'nptel-java',
      title: 'Programming in Java (Elite)',
      issuer: 'NPTEL, Indian Institute of Technology Kharagpur',
      date: 'Jul - Oct 2025',
      credentialId: 'Roll No: NPTEL25CS110S467901280',
      image: nptelJavaImg,
      description: 'Successfully completed the 12-week NPTEL Online Certification course on "Programming in Java" with an elite status. Secured a consolidated score of 84% (Online Assignments: 24.88/25, Proctored Exam: 59.25/75). Funded by the Ministry of Education, Government of India.',
      signatory: 'Prof. Haimanti Banerji (IIT Kharagpur)',
    },
    {
      id: 'praya-labs-vr',
      title: 'Junior VR Developer Internship',
      issuer: 'Praya Labs',
      date: 'June 24, 2025 - July 24, 2025',
      credentialId: 'Certificate No: INPLAK25015',
      image: prayaLabsImg,
      description: 'Successfully completed a 1-month professional internship as a Junior VR Developer. Engaged in practical learning, hands-on activities related to VR Scene Creations, and contributed significantly to research projects.',
      signatory: 'Ashokkumar Manisekaran (Founder)',
    },
    {
      id: 'convergence-paper-presentation',
      title: 'Symposium Paper Presentation',
      issuer: 'Nehru Institute of Technology (Autonomous), Coimbatore',
      date: 'March 20, 2025',
      credentialId: 'CONVERGENCE-2K25',
      image: convergenceImg,
      description: 'Presented a technical research paper at "CONVERGENCE 2K25", a National Level Technical Symposium organized by the Department of Computer Science and Engineering at Nehru Institute of Technology.',
      signatory: 'Dr. M. Sivaraja (Principal)',
    },
    {
      id: 'nice-business-quiz',
      title: 'Intercollegiate Business Quiz Award',
      issuer: 'Nehru Institute of Engineering & Technology (Autonomous)',
      date: 'March 21, 2025',
      credentialId: 'NICE-2025',
      image: niceQuizImg,
      description: 'Participated and achieved distinction in the Business Quiz during "NICE 2025", a National Level Intercollegiate Management Fest organized by the Department of Management Studies at Nehru Institute of Engineering & Technology.',
      signatory: 'Dr. P. Maniiarasan (Principal)',
    },
  ];

  // We duplicate the list to ensure seamless infinite looping scroll
  const loopCertificates = [...certificatesData, ...certificatesData];

  // Touch & Swipe Support for the carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Nav Buttons: Scroll left or right manually
  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 344; // Card width (320px) + gap (24px)
    if (direction === 'left') {
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Cycle certificates within modal (Prev/Next navigation on modal open)
  const handleModalCycle = (direction: 'prev' | 'next') => {
    if (!selectedCert) return;
    const currentIndex = certificatesData.findIndex((c) => c.id === selectedCert.id);
    let newIndex = currentIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? certificatesData.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === certificatesData.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedCert(certificatesData[newIndex]);
  };

  return (
    <section id="certificates" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-icon">
            <Award size={28} />
          </div>
          <h2 className="section-title">Certificates</h2>
        </div>

        {/* Scroll Container wrapper */}
        <div 
          ref={containerRef}
          className="certificates-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            cursor: isDown ? 'grabbing' : 'grab',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {/* Track which does CSS scrolling loop */}
          <div 
            ref={trackRef} 
            className="certificates-track"
            style={{
              // Disable loop CSS animation if dragging
              animation: isDown ? 'none' : 'scroll-loop 40s linear infinite',
            }}
          >
            {loopCertificates.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                className="certificate-card"
                onClick={() => setSelectedCert(cert)}
                style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
              >
                {cert.image && (
                  <div className="certificate-image-wrapper" style={{ width: '100%', height: '150px', overflow: 'hidden', borderRadius: '16px', marginBottom: '14px', border: '1px solid rgba(0, 217, 255, 0.15)', position: 'relative' }}>
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      referrerPolicy="no-referrer"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6, 18, 38, 0.7), transparent)' }}></div>
                  </div>
                )}
                <div className="certificate-badge-icon" style={{ top: cert.image ? '180px' : '24px' }}>
                  <Zap size={20} />
                </div>
                <div className="certificate-inner" style={{ flexGrow: 1, paddingTop: '16px', paddingBottom: '16px' }}>
                  <span className="certificate-sub">Achievement</span>
                  <h3 className="certificate-name" style={{ minHeight: '44px', fontSize: '1rem', marginBottom: '8px' }}>{cert.title}</h3>
                  <p className="certificate-recipient" style={{ marginBottom: '8px', fontSize: '0.85rem' }}>Maladhi M</p>
                  <p className="certificate-issuer" style={{ fontSize: '0.8rem' }}>{cert.issuer}</p>
                  
                  <div className="certificate-footer-info" style={{ marginTop: '12px', paddingTop: '8px' }}>
                    <span>{cert.date}</span>
                    <span>{cert.credentialId ? cert.credentialId.split(':')[0] : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous / Next Arrows */}
        <div className="certificates-nav">
          <button
            id="cert-prev-btn"
            className="cert-nav-btn"
            onClick={() => scroll('left')}
            aria-label="Previous certificates"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            id="cert-next-btn"
            className="cert-nav-btn"
            onClick={() => scroll('right')}
            aria-label="Next certificates"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Fullscreen Certificate Zoom Modal */}
        {selectedCert && (
          <div 
            className="cert-modal-backdrop"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '800px', width: '95%' }}
            >
              <button 
                id="cert-modal-close-btn"
                className="cert-modal-close" 
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="cert-modal-inner" style={{ padding: '24px 16px' }}>
                {selectedCert.image ? (
                  <div className="cert-modal-image-container">
                    <img 
                      src={selectedCert.image} 
                      alt={selectedCert.title} 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="cert-modal-badge">
                    <Award size={64} />
                  </div>
                )}
                
                <h3 className="cert-modal-title" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{selectedCert.title}</h3>
                <p className="cert-modal-recipient" style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--neon-cyan)' }}>Awarded to Maladhi M</p>
                
                <div className="cert-modal-details" style={{ fontSize: '0.92rem', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                  <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>{selectedCert.description || "In recognition of successfully meeting all program curricula, exams, and project submission criteria."}</p>
                  
                  <div className="cert-modal-info-grid">
                    <span>
                      <strong style={{ color: 'var(--text-primary)' }}>Institution:</strong> {selectedCert.issuer}
                    </span>
                    <span>
                      <strong style={{ color: 'var(--text-primary)' }}>Date:</strong> {selectedCert.date}
                    </span>
                    {selectedCert.credentialId && (
                      <span className="cert-modal-info-grid-full-width">
                        <strong style={{ color: 'var(--text-primary)' }}>Credential ID / verification:</strong> {selectedCert.credentialId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Simulated Signatures */}
                <div className="cert-modal-signature-block" style={{ marginTop: '24px', paddingTop: '16px' }}>
                  <div>
                    <div className="cert-signature">Maladhi M</div>
                    <div className="cert-sig-label">Candidate Signature</div>
                  </div>
                  <div>
                    <div className="cert-signature">{selectedCert.signatory || "Board of Directors"}</div>
                    <div className="cert-sig-label">Authorized Signatory</div>
                  </div>
                </div>

                {/* Modal Internal Prev/Next cycle */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px' }}>
                  <button 
                    id="modal-cert-prev-btn"
                    className="btn btn-secondary" 
                    style={{ padding: '8px 20px', fontSize: '0.8rem', borderRadius: '20px' }}
                    onClick={() => handleModalCycle('prev')}
                  >
                    Prev
                  </button>
                  <button 
                    id="modal-cert-next-btn"
                    className="btn btn-secondary" 
                    style={{ padding: '8px 20px', fontSize: '0.8rem', borderRadius: '20px' }}
                    onClick={() => handleModalCycle('next')}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
