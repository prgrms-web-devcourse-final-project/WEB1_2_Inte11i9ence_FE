/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'lg-max': { 'max': '1900px' },
        'xl': '1300px',
      },
      fontFamily: {
        sans: ['Noto Sans KR'], 
        title: ['Parkinsans'],
        //Ubuntu
        //Righteous
        // Parkinsans
      },
      colors: {
        darkBlue: '#1A2A6C',  // 진한 블루 (버튼 테두리, 문장 포인트)
        lightBlue: '#68B8FF', // 연한 블루 (단어 포인트)
        darkGray: '#787878',  // 진한 그레이 (텍스트 색상)
        lightGray: '#EEEEEE', // 연한 그레이 (배경 색상)
        black: '#393939',     // 검정색
      },
    },
  },
  plugins: [],
};
