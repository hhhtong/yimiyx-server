/**
 * 采购
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import PurchaseOrder from './purchase-order';

@Entity()
export default class PurchaseChildOrder {
  /**
   * 采购的主订单
   */
  @ManyToOne(type => PurchaseOrder, po => po.purchaseChildOrder)
  purchaseOrder: PurchaseOrder;

  /**
   * 主键
   * 采购的子订单编号
   * eg: 100001 主订单ID + 编号递增(00001)五位数
   * 据此生成条形码
   */
  @PrimaryColumn('varchar', { length: 25 })
  purchaseNo: string;

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
