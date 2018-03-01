import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { Category } from "./Category"; // 外键
import { snakeCase as _ } from 'lodash';

@Entity(_('Supplier'))
export class Supplier {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 供货商级别 1: 优 2: 良好 3: 凑合
   */
  @Column('int', { length: 1, default: 2 })
  level: number;

  /**
   * 供货商名称
   */
  @Column('varchar', { name: _('supplierName'), length: 50, default: '' })
  supplierName: string;

  /**
   * 负责人姓名
   */
  @Column('varchar', { name: _('linkmanName'), length: 10, default: '' })
  linkmanName: string;

  /**
   * 负责人联系方式
   */
  @Column('varchar', { length: 20, default: '' })
  tel: string;

  /**
   * 供货商所在地区代号 省,市,区,街道
   */
  @Column('varchar', { name: _('areaCode'), length: 50, default: '' })
  areaCode: string;

  /**
   * 供货商所在地区名称 省,市,区,街道
   */
  @Column('varchar', { name: _('areaName'), length: 100, default: '' })
  areaName: string;

  /**
   * 供货商详细地址
   */
  @Column('varchar', { length: 50, default: '' })
  address: string;

  /**
   * 供货商类型 1:公司 2:个人
   */
  @Column('int', { name: _('supplierType'), length: 1, default: 0 })
  supplierType: number;

  /**
   * 收款方式 bank | ali | wechat
   */
  @Column('char', { name: _('payType'), length: 10, default: '' })
  payType: string;

  /**
   * 汇款账号
   */
  @Column('varchar', { name: _('accountNo'), length: 24, default: '' })
  accountNo: string;

  /**
   * 银行名称
   */
  @Column('varchar', { name: _('bankName'), length: 10, nullable: true })
  bankName: string;

  /**
   * 持卡人姓名
   */
  @Column('char', { name: _('bankUsername'), length: 10, nullable: true })
  bankUsername: string;

  /**
   * 开户行地址
   */
  @Column('varchar', { name: _('bankAddress'), length: 50, nullable: true })
  bankAddress: string;

  /**
   * 商品类目
   */
  @Column('varchar', { length: 150, default: '[]' })
  category: string;

  /**
   * 创建时间
   */
  @Column('datetime', { name: _('createdAt'), nullable: true })
  createdAt: Date;

  /**
   * 软删除的标志位 1:删除
   */
  @Column('int', { name: _('isDelete'), default: 0 })
  isDelete: number;

  // @ManyToMany(type => Category)
  // @JoinTable()
  // categories: Category[];
}