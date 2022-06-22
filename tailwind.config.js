module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "md-max": { max: "767px" },
      },
      spacing: {
        "fit-content": "calc(100vh - 10vh - 56px)"
      }
    },
  },
  plugins: [],
};
