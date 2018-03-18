/**
 * 仓库表
 */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import Goods from './goods';

@Entity()
export default class Store {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Goods, goods => goods.stores, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  goods: Goods[];

  /**
   * 仓库名称
   */
  @Column('varchar', { length: 20 })
  storeName: string;
}