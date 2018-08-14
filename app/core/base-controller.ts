import { Controller } from 'egg'
import { GoodsCategoryResult } from '../common/QueryInterface'

/**
 * 业务码说明
 * 4001 登陆过期或者未登录
 * 50000 操作成功
 * 50001 常规性操作失败
 * 50002 数据库相关操作失败
 * 50003 待定
 * 50004 待定
 * 50005 待定
 * ...
 */
export default class BaseController extends Controller {

  success (data: any = {}, msg: string = '操作成功') {
    this.ctx.body = {
      code: 50000,
      data,
      msg
    }
    return data
  }

  fail (data: any = {}, code: number = 50001, msg: string = '操作失败') {
    if (typeof data.sqlMessage === 'string') {
      // - 数据库相关操作错误
      code = 50002
      msg = data.sqlMessage
    } else if (typeof msg === 'object') {
      // - 抛出的异常错误
      msg = data.errmsg || data.toString()
    }

    this.ctx.body = {
      code,
      data,
      msg
    }
  }

  /**
   * 对sql查询返回的时间进行格式化处理
   * @param obj - 要进行操作的obj
   * @param str - 时间的key
   */
  $sqlDateFormat (obj: Object, str: string | string[]) {
    const { ctx } = this
    if (typeof str === 'string') obj[str] = ctx.helper.moment(obj[str]).format('YYYY-MM-DD HH:mm:ss')
    else for (const item of str) obj[item] = ctx.helper.moment(obj[item]).format('YYYY-MM-DD HH:mm:ss')
  }

  /**
   * 从obj里删掉指定key,可以有效减少网络传输中的数据大小
   * @param obj - 要进行操作的obj
   * @param str - 要删除的key
   */
  $expel (obj: Object, str: string | string[]) {
    if (typeof str === 'string') delete obj[str]
    else for (const item of str) delete obj[item]
  }

  /**
   * 商品数据重排变成嵌套
   */
  $refix (list: Object[]) {
    const oneList = list.filter((item: any) => item.type === 1)
    const twoList = list.filter((item: any) => item.type === 2)
    const threeList = list.filter((item: any) => item.type === 3)
    return this.$mixin(oneList.reverse(), this.$mixin(twoList, threeList))
  }

  /**
   * 将商品平级结构转成树形结构
   */
  $mixin (list1: any[], list2: any[]): Object[] {
    if (list2.length <= 0) {
      list2 = list1
    }

    list2.forEach(item2 => {
      item2.expand = true
      item2.readonly = true
      list1.forEach(item1 => {
        if (item2.pid === item1.id) {
          item1.expand = true
          item1.readonly = true
          if (!item1.children) {
            item1.children = [item2]
          } else {
            item1.children = [item2, ...item1.children]
          }
        }
      })
    })

    return list1
  }

  /**
   * 将商品树形结构转成平级结构
   */
  $unmixin (list: any): GoodsCategoryResult[] {
    const categoryList: GoodsCategoryResult[] = []
    const next = (item: any) => {
      if (item.name !== '') {
        categoryList.push(item)
      }
      if (Array.isArray(item.children)) {
        item.children.forEach(children => next(children))
      }
    }

    list.forEach(item => next(item))
    return categoryList
  }
}
