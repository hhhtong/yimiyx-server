/**
 * 商品表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import Store from './store';
import GoodsCategory from './goods-category';
import GoodsTag from './goods-tag';
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
   * 商品标签
   */
  @OneToMany(type => GoodsTag, tag => tag.goods)
  @JoinTable()
  tags: GoodsTag[];

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
   * 商品规格 eg: 150g
   */
  @Column('varchar', { length: 20, nullable: true })
  spec: string;

  /**
   * 商品规格的数量
   */
  @Column('int', { default: 1 })
  specNum: number;

  /**
   * 产地
   */
  @Column('varchar', { length: 50, nullable: true })
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
  isOnline: number;

  /**
   * 商品描述
   */
  @Column('text', { nullable: true })
  description: string;

  /**
   * 进价
   */
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  unitPrice: number;

  /**
   * 售价(按规格) xx元/500g
   */
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  resalePrice: number;

  /**
   * 出售的商品总量
   */
  @Column('int', { default: 0 })
  goodsAmount: number;

  /**
   * @prop {Number} type - 优惠活动的类型
   * 1: 打折
   * 2：满减
   * 3：指定价格出售。如1元大促销
   * 4: 限量(前xx名购买xx价)暂时用不到
   * @prop {String} value - 参与活动的有效值，实际含义以优惠的类型type决定
   * @example - [{ type: 1, value: 2.72 }, { type: 2, value: '300.00' }]
   */
  @Column('varchar', { length: 1000, nullable: true })
  activityType: string;

  /**
   * 小图[url1, url2]
   */
  @Column('varchar', { length: 500, nullable: true })
  smallImgs: string;

  /**
   * 大图[url1, url2]
   */
  @Column('varchar', { length: 500, nullable: true })
  imgs: string;

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