// - 本文件存放相关参数接口
import Coupon from '../model/entity/coupon';
import Goods from '../model/entity/goods';
import GoodsCategory from '../model/entity/goods-category';
import Supplier from '../model/entity/supplier';
import PurchaseOrder from '../model/entity/purchase-order';
import PurchaseMainOrder from '../model/entity/purchase-main-order';
import PurchaseChildOrder from '../model/entity/purchase-child-order';

// - 基础返回数据列表接口
type QueryResult<Entity> = {
  list: Entity[];
  total: number;
  [propName: string]: any;
};

// - 基础查询参数接口
interface Query {
  page: number;
  rows: number;
  disabledPage?: boolean; // 是否禁用分页，true将会忽略`page`和`rows`参数
}

// - 优惠券
export interface CouponQuery extends Query {
  couponType?: number,
  couponName?: string;
  couponMoney1?: Coupon['couponMoney']; // - 优惠券金额范围
  couponMoney2?: Coupon['couponMoney'];
}
export type CouponPartial = Partial<Coupon>;
export type CouponResult = QueryResult<Coupon>;

// - 商品
export interface GoodsQuery extends Query {
  isOnline?: string | number; // 是否出售中的商品
  goodsNo?: string; // 商品编号
  goodsName?: string; // 商品名称
}
export type GoodsPartial = Partial<Goods>;
export type GoodsResult = QueryResult<Goods>;

// - 商品分类
export interface GoodsCategoryQuery extends Query {
  name?: string;
}
export type GoodsCategoryPartial = Partial<GoodsCategory>;
export type GoodsCategoryResult = QueryResult<GoodsCategory>;

// - 供货商
export interface SupplierQuery extends Query {
  areaCode?: string; // 省份ID,城市ID
  categoryID?: number; // 商品类别 默认0(全部)
  supplierID?: number; // 供应商编号
  supplierName?: string; // 供应商名称
}
export type SupplierPartial = Partial<Supplier>;
export type SupplierResult = QueryResult<Supplier>;

// - 采购单
export interface PurchaseOrderQuery extends Query {
  dateRange?: string[]; // 采购单创建时间范围筛选
  categoryID?: number; // 商品类别 默认0(全部)
  supplierID?: number; // 供应商ID
  supplierName?: string; // 供应商名称
}
export type PurchaseOrderPartial = Partial<PurchaseOrder>;
export type PurchaseMainOrderPartial = Partial<PurchaseMainOrder>;
export type PurchaseChildOrderPartial = Partial<PurchaseChildOrder>;
export type PurchaseOrderResult = QueryResult<PurchaseOrder>;
export type PurchaseMainOrderResult = QueryResult<PurchaseMainOrder>;
export type PurchaseChildOrderResult = QueryResult<PurchaseChildOrder>;
