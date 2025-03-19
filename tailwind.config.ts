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
        dotMove: {
          '0%': { transform: 'translateX(0)', opacity: '1'},
          '20%, 60%': {boxShadow: ' 0px 0px 15px 3px rgba(232,212,79,0.69)'},
          '40%': {boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'},
          '80%': {boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)', opacity: '1'},
          '100%': { transform: 'translateX(4800%)', boxShadow: ' 0px 0px 15px 3px rgba(232,212,79,0.69)', opacity: '0'},
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '0% 100%' },
        },
        fadeIn: {
          '0%': { opacity: '0.1' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.1' },
        },
      },
      animation: {
        dotMove: 'dotMove 5s ease-in-out infinite',
        gradientMoveAnimate: 'gradientMove 5s ease infinite',
        gradientMove: 'gradientMove 10s ease infinite',
        fadeIn: 'fadeIn 3s ease-in-out infinite',
      },
      boxShadow: {
        'dotEffect': '0 0 8px rgba(255, 255, 255, 0.6)',
        'shadowInset': 'inset 0 0 0 1000px rgba(0,0,0,.7)',
        'shadowBg' : 'inset 0 0 0 1000px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
