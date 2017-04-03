module.exports = {
  extends: ['standard', 'plugin:react/all'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['standard', 'react'],
  rules: {
    'react/forbid-component-props': 0,    // so we can use <Link className='' />
    'react/no-danger': 0,                 // so we can use <div dangerouslySetInnerHTML={{}} />
    'react/no-unused-prop-types': 0,      // produces too many false-positives
    'react/jsx-indent': [2, 2],           // because 4 spaces is the default
    'react/jsx-indent-props': [2, 2],     // because 4 spaces is the default
    'react/jsx-no-bind': [2, {
      ignoreRefs: true                    // because {ref => { this.node = ref }} is fine
    }]
  }
}
