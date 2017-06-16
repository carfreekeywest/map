var webpack = require('webpack');
var config = require('./webpack.config.js');

config.entry = [
  'webpack-dev-server/client?http://localhost:8888',
  'webpack/hot/only-dev-server'
].concat(config.entry);

config.plugins = [
  new webpack.NoErrorsPlugin()
];

config.module.loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['react-hot', 'babel?optional[]=es7.classProperties'],
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.scss$/,
    loaders: ['style', 'css', 'resolve-url', 'sass'],
    exclude: /node_modules/
  }
].concat(config.module.loaders);

config.devServer = {
  contentBase: "./public",
  noInfo: true, //  --no-info option
  historyApiFallback: true,
  hot: true,
  host: '0.0.0.0',
  inline: true,
  port: 8888,
  watchOptions: {
    poll: true
  }
}

module.exports = config;
