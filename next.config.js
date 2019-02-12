const withTypescript = require('@zeit/next-typescript')
const withLessExcludeAntd = require("./next-less.config.js")

// choose your own modifyVars
const modifyVars = require("./utils/modifyVars")

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withTypescript(withLessExcludeAntd({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: modifyVars
  }
}))
