module.exports = () => ({
  plugins: [
    require("cssnano")({
      preset: ["default", { calc: false, discardComments: { removeAll: true } }]
    }),
    require("autoprefixer")()
  ]
});
