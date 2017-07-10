var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.js');


config.plugins = [
  new webpack.IgnorePlugin(/unicode\/category\/So/),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      drop_debugger: true,
      warnings: false
    }
  }),
  new ExtractTextPlugin('styles.css')
];

config.module.loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel?optional[]=es7.classProperties'
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass')
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css')
  }
].concat(config.module.loaders);

module.exports = config;
