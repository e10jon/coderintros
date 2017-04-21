const nodeExternals = require('webpack-node-externals')
const path = require('path')

const createCommonConfig = require('./common.config')
const commonConfig = createCommonConfig({
  babelTargets: {node: true},
  cleanWebpackPath: 'dist/server',
  cssModuleUse: 'css-loader/locals',
  fileLoaderEmitFile: false
})

module.exports = {
  cache: commonConfig.cache,
  entry: [
    'babel-polyfill',
    './src/start-server.js'
  ],
  externals: [
    nodeExternals({
      whitelist: ['ace-css/css/ace.min.css']
    })
  ],
  module: commonConfig.module,
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist/server'),
    publicPath: '/dist/browser/'
  },
  plugins: commonConfig.plugins,
  resolve: commonConfig.resolve,
  target: 'node'
}
