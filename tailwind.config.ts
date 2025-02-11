import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_s: "#F3F7F0",
        secondary_s: "#fff",
        primary_n: "#403B45",
        secondary_n: "#ACA0B7",
        nav: "#2B261D",
      },
    },
  },
  plugins: [],
} satisfies Config;
