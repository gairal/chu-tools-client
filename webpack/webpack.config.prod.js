const path = require('path');
const config = require('./webpack.config.base');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const prodConfig = Object.assign({}, config);
prodConfig.output.path = path.join(__dirname, '../dist');
prodConfig.mode = 'production';
prodConfig.plugins.push(
  new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
);
// prodConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = prodConfig;
