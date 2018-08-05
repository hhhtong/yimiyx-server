import BaseWxController from '../../core/base-wx-controller'
import WXBizDataCrypt from '../../libs/WXBizDataCrypt'

export default class UserController extends BaseWxController {

  // -------------------------------------------------------------------------
  // Readonly Properties
  // -------------------------------------------------------------------------

  // - 小程序appid和appSecret
  readonly appId: string
  readonly appSecret: string

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.appId = 'wx531cc1788fb672aa'
    this.appSecret = '3505e0b046397fd6364715e8e2140865'
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 通过code换取用户信息
  async getUserInfo(): Promise<void> {
    const { skey } = this.ctx.query
    try {
      const { openid } = await this.$skey2openid(skey)
      const userInfo = await this.service.client.user.findByOpenid(openid)
      this.success(userInfo)
    } catch (err) {
      this.fail(err)
    }
  }

  // - 通过小程序端的传过来的code换取微信的session_key，以用来维持登录态
  async code2session(): Promise<void> {
    const { ctx, app } = this
    const params = {
      appid: this.appId,
      secret: this.appSecret,
      js_code: ctx.query.code,
      grant_type: 'authorization_code'
    }
    let { data } = await app.curl(
      'https://api.weixin.qq.com/sns/jscode2session',
      { method: 'GET', dataType: 'json', data: params }
    )

    data = ctx.helper.toCamelObj(data) // - 转小驼峰
    if (!data.openid || !data.sessionKey || data.errcode) {
      this.fail(data || '返回数据字段不完整')
    } else {
      let { skey } = ctx.query
      // - 删除Redis中过期的skey
      if (skey) app.redis.del(skey)
      // - 生成3rd_session
      skey = ctx.helper.encryptSha1(data.sessionKey)
      // - 将session存到Redis中
      await app.redis.set(skey, JSON.stringify(data))
      // - 最终将3rd_session返回给前端维系用户的登录态
      this.success(skey)
    }
  }

  // - 新增用户信息
  async saveUserInfo(): Promise<void> {
    const { skey, encryptedData, iv } = this.ctx.request.body
    const session = await this.$skey2openid(skey)

    let data
    if (session) {
      data = new WXBizDataCrypt(this.appId, session.sessionKey)
      data = data.decryptData(encryptedData, iv)
    }

    // console.log('解密后 data: ', data);
    data.openid = data.openId
    data.isAuthorized = 1
    this.$expel(data, ['openId', 'watermark'])
    try {
      await this.service.client.user.insertNewUser(data)
      this.success()
    } catch (err) {
      this.fail(err)
    }
  }
}
