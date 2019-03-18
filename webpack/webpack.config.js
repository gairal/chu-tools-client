const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.base');

const devConfig = Object.assign({}, config);
devConfig.output.path = path.join(__dirname, '../build');
devConfig.mode = 'development';
devConfig.devtool = 'source-map';
devConfig.devServer = {
  contentBase: path.join(__dirname, '../build'),
  compress: true,
  port: 8181,
  hot: true,
  inline: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  https: false,
  disableHostCheck: true,
};
devConfig.plugins.push(new webpack.NamedModulesPlugin());
devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

devConfig.resolve.alias['react-dom'] = '@hot-loader/react-dom';

module.exports = devConfig;
