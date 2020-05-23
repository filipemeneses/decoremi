module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  plugins: [
    'svelte3'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'no-multiple-empty-lines': 0
  }
}
