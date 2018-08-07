import BaseController from '../../core/base-controller';

export default class HomeController extends BaseController {

  async index(): Promise<void> {
    await this.ctx.render('index.html')
  }

  async login(): Promise<void> {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const user = await ctx.service.user.find({ username, password })

    if (!user) ctx.throw(403)

    ctx.session = { user }
    ctx.rotateCsrfSecret() // - 调用 rotateCsrfSecret 刷新用户的 CSRF token
    this.success()
  }
}
