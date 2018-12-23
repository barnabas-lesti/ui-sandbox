var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/scripts/main.js',
    './src/styles/main.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader?-url',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  }
};
