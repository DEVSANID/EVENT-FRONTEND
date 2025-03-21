/**
 * @type {import('tailwindcss').Config}
 */
export const mode = 'jit';
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  screens: {
    sm: "440px", // Custom small screen size
    lg: "976px", // Adjusted large screen size
    xl: "1440px", // Custom extra-large screen size
  },
  extend: {
    colors: {
      primary: "#7848F4",
      secondary: "#FF5C81",
      black: "#131315",
      grey: "#687C94",
      lightBlue: "#27A5EE",
      backgroundGrey: "#F8F8FA",
      white: "#FFFFFF",
      navyBlue: "#10107B",

      sans: ['Inter', 'sans-serif'],
    }
  },
};
export const plugins = [];
