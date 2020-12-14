const path = require('path');
const common = require('./webpack.common');

module.exports = {
  ...common,
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  output: {
    path: `${__dirname}/dist/dev`,
    publicPath: '/',
    filename: 'dev.[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist/dev'),
    liveReload: true,
    port: 9000,
    historyApiFallback: true,
    writeToDisk: true,
  },
};
