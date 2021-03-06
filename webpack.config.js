var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index.jsx', // Your appʼs entry point,
    './styles/main.scss'
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc')
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url?prefix=font/&limit=5000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.gif/,
        loader: "url-loader?limit=10000&minetype=image/gif"
      },
      {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&minetype=image/jpg"
      },
      {
        test: /\.png/,
        loader: "url-loader?limit=10000&minetype=image/png"
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: []
};