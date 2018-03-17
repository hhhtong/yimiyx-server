/**
 * 商品标签
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { snakeCase as _ } from 'lodash';

@Entity(_('GoodsTag'))
export default class GoodsTag {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 属性名称
   */
  @Column('varchar', { name: _('tagName'), length: 25 })
  tagName: string;
}