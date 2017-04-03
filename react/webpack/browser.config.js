const autoprefixer = require('autoprefixer')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

const createCommonConfig = require('./common.config')
const cssLoaders = [
  { loader: 'css-loader', options: {sourceMap: true, minimize: true} },
  { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
  { loader: 'sass-loader', options: {sourceMap: true} }
]
const commonConfig = createCommonConfig({
  babelTargets: {browsers: ['last 2 versions']},
  cleanWebpackPath: 'dist/browser',
  cssModuleUse: process.env.NODE_ENV === 'development' ? ['style-loader'].concat(cssLoaders) : ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: cssLoaders
  }),
  fileLoaderEmitFile: true
})

const entry = ['babel-polyfill']
if (process.env.NODE_ENV === 'development') {
  entry.push('react-hot-loader/patch')
  entry.push('webpack-hot-middleware/client')
}
entry.push('./src/client.jsx')

const output = {
  filename: '[name]-[hash].js',
  publicPath: '/dist/browser/'
}
if (process.env.NODE_ENV !== 'development') {
  output.path = path.resolve(__dirname, '../dist/browser')
}

const plugins = commonConfig.plugins.concat([
  new ManifestPlugin({
    basePath: '/dist/browser/',
    fileName: 'webpack-manifest.json',
    writeToFileEmit: true
  })
])
if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: true}))
  plugins.push(new ExtractTextPlugin({filename: '[name]-[hash].css', allChunks: true}))
}

module.exports = ({
  cache: commonConfig.cache,
  devtool: 'source-map',
  entry,
  module: commonConfig.module,
  output,
  plugins,
  resolve: commonConfig.resolve
})
