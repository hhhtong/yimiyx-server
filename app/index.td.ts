import TestController from './controller/test';
import HomeController from './controller/home';
import SupplierController from './controller/supplier';
import SupplierService from './service/supplier';
import GoodsCategoryController from './controller/goods-category';
import GoodsCategoryService from './service/goods-category';
import GoodsController from './controller/goods';
import GoodsService from './service/goods';
import PurchaseOrderController from './controller/purchase-order';
import PurchaseOrderService from './service/purchase-order';

declare module 'egg' {
  export interface Application {
    /**
     * 数据库连接对象
     */
    connection: any,
    /**
     * 生成二维码
     * @param code - 二维码内容
     * @param options - options in `qrcode` module
     * @see https://www.npmjs.com/package/qrcode#options
     */
    generateQRCode<T>(code: string, options?: Object): Promise<string>
  }

  export interface IController {
    test: TestController,
    home: HomeController,
    supplier: SupplierController,
    goodsCategory: GoodsCategoryController,
    goods: GoodsController,
    purchaseOrder: PurchaseOrderController
  }

  export interface IService {
    supplier: SupplierService,
    goodsCategory: GoodsCategoryService,
    goods: GoodsService,
    purchaseOrder: PurchaseOrderService
  }

  export interface IHelper {
    /**
     * @method Helper#toCamelObj - 将对象或者数组内对象的key转为小驼峰命名
     * @param obj - 要进行转换的对象或者数组
     */
    toCamelObj(obj: Object | Object[]),

    /**
     * @method Helper#toSnakeObj - 将对象或者数组内对象的key转为下划线分割命名
     * @param obj - 要进行转换的对象或者数组
     */
    toSnakeObj(obj: Object | Object[]),

    /**
     * 日期补全时间
     * @param dateRange - 一个包含起止日期的数组
     * @example
     * ['2018-06-05', '2018-06-08']
     * =>
     * ['2018-06-05 00:00:00', '2018-06-08 23:59:59']
     */
    transformDateRange(dateRange: string[]),

    /**
     * @method Helper#prefixZero - 对指定数值进行前置补 '0'
     * @param num - 要进行处理的原始数字
     * @param len - 转换后的总长度
     * @example
     * ```js
     * ctx.helper.prefixZero(1, 4)
     * => '0001'
     * ```
     */
    prefixZero(num: number, len: number): string,

    /**
     * @method Helper#uuid - 生成随机ID
     * @param len - 生成长度
     * @param radix - 基于几进制生成
     */
    uuid(len: number, radix: number): string
  }

  function startCluster(options: any)
}