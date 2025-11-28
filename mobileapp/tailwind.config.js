/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        nunitosans: ["NunitoSans-Regular", "sans-serif"],
        "nunitosans-medium": ["NunitoSans-Medium", "sans-serif"],
        "nunitosans-semibold": ["NunitoSans-SemiBold", "sans-serif"],
        "nunitosans-bold": ["NunitoSans-Bold", "sans-serif"],
        "nunitosans-extrabold": ["NunitoSans-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
