# veggie-admin

基于 Egg + Vue2 + TypeScript + iView + Webpack4 多页面和单页面服务端客户端渲染同构工程项目.

## 1. 版本

- Egg 版本： ^2.x
- Node 版本: Node ^8.10.x,
- Webpack 版本: ^4.x,
- Vue 版本: ^2.5.16
- TypeScript: ^2.9.1
- iView

## 2. 文档

- http://hubcarl.github.io/easywebpack/vue/rule
- https://zhuanlan.zhihu.com/easywebpack


## 3. 特性

- 支持 Egg Node 端代码 和 前端代码 TypeScript 编写和构建

- 支持 async和 await 特性, Controller 采用 class 方式编写

- 支持 server 和 client 端代码修改, Webpack 时时编译和热更新, `npm run dev` 一键启动应用

- 基于 vue + vuex + vue-router + axios 单页面服务器客户端同构实现

- 支持开发环境, 测试环境，正式环境 Webpack 编译

- 支持 js/css/image 资源依赖, 内置支持CDN特性

- 支持 Webpack DLL 自动化构建

- 支持 Vue组件服务端渲染异步加载


## 4. 依赖

- [easywebpack-vue](https://github.com/hubcarl/easywebpack) ^4.0.4
- [egg-view-vue-ssr](https://github.com/hubcarl/egg-view-vue-ssr) ^3.0.8
- [egg-webpack](https://github.com/hubcarl/egg-webpack) ^4.1.1
- [egg-webpack-vue](https://github.com/hubcarl/egg-webpack-vue) ^2.0.1

## 5. 使用

#### 5.1 安装依赖

```bash
yarn install
yarn start     // linux
yarn start:win // windows
```

#### 5.2 启动应用

首次运行请先运行一次 `npm run tsc`

```bash
yarn dev
```

应用访问: http://127.0.0.1:7001

![yarn start启动](https://github.com/hubcarl/egg-vue-webpack-boilerplate/blob/master/docs/images/webpack-build.png)


#### 5.3 构建

- TypeScript Egg 服务端构建

```bash
yarn tsc
```

- ES6 前端工程构建

```bash
yarn build
```

#### 5.4 打包部署

1. 先运行 `yarn tsc` 和 `yarn build` 分别构建 TypeScript Egg 代码和 ES6 前端代码
2. 项目代码和构建代码一起打包代码
3. 应用部署后，linux通过 `yarn start` 启动应用，windows下通过`yarn start:win`


## License

[MIT](LICENSE)
