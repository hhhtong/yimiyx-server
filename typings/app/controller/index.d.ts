// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import GoodsCategory from '../../../app/controller/goods-category';
import Goods from '../../../app/controller/goods';
import Home from '../../../app/controller/home';
import PurchaseOrder from '../../../app/controller/purchase-order';
import Supplier from '../../../app/controller/supplier';
import Test from '../../../app/controller/test';
import AdminGoodsCategory from '../../../app/controller/admin/goods-category';
import AdminGoods from '../../../app/controller/admin/goods';
import AdminHome from '../../../app/controller/admin/home';
import AdminPurchaseOrder from '../../../app/controller/admin/purchase-order';
import AdminSupplier from '../../../app/controller/admin/supplier';
import ClientCart from '../../../app/controller/client/cart';
import ClientGoods from '../../../app/controller/client/goods';
import ClientOrder from '../../../app/controller/client/order';
import ClientPay from '../../../app/controller/client/pay';
import ClientUser from '../../../app/controller/client/user';

declare module 'egg' {
  interface IController {
    goodsCategory: GoodsCategory;
    goods: Goods;
    home: Home;
    purchaseOrder: PurchaseOrder;
    supplier: Supplier;
    test: Test;
    admin: {
      goodsCategory: AdminGoodsCategory;
      goods: AdminGoods;
      home: AdminHome;
      purchaseOrder: AdminPurchaseOrder;
      supplier: AdminSupplier;
    };
    client: {
      cart: ClientCart;
      goods: ClientGoods;
      order: ClientOrder;
      pay: ClientPay;
      user: ClientUser;
    };
  }
}
