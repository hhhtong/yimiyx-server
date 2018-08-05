/**
 * 小程序端-用户表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import Cart from './cart'
import Coupon from './coupon'

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number

  /**
   * 购物车
   */
  @OneToMany(type => Cart, C => C.user)
  cart: Cart[]

  /**
   * 优惠券
   */
  @ManyToMany(type => Coupon, C => C.user)
  @JoinTable()
  coupons: Coupon[]

  /**
   * 用户昵称
   */
  @Column('varchar', { length: 50 })
  nickName: string

  /**
   * 用户的性别
   * 值为 1 时是男性
   * 值为 2 时是女性
   * 值为 0 时是未知
   */
  @Column('tinyint')
  gender: number

  /**
   * 用户所在国家
   */
  @Column('char', { length: 10 })
  country: string

  /**
   * 用户所在省份
   */
  @Column('char', { length: 10 })
  province: string

  /**
   * 用户所在城市
   */
  @Column('char', { length: 10 })
  city: string

  /**
   * 用户的语言，简体中文为 zh_CN
   */
  @Column('char', { length: 10 })
  language: string

  /**
   * 用户唯一标识，由微信生成
   */
  @Column('char', { length: 28, unique: true })
  openid: string

  /**
   * 用户在开放平台的唯一标识符，由微信生成
   */
  @Column('char', { length: 29, nullable: true })
  unionid: string

  /**
   * 用户微信头像
   */
  @Column('varchar', { length: 500 })
  avatarUrl: string

  /**
   * 用户是否授权
   */
  @Column('tinyint', { default: 0 })
  isAuthorized: number

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date
}
