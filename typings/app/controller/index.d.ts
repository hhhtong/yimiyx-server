// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import GoodsCategory from '../../../app/controller/goods-category';
import Goods from '../../../app/controller/goods';
import Home from '../../../app/controller/home';
import PurchaseOrder from '../../../app/controller/purchase-order';
import Supplier from '../../../app/controller/supplier';
import Test from '../../../app/controller/test';

declare module 'egg' {
  interface IController {
    goodsCategory: GoodsCategory;
    goods: Goods;
    home: Home;
    purchaseOrder: PurchaseOrder;
    supplier: Supplier;
    test: Test;
  }
}
