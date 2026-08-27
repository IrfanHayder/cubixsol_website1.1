/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        '7xl': '90rem', /* was 80rem — slightly wider site shell */
        '8xl': '96rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7fc',
          100: '#e0eef9',
          200: '#b8daf0',
          300: '#7bbde3',
          400: '#3aa4d4',
          500: '#00a4d8',
          600: '#5d53a3',
          700: '#4a4285',
          800: '#3c366c',
          900: '#332e5a',
          950: '#1f1b38',
        },
        brand: {
          cyan: '#00a4d8',
          purple: '#5d53a3',
        },
        ink: '#1a1a2e',
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(26, 26, 46, 0.08)',
        soft: '0 12px 40px -12px rgba(93, 83, 163, 0.3)',
        elev: '0 20px 50px -20px rgba(26, 26, 46, 0.18)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #00a4d8 0%, #5d53a3 100%)',
        'hero-overlay': 'linear-gradient(105deg, rgba(26,26,46,0.88) 0%, rgba(26,26,46,0.55) 50%, rgba(26,26,46,0.25) 100%)',
      },
    },
  },
  plugins: [],
}
