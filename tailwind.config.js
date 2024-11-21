/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}" // 파일 확장자에 따라 수정
  ],
  theme: {
    extend: {
      screens: {
        'lg-max': { 'max': '1900px' },
        'xl': '1300px',
      },
    },
  },
  plugins: [],
};
