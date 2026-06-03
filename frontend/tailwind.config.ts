import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // === LIGHT GLAMPING PALETTE ===

        // Backgrounds – warm sandy whites
        'sand-white':  '#FAF7F1',   // main bg
        'sand':        '#F2E9D6',   // secondary sections
        'linen':       '#E8DCCA',   // cards, inputs
        'stone':       '#D0BFA8',   // borders, dividers

        // Text
        'ink':         '#1A0F04',   // headlines
        'earth':       '#5A3A18',   // body text
        'clay':        '#9A7A54',   // muted/secondary text

        // Primary accent – golden sun / warmth
        'sun':         '#D4913A',   // primary CTA, buttons
        'amber':       '#C07030',   // deeper amber
        'honey':       '#F0C050',   // light golden highlight

        // Nature green
        'sage':        '#7A9E68',   // sage green
        'forest':      '#3A6832',   // deep forest
        'moss':        '#587848',   // moss

        // Water & sky
        'sky-pale':    '#DFF0FA',   // very light sky (section bg)
        'sky':         '#7BBFDF',   // sky blue
        'water':       '#3E8EB0',   // fresh water
        'ocean':       '#1E6080',   // deep ocean

        // Dark (footer, CTA bg)
        'deep':        '#1A2510',   // deep forest dark
        'charcoal':    '#2A1A08',   // warm charcoal

        // Warm white
        'white-warm':  '#FFFDF8',   // pure warm white

        // === LEGACY ALIASES (keep sections working) ===
        'abyss':       '#1A0F04',
        'deep-water':  '#1E6080',
        'dusk':        '#3A6832',
        'horizon':     '#3E8EB0',
        'mist':        '#7BBFDF',
        'dawn':        '#D4913A',
        'sunrise':     '#F0C050',
        'fog':         '#E8DCCA',
        'bark':        '#9A7A54',
        'cream':       '#FAF7F1',
        'text-dark':   '#1A0F04',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'display-sc': ['"Cormorant SC"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 12px rgba(90,58,24,0.08)',
        'warm':    '0 4px 24px rgba(90,58,24,0.12)',
        'warm-lg': '0 8px 48px rgba(90,58,24,0.16)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
