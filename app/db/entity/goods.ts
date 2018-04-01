/**
 * 商品表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import Store from './store';
import GoodsCategory from './goods-category';

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
   * 商品编号 eg: 0502020001 三级类目(050202)+000+商品id(1)
   */
  @Column('char', { length: 10 })
  goodsNo: string;

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
   * 商品规格 eg: 150g/盒
   */
  @Column('varchar', { length: 20, default: '' })
  specification: string;

  /**
   * 库存数量
   */
  @Column('int', { length: 10, default: 0 })
  stockQty: number;


  /**
   * 是否在售
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