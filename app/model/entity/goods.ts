/**
 * 商品表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import Store from './store';
import GoodsCategory from './goods-category';
import GoodsDesc from './goods-desc';
import PurchaseMainOrder from './purchase-main-order';

@Entity()
export default class Goods {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 所在仓库
   */
  @ManyToMany(type => Store, store => store.goods)
  @JoinTable()
  stores: Store[];

  /**
   * 对应所关联的类目表(goods_category)中的类目id
   */
  @ManyToMany(type => GoodsCategory, category => category.goods)
  @JoinTable()
  categorys: GoodsCategory[];

  /**
   * 反向映射到商品详情表(goodsDesc)
   */
  @OneToOne(type => GoodsDesc, gd => gd.goods)
  @JoinColumn()
  goodsDesc: GoodsDesc;

  /**
   * 采购商品单的主订单
   */
  @OneToMany(type => PurchaseMainOrder, pgo => pgo.goods)
  purchaseMainOrders: PurchaseMainOrder[];

  /**
   * 商品编号 eg: 0502020001 三级类目(050202)+000+商品id(1)
   */
  @Column('char', { length: 10, unique: true })
  goodsNo: string;

  /**
   * 条码
   */
  @Column('varchar', { length: 32, nullable: true })
  barCode: string;

  /**
   * 商品名称
   */
  @Column('varchar', { length: 50 })
  goodsName: string;

  /**
   * 商品别名
   */
  @Column('varchar', { length: 50, nullable: true })
  goodsAlias: string;

  /**
   * 商品规格 eg: 150
   */
  @Column('varchar', { length: 20, nullable: true })
  spec: string;

  /**
   * 商品规格的单位 eg: g
   */
  @Column('char', { length: 4, default: 'g' })
  specUnit: string;

  /**
   * 商品规格的数量
   */
  @Column('int', { default: 1 })
  specNum: number;

  /**
   * 产地
   */
  @Column('varchar', { length: 50, default: '' })
  madeIn: string;

  /**
   * 库存数量
   */
  @Column('int', { default: 0 })
  stockQty: number;


  /**
   * 是否在售
   * -1 未上架
   *  0 已下架
   *  1 出售中
   */
  @Column('tinyint', { default: -1 })
  isOnline: string;

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