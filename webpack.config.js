var path = require('path');
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.ts'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
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
  externals: {
    react: 'commonjs react'
  }
};
