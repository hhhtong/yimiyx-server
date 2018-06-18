// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import GoodsCategory from '../../../app/service/goods-category';
import Goods from '../../../app/service/goods';
import Mock from '../../../app/service/mock';
import PurchaseOrder from '../../../app/service/purchase-order';
import Supplier from '../../../app/service/supplier';

declare module 'egg' {
  interface IService {
    goodsCategory: GoodsCategory;
    goods: Goods;
    mock: Mock;
    purchaseOrder: PurchaseOrder;
    supplier: Supplier;
  }
}
