const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      module: path.resolve(__dirname, '../src'),
      src: path.resolve(__dirname, '../src')
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  // @see https://webpack.js.org/configuration/dev-server
  devServer: {
    static: {
      directory: path.join(__dirname, './')
    },
    compress: true,
    port: 9000,
    https: false,
    open: false,
    historyApiFallback: true,
    hot: true,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: 'all',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|reports)/,
        use: [
          {
            loader: 'ts-loader'
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
      title: 'React reCAPTCHA v3 v2 development example',
      minify: false,
      template: HtmlWebpackTemplatePlugin,
      lang: 'en-US',
      appMountId: 'root',
      baseHref: '/'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    moduleIds: 'named',
  }
};
