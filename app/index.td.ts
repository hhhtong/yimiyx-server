import HomeController from './controller/home';
import SupplierService from './service/supplier'

declare module 'egg' {
  export interface Application {
  }

  export interface IController {
    home: HomeController
  }

  export interface IService {
    supplier: SupplierService
  }

  function startCluster(options: any)
}