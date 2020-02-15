const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, { mode = "development" }) => {
  const isProduction = mode === "production";
  process.env.NODE_ENV = mode;

  return {
    entry: "./src/index.jsx",
    mode,
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "app.js",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new CopyPlugin([
        { from: 'src/index.html', to: 'index.html' },
        { from: 'src/assets/icon.png', to: 'icon.png' },
      ]),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.jsx?$/,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/,
        }
      ]
    }
  };
};
