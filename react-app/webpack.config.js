const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    host: 'localhost',
    compress: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/connectKafka': 'http://localhost:3000',
      '/setCookie': 'http://localhost:3000',
      '/checkCookie': 'http://localhost:3000'
    },
  },
};
