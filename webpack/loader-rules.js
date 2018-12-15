module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: 'babel-loader'
  },
  {
    test: /\.css$/,
    use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader", // translates CSS into CommonJS
    ]
  },
  {
    test: /\.scss$/,
    use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader", // translates CSS into CommonJS
      {
        loader: 'sass-loader',
        options: {
          includePaths: ['node_modules']
        }
      }
    ]
  }
]