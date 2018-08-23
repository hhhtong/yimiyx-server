import BaseController from '../../core/base-controller'
import { AdminUserQuery, AdminUserPartial } from '../../common/QueryInterface'
import * as Crypto from 'crypto'
import { checkUserName, checkPassword } from '../../libs/validator'

const SALT = 'V5^MT12YWx1ZTEma2V='

export default class AdminUserController extends BaseController {
  // - 获取用户信息
  async getUserInfo () {
    const userCache: AdminUserPartial = this.ctx.session
    if (!userCache.userId) {
      return this.fail({}, 4001, '登陆过期，请重新登陆')
    }

    const result = await this.__getInfo(userCache.userId, '', false)
    if (typeof result === 'string') {
      this.fail({}, 50001, result)
    } else {
      this.success(result)
    }
  }

  // - 登录
  async login (): Promise<void> {
    const MD5 = Crypto.createHash('md5')
    const { userName, password } = this.ctx.request.body
    const errMsg = this.__validatePostUser(userName, password)
    if (errMsg) {
      return this.fail({}, 50001, errMsg as string)
    }

    let result: string | AdminUserPartial
    try {
      result = await this.__getInfo(
        userName,
        MD5.update(password + SALT).digest('hex'),
        true
      )
    } catch (err) {
      throw err
    }

    if (typeof result === 'string') {
      this.fail({}, 50001, result)
    } else {
      // this.print(this.config.session.genid()) // - 手动生成 sessionId
      this.ctx.session = result
      this.ctx.rotateCsrfSecret() // - 调用 rotateCsrfSecret 刷新用户的 CSRF token
      this.success(result, '登录成功')
    }
  }

  // - 登出
  logout (): void {
    this.ctx.session = null
    this.success()
  }

  // - 获取用户列表
  async getUserList (): Promise<void> {
    const query: AdminUserQuery = this.ctx.query
    const [list, total] = await this.service.admin.user.find(query)
    this.success({ list, total })
  }

  // - 新增用户
  async saveUser (): Promise<void> {
    const userData: AdminUserPartial = this.ctx.request.body
    await this.service.admin.user.save(userData)
    this.success()
  }

  // - 删除用户
  async deleteUser (): Promise<void> {
    const params: AdminUserPartial = this.ctx.request.body
    if (params.userId) {
      await this.service.admin.user.remove(params.userId)
      this.success()
    } else {
      this.fail({}, 50001, '缺少参数')
    }
  }

  private __validatePostUser(userName: string, password: string): string | boolean {
    if (!userName) {
      return '用户名不能为空'
    } else if (!checkUserName(userName)) {
      return '用户名格式不正确'
    } else if (!password) {
      return '密码不能为空'
    } else if (!checkPassword(password)) {
      return '密码格式不正确'
    }
    return false
  }

  private async __getInfo (user: number | string, pswd: string, verifyPswd: boolean): Promise<string | AdminUserPartial> {
    // this.print(pswd)
    const { userInfo, code } = await this.service.admin.user.findUserByName(user, pswd, verifyPswd)
    if (code === 'account_unknown') {
      return '该用户不存在'
    } else if (code === 'account_disable') {
      return '您的账户已被禁用，请联系管理员进行操作'
    } else if (code === 'password_err') {
      return '密码错误'
    } else {
      return userInfo
    }
  }
}
