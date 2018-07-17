/**
 * 商品信息详情表
 */
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import Goods from './goods';
import GoodsTag from './goods-tag';

@Entity()
export default class GoodsDesc {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 和商品表(goods)建立联系
   */
  @OneToOne(type => Goods, g => g.goodsDesc)
  @JoinColumn()
  goods: Goods;

  /**
   * 商品标签
   */
  @ManyToMany(type => GoodsTag, tag => tag.goods)
  @JoinTable()
  tags: GoodsTag[];

  /**
   * 商品描述
   */
  @Column('text')
  description: string;

  /**
   * 进价
   */
  @Column('decimal', { precision: 5, scale: 2 })
  unitPrice: number;

  /**
   * 售价(按规格) xx元/500g
   */
  @Column('decimal', { precision: 5, scale: 2 })
  resalePrice: number;

  /**
   * 出售的商品总量
   */
  @Column()
  goodsAmount: number;

  /**
   * @type {Number} - 优惠活动的类型
   * 1: 打折
   * 2：满减
   * 3：指定价格出售。如1元大促销
   * 4: 限量(前xx名购买xx价)暂时用不到
   * @value {Number, String} - 参与活动的有效值，实际含义以优惠的类型type决定
   * @example - [{ type: 1, value: 2.72 }, { type: 2, value: '300.00' }]
   */
  @Column({ nullable: true })
  type: string;

  /**
   * 小图[url1, url2]
   */
  @Column({ nullable: true })
  smallImgs: string;

  /**
   * 大图[url1, url2]
   */
  @Column({ nullable: true })
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
}
