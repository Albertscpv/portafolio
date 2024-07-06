/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'satoshi-medium':['Satoshi-Medium'],
      'satoshi-regular':['Satoshi-Regular'],
      'satoshi-bold':['Satoshi-Bold'],
      'satoshi-bold-italic':['Satoshi-Bold-Italic'],
    },
    extend: {},
  },
  plugins: [],
}
