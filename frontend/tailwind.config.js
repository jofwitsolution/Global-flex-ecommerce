/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
    './src/**/**/*.{gif,svg,jpg,png, jpeg}',
  ],
  mode: 'jit',
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      screens: {
        '1000px': '1050px',
        '1100px': '1110px',
        '800px': '800px',
        '1300px': '1300px',
        '400px': '400px',
        '300px': '300px',
      },
      colors: {
        'main-bg': '#F6F6F5',
      },
      backgroundColor: {
        'main-bg': '#F6F6F5',
      },
      backgroundImage: {
        'hero-home':
          "linear-gradient(to right, rgba(0, 0, 0, .6), rgba(0, 0, 0, .7), rgba(0, 0, 0, .6)), url('/src/assets/images/gfs-1.jpg')",
      },
      keyframes: {
        'sidebar-slide-out': {
          '0%': { transform: 'translateX(-70%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'sidebar-slide-in': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-70%)' },
        },
      },
      animation: {
        'sidebar-slide-out': 'sidebar-slide-out 1s ease-in-out 1',
        'sidebar-slide-in': 'sidebar-slide-in 1s ease-in-out 1',
      },
    },
  },
  plugins: [],
};
