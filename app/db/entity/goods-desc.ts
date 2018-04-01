/**
 * 商品信息详情表
 */
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import Goods from './goods';
import GoodsTag from './goods-tag';
import SpecialOffers from './goods-special-offers';

@Entity()
export default class GoodsDesc {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 和商品表(goods)建立联系
   */
  @OneToOne(type => Goods)
  @JoinColumn()
  goods: Goods

  /**
   * 对应商品标签
   */
  @ManyToMany(type => GoodsTag, tag => tag.goods)
  @JoinTable()
  tags: GoodsTag[];

  /**
   * 该商品参与的优惠活动
   */
  @ManyToMany(type => SpecialOffers, specialOffers => specialOffers.goods)
  @JoinTable()
  specialOffers: SpecialOffers[];

  /**
   * 商品描述
   */
  @Column('text')
  description: string;

  /**
   * 单价(按斤) xx元/500g
   */
  @Column('decimal', { precision: 5, scale: 2 })
  unitPrice: number;

  /**
   * 对外售价
   */
  @Column('decimal', { precision: 5, scale: 2 })
  resalePrice: number;

  /**
   * 出售的商品总量
   */
  @Column()
  goodsAmount: number;

  /**
   * 小图[url1, url2]
   */
  @Column('json')
  smallImgPaths: any;

  /**
   * 大图[url1, url2]
   */
  @Column('json')
  imgPaths: any;

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