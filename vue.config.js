module.exports = {
  lintOnSave: false,
  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./public/scss/global-scss/_colors.scss"; @import "./public/scss/global-scss/_breakpoints.scss"; @import "./public/scss/global-scss/_mixins.scss";`,
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.(pdf)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "./src/assets/files/[name].[hash:8].[ext]",
      });
  },

  configureWebpack: {
    performance: {
      hints: false,
      maxAssetSize: 1048576, // int (in bytes),
      maxEntrypointSize: 1048576, // int (in bytes)
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
};
