import HomeController from './controller/home';
import SupplierController from './controller/supplier';
import SupplierService from './service/supplier';
import GoodsCategoryController from './controller/goods-category';
import GoodsCategoryService from './service/goods-category';
import GoodsController from './controller/goods';
import GoodsService from './service/goods';

declare module 'egg' {
  export interface Application { }

  export interface IController {
    home: HomeController,
    supplier: SupplierController,
    goodsCategory: GoodsCategoryController,
    goods: GoodsController
  }

  export interface IService {
    supplier: SupplierService,
    goodsCategory: GoodsCategoryService,
    goods: GoodsService
  }

  export interface IHelper {
    /**
     * @method Helper#dateFormat - 时间格式化
     * @param {Number, String, Date} date - 时间戳 | 日期 | 日期对象
     * @param {String} fmt - 返回格式 默认YYYY-MM-DD HH:mm:ss
     * @example
     * ```js
     * ctx.helper.dateFormat(Date.now(), 'YYYY-MM-DD')
     * => '2018-04-15'
     * ```
     * @return {String}
     */
    dateFormat(date?: number | string | Date, fmt?: string): string,
    /**
     * @method Helper#prefixZero - 对指定数值进行前置补 '0'
     * @param {Number} num - 要进行处理的原始数字
     * @param {Number} len - 转换后的总长度
     * @example
     * ```js
     * ctx.helper.prefixZero(1, 4)
     * => '0001'
     * ```
     * @return {String}
     */
    prefixZero(num: number, len: number): string,
    /**
     * @method Helper#getRandomNum - 生成指定范围随机整数
     * @param {Number} minnum - 最小值
     * @param {Number} maxnum - 最大值
     */
    getRandomNum(minnum?: number, maxnum?: number): number
  }

  function startCluster(options: any)
}