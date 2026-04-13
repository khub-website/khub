import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#fcf9f4',
        'surface-container-low': '#f6f3ee',
        'surface-container-lowest': '#ffffff',
        'surface-container-high': '#ebe8e3',
        'on-surface': '#1c1c19',
        'on-surface-variant': '#4d5555',
        primary: '#006c51',
        'primary-container': '#33c096',
        tertiary: '#4d6264',
        'outline-variant': '#bbcac2',
      },
    },
  },
  plugins: [],
} satisfies Config;
