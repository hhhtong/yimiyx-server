/**
 * 小程序端-购物车表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import User from './user';
import Goods from './goods';

@Entity()
export default class Cart {

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
  @ManyToOne(type => Goods, G=> G.clientCart)
  goods: Goods;

  /**
   * 商品数量
   */
  @Column('int')
  goodsNum: number;

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
