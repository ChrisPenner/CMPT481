var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  entry: {
    'main': './main',
    'styles': [
      './node_modules/bulma/css/bulma',
      './client/css/style',
      './client/css/sweetalert',
    ],
    'vendor': [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'ramda',
      'jquery',
    ],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].[hash].js",
    sourceMapFilename: "[name].[hash].map.js",
  },
  devtool: 'sourceMap',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: {
      index: '/index.html'
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".css", ".min.css", ".scss"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CMPT481',
      template: path.resolve(__dirname, 'client', 'html', 'index.ejs'),
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'styles']
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/
    }),
  ]
};
