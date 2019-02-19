# Next To Do List

> A using Next.js, TypeScript, GraphQL builded To Do List SSR Project.

## How to Next.js and Antd integration ？

>记录至[《Next.js 配合使用antd、less (Integration with Antd)》](https://www.yuque.com/steven-kkr5g/aza/ig3x9w)

### Next.js 配合使用antd、less (Integration with Antd)

这个配置配置在NEXT.js和ANTD的官方都有涉及，这个官方的@zeit/next-less组件是__不适合直接使用antd配置的__，问的人很多，没有实际的代码。所以我们写一下。


#### 1. 问题列举/Issues in antd & next.js(@zeit/next-less)

##### Antd的问题
Issues in Antd:
1. antd 如何连接 nextjs <span data-type="color" style="color:rgb(163, 170, 177)">#12255 </span>[Link (https://github.com/ant-design/ant-design/issues/12255)](https://github.com/ant-design/ant-design/issues/12255)
2. Antd and Next.js integration <span data-type="color" style="color:rgb(163, 170, 177)">#11917 </span>[Link(https://github.com/ant-design/ant-design/issues/11917)](https://github.com/ant-design/ant-design/issues/11917)

##### Next.js的问题
Issues in Next.js
1. How to Next.js and Antd integration ？ <span data-type="color" style="color:rgb(163, 170, 177)">#5180 </span>[Link(https://github.com/zeit/next.js/issues/5180)](https://github.com/zeit/next.js/issues/5180)

#### 2.安装支持（Intall @/zeit/next-css & babel-plugin-import）

__没有看错，你需要先安装next-css而不是next-less__，因为：我们要抛弃next-less这个官方组件。
还有按需加载的组件babel-plugin-import.

```javascript
yarn add @zeit/next-css babel-plugin-import
||
npm install @zeit/next-css babel-plugin-import --save-dev
```


#### 3. 修改babelrc (add .babelrc file in your project)

```plain
{
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory":"lib",
                "style": true
            }
        ]
    ]
}
```

#### 4.增加next-less.config.js(add next-less.config.js file in your project)

```javascript
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        lessLoaderOptions = {}
      } = nextConfig

      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      })

      config.module.rules.push({
        test: /\.less$/,
        exclude: /node_modules/,
        use: options.defaultLoaders.less
      })

      // 我们禁用了antd的cssModules
      config.module.rules.push({
        test: /\.less$/,
        include: /node_modules/,
        use: cssLoaderConfig(config, {
          extensions: ['less'],
          cssModules:false,
          cssLoaderOptions:{},
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: lessLoaderOptions
            }
          ]
        })
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
```

#### 5. 修改next.config.js (change your next.config.js file)

注意modifyvars需要自己定义。Modify files should be defined by yourself。

```javascript
const withLessExcludeAntd = require("./next-less.config.js")

// choose your own modifyVars
const modifyVars = require("./utils/modifyVars")

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLessExcludeAntd({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: modifyVars
    }
})
```


__现在执行以下项目，看是否可以了呢？：）__如果有问题欢迎在下方提出。

## New version 0.4.2 capture lot of warnings [#250](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250)

## [with-sitemap-and-robots-express-server-typescript](https://github.com/zeit/next.js/tree/canary/examples/with-sitemap-and-robots-express-server-typescript)
