/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#000000',
          secondary: '#050806',
          card: '#050806e6',
          elevated: '#090e0b',
        },
        border: {
          DEFAULT: '#142a20',
          light: '#064e3b99',
          glow: '#10b981',
        },
        text: {
          DEFAULT: '#f9fafb',
          muted: '#9ca3af',
          subtle: '#4b6352',
        },
        primary: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#34d399',
        },
        secondary: '#14b8a6',
        accent: {
          DEFAULT: '#14b8a6',
          light: '#2dd4bf',
        },
        warning: '#f59e0b',
        danger: '#f43f5e',
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'panel': '0 16px 48px #000000f2, 0 0 20px #10b98112',
        'elevated': '0 20px 50px rgba(0,0,0,0.95), 0 0 25px rgba(16,185,129,0.1)',
        'glow-primary': '0 0 20px #10b9814d',
        'glow-hover': '0 0 25px #10b98180',
        'glow-subtle': '0 0 15px #10b98126',
        'glow-green': '0 0 20px rgba(16,185,129,0.35)',
      },
    },
  },
  plugins: [],
}
