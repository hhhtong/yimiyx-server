import { Context } from 'egg'

export default () => {
  return async function (ctx: Context, next) {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' }
      } else {
        // - 配合 Vue 单页应用使用 history 模式
        // - @see https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子
        await ctx.render('index.html')
      }
    }
  }
}
