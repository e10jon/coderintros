const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')

const resolve = {
  extensions: ['.js', '.jsx'],
  modules: ['src', 'node_modules']
}
if (process.env.NODE_ENV === 'test') {
  resolve.modules.push('test')
}

let dotenvPath = `./.env.${process.env.NODE_ENV}`
if (process.env.EXEC_ENV) {
  dotenvPath = `${dotenvPath}.${process.env.EXEC_ENV}`
}

module.exports = ({babelTargets, cleanWebpackPath, cssModuleUse, fileLoaderEmitFile}) => ({
  cache: true,
  module: {
    rules: [{
      test: /\.s?css$/,
      use: cssModuleUse
    }, {
      exclude: /node_modules/,
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-decorators-legacy'],
          presets: [['env', {modules: false, useBuiltIns: true, targets: babelTargets}], 'react']
        }
      }]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: 'url-loader'
    }, {
      test: /\.ico$/,
      use: {
        loader: 'file-loader',
        options: {
          emitFile: fileLoaderEmitFile
        }
      }
    }, {
      include: /font-awesome/,
      test: /\.(svg|eot|woff2?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      use: {
        loader: 'file-loader',
        options: {
          emitFile: fileLoaderEmitFile
        }
      }
    }, {
      test: /\.svg$/,
      use: 'svg-inline-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(cleanWebpackPath, {root: path.resolve(__dirname, '..')}),
    new Dotenv({path: dotenvPath})
  ],
  resolve
})
