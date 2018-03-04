import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { snakeCase as _ } from 'lodash';

@Entity(_('Goods'))
export class Goods {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 对应所关联的类目表(goods_category)中的类目id
   */
  @Column('int', { default: 0 })
  cid: number;

  /**
   * 商品编号 eg: 0502020001 三级类目(050202)+000+商品id(1)
   */
  @Column('char', { name: _('goodsNo'), length: 10 })
  goodsNo: string;

  /**
   * 商品名称
   */
  @Column('varchar', { name: _('goodsName'), length: 50 })
  goodsName: string;

  /**
   * 商品规格
   */
  @Column('varchar', { length: 20 })
  type: number;

  /**
   * 商品描述
   */
  @Column('text')
  description: string;

  /**
   * 小图
   */
  @Column('varchar', { name: _('smallImg'), length: 100 })
  smallImg: string;

  /**
   * 大图
   */
  @Column('varchar', { name: _('bigImg'), length: 100 })
  bigImg: string;

  /**
   * 库存数量
   */
  @Column('int', { name: _('stockQty'), length: 10, default: 0 })
  stockQty: number;
}