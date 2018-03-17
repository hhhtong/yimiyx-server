import HomeController from './controller/home';
import SupplierController from './controller/supplier';
import SupplierService from './service/supplier';
import GoodsCategoryController from './controller/goods-category';
import GoodsCategoryService from './service/goods-category';
import GoodsController from './controller/goods';
import GoodsService from './service/goods';

declare module 'egg' {
  export interface Application {
  }

  export interface IController {
    home: HomeController,
    supplier: SupplierController,
    goodsCategory: GoodsCategoryController,
    goods: GoodsController
  }

  export interface IService {
    supplier: SupplierService,
    goodsCategory: GoodsCategoryService
    goods: GoodsService
  }

  function startCluster(options: any)
}