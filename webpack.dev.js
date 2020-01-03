const path = require ('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/client/js/app.js',
  module: {
    rules: [{
      test:'/\.js$/',
      exclude: /node_modules/,
      loader:'babel-loader'
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',
      filename:'./index.html'
    }),
    new CleanWebpackPlugin() //CHECK FOR OPTIONS LATER ON
  ]
}
