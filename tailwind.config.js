/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fc-cream': 'var(--fc-cream)',
        'fc-cream-deep': 'var(--fc-cream-deep)',
        'fc-ink': 'var(--fc-ink)',
        'fc-ink-soft': 'var(--fc-ink-soft)',
        'fc-clay': 'var(--fc-clay)',
        'fc-clay-deep': 'var(--fc-clay-deep)',
        'fc-sand': 'var(--fc-sand)',
        'fc-line': 'var(--fc-line)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Hanken Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
