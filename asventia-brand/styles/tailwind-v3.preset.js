/** Tailwind CSS v3 preset — in tailwind.config.js: presets: [require('./asventia-brand/styles/tailwind-v3.preset.js')]
 *  Colours point at the CSS variables in tokens.css, so the dark theme switches by itself. */
module.exports = {
  theme: {
    extend: {
      colors: {
        'paper': 'var(--paper)',
        'paper-raised': 'var(--paper-raised)',
        'paper-sunken': 'var(--paper-sunken)',
        'line': 'var(--line)',
        'line-strong': 'var(--line-strong)',
        'ink': 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-muted': 'var(--ink-muted)',
        'inverse': 'var(--inverse)',
        'on-inverse': 'var(--on-inverse)',
        'on-inverse-muted': 'var(--on-inverse-muted)',
        'line-inverse': 'var(--line-inverse)',
        'accent': 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        'accent-soft': 'var(--accent-soft)',
        'on-accent': 'var(--on-accent)',
        'accent-inverse': 'var(--accent-inverse)',
        'support': 'var(--support)',
        'positive': 'var(--positive)',
        'positive-soft': 'var(--positive-soft)',
        'warning': 'var(--warning)',
        'warning-soft': 'var(--warning-soft)',
        'negative': 'var(--negative)',
        'negative-soft': 'var(--negative-soft)',
        'link': 'var(--link)'
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-text)'],
        mono: ['var(--font-text)'], // the brand has no monospace
      },
      borderRadius: { none: '0px', sm: '2px', DEFAULT: '0px', md: '0px', lg: '0px', xl: '0px', '2xl': '0px', '3xl': '0px' },
      boxShadow: { float: 'var(--shadow-float)', focus: 'var(--focus-ring)' },
      transitionTimingFunction: { out: 'var(--ease-out)' },
    },
  },
};
