const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const appDir = fs.realpathSync(process.cwd());

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(appDir, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    clean: true
  }
});

