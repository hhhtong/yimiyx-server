# 壹米优鲜服务端

[yimiyx-server](https://github.com/hhhtong/yimiyx-server) 使用typescript && egg，目前只提供接口层服务。

## Links

- [yimiyx-admin](https://github.com/hhhtong/yimiyx-admin)
- [yimiyx-miniprogram](https://github.com/hhhtong/yimiyx-miniprogram)

### Introduction

本项目依赖于Mariadb，Redis，请自行安装
```bash
brew install mariadb
brew install redis-cli
```

### Development

```bash
$ yarn
$ yarn dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ yarn tsc
yarn start
```

### Npm Scripts

- Use `yarn lint` to check code style
- Use `yarn test` to run unit test
- Use `yarn clean` to clean compiled js at development mode once
- Use `yarn compress` packaging project
- Use `yarn restart` restart your application
- Use `yarn kill` kill the process

### Requirement

- Node.js 8.x
- Typescript 3.x

## License
[EPL-2.0](LICENSE)

Copyright (c) 2018-present, 浩海鸿通
