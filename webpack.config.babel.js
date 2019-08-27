const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
      test: /\.js/,
      exclude: /(node_modules|bower_components)/,
      use: [{
          loader: 'babel-loader'
      }]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Todo App',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute:'defer'
    })
  ],
  stats: {
    colors:true
  },
  devtool: 'source-map',
  mode: "development",
  devServer: {
    contentBase:'./dist',
    inline: true,
    port: 3000
  }
};