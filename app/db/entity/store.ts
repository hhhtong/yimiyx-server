/**
 * 仓库表
 */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import Goods from './goods';

@Entity()
export default class Store {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 与商品表(goods)建立多对对关系
   */
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