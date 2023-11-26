module.exports = {
  purge: {
    content: [
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.html',
      './src/**/*.pug',
      './src/**/*.md'
    ]
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ['responsive', 'hover', 'focus', 'group-hover'],
    }
  },
  plugins: [
    require('tailwindcss-interaction-variants'),
  ],
}