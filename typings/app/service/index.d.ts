// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import AdminGoodsCategory from '../../../app/service/admin/goods-category';
import AdminGoods from '../../../app/service/admin/goods';
import AdminPurchaseOrder from '../../../app/service/admin/purchase-order';
import AdminSupplier from '../../../app/service/admin/supplier';
import ClientCart from '../../../app/service/client/cart';
import ClientGoods from '../../../app/service/client/goods';
import ClientOrder from '../../../app/service/client/order';
import ClientPay from '../../../app/service/client/pay';
import ClientUser from '../../../app/service/client/user';

declare module 'egg' {
  interface IService {
    admin: {
      goodsCategory: AdminGoodsCategory;
      goods: AdminGoods;
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
