/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1e40af",
          secondary: "#f59e0b",
          accent: "#f9a8d4",
          neutral: "#2b2e36",
          "base-100": "#f3f4f6",
          info: "#3178f2",
          success: "#06b6d4",
          warning: "#e7c21d",
          error: "#f43f5e",
          "desc-text": "#3b3b32",
          body: {
            "background-color": "#e8eaea", // for dark mode theme
          },
        },
      },
    ],
  },
};
