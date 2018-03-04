import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { snakeCase as _ } from 'lodash';

@Entity(_('GoodsAttr'))
export class GoodsAttr {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 属性名称
   */
  @Column('varchar', { name: _('attrName'), length: 25 })
  attrName: string;

  /**
   * 对应属性表中的ID
   */
  @Column('int', { name: _('attrId') })
  attrId: number;

  /**
   * 对应商品表中的ID
   */
  @Column('int', { name: _('goodsId') })
  goodsId: number;
}