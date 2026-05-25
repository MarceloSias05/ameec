/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        verde: {
          50: '#F2F5F2',
          100: '#DDE5DD',
          200: '#B8C8B8',
          300: '#8FAB8F',
          400: '#658765',
          500: '#3F5E3F',
          600: '#324B32',
          700: '#263926',
          800: '#1A271A',
          900: '#0F170F',
        },
        ocre: {
          50: '#FBF2EB',
          100: '#F4DCC8',
          200: '#E7B58F',
          300: '#D89760',
          400: '#C97B4A',
          500: '#B26439',
          600: '#8E4F2D',
          700: '#6A3A21',
          800: '#472716',
          900: '#26140A',
        },
        crema: '#F4EFE6',
        carbon: '#1F2922',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '70ch',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
