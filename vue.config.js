module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '吃鸡跳点'
      return args
    })
  }
}
