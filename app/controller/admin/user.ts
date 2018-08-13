import BaseController from '../../core/base-controller'
import { AdminUserQuery, AdminUserPartial } from '../../common/QueryInterface'
import * as Crypto from 'crypto'

const SALT = '$kjdshfJF&'

export default class AdminUserController extends BaseController {
  async login(): Promise<boolean | undefined> {
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

    const { userInfo, code } = await this.service.admin.user.getUserInfo(
      userName,
      MD5.update(password).digest('hex')
    )

    if (code === 'account_unknown') {
      errMsg = '不存在此用户名'
    } else if (code === 'account_disable') {
      errMsg = '您的账户已被禁用，请联系管理员进行操作'
    } else if (code === 'password_err') {
      errMsg = '密码错误'
    }

    if (errMsg !== '') {
      this.fail({}, 50001, errMsg)
      return false
    }

    this.success(userInfo, '登录成功')
  }

  async getUserList(): Promise<void> {
    const query: AdminUserQuery = this.ctx.query
    const [list, total] = await this.service.admin.user.find(query)
    this.success({ list, total })
  }

  async saveUser(): Promise<void> {
    const userData: AdminUserPartial = this.ctx.request.body
    await this.service.admin.user.save(userData)
    this.success()
  }

  async deleteUser(): Promise<void> {
    const params: AdminUserPartial = this.ctx.request.body
    if (params.userId) {
      await this.service.admin.user.remove(params.userId)
      this.success()
    } else {
      this.fail({}, 50001, '缺少参数')
    }
  }
}
