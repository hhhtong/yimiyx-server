import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { join } from 'path'
import { readFileSync } from 'fs'

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>

// app special config scheme
export interface BizConfig {
  sourceUrl: string
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig

  // app special config
  // config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1'
    }
  }

  config.siteFile = {
    '/favicon.ico': readFileSync(join(appInfo.baseDir, 'public/static/favicon.ico'))
  }

  config.security = {
    csrf: {
      ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  }

  config.static = {
    prefix: '/public/',
    dir: join(appInfo.baseDir, 'public')
  }

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0
    }
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks'
    }
  }

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: join(appInfo.baseDir, 'logs')
  }

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533191882173_8870'

  // add your config here
  config.middleware = [
    'access'
  ]

  return config
}
