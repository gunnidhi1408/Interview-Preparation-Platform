/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2463',
          light: '#2F4A8B',
          dark: '#061642',
        },
        secondary: {
          DEFAULT: '#247BA0',
          light: '#4398B9',
          dark: '#19587A',
        },
        accent: {
          DEFAULT: '#FF9F1C',
          light: '#FFB74D',
          dark: '#E78500',
        },
        success: {
          DEFAULT: '#2A9D8F',
          light: '#3EBFAF',
          dark: '#1C7268',
        },
        warning: {
          DEFAULT: '#F4A261',
          light: '#F7B787',
          dark: '#F18132',
        },
        error: {
          DEFAULT: '#E76F51',
          light: '#ED8D75',
          dark: '#D15539',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};