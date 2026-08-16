import React, { createContext, useContext, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  theme: 'dark';
  resolvedTheme: 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  resolvedTheme: 'dark',
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    root.style.colorScheme = 'dark';
    try {
      localStorage.setItem('knowhere:theme', 'dark');
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', resolvedTheme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
