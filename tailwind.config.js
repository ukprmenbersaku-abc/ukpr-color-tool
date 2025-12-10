/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 'media' から 'class' に変更して手動切り替えに対応
  theme: {
    extend: {
      colors: {
        // カスタムカラーをここに追加できます
      }
    },
  },
  plugins: [],
}