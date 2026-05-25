/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand book: Verde Principal #2F5F2F
        verde: {
          50: '#F0F5F0',
          100: '#D4E4D4',
          200: '#A8C8A8',
          300: '#7EAB7E',
          400: '#4D7B4D',
          500: '#2F5F2F',
          600: '#264C26',
          700: '#1C381C',
          800: '#122612',
          900: '#091509',
        },
        // Brand book: Verde Claro #D3DAC3
        'verde-claro': '#D3DAC3',
        // Brand book: Morado Accent #C586F0 — mapped to "ocre" key to avoid touching all component files
        ocre: {
          50: '#FBF4FF',
          100: '#F3E3FD',
          200: '#E7C7FB',
          300: '#D9A9F8',
          400: '#C586F0',
          500: '#AB64DB',
          600: '#8C48C0',
          700: '#6D35A0',
          800: '#4E2278',
          900: '#311054',
        },
        // Brand book: Beige Suave #F5EBDF
        crema: '#F5EBDF',
        carbon: '#1F2922',
      },
      fontFamily: {
        // Brand book: Figtree (primaria) + Plus Jakarta Sans (secundaria)
        display: ['Figtree', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
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
