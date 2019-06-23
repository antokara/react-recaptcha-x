var path = require('path');
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.ts'),
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
        exclude: /(node_modules|assets|reports)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { browsers: ['> 5%', 'last 2 versions'] } }
                ],
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      }
    ]
  },
  externals: {
    react: 'commonjs react'
  }
};
