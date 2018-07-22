import BaseController from '../../core/base-controller';
import WXBizDataCrypt from '../../libs/WXBizDataCrypt';

export default class UserController extends BaseController {

  // -------------------------------------------------------------------------
  // Readonly Properties
  // -------------------------------------------------------------------------

  // - 小程序appid和appSecret
  readonly appid: string;
  readonly appSecret: string;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.appid = 'wx531cc1788fb672aa';
    this.appSecret = '3505e0b046397fd6364715e8e2140865';
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 通过code换取用户信息
  async getUserInfo() {
    const { openid } = this.ctx.query;
    try {
      const userInfo = await this.service.client.user.findByOpenid(openid);
      this.success(userInfo);
    } catch (err) {
      this.fail(err);
    }
  }

  // - 通过小程序端的传过来的code换取微信的session_key，以用来维持登录态
  async code2session() {
    const { ctx, app } = this;
    const params = {
      appid: this.appid,
      secret: this.appSecret,
      js_code: ctx.query.code,
      grant_type: 'authorization_code'
    };
    const { data } = await app.curl(
      'https://api.weixin.qq.com/sns/jscode2session',
      { method: 'GET', dataType: 'json', data: params }
    );

    console.log(data);
    if (!data.openid || !data.session_key || data.errcode) {
      this.fail(data || '返回数据字段不完整');
    } else {
      // - 删除过期的skey
      if (ctx.query.skey) app.redis.del(ctx.query.skey);

      const session: string = JSON.stringify(data);
      // - 通过生成3rd_session，维护用户的登录态信息
      const skey = ctx.helper.encryptSha1(data.session_key);
      delete data.session_key;
      // - 将session存到redis中
      await app.redis.set(skey, session);
      this.success(skey);
    }
  }

  // - 更新或者新增用户信息到数据库
  async saveUserInfo() {
    const { skey, encryptedData, iv } = this.ctx.request.body;
    const { session_key } = await this.app.redis.get(skey);
    const pc = new WXBizDataCrypt(this.appid, session_key);
    const data = pc.decryptData(encryptedData, iv)

    console.log('解密后 data: ', data)
    try {
      await this.service.client.user.updateUserData()
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }
}
