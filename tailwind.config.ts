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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0.1' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 3s ease-in-out infinite',
      },
      boxShadow: {
        'shadowBgDarker': 'inset 0 0 0 1000px rgba(0,0,0,.7)',
        'shadowBg' : 'inset 0 0 0 1000px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
