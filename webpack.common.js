const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const appDir = fs.realpathSync(process.cwd());
const pk = require(path.resolve(appDir, 'package.json'));

module.exports = {
  entry: {
    main: path.resolve(appDir, pk.main)
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.json'],
    mainFiles: ['index'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|env|glb|stl)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // bytes (files larger than this limit will fall back to file-loader)
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: ["html-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDir, pk.html),
      inject: true,
      title: pk.name,
      favicon: pk.favicon,
    })
  ]
}
