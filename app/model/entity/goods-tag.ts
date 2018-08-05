/**
 * 商品标签
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Goods from './goods';

@Entity()
export default class GoodsTag {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 和商品表(goods)建立多对多的关系
   */
  @ManyToOne(type => Goods, goods => goods.tags)
  goods: Goods;

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