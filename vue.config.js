module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://121.43.119.224:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    },
    host: 'localhost',
    open: true,
    port: 8000
  },
  transpileDependencies: true,
  lintOnSave: false
}