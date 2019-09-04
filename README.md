# vue-webapp

## 配置

### 移动端适配

-   安装依赖

```shell
npm install lib-flexible --save

npm install postcss-pxtorem --save
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

```javascript
// postcss.config.js
module.exports = {
	plugins: {
		autoprefixer: {},
		"postcss-pxtorem": {
			rootValue: 75, // 设计稿宽度的1/10,（JSON文件中不加注释，此行注释及下行注释均删除）
			propList: ["*"], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
		},
	},
};
```

### 图标字体

-   安装

```
npm install vue-awesome
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

### 优雅使用 svg

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

### 图片懒加载

-   安装

```
npm install vue-lazyload --save-dev
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

### animate.css 动画库

-   安装

```
npm install animate.css --save
```

-   使用

```javascript
// main.js
import "animate.css";
```

### axios 封装统一管理 api

```
npm install axios --save
```

### mock 数据

```
npm install mockjs --save-dev
```

## vue.config.js 配置

### 设置别名

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

### 配置 proxy 代理解决跨域问题

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
					"^/api": "/",
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

### 修复热更新(HMR)失效

```javascript
module.exports = {
	chainWebpack: (config) => {
		// 修复HMR
		config.resolve.symlinks(true);
	},
};
```

### 添加打包分析

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

### 压缩图片

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

### 开启 gZip 压缩
