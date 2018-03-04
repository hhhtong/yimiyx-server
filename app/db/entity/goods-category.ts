import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { snakeCase as _ } from 'lodash';

@Entity(_('GoodsCategory'))
export class GoodsCategory {

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
  @Column('int', { length: 1, default: 0 })
  type: number;

  /**
   * 类目名称
   */
  @Column('varchar', { length: 25 })
  name: string;
}