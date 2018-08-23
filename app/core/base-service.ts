import { Service } from 'egg'

export default class BaseService extends Service {

  get log() {
    return this.app.logger
  }

  get conn() {
    return this.ctx.app.connection
  }

  print (...msg) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', ...msg)
  }

  error(e) {
    this.log.error(e)
    // throw new Error(e)
  }
}
