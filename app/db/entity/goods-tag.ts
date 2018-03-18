/**
 * 商品标签
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import Goods from './goods';

@Entity()
export default class GoodsTag {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Goods, goods => goods.tags, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  goods: Goods[];

  /**
   * 属性名称
   */
  @Column('varchar', { length: 25 })
  tagName: string;
}