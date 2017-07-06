const path = require('path')
const glob = require('glob')

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.(css|scss)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
    }, {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader']
    }, {
      test: /\.s(a|c)ss$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader', {
        loader: 'sass-loader',
        options: {
          includePaths: ['styles', 'node_modules']
            .map((d) => path.join(__dirname, d))
            .map((g) => glob.sync(g))
            .reduce((a, c) => a.concat(c), [])
        }
      }, 'import-glob-loader']
    })

    // the following is required because `npm run build` failed
    // because it couldn't find react-dom/server
    // hopefully it can be removed when next.js fixes the issue
    // https://github.com/zeit/next.js/issues/1877
    if (config.resolve.alias) {
      delete config.resolve.alias['react']
      delete config.resolve.alias['react-dom']
    }

    return config
  }
}
