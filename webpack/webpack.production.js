const path = require('path')
const rules = require('./loader-rules')

module.exports = {
  mode: 'production',
  devtool: 'sourcemap',
  entry: './src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules
  },
}