/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandColor: "#182B84",
        body: "#F0F0F1",
        darkBg: "#1D2327",
        lightBg: "#F6F7F7",
        primaryColor: "#005C91",
        borderColor: "#ddd",
        btn2: "#eaecf0",
        brandBg: "#FCF8ED",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: ["light"],
  },
};
