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
    prefixZero(num: number, len: number): string
  }

  function startCluster(options: any)
}