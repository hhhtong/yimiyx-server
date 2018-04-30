/**
 * 采购
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Supplier from './supplier';
import Goods from './goods';
import GoodsCategory from './goods-category';
import PurchaseChildOrder from './purchase-child-order';

@Entity()
export default class PurchaseOrder {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 商品
   */
  @ManyToOne(type => Goods, goods => goods.purchaseOrder)
  goods: Goods;

  /**
   * 供货商
   */
  @ManyToOne(type => Supplier, supplier => supplier.purchaseOrder)
  supplier: Supplier;

  /**
   * 采购类别(一级类目)
   */
  @ManyToOne(type => GoodsCategory, gc => gc.purchaseOrder)
  goodsCategory: GoodsCategory;

  /**
   * 采购的子订单
   */
  @OneToMany(type => PurchaseChildOrder, pco => pco.purchaseOrder)
  purchaseChildOrder: PurchaseChildOrder;

  /**
   * 采购编号
   * eg: 201804151506100502020001 20180415150610(YYYYMMDDHHmmss)+商品编号(0502020001)
   * 据此生成条形码
   */
  @Column('char', { length: 20, unique: true })
  purchaseID: string;

  /**
   * 采购数量
   */
  @Column()
  purchaseNum: number;

  /**
   * 状态
   * -1: 待采购
   *  1: 已入库
   */
  @Column('tinyint', { default: -1 })
  status: number;

  /**
   * 备注
   */
  @Column()
  remark: string;

  /**
   * 经办人
   */
  @Column('char', { length: 32, nullable: true })
  transactor: string;

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
