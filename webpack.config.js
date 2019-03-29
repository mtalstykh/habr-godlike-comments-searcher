var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');

module.exports = {
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: "./build",
    writeToDisk: true,
  },
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({
      // multiStep: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json"
      },
      {
        from: "./src/images",
        to: "images"
      }
    ],
    {
      copyUnmodified: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
  })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
    ]
  }
};
