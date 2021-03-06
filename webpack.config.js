const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

module.exports = {
  entry: './javascripts/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules\/lodash/,
            presets: [
              ['@babel/preset-env', { targets: '> 0.25%, not dead' }]
            ],
            plugins: [
              '@babel/transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            // Needed to resolve image url()s within @primer/css
            loader: 'resolve-url-loader',
            options: {}
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./stylesheets', './node_modules'],
                options: {
                  sourceMap: true,
                  sourceMapContents: false
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/@primer/css/fonts', to: 'fonts' }
      ]
    }),
    new EnvironmentPlugin(['NODE_ENV'])
  ]
}
