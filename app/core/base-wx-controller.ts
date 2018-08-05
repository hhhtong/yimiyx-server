import BaseController from './base-controller'

interface Session {
  sessionKey: string,
  openid: string
}

export default class BaseWxController extends BaseController {
  // - skey换取redis中的openid
  async $skey2openid(skey: string): Promise<Session> {
    const session: string = await this.app.redis.get(skey)
    try {
      const result: Session = JSON.parse(session)
      return result
    } catch (err) {
      throw err
    }
  }
}
