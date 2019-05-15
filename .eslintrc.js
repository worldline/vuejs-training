module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-useless-escape': 'off'
  },
  globals: {}
}
