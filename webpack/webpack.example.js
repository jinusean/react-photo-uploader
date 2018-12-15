const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./loader-rules')

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    })
  ]
}