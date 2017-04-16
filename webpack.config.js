/**
 * @file Webpack configuration file.
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '../css/style.css',
});

module.exports = {
  entry: './front/scripts/frontapp.js',
  output: {
    path: __dirname + '/front/static/js',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  performance: {
    hints: 'warning',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitErrors: true,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    extractSass,
  ],
};
