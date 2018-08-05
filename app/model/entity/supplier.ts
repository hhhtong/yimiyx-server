/**
 * 供货商表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm'
import GoodsCategory from './goods-category'
import PurchaseOrder from './purchase-order'

@Entity()
export default class Supplier {

  @PrimaryGeneratedColumn()
  id: number

  /**
   * 类目
   */
  @ManyToOne(type => GoodsCategory, gc => gc.supplier)
  category: GoodsCategory

  /**
   * 采购的主订单
   */
  @OneToMany(type => PurchaseOrder, po => po.supplier)
  purchaseOrder: PurchaseOrder[]

  /**
   * 供货商级别 1: 优 2: 良好 3: 凑合
   */
  @Column('tinyint', { default: 2 })
  level: number

  /**
   * 供货商名称
   */
  @Column('varchar', { length: 50 })
  supplierName: string

  /**
   * 负责人姓名
   */
  @Column('varchar', { length: 10, default: '' })
  linkmanName: string

  /**
   * 负责人联系方式
   */
  @Column('char', { length: 11, default: '' })
  tel: string

  /**
   * 供货商所在地区代号 省,市,区,街道
   */
  @Column('varchar', { length: 50 })
  areaCode: string

  /**
   * 供货商所在地区名称 省,市,区,街道
   */
  @Column('varchar', { length: 100 })
  areaName: string

  /**
   * 供货商详细地址
   */
  @Column('varchar', { length: 50, default: '' })
  address: string

  /**
   * 供货商类型 1:公司 2:个人
   */
  @Column('tinyint', { default: 0 })
  supplierType: number

  /**
   * 税务登记号, 可能是15位左右的数字
   */
  @Column('char', { length: 18, nullable: true })
  taxNo: number

  /**
   * 收款方式 bank | ali | wechat
   */
  @Column('char', { length: 10 })
  payType: string

  /**
   * 汇款账号
   */
  @Column('varchar', { length: 24 })
  accountNo: string

  /**
   * 银行名称
   */
  @Column('varchar', { length: 10, nullable: true })
  bankName: string

  /**
   * 持卡人姓名
   */
  @Column('char', { length: 10, nullable: true })
  bankUsername: string

  /**
   * 开户行地址
   */
  @Column('varchar', { length: 50, nullable: true })
  bankAddress: string

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date

  /**
   * 删除时间
   */
  @Column({ nullable: true })
  deletedAt: Date
}
