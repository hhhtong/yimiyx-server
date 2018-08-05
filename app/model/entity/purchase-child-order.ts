/**
 * 采购的商品单的子订单
 */
import { Entity, PrimaryColumn, CreateDateColumn, ManyToOne } from 'typeorm'
import PurchaseMainOrder from './purchase-main-order'

@Entity()
export default class PurchaseChildOrder {
  /**
   * 主键
   * 采购商品单编号
   * 据此生成内部条形码
   * eg: C05020200010001E0STI4 C(代表子订单) + 商品编号(0502020001) + 四位自然数递增(从0001开始) + E0STI4(6位随机UUID)
   * M开头表示商品主订单
   * C开头表示商品主订单下的子订单
   */
  @PrimaryColumn('char', { length: 24 })
  cid: string

  /**
   * 采购商品单的主订单
   */
  @ManyToOne(type => PurchaseMainOrder, mo => mo.childOrders)
  mainOrder: PurchaseMainOrder

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date
}
