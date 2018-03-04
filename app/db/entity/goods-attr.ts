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
}