/**
 * 商品标签
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import GoodsDesc from './goods-desc';

@Entity()
export default class GoodsTag {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 和商品表(goods)建立多对多的关系
   */
  @ManyToMany(type => GoodsDesc, goods => goods.tags)
  goods: GoodsDesc[];

  /**
   * 商品标签
   */
  @Column('varchar', { length: 25 })
  tagName: string;

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