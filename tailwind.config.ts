import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      outline: ['focus-visible'],
      borderColor: ['focus-visible'],
      ringWidth: ['focus-visible'],
      ringColor: ['focus-visible'],
      ringOpacity: ['focus-visible'],
    },
  },
};
export default config;
