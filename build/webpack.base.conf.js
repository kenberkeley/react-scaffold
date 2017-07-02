var webpack = require('webpack'),
  ENV = require('./config/ENV'),
  PATHS = require('./config/PATHS'),
  styleRules = require('./config/style-rules'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  NyanProgressPlugin = require('nyan-progress-webpack-plugin');

module.exports = {
  entry: {
    app: PATHS.SRC.join('app.js')
  },
  devtool: false, // https://webpack.js.org/configuration/devtool
  output: {
    path: PATHS.DIST,
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': PATHS.SRC
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter')
      },
      enforce: 'pre',
      include: PATHS.SRC
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader?cacheDirectory',
      include: PATHS.SRC
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'fonts/[name]-[hash:6].[ext]'
      }
    }].concat(styleRules)
  },
  plugins: [
    new NyanProgressPlugin(),
    new webpack.DefinePlugin(Object.assign({
      'process.env.NODE_ENV': JSON.stringify(ENV.__ENV__)
    }, ENV)),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.SRC.join('index.html')
    })
  ]
};
