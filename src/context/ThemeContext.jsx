
import React, { createContext, useContext, useState, useEffect } from 'react';


const ThemeContext = createContext();


const getInitialTheme = () => {
  
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = localStorage.getItem('theme');
 
    if (storedTheme) {
      return storedTheme;
    }
    
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light'; 
  }
  return 'light'; 
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme); 
  useEffect(() => {
    
    document.body.className = theme === 'dark' ? 'dark-mode' : '';

    localStorage.setItem('theme', theme);
  }, [theme]); 
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

 
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Renders all child components */}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);