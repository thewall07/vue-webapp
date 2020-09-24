const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: (config) => {
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
        config.productionGzip = true;
    },
    // 开发环境开启 source-map
    configureWebpack: {
        devtool: process.env.NODE_ENV === "production" ? 'false' : 'source-map'
    },
    // 配置proxy代理解决跨域问题
    devServer: {
        // overlay: { // 让浏览器 overlay 同时显示警告和错误
        //   warnings: true,
        //   errors: true
        // },
        open: true, // 是否打开浏览器
        host: "localhost",
        port: "8080", // 代理端口
        // https: false,
        hotOnly: false, // 热更新
        proxy: {
            "/api": {
                target: "http://localhost:5757", // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 75,
                        propList: ['*']
                    })
                ]
            }
        }
    }
}