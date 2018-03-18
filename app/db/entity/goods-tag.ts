/**
 * 商品标签
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import GoodsDesc from './goods-desc';

@Entity()
export default class GoodsTag {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => GoodsDesc, goods => goods.tags, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  goods: GoodsDesc[];

  /**
   * 商品标签
   */
  @Column('varchar', { length: 25 })
  tagName: string;
}