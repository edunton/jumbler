const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

module.exports = {
  ...common,
  output: {
    path: `${__dirname}/publish`,
    publicPath: '/jumbler/publish',
    filename: 'app.[name].[hash].js',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};
