import { Service } from 'egg';

export default class BaseService extends Service {

  get log() {
    return this.app.logger;
  }

  get conn() {
    return this.ctx.app.connection
  }

  error(e) {
    this.log.error(e.message);
    throw new Error(e)
  }
}
