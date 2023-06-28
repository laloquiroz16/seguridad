const path = require("path");
const { HashedModuleIdsPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const { srcPath } = require("./common-paths");
const prod = process.env.ENV === "production";

/**
 *
 * @type {{import('webpack').Configuration}}
 */
const config = {
  mode: "production",
  module: {
    rules: [
      {
        exclude:
          /node_modules\/(?!(jodit|@anycable|react-actioncable-provider|pdfjs-dist|@rankmi\/(?:.*))\/).*/,
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
              camelCase: true
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "pdfjs-dist": path.resolve(
        "./node_modules/pdfjs-dist/legacy/build/pdf.js"
      )
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: false,
        terserOptions: {
          compress: {
            drop_console: prod
          },
          ecma: 5
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            "default",
            { calc: false, discardComments: { removeAll: true } }
          ]
        }
      })
    ],
    runtimeChunk: "single"
  },
  output: {
    chunkFilename: `chunks/[id].js?id=[chunkhash]`,
    filename: `scripts/[name].[contenthash].js`
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.join(srcPath, "assets", "images", "fav_icon.png"),
      filename: "index-old-ie.html",
      inject: false,
      meta: {
        author: "Rankmi Spa.",
        charset: "utf-8",
        description: "Rankmi",
        viewport: "width=device-width, initial-scale=1",
        "X-UA-COMPATIBLE": "ie=edge"
      },
      template: path.resolve(srcPath, "index-old-ie.html")
    }),
    new WebpackPwaManifest({
      name: "Rankmi",
      short_name: "Rankmi",
      filename: "manifest.json",
      display: "standalone",
      start_url: ".",
      orientation: "portrait",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      ios: {
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
        "apple-mobile-web-app-title": "Rankmi"
      },
      icons: [
        {
          src: path.resolve(srcPath, "assets/icons/apple-icon-180x180.png"),
          sizes: [120, 144, 152, 167, 180],
          destination: path.join("icons", "ios"),
          ios: true
        },
        {
          src: path.resolve(srcPath, "assets/icons/icon-512x512.png"),
          destination: path.join("icons", "android"),
          sizes: [36, 48, 72, 96, 144, 192, 512]
        }
      ]
    }),
    new MiniCssExtractPlugin({
      chunkFilename: "[contenthash].css",
      filename: "[contenthash].css"
    }),
    new CompressionPlugin({
      exclude: [
        "index-old-ie.html",
        "manifest.json",
        /\/outdatedbrowser/,
        "outdatedbrowser/lang"
      ]
    })
  ]
};

if (process.env.ENV === "production") {
  config.entry = {
    tracking: path.resolve(srcPath, "libs/tracking-service.js")
  };
}

module.exports = config;
