const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/'
  },

  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules', 'postcss-loader'],
    },{
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      use: ['file-loader'],
      options: {
        name: 'images/[name].[hash:8].[ext]'
      },
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}
