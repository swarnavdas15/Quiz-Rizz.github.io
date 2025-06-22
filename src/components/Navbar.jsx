import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'; 
import { useTheme } from '../context/ThemeContext'; // Import the custom theme hook

const Navbar = ({ navigateTo, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu open/close
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function from context

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggles the boolean state for menu visibility
  };

  const handleLinkClick = (e, section) => {
    if (e) e.preventDefault(); // Prevent default link behavior if an event object exists
    navigateTo(section); // Navigate through React state 
    setIsOpen(false); // Close menu when a navigation link is clicked
  };

  // Effect to prevent body scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable body scroll
    } else {
      document.body.style.overflow = 'unset'; // Re-enable body scroll
    }
    // Cleanup function: runs when component unmounts or before next effect runs
    return () => {
      document.body.style.overflow = 'unset'; // Ensure scroll is re-enabled on unmount
    };
  }, [isOpen]); 

  return (
    <> {/* React Fragment to return multiple top-level elements */}
      <header>
        <nav className="navbar nav-dark-mode">
          {/* Logo with click handler to navigate to home */}
          <div className="logo" onClick={() => handleLinkClick(null, 'home')} style={{cursor: 'pointer'}}>Quizz-Rizz</div>
          
          {/* Navigation Links - apply 'nav-active' class when menu is open */}
          <ul className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
            <li>
              <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>
                About
              </a>
            </li>
            <li>
              <a href="#user" onClick={(e) => handleLinkClick(e, 'user')} className={activeSection === 'user' ? 'active' : ''}>
                Start Game
              </a>
            </li>
            <li>
              <a href="#leaderboard" onClick={(e) => handleLinkClick(e, 'leaderboard')} className={activeSection === 'leaderboard' ? 'active' : ''}>
                Leaderboard
              </a>
            </li>
            {/* Dark Mode Toggle Button */}
            <li>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
          
          {/* Hamburger Menu Icon - apply 'nav-active' class for animation when menu is open */}
          <div className={`hamburger ${isOpen ? 'nav-active' : ''}`} onClick={toggleMenu}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay - rendered conditionally when menu is open */}
      {isOpen && <div className="menu-overlay is-visible" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;