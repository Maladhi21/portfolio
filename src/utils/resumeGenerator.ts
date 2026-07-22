import { jsPDF } from 'jspdf';

export function downloadResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const leftMargin = 15;
  const contentWidth = pageWidth - (leftMargin * 2);

  // Helper to split text and draw it with line spacing
  const drawParagraph = (text: string, x: number, startY: number, width: number, size: number, color: [number, number, number] = [30, 41, 59]): number => {
    doc.setFont('Inter', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, width);
    let currentY = startY;
    lines.forEach((line: string) => {
      doc.text(line, x, currentY);
      currentY += (size * 0.45); // line spacing multiplier
    });
    return currentY;
  };

  // Helper to draw a section header
  const drawSectionHeader = (title: string, startY: number): number => {
    const y = startY + 4;
    doc.setFont('Space Grotesk', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 24, 38); // Deep primary dark
    doc.text(title.toUpperCase(), leftMargin, y);
    
    // Draw thin elegant divider line
    doc.setDrawColor(0, 217, 255); // Neon cyan accent
    doc.setLineWidth(0.4);
    doc.line(leftMargin, y + 2, pageWidth - leftMargin, y + 2);
    
    return y + 6;
  };

  // Set general document properties
  doc.setProperties({
    title: 'MALADHI_M_Resume',
    subject: 'Resume of Maladhi M',
    author: 'Maladhi M',
    keywords: 'Maladhi M, Resume, Software Engineer, React Developer, Full Stack Developer',
    creator: 'Portfolio App'
  });

  let y = 16;

  // --- HEADER SECTION ---
  doc.setFont('Space Grotesk', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(6, 24, 38);
  // Center Name
  doc.text('MALADHI M', pageWidth / 2, y, { align: 'center' });
  
  y += 7;
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105); // Slate description
  doc.text('Salem, Tamil Nadu | +91 9092673683 | markujulial5619@gmail.com | github.com/maladhi21', pageWidth / 2, y, { align: 'center' });

  // Divider below header
  y += 4;
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(leftMargin, y, pageWidth - leftMargin, y);

  // --- PROFESSIONAL SUMMARY ---
  y += 3;
  const summaryText = 'Motivated and detail-oriented Computer Science student with a strong foundation in software development, problem solving, and modern web technologies. Skilled in building responsive and user-friendly applications using industry standard tools and frameworks. Passionate about continuous learning, developing impactful projects, and contributing to innovative technology solutions.';
  y = drawParagraph(summaryText, leftMargin, y + 2, contentWidth, 9.5, [71, 85, 105]);

  // --- EDUCATION ---
  y = drawSectionHeader('Education', y + 2);
  
  // BE CSE
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('B.E. Computer Science and Engineering', leftMargin, y);
  
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Akshaya College of Engineering and Technology', leftMargin, y + 4.5);
  
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2023 - 2027', pageWidth - leftMargin, y, { align: 'right' });

  // HSC
  y += 11;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('HSC (Government Higher Secondary School) - 79%', leftMargin, y);
  
  doc.setFont('Inter', 'bold');
  doc.text('2022 - 2023', pageWidth - leftMargin, y, { align: 'right' });

  // SSLC
  y += 7;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('SSLC (Government High Secondary School)', leftMargin, y);
  
  doc.setFont('Inter', 'bold');
  doc.text('2020 - 2021', pageWidth - leftMargin, y, { align: 'right' });

  // --- PROJECTS ---
  y = drawSectionHeader('Projects', y + 3);

  // Project 1
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Blood Donation Management System', leftMargin, y);
  
  doc.setFont('Inter', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(0, 75, 110); // Custom primary color
  doc.text('Tech Stack: React, Tailwind CSS, Node.js, Express.js, MongoDB', leftMargin, y + 4.5);
  
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('• Developed a responsive donor and blood request management interface.', leftMargin + 2, y + 9);
  doc.text('• Implemented frontend workflows and backend data handling concepts.', leftMargin + 2, y + 13.5);

  // Project 2
  y += 19;
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('AI-Based Agriculture Assistance System', leftMargin, y);
  
  doc.setFont('Inter', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(0, 75, 110);
  doc.text('Tech Stack: React, JavaScript, Python, Machine Learning', leftMargin, y + 4.5);
  
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('• Built an interactive interface for agriculture recommendations and data visualization.', leftMargin + 2, y + 9);
  doc.text('• Applied AI and backend integration concepts for decision support.', leftMargin + 2, y + 13.5);

  // Project 3
  y += 19;
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Stock Maintenance Management System', leftMargin, y);
  
  doc.setFont('Inter', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(0, 75, 110);
  doc.text('Tech Stack: React, Tailwind CSS, Node.js, Database Concepts', leftMargin, y + 4.5);
  
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('• Developed a dashboard for inventory tracking and stock monitoring.', leftMargin + 2, y + 9);
  doc.text('• Implemented AI-based prediction and backend workflow concepts.', leftMargin + 2, y + 13.5);

  // --- INTERNSHIPS ---
  y = drawSectionHeader('Internships', y + 15);

  // Internship 1
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Web Development - Intern', leftMargin, y);
  
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Worked on front-end and back-end development with hands-on experience in HTML, CSS, JavaScript, and React.', leftMargin + 2, y + 4.5);

  // Internship 2
  y += 10;
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('AR/VR - Intern (PRYA Labs)', leftMargin, y);
  
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Gained practical exposure to AR/VR application concepts, development workflows, and implementation.', leftMargin + 2, y + 4.5);

  // Internship 3
  y += 10;
  doc.setFont('Inter', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('MERN Stack Development Intern (30 Days) - Xplore IT Corp', leftMargin, y);
  
  doc.setFont('Inter', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Worked on MERN stack technologies with practical experience in full-stack development and project workflows.', leftMargin + 2, y + 4.5);

  // --- SKILLS ---
  y = drawSectionHeader('Skills', y + 11);

  doc.setFont('Inter', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Databases: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('MySQL | MongoDB', leftMargin + 22, y);

  y += 5.5;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Technical Skills: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Java | JavaScript | Python | C | React.js | Node.js | HTML | CSS | Tailwind CSS | Bootstrap | EDA', leftMargin + 28, y);

  y += 5.5;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Soft Skills: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Problem Solving | Teamwork | Time Management | Resilience | Flexibility | Attention to Detail', leftMargin + 22, y);

  // --- ADDITIONAL INFORMATION ---
  y = drawSectionHeader('Additional Information', y + 3);

  doc.setFont('Inter', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Languages: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('English, Tamil', leftMargin + 22, y);

  y += 5.5;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Certifications: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('NPTEL Elite + Silver - Java | Value Added Course - Full Stack Development (KGiSL)', leftMargin + 25, y);

  y += 5.5;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Achievements: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Third Prize - Paper Presentation', leftMargin + 26, y);

  y += 5.5;
  doc.setFont('Inter', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Hobbies: ', leftMargin, y);
  doc.setFont('Inter', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Learning New Tools | Coding | Singing | Listening to Music', leftMargin + 18, y);

  // Save the PDF
  doc.save('Maladhi_M_Resume.pdf');
}
