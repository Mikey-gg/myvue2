module.exports = {
  // publicPath: "/admin", // /android_asset/www
  //注释警告
  lintOnSave: false,

  devServer: {
    compress: false,
    open: true,
    proxy: {
      "/sys": {
        target: "http://10.76.31.221",
        changeOrigin: true,
        // webSocket 是否开启
        ws: true,
        pathRewrite: {
          "/sys": "/",
        },
      },
      "/cnc/*": {
        target: "http://10.71.190.61:8085",
        changeOrigin: true,
      },
    },
  },

  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: [],
      },
    },
  },

  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: false,
    },
  },
};
