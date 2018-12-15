const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./loader-rules')

module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html'
    })
  ]
}