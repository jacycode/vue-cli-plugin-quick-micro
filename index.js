const path = require('path')

module.exports = (api) => {

  const { name, quickMicro } = api.service.pkg

  /**
   * Modify webpack config
   */
  api.chainWebpack((config) => {

    if (quickMicro.type === 'sub') {
      
      /**
       * webpack: dev config
       */
      config.devServer
        .headers({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        })

      /**
       * webpack: output
       */
      config.output
        .library(`${name}-[name]`)
        .libraryTarget('umd')
        .jsonpFunction(`webpackJsonp_${name}`)

      /**
       * webpack: fonts/icon 
       *  <4kb,base64;
       *  >=4kb,CDN
       */
      let publicPath = quickMicro['cdnUrl'][process.env.NODE_ENV]
      config.module
        .rule('fonts')
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096, 
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
              publicPath,
            },
          },
        })
        .end()
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 4096, 
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              publicPath,
            },
          },
        })
    }

  })

}
