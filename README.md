# vue-webapp

## 配置

### 移动端适配

-   安装依赖

```shell
npm install lib-flexible --save

npm install postcss-pxtorem --dev
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

## 图标字体

## 图片懒加载

## vue.config.js 配置
