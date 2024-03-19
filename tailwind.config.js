/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('rippleui')],
  rippleui: {
    themes: [
      {
        themeName: 'custom',
        colorScheme: 'dark' | 'light',
        colors: {
          primary: '#634673',
          backgroundPrimary: '#583533',
        },
      },
    ],
  },
};
