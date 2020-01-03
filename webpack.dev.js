const path = require ('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './website/app.js',
  module: {
    rules: [{
      test:'/\.js$/',
      exclude: /node_modules/,
      loader:'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './website/index.html',
      filename:'./index.html'
    }),
    new CleanWebpackPlugin() //CHECK FOR OPTIONS LATER ON
  ]
}
