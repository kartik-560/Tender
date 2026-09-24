/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Institutional deep navy & federal blue primary palette
        gov: {
          950: '#07121e',
          900: '#0b1b2d',
          850: '#0f243a',
          800: '#142f4c',
          700: '#1b3f66',
          600: '#235182',
          500: '#2f67a3',
          100: '#e7eef6',
          50: '#f1f6fb',
        },
        // Action blue
        action: {
          DEFAULT: '#1d4ed8',
          hover: '#1e40af',
          light: '#eff6ff',
          border: '#bfdbfe',
        },
        // Restrained neutral slate
        surface: {
          bg: '#f8fafc',
          card: '#ffffff',
          muted: '#f1f5f9',
          border: '#e2e8f0',
          'border-subtle': '#cbd5e1',
          text: '#0f172a',
          secondary: '#475569',
          mutedText: '#64748b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        subtle: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '3px',
        md: '6px',
        lg: '8px',
      },
    },
  },
  plugins: [],
};
