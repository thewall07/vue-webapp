module.exports = {
    plugins: {
        autoprefixer: {
            
        },
        "postcss-pxtorem": {
            rootValue: 75, // 设计稿的十分之一
            propList: ["*"], // 全部
        },
    }
}