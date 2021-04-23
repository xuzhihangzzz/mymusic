const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 该配置会和公共配置合并
module.exports = {

  // 部署到服务器需要添加以下配置
  publicPath: './', // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  // 部署到服务器需要添加以上配置
  
  devServer: {
    disableHostCheck: true
    // proxy: {
    //   '/api': {
    //     target: 'http://47.98.130.23:3000/',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        // @就是src，cli3/4默认配置中已经配置了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'model': '@/model',
        'utils': '@/utils'
      }
    }
  },
  pluginOptions: { // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/variable.less')]
    }
  }
}