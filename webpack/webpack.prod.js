const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    //new env variable "name"
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Akash-Prod'),
    }),
  ],
}
