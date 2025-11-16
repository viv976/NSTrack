import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always use dark theme
  const theme = 'dark';

  useEffect(() => {
    // Force dark theme on the root element
    document.documentElement.classList.add('dark');
    document.body.classList.add('bg-black', 'text-white');
    
    // Set theme in localStorage for consistency
    localStorage.setItem('theme', 'dark');
  }, []);

  // No-op since we're forcing dark theme
  const toggleTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-black text-white">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;