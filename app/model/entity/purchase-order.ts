/**
 * 采购单
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Supplier from './supplier';
import GoodsCategory from './goods-category';
import PurchaseMainOrder from './purchase-main-order';

@Entity()
export default class PurchaseOrder {
  /**
   * 采购单编号
   * eg: CG20180415150610E0STI4 - CG(`采购`首字母) + 20180415150610(YYYYMMDDHHmmss) + E0STI4(6位随机UUID)
   * 据此生成条形码
   */
  @PrimaryColumn('char', { length: 24 })
  id: string;

  /**
   * 采购类别(一级类目)
   */
  @ManyToOne(type => GoodsCategory, gc => gc.purchaseOrders)
  category: GoodsCategory;

  /**
   * 供货商
   */
  @ManyToOne(type => Supplier, supplier => supplier.purchaseOrder)
  supplier: Supplier;

  /**
   * 采购商品单的主订单
   */
  @OneToMany(type => PurchaseMainOrder, mo => mo.order)
  mainOrders: PurchaseMainOrder[];

  /**
   * 采购单状态
   * -1: 已删除
   *  1: 待采购
   *  2: 已入库
   */
  @Column('tinyint', { default: 1 })
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


  /**
   * 删除时间
   */
  @Column({ nullable: true })
  deletedAt: Date;
}
