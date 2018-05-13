/**
 * 采购的商品单
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import Goods from './goods';
import PurchaseOrder from './purchase-order'
import PurchaseGoodsDetail from './purchase-goods-detail';

@Entity()
export default class PurchaseGoodsOrder {
  /**
   * 采购商品单编号
   * 据此生成内部条形码
   * eg: M0502020001E0STI4 M(代表主订单) + 商品编号(0502020001) + E0STI4(6位随机UUID)
   * M开头表示商品主订单
   * C开头表示商品主订单下的子订单
   */
  @PrimaryColumn('char', { length: 24 })
  purchaseGoodsID: string;

  /**
   * 商品
   */
  @ManyToOne(type => Goods, goods => goods.purchaseGoodsOrder)
  goods: Goods;

  /**
   * 采购单
   */
  @ManyToOne(type => PurchaseOrder, po => po.purchaseGoodsOrder)
  purchaseOrder: PurchaseOrder;

  /**
   * 采购的子订单
   */
  @OneToMany(type => PurchaseGoodsDetail, co => co.purchaseGoodsOrder)
  purchaseGoodsDetail: PurchaseGoodsDetail;

  /**
   * 采购商品单状态
   * -2: 采购失败
   * -1: 已删除
   *  1: 待采购
   *  2: 已入库
   */
  @Column('tinyint', { default: -1 })
  status: number;

  /**
   * 采购数量
   */
  @Column()
  purchaseNum: number;

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