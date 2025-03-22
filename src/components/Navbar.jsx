import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { portfolioData, toggleDarkMode } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClass = scrolled ? 'navbar scrolled' : 'navbar';
  const menuClass = menuOpen ? 'nav-links open' : 'nav-links';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <nav className={navbarClass}>
      <div className="container">
        <motion.div 
          className="navbar-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo">
            <a href="#home">
              {portfolioData?.personalInfo?.name?.split(' ')[0] || 'Portfolio'}
            </a>
          </div>

          <div className={menuClass}>
            <ul>
              <li><a href="#home" onClick={closeMenu}>Home</a></li>
              <li><a href="#about" onClick={closeMenu}>About</a></li>
              <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
              <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            </ul>
          </div>

          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={handleToggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {portfolioData?.darkMode ? '☀️' : '🌙'}
            </button>
            
            <div className="menu-toggle" onClick={toggleMenu}>
              <div className={menuOpen ? 'hamburger open' : 'hamburger'}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar; 