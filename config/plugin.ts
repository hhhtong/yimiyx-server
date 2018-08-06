import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  static: true,
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  }
}

export default plugin
