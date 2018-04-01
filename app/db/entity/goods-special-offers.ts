/**
 * 商品的优惠活动表
 */
import { Entity, ManyToMany, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import GoodsDesc from './goods-desc';

@Entity()
export default class GoodsSpecialOffers {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 链到商品详情表(goods-desc)
   */
  @ManyToMany(type => GoodsDesc, goods => goods.specialOffers)
  goods: GoodsDesc[];

  /**
   * 优惠活动的类型
   * 1: 打折
   * 2：满减
   * 3：指定价格出售。如1元大促销
   * 4: 限量(前xx名购买)暂时用不到
   */
  @Column({ type: 'tinyint', default: 0 })
  type: number;

  /**
   * 参与活动的有效值，实际含义以优惠的类型type决定
   */
  @Column('decimal', { precision: 5, scale: 2 })
  value: number

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}