const dotenv = require("dotenv");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

dotenv.config();
const commonConfiguration = require("./webpack/webpack.common");
module.exports = ({ environment = "dev", analyzer = false }) => {
  const envConfiguration = require(`./webpack/webpack.${environment}`);
  if (analyzer) {
    commonConfiguration.plugins.push(
      new BundleAnalyzerPlugin({
        excludeAssets: /\.json$/
      })
    );
  }
  return merge(commonConfiguration, envConfiguration);
};
