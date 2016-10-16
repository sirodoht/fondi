var path = require('path');

module.exports = {
  entry: ['whatwg-fetch', path.resolve(__dirname, 'front/scripts/index.js')],
  output: {
    path: path.resolve(__dirname, 'front/static/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
