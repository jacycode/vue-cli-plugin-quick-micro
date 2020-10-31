module.exports = (api, options) => {

  /**
   * Add new version 'qiankun'
   */
  api.extendPackage({
    dependencies: {
      'qiankun': '^2.2.2'
    }
  })

  /**
   * Automatic configuration 'publicPath'
   */
  api.injectImports(api.entryFile, `import 'vue-cli-plugin-quick-micro/public-path.js'`)

}

