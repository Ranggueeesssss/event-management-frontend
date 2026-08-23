import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      className="btn btn-secondary btn-icon"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={18} style={{ stroke: '#fbbf24', fill: '#fbbf24' }} />
      ) : (
        <Moon size={18} style={{ stroke: '#475569', fill: '#475569' }} />
      )}
    </button>
  );
}
