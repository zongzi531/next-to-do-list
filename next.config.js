const withTypescript = require('@zeit/next-typescript')
const withStylesExcludeAntd = require("./next-styles.config.js")

// choose your own modifyVars
const modifyVars = require("./src/utils/modifyVars")

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withTypescript(withStylesExcludeAntd({
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
