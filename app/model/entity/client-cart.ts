/**
 * 小程序端-购物车表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
import User from './client-user';
import Goods from './goods';

@Entity()
export default class ClientCart {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户信息
   */
  @ManyToOne(type => User, U => U.openid)
  user: User;

  /**
   * 商品信息
   */
  @ManyToMany(type => Goods, G=> G.clientCart)
  @JoinTable()
  goods: Goods[];

  /**
   * 商品数量
   */
  @Column('int')
  quantity: number;

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
