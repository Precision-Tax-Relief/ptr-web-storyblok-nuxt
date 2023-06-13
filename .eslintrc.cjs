module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  plugins: [],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    camelcase: 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
