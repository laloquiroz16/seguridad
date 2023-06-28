const path = require("path");
const webpack = require("webpack");
/**
 *
 * @type {{import('webpack').Configuration}}
 */
module.exports = {
  devServer: {
    allowedHosts: [".rankmi.lo"],
    host: "0.0.0.0",
    openPage: "",
    overlay: {
      errors: false,
      warnings: false
    },
    port: 9000,
    public: "app-local.rankmi.lo:9000",
    watchOptions: {
      aggregateTimeout: 250
    }
  },
  mode: "development",
  module: {
    rules: [
      {
        exclude: /node_modules\/(?!@anycable\/).*/,
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
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
        use: "file-loader"
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
  output: {
    filename: "[name].js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
