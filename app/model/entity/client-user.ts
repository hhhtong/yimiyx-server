/**
 * 小程序端-用户表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class ClientUser {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户昵称
   */
  @Column('varchar', { length: 50 })
  nickName: string;

  /**
   * 用户的性别
   * 值为 1 时是男性
   * 值为 2 时是女性
   * 值为 0 时是未知
   */
  @Column('tinyint')
  gender: number;

  /**
   * 用户所在国家
   */
  @Column('char', { length: 10 })
  country: string;

  /**
   * 用户所在省份
   */
  @Column('char', { length: 10 })
  province: string;

  /**
   * 用户所在城市
   */
  @Column('char', { length: 10 })
  city: string;

  /**
   * 用户的语言，简体中文为 zh_CN
   */
  @Column('char', { length: 10 })
  language: string;

  /**
   * 用户唯一标识，由微信生成
   */
  @Column('char', { length: 28 })
  openid: string;

  /**
   * 用户在开放平台的唯一标识符，由微信生成
   */
  @Column('char', { length: 29 })
  unionid: string;

  /**
   * 用户微信头像
   */
  @Column('varchar', { length: 100 })
  avatarUrl: string;

  /**
   * 用户是否授权
   */
  @Column('tinyint', { default: 0 })
  is_authorized: number;

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
