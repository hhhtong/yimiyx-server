/**
 * 仓库表
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { snakeCase as _ } from 'lodash';

@Entity(_('Store'))
export default class Store {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 仓库名称
   */
  @Column('varchar', { name: _('storeName'), length: 20 })
  storeName: string;
}