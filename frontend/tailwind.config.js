/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nano Banana AI image generation theme color scheme
        'earth-blue': '#1e40af',      // Earth deep blue - ocean and atmosphere
        'space-dark': '#0f172a',      // Space dark - cosmic background
        'cosmic-purple': '#7c3aed',   // Cosmic purple - mysterious space
        'solar-gold': '#f59e0b',      // Solar gold - sunlight and energy
        'stellar-silver': '#e5e7eb',  // Stellar silver - metallic luster
        'ocean-blue': '#0ea5e9',      // Ocean blue - earth waters
        'earth-green': '#059669',     // Earth green - land vegetation
        'atmosphere': '#3b82f6',      // Atmosphere blue
        'nebula': '#8b5cf6',          // Nebula purple
        'starlight': '#f8fafc',       // Starlight white
        'meteor': '#ef4444',          // Meteor red
        'satellite': '#6b7280',       // Satellite gray
        'horizon': '#fbbf24',         // Horizon gold
        
        // Nested definitions for compatibility
        earth: {
          blue: '#1e40af',
          'space-dark': '#0f172a',
          'cosmic-purple': '#7c3aed',
          'solar-gold': '#f59e0b',
          'ocean-blue': '#0ea5e9',
          'earth-green': '#059669',
          'atmosphere': '#3b82f6',
          'nebula': '#8b5cf6',
          'starlight': '#f8fafc',
          'meteor': '#ef4444',
          'satellite': '#6b7280',
          'horizon': '#fbbf24',
        },
        
        // Keep some common colors for compatibility
        primary: '#1e40af',
        secondary: '#7c3aed', 
        accent: '#f59e0b',
        background: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'earth-hero': "url('/src/assets/earth-hero-bg.jpg')",
        'space-pattern': "url('/src/assets/space-pattern.jpg')",
        'stars-texture': "url('/src/assets/stars-texture.png')",
        'earth-gradient': 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #0f172a 100%)',
        'cosmic-gradient': 'linear-gradient(45deg, #0f172a 0%, #7c3aed 35%, #1e40af 70%, #f59e0b 100%)',
        'zoom-gradient': 'radial-gradient(circle at center, #1e40af 0%, #7c3aed 50%, #0f172a 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'zoom-pulse': 'zoomPulse 4s ease-in-out infinite',
        'orbit': 'orbit 15s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        zoomPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' },
        },
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        }
      },
    },
  },
  plugins: [],
}
