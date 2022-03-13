module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        GET: "#86efac",
        POST: "#93c5fd",
        PUT: "#fdba74",
        PATCH: "#facc15",
        DELETE: "#fca5a5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
