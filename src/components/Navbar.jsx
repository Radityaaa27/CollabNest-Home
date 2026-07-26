import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const navLinks = [
  { href: '/', label: 'Home', isRoute: true },
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'Workflow' },
  { href: '/about', label: 'About Me', isRoute: true },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const tickingRef = useRef(false);
  const sectionLinks = useMemo(
    () => navLinks.filter(link => link.href.startsWith('#')),
    []
  );

  useEffect(() => {
    if (location.pathname !== '/') return undefined;

    const sections = sectionLinks
      .map(link => ({ href: link.href, node: document.getElementById(link.href.slice(1)) }))
      .filter(section => section.node);

    const updateActiveSection = () => {
      const scrollY = window.scrollY + 100;
      let nextActive = '';
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        if (sections[i].node.offsetTop <= scrollY) {
          nextActive = sections[i].href;
          break;
        }
      }
      setActiveSection(prev => (prev === nextActive ? prev : nextActive));
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        tickingRef.current = false;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname, sectionLinks]);

  // Set active section based on current route
  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveSection(location.pathname);
    } else if (location.pathname === '/') {
      setActiveSection('');
    }
  }, [location.pathname]);

  const handleNavClick = (event, href, isRoute) => {
    setIsOpen(false);
    if (!isRoute && location.pathname !== '/') {
      event.preventDefault();
      navigate({ pathname: '/', hash: href });
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 z-50 w-full px-6 md:px-10 py-4 flex justify-between items-center backdrop-blur-lg shadow-sm border-b transition-colors duration-300"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl md:text-3xl font-extrabold tracking-tight transition-colors duration-300"
        style={{ color: 'var(--primary)' }}
      >
        CollabNest
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(link => {
          const isActive = activeSection === link.href;
          
          return link.isRoute ? (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-all duration-200 underline-offset-4 px-3 py-2 rounded-lg ${
                isActive ? 'underline' : 'hover:underline'
              }`}
              style={{
                color: isActive ? 'var(--primary)' : 'var(--foreground)',
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.color = 'var(--primary)';
                  e.target.style.backgroundColor = 'var(--accent)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, false)}
              className={`text-sm font-medium transition-all duration-200 underline-offset-4 px-3 py-2 rounded-lg ${
                isActive ? 'underline' : 'hover:underline'
              }`}
              style={{
                color: isActive ? 'var(--primary)' : 'var(--foreground)',
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.color = 'var(--primary)';
                  e.target.style.backgroundColor = 'var(--accent)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.color = 'var(--foreground)';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.label}
            </a>
          );
        })}

        {/* Theme Toggle - Desktop */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--foreground)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--primary)';
            e.target.style.color = 'var(--primary-foreground)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--accent)';
            e.target.style.color = 'var(--foreground)';
          }}
        >
          {theme === 'dark' ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* CTA Button */}
        <a
          href={import.meta.env.VITE_APP_URL || 'https://collabnest-iota.vercel.app'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          Get Started
        </a>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center gap-2">
        {/* Theme toggle - Mobile */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--foreground)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--primary)';
            e.target.style.color = 'var(--primary-foreground)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--accent)';
            e.target.style.color = 'var(--foreground)';
          }}
        >
          {theme === 'dark' ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="p-2 rounded-full transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--accent)',
            color: 'var(--foreground)' 
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full px-6 py-6 shadow-lg border-t md:hidden transition-colors duration-300"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => {
                const isActive = activeSection === link.href;
                
                return link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href, true)}
                    className={`text-base font-medium transition-all duration-200 underline-offset-4 px-4 py-3 rounded-lg ${
                      isActive ? 'underline' : 'hover:underline'
                    }`}
                    style={{
                      color: isActive ? 'var(--primary)' : 'var(--foreground)',
                      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, false)}
                    className={`text-base font-medium transition-all duration-200 underline-offset-4 px-4 py-3 rounded-lg ${
                      isActive ? 'underline' : 'hover:underline'
                    }`}
                    style={{
                      color: isActive ? 'var(--primary)' : 'var(--foreground)',
                      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Mobile CTA Button */}
              <a
                href={import.meta.env.VITE_APP_URL || 'https://collabnest-iota.vercel.app'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-semibold text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 mt-2"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  boxShadow: 'var(--shadow-md)',
                }}
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
