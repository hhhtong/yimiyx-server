/**
 * 商品分类表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import Supplier from './supplier';
import Goods from './goods';
import PurchaseOrder from './purchase-order';

@Entity()
export default class GoodsCategory {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 商品
   */
  @ManyToMany(type => Goods, goods => goods.categorys)
  goods: Goods[];

  /**
   * 供货商
   */
  @OneToMany(type => Supplier, s => s.category)
  supplier: Supplier[];

  /**
   * 采购的主订单
   */
  @OneToMany(type => PurchaseOrder, po => po.goodsCategory)
  purchaseOrder: PurchaseOrder[];

  /**
   * 指向二级或三级分类的对应父级id
   */
  @Column({ default: 0 })
  pid: number;

  /**
   * 类型 1：一级类目 | 2：二级类目 | 3：三级类目
   */
  @Column('tinyint', { default: 0 })
  type: number;

  /**
   * 类目名称
   */
  @Column('varchar', { length: 25 })
  name: string;

  /**
   * 类目编号
   */
  @Column('char', { length: 6 })
  no: string;
}