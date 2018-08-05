/**
 * 门店表
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 门店名字
   */
  @Column('varchar', { length: 50 })
  shopName: string;

  /**
   * 门店所在地区代号 省,市,区,街道
   */
  @Column('varchar', { length: 50 })
  areaCode: string;

  /**
   * 门店所在地区名称 省,市,区,街道
   */
  @Column('varchar', { length: 100 })
  areaName: string;

  /**
   * 门店详细地址
   */
  @Column('varchar', { length: 50 })
  address: string;

  /**
   * 店长
   */
  @Column('char', { length: 10, default: '' })
  manager: string;

  /**
   * 店长联系方式
   */
  @Column('char', { length: 11, default: '' })
  tel: string;

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

  /**
   * 删除时间
   */
  @Column({ nullable: true })
  deletedAt: Date;
}