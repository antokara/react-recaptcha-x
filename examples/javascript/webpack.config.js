const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

module.exports = {
  mode: 'development',
  entry: './index.jsx',
  resolve: {
    extensions: ['.js'],
    alias: {
      module: path.resolve(__dirname, '../module/')
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  // @see https://webpack.js.org/configuration/dev-server
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9001,
    https: false,
    open: false,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|reports)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { browsers: ['> 5%', 'last 2 versions'] } }
                ],
                '@babel/preset-react'
              ],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env'),
      safe: true,
      systemvars: true
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      title: 'React reCAPTCHA v3 v2 javascript example',
      minify: false,
      template: HtmlWebpackTemplatePlugin,
      lang: 'en-US',
      appMountId: 'root',
      baseHref: '/'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
