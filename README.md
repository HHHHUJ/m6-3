# mpvueapp

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 项目结构
1. App.vue相当于原生的app.js和app.wxss,可以写全局的逻辑和样式
2. wxParse组件内可以使用v-html和v-text


## 打包路径

- index: 模板
- assetRoot: 打包后文件要存放的路径
- assetsSubDirectory: 除了 index.html 之外的静态资源要存放的路径，
- assetsPublicPath: 代表打包后，index.html里面引用资源的的相对地址

## vue语法
- this.$forceUpdate()数组改变，更新试图
