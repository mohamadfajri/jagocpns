import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {},
    colors: {
      jago: {
        1: '#f7b236',
        2: '#f78e36',
        3: '#f7d936',
        4: '#f75b36',
        5: '#f7f236',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
