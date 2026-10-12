import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono Variable"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Near-black neutrals for dark surfaces.
        ink: {
          950: '#09090b',
          900: '#0e0e11',
          850: '#131317',
          800: '#1a1a1f',
          700: '#26262d',
          600: '#3a3a43',
          500: '#62626d',
          400: '#9696a1',
          300: '#c2c2ca',
          200: '#e0e0e5',
        },
        // Warm off-white surfaces.
        paper: {
          50: '#fbfaf7',
          100: '#f4f2ed',
          200: '#e7e4dc',
          300: '#d5d1c6',
          400: '#a9a497',
          500: '#6f6b62',
          600: '#4d4a43',
        },
        // Single restrained accent (electric blue).
        accent: {
          300: '#a9bdff',
          400: '#7c9bff',
          500: '#4d7cff',
          600: '#2f5fe8',
          700: '#2449c4',
        },
      },
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        display: ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        'display-lg': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.045em' }],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        dash: {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        dash: 'dash 1.6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
