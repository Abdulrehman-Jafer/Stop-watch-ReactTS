export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "reset-dis-bg":"rgb(20, 20, 20)",
        "reset-dis-text": "rgb(140, 140, 140)",
        "stop-bg":"rgb(57, 25, 22)",
        "stop-text": "rgb(226, 74, 59)",
        "start-bg": "rgb(32, 53, 33)",
        "start-text": "rgb(121, 218, 116)",
        "reset-bg": "rgb(61, 61, 61)",
        "reset-text": "#fff",
      }
    },
  },
  plugins: [],
}