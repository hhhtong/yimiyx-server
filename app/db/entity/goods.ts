/**
 * 商品表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { snakeCase as _ } from 'lodash';
import Store from './store';
import GoodsTag from './goods-tag';
import GoodsCategory from './goods-category';

@Entity(_('Goods'))
export default class Goods {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 所在仓库
   */
  @ManyToMany(type => Store, store => store.id)
  @JoinTable({ name: _('storeID') })
  store: Store;

  /**
   * 对应商品表中的ID
   */
  @ManyToMany(type => GoodsTag, goodsTag => goodsTag.id)
  @JoinTable({ name: _('goodsTagID') })
  goodsTag: GoodsTag;

  /**
   * 对应所关联的类目表(goods_category)中的类目id
   */
  @ManyToOne(type => GoodsCategory, goodsCategory => goodsCategory.id)
  @JoinColumn({ name: _('goodsCategoryID') })
  goodsCategory: GoodsCategory;

  /**
   * 商品编号 eg: 0502020001 三级类目(050202)+000+商品id(1)
   */
  @Column('char', { name: _('goodsNo'), length: 10 })
  goodsNo: string;

  /**
   * 商品名称
   */
  @Column('varchar', { name: _('goodsName'), length: 50 })
  goodsName: string;

  /**
   * 商品别名
   */
  @Column('varchar', { name: _('goodsAlias'), length: 50, nullable: true })
  goodsAlias: string;

  /**
   * 商品规格 eg: 150g/盒
   */
  @Column('varchar', { length: 20, default: '' })
  specification: string;

  /**
   * 库存数量
   */
  @Column('int', { name: _('stockQty'), length: 10, default: 0 })
  stockQty: number;
}