import BaseController from '../../core/base-controller'
import { AdminUserQuery, AdminUserPartial } from '../../common/QueryInterface'
import * as Crypto from 'crypto'

const SALT = '$kjdshfJF&'

export default class AdminUserController extends BaseController {
  async getUserInfo () {
    const { token } = this.ctx.query
    let userCache: any
    if (!(userCache = await this.app.redis.get(token))) {
      return this.fail({}, 4001, '登陆过期，请重新登陆')
    }

    const result = await this.__getInfo(userCache.userId, '', true)
    if (typeof result === 'string') {
      this.fail({}, 50001, result)
    } else {
      this.success(result)
    }
  }

  async login (): Promise<void> {
    const MD5 = Crypto.createHash('md5')
    let { userName, password } = this.ctx.request.body
    let errMsg: string = ''

    if (!userName) {
      errMsg = '用户名不能为空'
    } else if (userName) {
      errMsg = '用户名格式不正确'
    }

    if (!password) {
      errMsg = '密码不能为空'
    } else if (password) {
      errMsg = '密码格式不正确'
    } else {
      password = password + SALT // - add salt
    }

    if (errMsg !== '') {
      return this.fail({}, 50001, errMsg)
    }

    const result = await this.__getInfo(
      userName,
      MD5.update(password).digest('hex'),
      true
    )
    if (typeof result === 'string') {
      this.fail({}, 50001, result)
    } else {
      // this.app.sessionStore.set(session)
      // this.ctx.session = result
      // this.app.redis.set(session, JSON.stringify({ userId: result.userId, userName: result.userName }))
      this.ctx.rotateCsrfSecret() // - 调用 rotateCsrfSecret 刷新用户的 CSRF token
      this.success(result, '登录成功')
    }
  }

  async getUserList (): Promise<void> {
    const query: AdminUserQuery = this.ctx.query
    const [list, total] = await this.service.admin.user.find(query)
    this.success({ list, total })
  }

  async saveUser (): Promise<void> {
    const userData: AdminUserPartial = this.ctx.request.body
    await this.service.admin.user.save(userData)
    this.success()
  }

  async deleteUser (): Promise<void> {
    const params: AdminUserPartial = this.ctx.request.body
    if (params.userId) {
      await this.service.admin.user.remove(params.userId)
      this.success()
    } else {
      this.fail({}, 50001, '缺少参数')
    }
  }

  async __getInfo (user: number | string, pswd: string, verify: boolean): Promise<string | AdminUserPartial> {
    const { userInfo, code } = await this.service.admin.user.findUserByName(user, pswd, verify)
    if (code === 'account_unknown') {
      return '不存在此用户名'
    } else if (code === 'account_disable') {
      return '您的账户已被禁用，请联系管理员进行操作'
    } else if (code === 'password_err') {
      return '密码错误'
    } else {
      return userInfo
    }
  }
}
