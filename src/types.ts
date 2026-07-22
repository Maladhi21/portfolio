export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon: string; // Dynamic icon identifier
  color: string; // Neon accent color
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  description?: string;
  signatory?: string;
}
