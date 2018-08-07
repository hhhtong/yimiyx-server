// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import EntityCart from '../../../app/model/entity/cart';
import EntityCoupon from '../../../app/model/entity/coupon';
import EntityGoodsCategory from '../../../app/model/entity/goods-category';
import EntityGoodsTag from '../../../app/model/entity/goods-tag';
import EntityGoodsUnit from '../../../app/model/entity/goods-unit';
import EntityGoods from '../../../app/model/entity/goods';
import EntityPurchaseChildOrder from '../../../app/model/entity/purchase-child-order';
import EntityPurchaseMainOrder from '../../../app/model/entity/purchase-main-order';
import EntityPurchaseOrder from '../../../app/model/entity/purchase-order';
import EntityShop from '../../../app/model/entity/shop';
import EntityStore from '../../../app/model/entity/store';
import EntitySupplier from '../../../app/model/entity/supplier';
import EntitySysAdminAccess from '../../../app/model/entity/sys-admin-access';
import EntitySysAdminDepartment from '../../../app/model/entity/sys-admin-department';
import EntitySysAdminLog from '../../../app/model/entity/sys-admin-log';
import EntitySysAdminRole from '../../../app/model/entity/sys-admin-role';
import EntitySysAdminUser from '../../../app/model/entity/sys-admin-user';
import EntityUser from '../../../app/model/entity/user';
import NamingStrategySnakeNaming from '../../../app/model/naming-strategy/snake-naming';

declare module 'sequelize' {
  interface Sequelize {
    Entity: {
      Cart: ReturnType<typeof EntityCart>;
      Coupon: ReturnType<typeof EntityCoupon>;
      GoodsCategory: ReturnType<typeof EntityGoodsCategory>;
      GoodsTag: ReturnType<typeof EntityGoodsTag>;
      GoodsUnit: ReturnType<typeof EntityGoodsUnit>;
      Goods: ReturnType<typeof EntityGoods>;
      PurchaseChildOrder: ReturnType<typeof EntityPurchaseChildOrder>;
      PurchaseMainOrder: ReturnType<typeof EntityPurchaseMainOrder>;
      PurchaseOrder: ReturnType<typeof EntityPurchaseOrder>;
      Shop: ReturnType<typeof EntityShop>;
      Store: ReturnType<typeof EntityStore>;
      Supplier: ReturnType<typeof EntitySupplier>;
      SysAdminAccess: ReturnType<typeof EntitySysAdminAccess>;
      SysAdminDepartment: ReturnType<typeof EntitySysAdminDepartment>;
      SysAdminLog: ReturnType<typeof EntitySysAdminLog>;
      SysAdminRole: ReturnType<typeof EntitySysAdminRole>;
      SysAdminUser: ReturnType<typeof EntitySysAdminUser>;
      User: ReturnType<typeof EntityUser>;
    };
    NamingStrategy: {
      SnakeNaming: ReturnType<typeof NamingStrategySnakeNaming>;
    };
  }
}
