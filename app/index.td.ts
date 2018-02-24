import HomeController from './controller/home';

declare module 'egg' {
  export interface Application {
  }

  export interface IController {
    home: HomeController
  }

  export interface IService {
  }

  function startCluster(options: any)
}