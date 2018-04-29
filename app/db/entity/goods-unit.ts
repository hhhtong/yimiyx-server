/**
 * 商品单位
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class GoodsUnit {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 单位名称
   */
  @Column('char', { length: 2 })
  unitName: string;
}
