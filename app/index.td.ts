import HomeController from './controller/home';
import SupplierController from './controller/supplier';
import SupplierService from './service/supplier'

declare module 'egg' {
  export interface Application {
  }

  export interface IController {
    home: HomeController,
    supplier: SupplierController
  }

  export interface IService {
    supplier: SupplierService
  }

  function startCluster(options: any)
}