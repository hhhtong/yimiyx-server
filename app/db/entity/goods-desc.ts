/**
 * 商品信息详情表
 */
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { snakeCase as _ } from 'lodash';

@Entity(_('GoodsDesc'))
export default class GoodsDesc {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 商品描述
   */
  @Column('text')
  description: string;

  /**
   * 单价(按斤) xx元/500g
   */
  @Column('decimal', { name: _('unitPrice'), precision: 5, scale: 2 })
  unitPrice: number;

  /**
   * 对外售价(按规格)
   */
  @Column('decimal', { name: _('resalePrice'), precision: 5, scale: 2 })
  resalePrice: number;

  /**
   * 小图, 路径
   */
  @Column('json', { name: _('smallImgPaths') })
  smallImgPaths: string;

  /**
   * 大图
   */
  @Column('json', { name: _('imgPaths') })
  imgPaths: string;

  /**
   * 是否在售
   */
  @Column('tinyint', { name: _('isOnline') })
  isOnline: string;

  /**
   * 软删除标志位
   */
  @Column('tinyint', { name: _('isDelete') })
  isDelete: string;

  /**
   * 创建时间
   */
  @CreateDateColumn({ name: _('createdAt') })
  createdAt: Date;

  /**
   * 更新时间
   */
  @CreateDateColumn({ name: _('updatedAt') })
  updatedAt: Date;
}