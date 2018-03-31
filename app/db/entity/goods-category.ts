/**
 * 商品分类表
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import Supplier from './supplier';
import Goods from './goods';

@Entity()
export default class GoodsCategory {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Goods, goods => goods.categorys, {
    cascadeInsert: true,
    cascadeUpdate: true
  })
  goods: Goods[];

  @OneToMany(type => Supplier, s => s.category)
  supplier: Supplier[];

  /**
   * 指向二级或三级分类的对应父级id
   */
  @Column({ default: 0 })
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
   * 删除时间
   */
  @Column({ nullable: true })
  deletedAt: Date;
}