import { Service } from 'egg';

export default class BaseService extends Service {

  get log() {
    return this.app.logger;
  }

  get db(): any {
    return this.ctx.db;
  }

  error(e) {
    this.log.error(e.message);
    throw new Error(e)
  }
}