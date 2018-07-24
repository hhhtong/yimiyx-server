// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Test from '../../../app/controller/test';
import AdminGoodsCategory from '../../../app/controller/admin/goods-category';
import AdminGoods from '../../../app/controller/admin/goods';
import AdminHome from '../../../app/controller/admin/home';
import AdminPurchaseOrder from '../../../app/controller/admin/purchase-order';
import AdminSupplier from '../../../app/controller/admin/supplier';
import ClientCart from '../../../app/controller/client/cart';
import ClientCommon from '../../../app/controller/client/common';
import ClientGoods from '../../../app/controller/client/goods';
import ClientOrder from '../../../app/controller/client/order';
import ClientPay from '../../../app/controller/client/pay';
import ClientUser from '../../../app/controller/client/user';

declare module 'egg' {
  interface IController {
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
      common: ClientCommon;
      goods: ClientGoods;
      order: ClientOrder;
      pay: ClientPay;
      user: ClientUser;
    };
  }
}
