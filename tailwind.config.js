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
          primary: "#a3e635",
          secondary: "#ed63d1",
          accent: "#f2a379",
          neutral: "#2b2e36",
          "base-100": "#f0eef1",
          info: "#3178f2",
          success: "#127363",
          warning: "#e7c21d",
          error: "#f43f5e",
          body: {
            "background-color": "#e8eaea", // for dark mode theme
          },
        },
      },
    ],
  },
};
