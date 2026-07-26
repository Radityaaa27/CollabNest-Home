import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Twitter, Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (event, href) => {
    if (location.pathname !== '/') {
      event.preventDefault();
      navigate({ pathname: '/', hash: href });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-16 px-6 text-sm transition-colors duration-500 border-t"
      style={{
        backgroundColor: 'var(--card)',
        color: 'var(--muted-foreground)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <Link 
                to="/"
                className="text-2xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                CollabNest
              </Link>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
              The new standard for collaborative productivity — sleek, fast, and delightful to use.
            </p>
            {/* Visitor Counter */}
            {/* <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'var(--primary)'
              }}
            >
              <Heart size={12} />
              <span>{visitorCount.toLocaleString()} visitors</span>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Quick Links
            </h4>
            <div className="space-y-2">
              <div>
                <a
                  href="#features"
                  onClick={(e) => handleSectionClick(e, '#features')}
                  className="transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
                >
                  Features
                </a>
              </div>
              <div>
                <a
                  href="#workflow"
                  onClick={(e) => handleSectionClick(e, '#workflow')}
                  className="transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
                >
                  Workflow
                </a>
              </div>
              <div>
                <Link
                  to="/about"
                  className="transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
                >
                  About Me
                </Link>
              </div>
              <div>
                <a
                  href="#contact"
                  onClick={(e) => handleSectionClick(e, '#contact')}
                  className="transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
                >
                  Contact
                </a>
              </div>
              <div>      
              
                <a
                  href={import.meta.env.VITE_APP_URL || 'https://collabnest-iota.vercel.app'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
                  >
                  Dashboard
                </a>
              </div>
                  <div>
                <a
                  href="https://github.com/Arun-kushwaha007/CollabNest-Home.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
                >
                  Code
                </a>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Connect Me
            </h4>
            <div className="flex justify-center md:justify-start gap-3">
              <a
                href="https://x.com/Arunkush00?s=08"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--muted-foreground)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--primary)';
                  e.target.style.color = 'var(--primary-foreground)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--accent)';
                  e.target.style.color = 'var(--muted-foreground)';
                }}
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://github.com/Arun-kushwaha007"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--muted-foreground)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--primary)';
                  e.target.style.color = 'var(--primary-foreground)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--accent)';
                  e.target.style.color = 'var(--muted-foreground)';
                }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/arun-kushwaha-394b5a340/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  color: 'var(--muted-foreground)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--primary)';
                  e.target.style.color = 'var(--primary-foreground)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--accent)';
                  e.target.style.color = 'var(--muted-foreground)';
                }}
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t text-center"
          style={{ borderColor: 'var(--border)' }}
        >
          <p style={{ color: 'var(--muted-foreground)' }}>
            © {new Date().getFullYear()}{' '}
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
              CollabNest
            </span>
            . All rights reserved. Made with{' '}
            <Heart 
              size={14} 
              className="inline mx-1" 
              style={{ color: 'var(--primary)' }}
            />{' '}
            for better collaboration.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
