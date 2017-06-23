module.exports = {
  env: {
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/all',
    'plugin:flowtype/recommended'
  ],
  parser: 'babel-eslint',
  plugins: [
    'jest',
    'standard',
    'react',
    'flowtype'
  ],
  rules: {
    'camelcase': 'off',
    'indent': ['error', 2],
    'react/default-props-match-prop-types': [1, {'allowRequiredDefaults': true}],
    'react/forbid-component-props': 'off',
    'react/no-danger': 'off',
    'react/jsx-no-bind': ['warn', {ignoreRefs: true}],
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2]
  }
}
