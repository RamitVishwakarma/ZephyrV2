/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': 'var(--background-pattern)',
      },
      backgroundSize: {
        'custom-size': '100px 100px',
      },
      backgroundPosition: {
        'custom-position': '0% 0%',
      },
      colors: {},
      fontFamily: {
        sans: ['var(--font-product-sans)'],
      },
    },
  },
  plugins: [],
};
