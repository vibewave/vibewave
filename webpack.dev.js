const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const appDir = fs.realpathSync(process.cwd());
const expressServerPORT = process.env.PORT ?? 8083; // Make sure the manual port number = port number set in server/server.js

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(appDir, 'src'),
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: 3032,
    /* We will have two separte servers running on different ports:
    1) Webpack Dev Server for Frontend,
    2) Nodejs Express Server for Backend APIs
    webpack dev server will proxy below specified routes to be served by the Nodejs Express server
    */
    proxy: {
      '/api/': {
        target: `http://localhost:${expressServerPORT}`,
        secure: false
      }
    }
  },
  output: {
    path: path.resolve(appDir, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/'
  }
});
