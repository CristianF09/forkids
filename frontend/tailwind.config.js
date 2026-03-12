/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Color System
      colors: {
        primary: {
          DEFAULT: '#20BF55',
          dark: '#1A9F45',
          light: '#4DD87A',
          50: '#E8F9EE',
          100: '#D1F3DD',
          200: '#A3E7BB',
          300: '#75DB99',
          400: '#47CF77',
          500: '#20BF55',
          600: '#1A9F45',
          700: '#147F36',
          800: '#0F5F28',
          900: '#0A3F1B',
        },
        secondary: {
          DEFAULT: '#FF6B00',
          dark: '#E05C00',
          light: '#FF8A33',
          50: '#FFF0E6',
          100: '#FFE1CC',
          200: '#FFC499',
          300: '#FFA666',
          400: '#FF8933',
          500: '#FF6B00',
          600: '#E05C00',
          700: '#B84D00',
          800: '#8F3B00',
          900: '#662A00',
        },
        tertiary: {
          DEFAULT: '#FFD700',
          dark: '#E6C300',
          light: '#FFE566',
          50: '#FFFBCC',
          100: '#FFF899',
          200: '#FFF566',
          300: '#FFF233',
          400: '#FFEF00',
          500: '#FFD700',
          600: '#E6C300',
          700: '#CCAF00',
          800: '#B39B00',
          900: '#998700',
        },
        // Card gradient colors
        card: {
          start: '#2C5F7A',
          end: '#0A4D68',
        },
      },
      // Typography
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Poppins', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-3': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-4': ['1.25rem', { lineHeight: '1.5' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      // Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      // Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Shadows
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 20px 60px -15px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(32, 191, 85, 0.3)',
        'glow-secondary': '0 0 20px rgba(255, 107, 0, 0.3)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.3)',
      },
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'fade-in-down': 'fadeInDown 0.6s ease forwards',
        'slide-in-left': 'slideInLeft 0.6s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'scale-in': 'scaleIn 0.4s ease forwards',
        'bounce-slow': 'bounce 2s ease infinite',
        'pulse-slow': 'pulse 3s ease infinite',
        'float': 'float 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      // Transitions
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      // Backdrop blur
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    // Custom plugin for additional utilities
    function({ addUtilities, addComponents, theme }) {
      // Additional utility classes
      addUtilities({
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #20BF55 0%, #FF6B00 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-gradient-hero': {
          'background': 'linear-gradient(135deg, #25B838 0%, #FF6B00 50%, #FFD700 100%)',
        },
        '.bg-gradient-card': {
          'background': 'linear-gradient(135deg, #2C5F7A 0%, #0A4D68 100%)',
        },
        '.bg-gradient-primary': {
          'background': 'linear-gradient(135deg, #20BF55 0%, #1A9F45 100%)',
        },
        '.bg-gradient-secondary': {
          'background': 'linear-gradient(135deg, #FF6B00 0%, #E05C00 100%)',
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.8)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.glass-dark': {
          'background': 'rgba(32, 35, 42, 0.8)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.animation-delay-100': {
          'animation-delay': '100ms',
        },
        '.animation-delay-200': {
          'animation-delay': '200ms',
        },
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
        '.animation-delay-400': {
          'animation-delay': '400ms',
        },
        '.animation-delay-500': {
          'animation-delay': '500ms',
        },
      });

      // Component classes
      addComponents({
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '1rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 300ms ease',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          '&:focus-visible': {
            outline: '2px solid #20BF55',
            outlineOffset: '2px',
          },
        },
        '.btn-primary': {
          background: 'linear-gradient(135deg, #20BF55 0%, #1A9F45 100%)',
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 20px rgba(32, 191, 85, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px rgba(32, 191, 85, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
        '.btn-secondary': {
          background: 'linear-gradient(135deg, #FF6B00 0%, #E05C00 100%)',
          color: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 20px rgba(255, 107, 0, 0.3)',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px rgba(255, 107, 0, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
        '.card': {
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          transition: 'all 300ms ease',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transform: 'translateY(-4px)',
          },
        },
        '.section-padding': {
          paddingTop: '5rem',
          paddingBottom: '5rem',
          '@media (min-width: 768px)': {
            paddingTop: '6rem',
            paddingBottom: '6rem',
          },
          '@media (min-width: 1024px)': {
            paddingTop: '8rem',
            paddingBottom: '8rem',
          },
        },
      });
    },
  ],
};
