const glob = require('glob')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const createCommonConfig = require('./common.config')
const commonConfig = createCommonConfig({
  babelTargets: {node: true},
  cleanWebpackPath: 'dist/test',
  cssModuleUse: 'css-loader/locals'
})

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill'].concat(glob.sync('./test/**/*.test.js*')),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist/test'),
    filename: 'tests.js'
  },
  externals: [nodeExternals({
    whitelist: ['ace-css/css/ace.min.css']
  })],
  module: commonConfig.module,
  plugins: commonConfig.plugins,
  resolve: commonConfig.resolve
}
