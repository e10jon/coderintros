module.exports = {
  extends: ['standard', 'plugin:react/all'],
  parser: 'babel-eslint',
  plugins: ['standard', 'react'],
  rules: {
    'react/forbid-component-props': 'off',
    'react/no-danger': 'off',
    'react/no-multi-comp': 'off',
    'react/jsx-no-bind': ['warn', {ignoreRefs: true}],
    'react/jsx-no-literals': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['warn', 2],
    'react/prop-types': 'off'
  }
}
