const path = require('path');

module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  },

  module: {
   loaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['env']
       }
     }
   ]
  },

  stats: {
    colors: true
  },

  devServer: {
    contentBase: path.resolve(__dirname, './'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    open: true
  }

};
