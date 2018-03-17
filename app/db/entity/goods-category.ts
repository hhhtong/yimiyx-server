/**
 * 商品分类表
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { snakeCase as _ } from 'lodash';

@Entity(_('GoodsCategory'))
export default class GoodsCategory {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 指向二级或三级分类的对应父级id
   */
  @Column()
  pid: number;

  /**
   * 类型 1：一级类目 | 2：二级类目 | 3：三级类目
   */
  @Column('tinyint', { length: 1, default: 0 })
  type: number;

  /**
   * 类目名称
   */
  @Column('varchar', { length: 25 })
  name: string;

  /**
   * 类目编号
   */
  @Column('char', { length: 6 })
  no: string;

  /**
   * 软删除的标志位 1:删除
   */
  @Column('tinyint', { name: _('isDelete'), length: 1, default: 0 })
  isDelete: number;
}