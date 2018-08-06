// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import AdminCoupon from '../../../app/service/admin/coupon';
import AdminGoodsCategory from '../../../app/service/admin/goods-category';
import AdminGoods from '../../../app/service/admin/goods';
import AdminPurchaseOrder from '../../../app/service/admin/purchase-order';
import AdminSupplier from '../../../app/service/admin/supplier';
import ClientCart from '../../../app/service/client/cart';
import ClientCoupon from '../../../app/service/client/coupon';
import ClientGoods from '../../../app/service/client/goods';
import ClientOrder from '../../../app/service/client/order';
import ClientPay from '../../../app/service/client/pay';
import ClientUser from '../../../app/service/client/user';

declare module 'egg' {
  interface IService {
    admin: {
      coupon: AdminCoupon;
      goodsCategory: AdminGoodsCategory;
      goods: AdminGoods;
      purchaseOrder: AdminPurchaseOrder;
      supplier: AdminSupplier;
    };
    client: {
      cart: ClientCart;
      coupon: ClientCoupon;
      goods: ClientGoods;
      order: ClientOrder;
      pay: ClientPay;
      user: ClientUser;
    };
  }
}
