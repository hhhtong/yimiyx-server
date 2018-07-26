/**
 * 优惠券表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Coupon {

  @PrimaryGeneratedColumn()
  couponId: number;

  /**
   * 优惠券名称
   */
  @Column('varchar', { length: 200 })
  couponName: string;

  /**
   * 优惠券类型
   * 1、满减
   */
  @Column('tinyint', { default: 1 })
  couponType: number;

  /**
   * 优惠券面额
   */
  @Column('int', { default: 0 })
  couponMoney: number;

  /**
   * 最低消费金额
   */
  @Column('int', { default: 0 })
  spendMoney: number;

  /**
   * 优惠活动描述
   */
  @Column('text', { nullable: true })
  couponDes: string;

  /**
   * 发放数量
   * 0、不限
   */
  @Column('int', { default: 0 })
  sendNum: number;

  /**
   * 领取数量
   */
  @Column('int', { default: 0 })
  receiveNum: number;

  /**
   * 有效状态
   *  1、有效
   *  0、失效
   * -1、删除
   */
  @Column('tinyint', { default: 1 })
  dataFlag: number;

  /**
   * 发放开始时间
   */
  @Column('date')
  sendStartTime: Date;

  /**
   * 发放结束时间
   */
  @Column('date')
  sendEndTime: Date;

  /**
   * 活动开始时间
   */
  @Column('date')
  validStartTime: Date;

  /**
   * 活动结束时间
   */
  @Column('date')
  validEndTime: Date;

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
