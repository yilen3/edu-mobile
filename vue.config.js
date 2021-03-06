const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    extract: false
  },
  configureWebpack: {
    // 通过 CDN 引入
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  },
  // chainWebpack: config => {
  //   // 图片压缩 loader 配置
  //   config.module
  //     .rule('images')
  //     .use('image-webpack-loader')
  //     .loader('image-webpack-loader')
  //     .options({
  //       bypassOnDebug: true
  //     })
  //     .end()
  // }
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  }
})
