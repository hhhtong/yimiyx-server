/**
 * 商品信息详情表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import GoodsTag from './goods-tag';

@Entity()
export default class GoodsDesc {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 对应商品标签
   */
  @ManyToMany(type => GoodsTag, tag => tag.goods)
  @JoinTable()
  tags: GoodsTag[];

  /**
   * 商品描述
   */
  @Column('text')
  description: string;

  /**
   * 单价(按斤) xx元/500g
   */
  @Column('decimal', { precision: 5, scale: 2 })
  unitPrice: number;

  /**
   * 对外售价(按规格)
   */
  @Column('decimal', { precision: 5, scale: 2 })
  resalePrice: number;

  /**
   * 小图, 路径
   */
  @Column('json')
  smallImgPaths: any;

  /**
   * 大图
   */
  @Column('json')
  imgPaths: any;

  /**
   * 是否在售
   */
  @Column('tinyint')
  isOnline: string;

  /**
   * 软删除标志位
   */
  @Column('tinyint')
  isDelete: string;

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