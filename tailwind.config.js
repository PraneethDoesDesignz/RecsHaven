module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /bg-serenade-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /text-serenade-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /border-serenade-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DCD7FD',
          300: '#C4B6FC',
          400: '#A68DF8',
          500: '#895FF3',
          600: '#7A3EEA',
          700: '#6B2BD6',
          800: '#5924B3',
          900: '#4A1F93',
          950: '#2C1164',
        },
        serenade: {
          '50':  '#fff7ed',
          '100': '#ffecd5',
          '200': '#fed9aa',
          '300': '#fdc074',
          '400': '#fba63c',
          '500': '#f99416',
          '600': '#ea870c',
          '700': '#c2710c',
          '800': '#9a5e12',
          '900': '#7c4d12',
          '950': '#432807',
        },
      },
    },
  },
  plugins: [],
}
