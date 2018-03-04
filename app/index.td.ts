import HomeController from './controller/home';
import SupplierController from './controller/supplier';
import SupplierService from './service/supplier';
import GoodsCategoryController from './controller/goods-category';
import GoodsCategoryService from './service/goods-category';

declare module 'egg' {
  export interface Application {
  }

  export interface IController {
    home: HomeController,
    supplier: SupplierController,
    goodsCategory: GoodsCategoryController
  }

  export interface IService {
    supplier: SupplierService,
    goodsCategory: GoodsCategoryService
  }

  function startCluster(options: any)
}