const path = require("path");
const { ProvidePlugin } = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { Locales } = require("../i18n/locales");

const { srcPath, distPath } = require("./common-paths");

const locs = Locales.join("|");
const fromAngularLocales = `node_modules/angular-i18n/angular-locale_@(${locs}).js`;

/**
 *
 * @type {{import('webpack').Configuration}}
 */
module.exports = {
  entry: {
    app: path.resolve(srcPath, "app.ts")
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader"
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:ng-src"]
          }
        }
      }
    ]
  },
  output: {
    filename: "scripts/[id].js",
    path: distPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(srcPath, "assets", "images", "fav_icon.png"),
      meta: {
        author: "Rankmi Spa.",
        charset: "utf-8",
        description: "Rankmi",
        viewport: "width=device-width, initial-scale=1",
        "X-UA-COMPATIBLE": "ie=edge"
      },
      template: path.resolve(srcPath, "index.html")
    }),
    new ProgressBarPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: Locales
    }),
    new CopyWebpackPlugin([
      {
        context: "app",
        from: "modules/**/*.html"
      },
      {
        context: "app",
        from: "assets/images/**/*"
      },
      {
        flatten: true,
        from: fromAngularLocales,
        to: "angular/i18n"
      },
      {
        context: "app",
        from: "outdatedbrowser",
        to: "outdatedbrowser"
      },
      {
        context: "app",
        from: "index.css",
        to: "index.css"
      }
    ]),
    new Dotenv({
      systemvars: process.env.ENV !== "local"
    }),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  resolve: {
    extensions: [".mjs", ".ts", ".js", ".jsx", ".tsx"],
    plugins: [new TsconfigPathsPlugin({})],
    symlinks: true
  }
};
