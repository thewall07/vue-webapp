# vue-webapp

基于 vue-cli3 + vant ui + sass + rem 适配方案 + axios 封装，构建移动 `webapp`模板。

## 配置

### ✅ 移动端rem适配

-   安装依赖

```shell
npm install lib-flexible --save

npm install postcss-pxtorem --save-dev
```

-   添加 meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

-   引入文件

```javascript
// main.js
import "lib-flexible";
```

-   配置 postcss-pxtorem
在 `vue.config.js`中写入以下配置
```javascript
// vue.config.js
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
	css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 75, // 设计稿宽度的1/10
                        propList: ['*']
                    })
                ]
            }
        }
    }
};
```
### ✅按需引入 vant
它会在编译过程中将 import 的写法自动转换为按需引入的方式

```shell
npm i babel-plugin-import -D
```
在`babel.config.js`写入以下配置
```javascript
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
{
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
```
### ✅ Vuex 状态管理

目录结构

```bash
├── store
│   ├── modules
│   │   └── user.js
│   ├── index.js
│   ├── getters.js
```
-  引入

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

- 使用

```html
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['userName'])
    },

    methods: {
      // Action 通过 store.dispatch 方法触发
      // 模块名/方法名
      doDispatch() {
        this.$store.dispatch('user/login', '真乖，赶紧登录~')
      }
    }
  }
</script>
```
### ✅ Vue-Router

本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`

**注意**：如果你使用了 `history` 模式，`vue.config.js` 中的 `publicPath` 要做对应的**修改**

前往:[vue.config.js 基础配置](#base)

```javascript
import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [{
        path: "/",
        name: "home",
        component: () => import( /* webpackChunkName: "home" */ "@/views/Home")
    },
    {
        path: "/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "login" */ "@/views/Login")
    }
    ]
});
```
### ✅图标字体

-   安装

```
npm install vue-awesome --save
```

-   引入

```javascript
// main.js
import "vue-awesome/icons";
// 全局注册
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);
```

-   使用

```html
<v-icon name="beer" />
```

### ✅优雅使用 svg

[自己制作 svg 图标字体组件](https://juejin.im/post/5c3c544c6fb9a049d37f5903)

```javascript
// vue.config.js
// set svg-sprite-loader
config.module
	.rule("svg")
	.exclude.add(resolve("src/icons"))
	.end();
config.module
	.rule("icons")
	.test(/\.svg$/)
	.include.add(resolve("src/icons"))
	.end()
	.use("svg-sprite-loader")
	.loader("svg-sprite-loader")
	.options({
		symbolId: "icon-[name]",
	})
	.end();
```

### ✅图片懒加载(Vant)

-   安装

```
npm install vue-lazyload --save
```

-   引入并使用

```javascript
// main.js
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
// 是可以自定义
// Vue.use(VueLazyload, {
// 	preLoad: 1.3,
// 	error: "dist/error.png",
// 	loading: "dist/loading.gif",
// 	attempt: 1,
// });
```

-   访问

```html
<img v-lazy="/static/img/1.png" />
```

### ✅animate.css 动画库

-   安装

```
npm install animate.css --save
```

-   使用

```javascript
// main.js
import "animate.css";
```

### ✅axios 封装统一管理 api

```
npm install axios --save

```
-     封装
> 参考 `utils`下的`request.js`

- 使用
> 参考api目录

### ✅mock 数据

```
npm install mockjs --save-dev
```
### ✅better-scroll滚动
```
npm install @better-scroll/core --save
```
```javascript
// 使用的组件中
import BScroll from '@better-scroll/core'
```

## vue.config.js 配置

### ✅设置 alias 别名

```javascript
const path = require('path);
function resolve(dir){
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack:(config)=>{
        // 添加别名
        config.resolve.alias
            // .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            // .set('@scss', resolve('src/assets/scss'))
            .set('@components', resolve('src/components'))
            // .set('@plugins', resolve('src/plugins'))
            // .set('@views', resolve('src/views'))
            // .set('@router', resolve('src/router'))
            // .set('@store', resolve('src/store'))
            // .set('@layouts', resolve('src/layouts'))
            .set('@static', resolve('src/static'));
    }
}
```
### ✅开启source-map

```javascript
module.exports = {
	configureWebpack: {
        devtool: process.env.NODE_ENV === "production" ? 'false' : 'source-map'
    }
}

```
### ✅配置 proxy 代理解决跨域问题

```javascript
module.exports = {
	devServer: {
		// overlay: { // 让浏览器 overlay 同时显示警告和错误
		//   warnings: true,
		//   errors: true
		// },
		// open: false, // 是否打开浏览器
		// host: "localhost",
		// port: "8080", // 代理断就
		// https: false,
		// hotOnly: false, // 热更新
		proxy: {
			"/api": {
				target: "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
				secure: false,
				changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
				// ws: true, // 是否启用websockets
				pathRewrite: {
					"^/api": "/", // 会把target拼接到api前边,这个属性相当于把api有什么替换
				},
			},
		},
	},
};
```

访问:

```html
<!-- 假设 mock 接口为https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets/1 -->
<script>
	import axios from "axios";
	export default {
		mounted() {
			axios.get("/api/1").then((res) => {
				console.log(res);
			});
		},
	};
</script>
```

### ✅修复热更新(HMR)失效

```javascript
module.exports = {
	chainWebpack: (config) => {
		// 修复HMR
		config.resolve.symlinks(true);
	},
};
```

### ✅添加打包分析

```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	chainWebpack: (config) => {
		// 打包分析
		if (process.env.IS_ANALY) {
			config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
				{
					analyzerMode: "static",
				},
			]);
		}
	},
};
```

需要添加.env.analyz 文件

```
NODE_ENV = 'production'
IS_ANALYZ = true
```

package.json 的 scripts 中添加

```
"analyz": "vue-cli-service build --mode analyz"
```

执行

```
npm run analyz
```

### ✅压缩图片

```
npm i -D image-webpack-loader
```

```javascript
module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule("images")
			.use("image-webpack-loader")
			.loader("image-webpack-loader")
			.options({
				mozjpeg: { progressive: true, quality: 65 },
				optipng: { enabled: false },
				pngquant: { quality: "65-90", speed: 4 },
				gifsicle: { interlaced: false },
				webp: { quality: 75 },
			});
	},
};
```

### ✅开启 gZip 压缩
```
npm install --save-dev compression-webpack-plugin
```

```javascript
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
	configureWebpack:config=>{
        if(process.env.NODE_ENV === 'production'){
            return{
                plugins: [
                    new CompressionPlugin({
                        test:/\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }
    },
}
```
### ✅ Eslint + Pettier 统一开发规范

VScode （版本 1.47.3）安装 `eslint` `prettier` `vetur` 插件 `.vue` 文件使用 vetur 进行格式化，其他使用`prettier`

在文件 `.prettierrc` 里写 属于你的 pettier 规则

```bash
{
   "printWidth": 120,
   "tabWidth": 2,
   "singleQuote": true,
   "trailingComma": "none",
   "semi": false,
   "wrap_line_length": 120,
   "wrap_attributes": "auto",
   "proseWrap": "always",
   "arrowParens": "avoid",
   "bracketSpacing": false,
   "jsxBracketSameLine": true,
   "useTabs": false,
   "overrides": [{
       "files": ".prettierrc",
       "options": {
           "parser": "json"
       }
   }]
}
```

Vscode setting.json 设置

```bash
    {
  // 将设置放入此文件中以覆盖默认设置
  "files.autoSave": "off",
  // 控制字体系列。
  "editor.fontFamily": "Consolas, 'Courier New', monospace,'宋体'",
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  // 以像素为单位控制字号。
  "editor.fontSize": 16,
  // 控制选取范围是否有圆角
  "editor.roundedSelection": false,
  // 建议小组件的字号
  "editor.suggestFontSize": 16,
  // 在“打开的编辑器”窗格中显示的编辑器数量。将其设置为 0 可隐藏窗格。
  "explorer.openEditors.visible": 0,
  // 是否已启用自动刷新
  "git.autorefresh": true,
  // 以像素为单位控制终端的字号，这是 editor.fontSize 的默认值。
  "terminal.integrated.fontSize": 14,
  // 控制终端游标是否闪烁。
  "terminal.integrated.cursorBlinking": true,
  // 一个制表符等于的空格数。该设置在 `editor.detectIndentation` 启用时根据文件内容进行重写。
  // Tab Size
  "editor.tabSize": 2,
  // By default, common template. Do not modify it!!!!!
  "editor.formatOnType": true,
  "window.zoomLevel": 0,
  "editor.detectIndentation": false,
  "css.fileExtensions": ["css", "scss"],
  "files.associations": {
    "*.string": "html",
    "*.vue": "vue",
    "*.wxss": "css",
    "*.wxml": "wxml",
    "*.wxs": "javascript",
    "*.cjson": "jsonc",
    "*.js": "javascript"
  },
  // 为指定的语法定义配置文件或使用带有特定规则的配置文件。
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true
  },
  //保存时eslint自动修复错误
  "editor.formatOnSave": true,
  // Enable per-language
  //配置 ESLint 检查的文件类型
  "editor.quickSuggestions": {
    "strings": true
  },
  // 添加 vue 支持
  // 这里是针对vue文件的格式化设置，vue的规则在这里生效
  "vetur.format.options.tabSize": 2,
  "vetur.format.options.useTabs": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.sass": "sass-formatter",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "aligned-multiple", // 超过150折行
      "wrap-line-length": 150
    },
    // #vue组件中html代码格式化样式
    "prettier": {
      "printWidth": 120,
      "tabWidth": 2,
      "singleQuote": false,
      "trailingComma": "none",
      "semi": false,
      "wrap_line_length": 120,
      "wrap_attributes": "aligned-multiple", // 超过150折行
      "proseWrap": "always",
      "arrowParens": "avoid",
      "bracketSpacing": true,
      "jsxBracketSameLine": true,
      "useTabs": false,
      "overrides": [
        {
          "files": ".prettierrc",
          "options": {
            "parser": "json"
          }
        }
      ]
    }
  },
  // Enable per-language
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "vetur.validation.template": false,
  "html.format.enable": false,
  "json.format.enable": false,
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 开启eslint自动修复js/ts功能
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "minapp-vscode.disableAutoConfig": true,
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "editor.maxTokenizationLineLength": 200000
}

```
