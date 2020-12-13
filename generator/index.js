module.exports = (api, options) => {

  /**
   * 添加依赖 - 'qiankun'
   */
  api.extendPackage({
    dependencies: {
      'qiankun': '^2.2.2'
    }
  })

  if (options.isMain) {

    /**
     * 主应用，配置 'publicPath'
     */
    api.injectImports(api.entryFile, `import 'vue-cli-plugin-quick-micro/public-path.js'`)

    if (options.loadApp) {
      api.render('./template/load-micro-app')
    }

  } else {
    // sub app

    if (options.hasToken) {
      api.render('./template/sub-auth')
    } 
    if (options.hasLifecycle) {
      api.render('./template/lifecycle')
    } 

  }

}

