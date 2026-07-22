import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Plus, 
  Trash2, 
  Search, 
  ShoppingCart, 
  ListTodo, 
  Filter, 
  Check, 
  ChevronRight,
  ChevronDown,
  RotateCcw,
  MinusCircle,
  PlusCircle,
  Play,
  X
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsProps {
  projectImages: {
    bloodBank: string;
    aiResume: string;
    agriculture: string;
    stock: string;
  };
}

export default function Projects({ projectImages }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const [activePlayground, setActivePlayground] = useState<'todo' | 'filter' | 'cart'>('todo');

  // --- PLAYGROUND 1: TO DO LIST STATE ---
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([
    { id: 1, text: 'Review UI styling and add glowing animations', completed: true },
    { id: 2, text: 'Integrate interactive Web APIs into portfolio', completed: false },
    { id: 3, text: 'Prepare documentation guidelines for major projects', completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  const [todoFilter, setTodoFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodoText.trim(), completed: false }]);
    setNewTodoText('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (todoFilter === 'active') return !t.completed;
    if (todoFilter === 'completed') return t.completed;
    return true;
  });

  // --- PLAYGROUND 2: PRODUCT FILTERING STATE ---
  const productsDataset = [
    { id: 1, name: 'LED Mechanical Keyboard', category: 'gaming', price: 89.99, img: '⌨️', desc: 'Custom mechanical switches with glowing RGB backlit arrays.' },
    { id: 2, name: 'Wireless Ergonomic Mouse', category: 'tech', price: 49.99, img: '🖱️', desc: 'High-precision wireless tracker with comfort thumb rest.' },
    { id: 3, name: 'Cyberpunk Graphic Hoodie', category: 'apparel', price: 59.99, img: '🧥', desc: 'Premium heavy cotton blend with cybernetic graphic decals.' },
    { id: 4, name: 'Minimalist Desktop Mat', category: 'office', price: 19.99, img: '📁', desc: 'Micro-woven smooth cloth with clean water-resistant layer.' },
    { id: 5, name: 'Dual LED Desk Lamp', category: 'office', price: 34.99, img: '💡', desc: 'Smart dimmable warm lighting for optimal nighttime coding.' },
    { id: 6, name: 'Gaming Soundbar Speaker', category: 'gaming', price: 69.99, img: '🔊', desc: 'High-fidelity audio drivers with dynamic bass levels.' },
    { id: 7, name: 'Noise Cancelling Earbuds', category: 'tech', price: 119.99, img: '🎧', desc: 'Immersive sound isolating earbuds with custom audio settings.' },
    { id: 8, name: 'Tech Organizer Bag', category: 'apparel', price: 29.99, img: '🎒', desc: 'Multi-compartment storage for chargers, drives and adapters.' },
  ];
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState<'all' | 'gaming' | 'tech' | 'apparel' | 'office'>('all');
  const [purchaseNotification, setPurchaseNotification] = useState<string | null>(null);

  const filteredProducts = productsDataset.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.desc.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategory === 'all' || p.category === productCategory;
    return matchesSearch && matchesCategory;
  });

  const triggerPurchaseSim = (prodName: string) => {
    setPurchaseNotification(prodName);
    setTimeout(() => {
      setPurchaseNotification(null);
    }, 2500);
  };

  // --- PLAYGROUND 3: SHOPPING CART STATE ---
  const cartInventory = [
    { id: 101, name: 'Hi-Fi Wireless Headphones', price: 159.99, icon: '🎧' },
    { id: 102, name: 'Smart Fitness Tracker v4', price: 79.99, icon: '⌚' },
    { id: 103, name: 'Ultra-Compact USB Hub', price: 24.99, icon: '🔌' },
  ];
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; icon: string; quantity: number }[]>([]);
  const [cartCheckoutSuccess, setCartCheckoutSuccess] = useState(false);

  const handleAddToCart = (item: typeof cartInventory[0]) => {
    const existing = cartItems.find(c => c.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleUpdateQty = (id: number, delta: number) => {
    const updated = cartItems.map(c => {
      if (c.id === id) {
        const nextQty = c.quantity + delta;
        return nextQty > 0 ? { ...c, quantity: nextQty } : null;
      }
      return c;
    }).filter(Boolean) as typeof cartItems;
    setCartItems(updated);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(c => c.id !== id));
  };

  const cartSubtotal = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const cartTax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + cartTax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCartCheckoutSuccess(true);
    setTimeout(() => {
      setCartItems([]);
      setCartCheckoutSuccess(false);
    }, 4000);
  };


  // --- PRIMARY REPOSITORY DATA ---
  const projectsData: ProjectItem[] = [
    {
      id: 'blood-bank',
      title: 'Blood Bank Management System',
      description: 'A comprehensive database management platform to coordinate blood donations, monitor critical blood inventory levels, and schedule donors.',
      image: projectImages.bloodBank,
      tags: ['HTML', 'CSS', 'MongoDB', 'Node.js', 'Express.js'],
      liveUrl: 'https://blood-bank-management-t23j.onrender.com/',
      githubUrl: 'https://github.com/Maladhi21/blood-bank-management.git',
    },
    {
      id: 'ai-resume',
      title: 'AI Resume Analyzer',
      description: 'An advanced machine learning pipeline that parses, scores, and extracts key entities from resumes using intelligent Natural Language Processing (NLP).',
      image: projectImages.aiResume,
      tags: ['Python', 'Machine Learning', 'NLP'],
      liveUrl: 'https://resume-r7ywtzw1k-malu6.vercel.app/',
      githubUrl: 'https://github.com/Maladhi21/Resume-ai',
    },
    {
      id: 'agriculture',
      title: 'Agriculture Website',
      description: 'A modern, informational digital portal for smart farming, offering automated crop insights, soil diagnostics telemetry, and weather advisory integrations.',
      image: projectImages.agriculture,
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://github.com/maladhi27',
      githubUrl: 'https://github.com/maladhi27',
    },
    {
      id: 'stock-mgmt',
      title: 'Stock Management System',
      description: 'A real-time administrative system designed to control warehouse inventory logs, calculate valuation trends, and generate custom stock invoices.',
      image: projectImages.stock,
      tags: ['PHP', 'MySQL', 'Bootstrap'],
      liveUrl: 'https://github.com/maladhi27',
      githubUrl: 'https://github.com/maladhi27',
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-icon">
            <Briefcase size={28} />
          </div>
          <h2 className="section-title">Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
            >
              <div className="project-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="project-img-overlay" />
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    id={`project-demo-${project.id}`}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-demo"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    id={`project-github-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-github"
                  >
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Toggle Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button
            id="view-all-projects-btn"
            onClick={() => setShowAll(!showAll)}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, rgba(0, 217, 255, 0.05) 100%)',
              border: '1.5px solid rgba(0, 217, 255, 0.35)',
              color: '#ffffff',
              padding: '14px 32px',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.15)',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
            className="view-all-btn-interactive"
          >
            <span>{showAll ? 'Hide Interactive Apps' : 'View All (Interactive Mini-Projects)'}</span>
            {showAll ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* INTERACTIVE PLAYGROUNDS SECTION */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ overflow: 'hidden', marginTop: '40px' }}
            >
              <div 
                className="glass-panel"
                style={{
                  padding: '36px',
                  background: 'rgba(6, 24, 38, 0.75)',
                  border: '1.5px solid rgba(0, 217, 255, 0.25)',
                  borderRadius: '24px',
                  boxShadow: '0 0 35px rgba(0, 217, 255, 0.15)',
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0, 217, 255, 0.08)', borderRadius: '30px', border: '1px solid rgba(0, 217, 255, 0.15)', marginBottom: '12px' }}>
                    <Sparkles size={14} className="text-cyan" />
                    <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fully Playable Utilities</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0' }}>Interactive Frontend Labs</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Select and run live working applications built purely in React, state-controlled and style-hardened.
                  </p>
                </div>

                {/* Dashboard Tabs */}
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '32px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingBottom: '20px'
                  }}
                >
                  <button
                    onClick={() => setActivePlayground('todo')}
                    style={{
                      background: activePlayground === 'todo' ? 'rgba(0, 217, 255, 0.15)' : 'transparent',
                      color: activePlayground === 'todo' ? '#ffffff' : 'var(--text-secondary)',
                      border: `1.5px solid ${activePlayground === 'todo' ? 'var(--neon-cyan)' : 'transparent'}`,
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ListTodo size={16} style={{ color: activePlayground === 'todo' ? 'var(--neon-cyan)' : 'inherit' }} />
                    To-Do List
                  </button>

                  <button
                    onClick={() => setActivePlayground('filter')}
                    style={{
                      background: activePlayground === 'filter' ? 'rgba(0, 217, 255, 0.15)' : 'transparent',
                      color: activePlayground === 'filter' ? '#ffffff' : 'var(--text-secondary)',
                      border: `1.5px solid ${activePlayground === 'filter' ? 'var(--neon-cyan)' : 'transparent'}`,
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Filter size={16} style={{ color: activePlayground === 'filter' ? 'var(--neon-cyan)' : 'inherit' }} />
                    Product Filtering
                  </button>

                  <button
                    onClick={() => setActivePlayground('cart')}
                    style={{
                      background: activePlayground === 'cart' ? 'rgba(0, 217, 255, 0.15)' : 'transparent',
                      color: activePlayground === 'cart' ? '#ffffff' : 'var(--text-secondary)',
                      border: `1.5px solid ${activePlayground === 'cart' ? 'var(--neon-cyan)' : 'transparent'}`,
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <ShoppingCart size={16} style={{ color: activePlayground === 'cart' ? 'var(--neon-cyan)' : 'inherit' }} />
                    Shopping Cart
                  </button>
                </div>

                {/* ACTIVE PLAYGROUND PANEL CONTAINER */}
                <div 
                  style={{
                    background: 'rgba(5, 16, 26, 0.8)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '28px',
                    minHeight: '380px',
                    position: 'relative'
                  }}
                >
                  <AnimatePresence mode="wait">
                    {/* 1. TO DO LIST PLAYGROUND */}
                    {activePlayground === 'todo' && (
                      <motion.div
                        key="todo"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                          <div>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>📝 Dynamic Task Engine</h4>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Add, prioritize, toggle, and filter responsive workflows</span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            {(['all', 'active', 'completed'] as const).map(f => (
                              <button
                                key={f}
                                onClick={() => setTodoFilter(f)}
                                style={{
                                  background: todoFilter === f ? 'var(--neon-cyan)' : 'transparent',
                                  color: todoFilter === f ? '#061826' : 'var(--text-secondary)',
                                  border: 'none',
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem',
                                  fontFamily: 'var(--font-mono)',
                                  cursor: 'pointer',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Add Form */}
                        <form onSubmit={handleAddTodo} className="todo-form-responsive" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                          <input
                            type="text"
                            placeholder="Type a new task item..."
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            style={{
                              flexGrow: 1,
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1.5px solid rgba(0, 217, 255, 0.15)',
                              borderRadius: '12px',
                              padding: '12px 16px',
                              color: '#ffffff',
                              fontSize: '0.9rem',
                              outline: 'none',
                              fontFamily: 'inherit',
                              transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--neon-cyan)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(0, 217, 255, 0.15)'}
                          />
                          <button
                            type="submit"
                            style={{
                              background: 'var(--neon-cyan)',
                              color: '#061826',
                              border: 'none',
                              borderRadius: '12px',
                              padding: '0 20px',
                              fontWeight: 700,
                              fontFamily: 'var(--font-display)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <Plus size={18} /> Add
                          </button>
                        </form>

                        {/* Todo Items list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                          {filteredTodos.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              No tasks in this category! Add a task to begin.
                            </div>
                          ) : (
                            filteredTodos.map(todo => (
                              <motion.div
                                key={todo.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  background: 'rgba(255, 255, 255, 0.02)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                  padding: '12px 16px',
                                  borderRadius: '12px',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flexGrow: 1 }} onClick={() => handleToggleTodo(todo.id)}>
                                  <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '6px',
                                    border: `1.5px solid ${todo.completed ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.2)'}`,
                                    background: todo.completed ? 'rgba(0, 217, 255, 0.15)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s ease'
                                  }}>
                                    {todo.completed && <Check size={14} className="text-cyan" />}
                                  </div>
                                  <span style={{
                                    fontSize: '0.92rem',
                                    color: todo.completed ? 'var(--text-secondary)' : '#ffffff',
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    transition: 'all 0.2s ease'
                                  }}>
                                    {todo.text}
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDeleteTodo(todo.id); }}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ff4d4d',
                                    cursor: 'pointer',
                                    opacity: 0.7,
                                    padding: '4px',
                                    borderRadius: '6px',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </motion.div>
                            ))
                          )}
                        </div>

                        {/* Status Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', marginTop: '20px', paddingTop: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                          <span>{todos.filter(t => !t.completed).length} items remaining</span>
                          <button
                            onClick={() => setTodos([])}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--neon-cyan)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.8rem'
                            }}
                          >
                            <RotateCcw size={12} /> Clear All
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* 2. PRODUCT FILTERING PLAYGROUND */}
                    {activePlayground === 'filter' && (
                      <motion.div
                        key="filter"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ marginBottom: '24px' }}>
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>🔍 Dynamic Product Filter</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instantly query and sort structural inventories of item data</span>
                        </div>

                        {/* Control panel: search & category chips */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                          {/* Search Input */}
                          <div style={{ position: 'relative', width: '100%' }}>
                            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.3)' }} />
                            <input
                              type="text"
                              placeholder="Search inventory items by title, category, or description..."
                              value={productSearch}
                              onChange={(e) => setProductSearch(e.target.value)}
                              style={{
                                width: '100%',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1.5px solid rgba(0, 217, 255, 0.15)',
                                borderRadius: '12px',
                                padding: '12px 16px 12px 48px',
                                color: '#ffffff',
                                fontSize: '0.9rem',
                                outline: 'none',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.3s ease'
                              }}
                              onFocus={(e) => e.target.style.borderColor = 'var(--neon-cyan)'}
                              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 217, 255, 0.15)'}
                            />
                            {productSearch && (
                              <button
                                onClick={() => setProductSearch('')}
                                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.8rem' }}
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>

                          {/* Category Chips */}
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {(['all', 'gaming', 'tech', 'apparel', 'office'] as const).map(cat => (
                              <button
                                key={cat}
                                onClick={() => setProductCategory(cat)}
                                style={{
                                  background: productCategory === cat ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                                  color: productCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                                  border: `1.5px solid ${productCategory === cat ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)'}`,
                                  padding: '8px 16px',
                                  borderRadius: '30px',
                                  fontSize: '0.8rem',
                                  fontFamily: 'var(--font-mono)',
                                  textTransform: 'uppercase',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  boxShadow: productCategory === cat ? '0 0 10px rgba(0, 217, 255, 0.15)' : 'none'
                                }}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Purchase simulation notification overlay */}
                        <AnimatePresence>
                          {purchaseNotification && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              style={{
                                background: 'rgba(0, 217, 255, 0.15)',
                                border: '1.5px solid var(--neon-cyan)',
                                color: '#ffffff',
                                borderRadius: '10px',
                                padding: '10px 16px',
                                fontSize: '0.85rem',
                                marginBottom: '16px',
                                textAlign: 'center',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                                boxShadow: '0 0 15px rgba(0, 217, 255, 0.2)'
                              }}
                            >
                              🎉 Simulating Order Dispatch: <strong>{purchaseNotification}</strong> added to logs!
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Products Grid */}
                        <div 
                          style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                            gap: '16px', 
                            maxHeight: '260px', 
                            overflowY: 'auto',
                            paddingRight: '4px' 
                          }}
                        >
                          {filteredProducts.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                              No products found matching criteria.
                            </div>
                          ) : (
                            filteredProducts.map(prod => (
                              <div
                                key={prod.id}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.01)',
                                  border: '1px solid rgba(255, 255, 255, 0.04)',
                                  borderRadius: '16px',
                                  padding: '16px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  gap: '12px'
                                }}
                              >
                                <div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.75rem' }}>{prod.img}</span>
                                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', background: 'rgba(0, 217, 255, 0.08)', color: 'var(--neon-cyan)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{prod.category}</span>
                                  </div>
                                  <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>{prod.name}</h5>
                                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineScale: 1.3 }}>{prod.desc}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '8px' }}>
                                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>${prod.price}</span>
                                  <button
                                    onClick={() => triggerPurchaseSim(prod.name)}
                                    style={{
                                      background: 'rgba(255, 255, 255, 0.04)',
                                      color: '#ffffff',
                                      border: '1px solid rgba(255, 255, 255, 0.1)',
                                      borderRadius: '8px',
                                      padding: '4px 10px',
                                      fontSize: '0.75rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.color = 'var(--neon-cyan)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#ffffff'; }}
                                  >
                                    Simulate
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* 3. SHOPPING CART PLAYGROUND */}
                    {activePlayground === 'cart' && (
                      <motion.div
                        key="cart"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ marginBottom: '24px' }}>
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>🛒 Interactive Cart Sandbox</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full transactional calculations with dynamic items and subtotal counters</span>
                        </div>

                        {/* Interactive columns: inventory (left) vs checkout (right) */}
                        <div 
                          style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1.1fr 0.9fr', 
                            gap: '24px',
                            alignItems: 'start' 
                          }}
                          className="skills-details-grid-responsive"
                        >
                          {/* Left column: Inventory items to add */}
                          <div>
                            <h5 style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '0.95rem', marginBottom: '12px', fontWeight: 600 }}>Available Products</h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {cartInventory.map(item => (
                                <div
                                  key={item.id}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    border: '1px solid rgba(255, 255, 255, 0.03)',
                                    padding: '12px 16px',
                                    borderRadius: '12px'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                    <div>
                                      <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</div>
                                      <div style={{ color: 'var(--neon-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>${item.price}</div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart(item)}
                                    style={{
                                      background: 'rgba(0, 217, 255, 0.08)',
                                      border: '1px solid rgba(0, 217, 255, 0.25)',
                                      color: 'var(--neon-cyan)',
                                      borderRadius: '8px',
                                      padding: '6px 12px',
                                      fontSize: '0.8rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neon-cyan)'; e.currentTarget.style.color = '#061826'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 217, 255, 0.08)'; e.currentTarget.style.color = 'var(--neon-cyan)'; }}
                                  >
                                    Add <Plus size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right column: Cart Status & Checkout Summary */}
                          <div 
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.01)', 
                              border: '1px solid rgba(255, 255, 255, 0.05)', 
                              borderRadius: '16px', 
                              padding: '20px' 
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                              <h5 style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '0.95rem', margin: 0, fontWeight: 600 }}>Shopping Bag</h5>
                              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Items</span>
                            </div>

                            {/* Cart Success Overlay */}
                            <AnimatePresence>
                              {cartCheckoutSuccess ? (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  style={{
                                    textAlign: 'center',
                                    padding: '24px 0',
                                    color: 'var(--neon-cyan)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px'
                                  }}
                                >
                                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0, 217, 255, 0.1)', border: '1.5px solid var(--neon-cyan)', display: 'flex', alignItems: 'center', justify: 'center', justifyContent: 'center' }}>
                                    <Check size={24} />
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>Order Transmitted!</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Checkout calculations succeeded successfully.</div>
                                  </div>
                                </motion.div>
                              ) : cartItems.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                  Your cart is empty. Add items from left to play!
                                </div>
                              ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                  {/* List of checkout items */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto', marginBottom: '16px' }}>
                                    {cartItems.map(c => (
                                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '60%' }}>
                                          <span>{c.icon}</span>
                                          <span style={{ fontSize: '0.8rem', color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                          {/* Quantity Selector buttons */}
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <button onClick={() => handleUpdateQty(c.id, -1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}><MinusCircle size={14} /></button>
                                            <span style={{ fontSize: '0.8rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{c.quantity}</span>
                                            <button onClick={() => handleUpdateQty(c.id, 1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}><PlusCircle size={14} /></button>
                                          </div>
                                          <span style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', minWidth: '45px', textAlign: 'right' }}>${(c.price * c.quantity).toFixed(2)}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Calculated total summary block */}
                                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '10px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                                      <span>Subtotal</span>
                                      <span style={{ fontFamily: 'var(--font-mono)' }}>${cartSubtotal.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                                      <span>Est. Tax (8%)</span>
                                      <span style={{ fontFamily: 'var(--font-mono)' }}>${cartTax.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 700, borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '6px', marginTop: '4px', fontSize: '0.85rem' }}>
                                      <span>Total</span>
                                      <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>${cartTotal.toFixed(2)}</span>
                                    </div>
                                  </div>

                                  {/* Checkout Sim Button */}
                                  <button
                                    onClick={handleCheckout}
                                    style={{
                                      width: '100%',
                                      background: 'var(--neon-cyan)',
                                      color: '#061826',
                                      border: 'none',
                                      borderRadius: '30px',
                                      padding: '10px 16px',
                                      fontSize: '0.85rem',
                                      fontWeight: 700,
                                      fontFamily: 'var(--font-display)',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                      boxShadow: '0 0 15px rgba(0, 217, 255, 0.2)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '6px',
                                      marginTop: '8px'
                                    }}
                                  >
                                    <ShoppingCart size={14} /> Checkout Simulation
                                  </button>
                                </div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
